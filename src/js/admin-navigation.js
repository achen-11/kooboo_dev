// @k-url /admin-navigation.js

const ADMIN_BASE = "/_Admin/";
function trimTrailingSlash(url) {
    return (url || "").replace(/\/+$/, "");
}

// koobooAdminBaseUrl is injected server-side (see src/layout/main.html) from the
// user's JWT redirect domain, so it is always defined once the layout has rendered.
function getAdminBase() {
    if (typeof koobooAdminBaseUrl !== "undefined" && koobooAdminBaseUrl?.value) {
        return trimTrailingSlash(koobooAdminBaseUrl.value);
    }

    return ADMIN_BASE;
}

function getCookieValue(name) {
    const prefix = `${name}=`;
    return (
        document.cookie
            .split(";")
            .map((part) => part.trim())
            .find((part) => part.startsWith(prefix))
            ?.slice(prefix.length) ?? ""
    );
}

function getRedirectLoginUrl() {
    const redirectCookie = getCookieValue("kooboo_redirect_url");
    let redirectUrl;
    if (redirectCookie) {
        try {
            // The cookie may contain either a raw URL or an encoded URL.
            const value = /^https?:\/\//i.test(redirectCookie)
                ? redirectCookie
                : decodeURIComponent(redirectCookie);
            const url = new URL(value);
            if (url.protocol === "https:" || url.protocol === "http:") {
                redirectUrl = url;
            }
        } catch {
            // Invalid cookies fall back to the existing server selection.
        }
    }

    return redirectUrl;
}

function resolveAuthenticatedAdminUrl(target) {
    const targetUrl = new URL(target, window.location.origin);
    const redirectUrl = getRedirectLoginUrl();
    if (!redirectUrl) return targetUrl;

    let returnUrl = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    if (/^\/_Admin\/(login|start)\/?$/i.test(targetUrl.pathname)) {
        returnUrl = targetUrl.searchParams.get("returnurl") || "/_Admin/";
    } else {
        // Authentication comes from the redirect cookie, not the current site.
        targetUrl.searchParams.delete("access_token");
        returnUrl = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    }
    redirectUrl.searchParams.set("returnurl", returnUrl);
    return redirectUrl;
}

function initAuthenticatedAdminLinks() {
    const adminOrigin = new URL(getAdminBase(), window.location.origin).origin;
    document.querySelectorAll("a[href]").forEach((link) => {
        // Start now must re-enter login: the organization may have logged out.
        if (link.hasAttribute("data-login-required")) return;
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin && url.origin !== adminOrigin) return;
        if (!/^\/_Admin(?:\/|$)/i.test(url.pathname)) return;
        link.href = resolveAuthenticatedAdminUrl(url).href;
    });
}

function initTemplateGallery() {
    document.querySelectorAll("[data-template-admin-path]").forEach((link) => {
        const path = link.dataset.templateAdminPath;
        if (!path) return;
        link.href = `${trimTrailingSlash(getAdminBase())}${path}`;
    });
}

function initAdminNavigation() {
    initTemplateGallery();
    initAuthenticatedAdminLinks();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminNavigation);
} else {
    initAdminNavigation();
}

export { getAdminBase, getCookieValue, trimTrailingSlash, resolveAuthenticatedAdminUrl };
