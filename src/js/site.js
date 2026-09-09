// @k-url /site.js
document.documentElement.classList.add("site-ready");

function initSiteHeaderScrollState() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeaderState = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function initSiteScrollReveal() {
    if (!document.querySelector("main")) return;
    if (document.querySelector(".template-gallery, .innovation-page, .price-page, .download-page")) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const revealSpecs = [
        { selector: ".home-publish-banner__container > div", delay: 0 },
        { selector: ".home-publish-banner__flow", delay: 90 },
        { selector: ".home-productivity__title", delay: 0 },
        { selector: ".home-productivity-card", delay: 80, stagger: 80, staggerCycle: 3 },
        { selector: ".home-business__title", delay: 0 },
        { selector: ".home-business__stage", delay: 80 },
        { selector: ".home-production__title", delay: 0 },
        { selector: ".home-production-card", delay: 70, stagger: 70, staggerCycle: 3 },
        { selector: ".home-performance__stage", delay: 0 },
        { selector: ".home-start-building__header", delay: 0 },
        { selector: ".home-start-building__prompt", delay: 100 },
        { selector: ".download-page__inner > h1", delay: 0 },
        { selector: ".download-card", delay: 70, stagger: 70, staggerCycle: 3 },
        { selector: ".download-linux", delay: 80 },
        { selector: ".innovation-hero__content", delay: 0 },
        { selector: ".innovation-card", delay: 60, stagger: 65, staggerCycle: 3 },
        { selector: ".innovation-detail-header", delay: 0 },
        { selector: ".innovation-detail-article > *", delay: 30, stagger: 55, staggerCycle: 4 },
        { selector: ".template-gallery__filters", delay: 0 },
        { selector: ".template-gallery__heading", delay: 60 },
        { selector: ".template-card", delay: 70, stagger: 65, staggerCycle: 4 },
        { selector: ".price-plans > .price-page__title", delay: 0 },
        { selector: ".price-plan-card", delay: 70, stagger: 75, staggerCycle: 3 },
        { selector: ".price-faq > .price-page__title", delay: 0 },
        { selector: ".price-faq__item", delay: 50, stagger: 55, staggerCycle: 4 },
        { selector: ".component-summary > div > :first-child", delay: 0 },
        { selector: ".component-summary > div > :nth-child(2) > *", delay: 50, stagger: 70, staggerCycle: 3 },
        { selector: "main > div > div.mx-auto.max-w-screen-xl > *", delay: 30, stagger: 70, staggerCycle: 3 },
    ];
    const revealItems = [];
    const seenItems = new Set();

    revealSpecs.forEach(({ selector, delay, stagger = 0, staggerCycle = 0 }) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            if (seenItems.has(element)) return;

            const staggerIndex = staggerCycle ? index % staggerCycle : index;

            seenItems.add(element);
            element.classList.add("site-scroll-reveal");
            element.style.setProperty("--site-reveal-delay", `${delay + staggerIndex * stagger}ms`);
            revealItems.push(element);
        });
    });

    if (!revealItems.length) return;

    document.documentElement.classList.add("site-reveal-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const viewportRevealLine = window.innerHeight * 0.92;
    const addInitialRevealMask = (element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        const mask = document.createElement("span");
        const delay = element.style.getPropertyValue("--site-reveal-delay") || "0ms";

        mask.className = "site-initial-reveal-mask";
        mask.setAttribute("aria-hidden", "true");
        mask.style.left = `${rect.left + window.scrollX}px`;
        mask.style.top = `${rect.top + window.scrollY}px`;
        mask.style.width = `${rect.width}px`;
        mask.style.height = `${rect.height}px`;
        mask.style.borderRadius = getComputedStyle(element).borderRadius;
        mask.style.setProperty("--site-reveal-delay", delay);
        document.body.appendChild(mask);

        mask.addEventListener("animationend", () => mask.remove(), { once: true });
        window.setTimeout(() => mask.remove(), 1200);
    };
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.08,
        }
    );

    revealItems.forEach((element) => {
        if (element.getBoundingClientRect().top <= viewportRevealLine) {
            element.classList.add("is-initial-reveal", "is-visible");
            addInitialRevealMask(element);
        } else {
            observer.observe(element);
        }
    });
}

function scheduleSiteScrollReveal() {
    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(initSiteScrollReveal);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initSiteHeaderScrollState();
        scheduleSiteScrollReveal();
    });
} else {
    initSiteHeaderScrollState();
    scheduleSiteScrollReveal();
}

