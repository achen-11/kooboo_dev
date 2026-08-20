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

function initHomeBusinessAccordion() {
    const roots = document.querySelectorAll("[data-business-accordion]");

    roots.forEach((root) => {
        const items = Array.from(root.querySelectorAll("[data-business-item]"));
        const visuals = Array.from(root.querySelectorAll("[data-business-visual]"));
        const carousels = Array.from(root.querySelectorAll("[data-business-carousel]"));
        const triggers = items
            .map((item) => item.querySelector(".home-business__trigger"))
            .filter(Boolean);
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        const carouselState = new Map();

        const createCarouselState = (carousel) => {
            const slides = Array.from(carousel.querySelectorAll("[data-business-slide]"));
            const controls = Array.from(carousel.querySelectorAll("[data-business-slide-control]"));
            const interval = Number(carousel.dataset.businessCarouselInterval) || 4500;
            let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
            let timer = null;

            const setSlide = (index) => {
                if (!slides.length) return;

                activeIndex = (index + slides.length) % slides.length;

                slides.forEach((slide, slideIndex) => {
                    slide.classList.toggle("is-active", slideIndex === activeIndex);
                });

                controls.forEach((control, controlIndex) => {
                    const isActive = controlIndex === activeIndex;

                    control.classList.toggle("is-active", isActive);
                    control.setAttribute("aria-current", String(isActive));
                });
            };

            const stop = () => {
                if (!timer) return;

                window.clearInterval(timer);
                timer = null;
            };

            const start = () => {
                stop();

                if (reducedMotion || slides.length < 2 || !carousel.classList.contains("is-active")) return;

                timer = window.setInterval(() => {
                    setSlide(activeIndex + 1);
                }, interval);
            };

            controls.forEach((control, controlIndex) => {
                control.addEventListener("click", () => {
                    setSlide(controlIndex);
                    start();
                });
            });

            carousel.addEventListener("mouseenter", stop);
            carousel.addEventListener("mouseleave", start);
            carousel.addEventListener("focusin", stop);
            carousel.addEventListener("focusout", (event) => {
                if (!carousel.contains(event.relatedTarget)) {
                    start();
                }
            });

            setSlide(activeIndex);

            return { start, stop };
        };

        carousels.forEach((carousel) => {
            carouselState.set(carousel, createCarouselState(carousel));
        });

        const setActive = (key) => {
            items.forEach((item) => {
                const isActive = item.dataset.businessItem === key;
                const trigger = item.querySelector(".home-business__trigger");
                const panel = item.querySelector(".home-business__panel");

                item.classList.toggle("is-active", isActive);
                trigger?.setAttribute("aria-expanded", String(isActive));

                if (panel) {
                    panel.hidden = !isActive;
                }
            });

            visuals.forEach((visual) => {
                const isActive = visual.dataset.businessVisual === key;

                visual.classList.toggle("is-active", isActive);

                if (visual.hasAttribute("data-business-carousel")) {
                    const state = carouselState.get(visual);
                    const controls = visual.querySelectorAll("[data-business-slide-control]");

                    visual.setAttribute("aria-hidden", String(!isActive));
                    controls.forEach((control) => {
                        control.tabIndex = isActive ? 0 : -1;
                    });

                    if (isActive) {
                        state?.start();
                    } else {
                        state?.stop();
                    }
                }
            });
        };

        items.forEach((item) => {
            const trigger = item.querySelector(".home-business__trigger");

            trigger?.addEventListener("click", () => {
                setActive(item.dataset.businessItem);
            });
        });

        root.addEventListener("keydown", (event) => {
            if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

            const currentIndex = triggers.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            event.preventDefault();

            let nextIndex = currentIndex;

            if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % triggers.length;
            if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = triggers.length - 1;

            triggers[nextIndex]?.focus();
        });

        const activeItem = items.find((item) => item.classList.contains("is-active")) || items[0];

        if (activeItem) {
            setActive(activeItem.dataset.businessItem);
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initSiteHeaderScrollState();
        initHomeBusinessAccordion();
    });
} else {
    initSiteHeaderScrollState();
    initHomeBusinessAccordion();
}

const ADMIN_BASE = "/_Admin/";
const AI_PROVIDERS_API = "/api/ai-models";
const AVAILABLE_DOMAINS_API = "/_api/v2/Domain/Available";
const CREATE_SITE_API = "/_api/v2/Site/Create";
const STARTER_PROMPT_QUERY = "prompt";
const STARTER_PROVIDER_QUERY = "provider";
const STARTER_MODEL_QUERY = "model";
const STARTER_SITE_CREATED_QUERY = "starterSiteCreated";
const MODEL_PREFERENCE_KEY = "kooboo_ai_chat_model_preference";
const MODEL_VALUE_SEP = "|";

const PROMPT_GENERATOR_STRINGS = {
    noModelsAvailable: "No models available",
    loadModelsFailed: "Failed to load models",
    creatingSite: "Creating...",
    createSiteFailed: "Failed to create the site. Please try again.",
    placeholderPrefix: "What kind of website do you need? Try this: ",
    placeholderPrompts: [
        "help me generate a coffee website with online ordering...",
        "build a SaaS dashboard for finance teams...",
        "create a portfolio for a UI designer...",
    ],
};

function promptGeneratorText(key) {
    return PROMPT_GENERATOR_STRINGS[key];
}

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

function getKoobooBaseUrl() {
    const adminBase = trimTrailingSlash(getAdminBase());
    return adminBase.replace(/\/_Admin$/i, "") || "/";
}

function buildKoobooApiUrl(path, params) {
    const baseUrl = new URL(`${trimTrailingSlash(getKoobooBaseUrl())}/`, window.location.origin);
    const url = new URL(String(path).replace(/^\/+/, ""), baseUrl);
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });
    return url.href;
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

function isKoobooLoggedIn() {
    return Boolean(getCookieValue("jwt_token"));
}

function requestKoobooApi(path, { method = "GET", params } = {}) {
    const accessToken = getCookieValue("jwt_token");
    if (!accessToken) throw new Error("Kooboo access token is missing");

    const url = buildKoobooApiUrl(path, params);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);

        xhr.onload = () => {
            const responseText = xhr.responseText;
            let data = null;
            if (responseText) {
                try {
                    data = JSON.parse(responseText);
                } catch {
                    data = responseText;
                }
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(data);
                return;
            }

            const message = Array.isArray(data)
                ? data.filter(Boolean).join("; ")
                : typeof data === "string"
                  ? data
                  : `Kooboo API request failed: ${xhr.status}`;
            const error = new Error(
                message || `Kooboo API request failed: ${xhr.status}`
            );
            error.status = xhr.status;
            reject(error);
        };

        xhr.onerror = () => {
            const error = new Error("Kooboo API network request failed");
            error.status = xhr.status;
            reject(error);
        };

        xhr.send(null);
    });
}

function formatSiteTimestamp(date = new Date()) {
    const pad = (value) => String(value).padStart(2, "0");
    return [
        pad(date.getFullYear() % 100),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds()),
    ].join("");
}

function buildRandomSiteName() {
    const stamp = formatSiteTimestamp();
    const suffix = Math.random().toString(36).slice(2, 6);
    return `ai_site_${stamp}_${suffix}`;
}

function buildStarterSiteParams(root) {
    const rootDomain = root?.domainName ?? root?.DomainName;
    const sudDomainUseDash =
        root?.sudDomainUseDash ?? root?.SudDomainUseDash ?? false;
    if (!rootDomain) throw new Error("No available domain");

    const siteName = buildRandomSiteName();
    return {
        subDomain: siteName,
        rootDomain,
        siteName,
        sudDomainUseDash,
        siteType: "p",
    };
}

async function createStarterSite() {
    const domains = await requestKoobooApi(AVAILABLE_DOMAINS_API);
    const root = Array.isArray(domains) ? domains[0] : null;
    const siteParams = buildStarterSiteParams(root);
    const site = await requestKoobooApi(CREATE_SITE_API, {
        method: "POST",
        params: siteParams,
    });
    const siteId =
        (typeof site === "string" ? site : null) ??
        site?.id ??
        site?.Id ??
        site?.ID ??
        site?.siteId ??
        site?.SiteId ??
        site?.model?.id ??
        site?.Model?.Id;
    if (!siteId) throw new Error("Site creation returned no site id");
    return siteId;
}

function readPromptFromGenerator(root) {
    const textarea = root.querySelector(".prompt-generator__input");
    if (!textarea) return "";
    return textarea.value.trim();
}

function readModelFromGenerator(root) {
    const select = root.querySelector(".prompt-generator__model-select");
    if (!select?.value) return null;
    return parseModelValue(select.value);
}

function modelOptionValue(providerName, modelId) {
    return `${providerName}${MODEL_VALUE_SEP}${modelId}`;
}

function parseModelValue(value) {
    const index = value.indexOf(MODEL_VALUE_SEP);
    if (index <= 0 || index === value.length - 1) return null;
    return {
        provider: value.slice(0, index),
        model: value.slice(index + 1),
    };
}

function loadSavedModelPreference() {
    try {
        const raw = localStorage.getItem(MODEL_PREFERENCE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.provider && parsed?.model) return parsed;
    } catch {
        // ignore invalid preference
    }
    return null;
}

function saveModelPreference(provider, model) {
    try {
        localStorage.setItem(
            MODEL_PREFERENCE_KEY,
            JSON.stringify({ provider, model })
        );
    } catch {
        // ignore storage failures
    }
}

function mapProviders(raw) {
    return (raw ?? []).map((provider) => ({
        name: provider.name,
        displayName: provider.displayName || provider.name,
        models: (provider.chatModels ?? provider.ChatModels ?? []).map((model) => ({
            id: model.name,
            name: model.name,
        })),
    }));
}

async function fetchAiProviders() {
    const response = await fetch(AI_PROVIDERS_API, {
        credentials: "same-origin",
        headers: { Accept: "application/json" },
    });
    if (!response.ok) {
        throw new Error(`Failed to load providers: ${response.status}`);
    }
    return mapProviders(await response.json());
}

function populateModelSelect(select, providers, preferred) {
    select.replaceChildren();

    if (!providers.length) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = promptGeneratorText("noModelsAvailable");
        select.appendChild(option);
        select.disabled = true;
        return false;
    }

    let selectedValue = "";

    providers.forEach((provider) => {
        const group = document.createElement("optgroup");
        group.label = provider.displayName;

        provider.models.forEach((model) => {
            const option = document.createElement("option");
            const value = modelOptionValue(provider.name, model.id);
            option.value = value;
            option.textContent = model.name;
            group.appendChild(option);

            if (
                preferred?.provider === provider.name &&
                preferred?.model === model.id
            ) {
                selectedValue = value;
            }
        });

        select.appendChild(group);
    });

    if (!selectedValue) {
        const firstProvider = providers[0];
        const firstModel = firstProvider?.models[0];
        if (firstProvider && firstModel) {
            selectedValue = modelOptionValue(firstProvider.name, firstModel.id);
        }
    }

    select.value = selectedValue;
    select.disabled = !selectedValue;
    return Boolean(selectedValue);
}

function buildAiChatUrl(siteId, handoff, accessToken) {
    const url = new URL(
        `${trimTrailingSlash(getAdminBase())}/ai-chat/overview`,
        window.location.origin
    );
    url.searchParams.set("SiteId", siteId);
    url.searchParams.set(STARTER_SITE_CREATED_QUERY, "1");
    if (handoff.prompt) url.searchParams.set(STARTER_PROMPT_QUERY, handoff.prompt);
    if (handoff.provider) {
        url.searchParams.set(STARTER_PROVIDER_QUERY, handoff.provider);
    }
    if (handoff.model) url.searchParams.set(STARTER_MODEL_QUERY, handoff.model);
    if (accessToken) url.searchParams.set("access_token", accessToken);
    url.searchParams.set("lang", "en");
    return url.href;
}

function buildLoginUrl() {
    const params = new URLSearchParams();
    params.set("returnurl", "/");
    params.set("lang", "en");
    return `${getAdminBase()}/login?${params.toString()}`;
}

function setPromptGeneratorsBusy(busy) {
    document.querySelectorAll(".prompt-generator").forEach((root) => {
        const button = root.querySelector(".prompt-generator__btn");
        const select = root.querySelector(".prompt-generator__model-select");
        if (!button) return;

        if (!button.dataset.idleLabel) {
            button.dataset.idleLabel = button.textContent?.trim() || "Generate now";
        }
        button.disabled = busy || !select?.value;
        button.setAttribute("aria-busy", busy ? "true" : "false");
        button.textContent = busy
            ? promptGeneratorText("creatingSite")
            : button.dataset.idleLabel;
    });
}

function showPromptGeneratorError(root, message = "") {
    const status = root.querySelector(".prompt-generator__status");
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
}

let sharedStarterSitePromise = null;

async function navigateToGenerate(root) {
    const prompt = readPromptFromGenerator(root);
    const modelSelection = readModelFromGenerator(root);

    if (!prompt) {
        root.querySelector(".prompt-generator__input")?.focus();
        return;
    }

    if (!modelSelection) {
        root.querySelector(".prompt-generator__model-select")?.focus();
        return;
    }

    const handoff = {
        prompt,
        provider: modelSelection.provider,
        model: modelSelection.model,
    };

    saveModelPreference(handoff.provider, handoff.model);

    if (!isKoobooLoggedIn()) {
        window.location.href = buildLoginUrl();
        return;
    }

    if (sharedStarterSitePromise) return sharedStarterSitePromise;

    showPromptGeneratorError(root);
    setPromptGeneratorsBusy(true);
    sharedStarterSitePromise = createStarterSite();

    try {
        const siteId = await sharedStarterSitePromise;
        const accessToken = getCookieValue("jwt_token");
        window.location.href = buildAiChatUrl(siteId, handoff, accessToken);
    } catch (error) {
        console.error("[prompt-generator] create site failed:", error);
        showPromptGeneratorError(
            root,
            promptGeneratorText("createSiteFailed")
        );
        setPromptGeneratorsBusy(false);
    } finally {
        sharedStarterSitePromise = null;
    }
}

let sharedAiProvidersPromise = null;

function getAiProviders() {
    if (!sharedAiProvidersPromise) {
        sharedAiProvidersPromise = fetchAiProviders().catch((error) => {
            sharedAiProvidersPromise = null;
            throw error;
        });
    }
    return sharedAiProvidersPromise;
}

async function initPromptGenerator(root) {
    const select = root.querySelector(".prompt-generator__model-select");
    const button = root.querySelector(".prompt-generator__btn");
    if (!select || !button) return;

    try {
        const providers = await getAiProviders();
        const hasModel = populateModelSelect(
            select,
            providers,
            loadSavedModelPreference()
        );
        button.disabled = !hasModel;

        select.addEventListener("change", () => {
            const parsed = parseModelValue(select.value);
            if (!parsed) return;
            saveModelPreference(parsed.provider, parsed.model);
        });
    } catch (error) {
        console.error("[prompt-generator] load providers failed:", error);
        select.replaceChildren();
        const option = document.createElement("option");
        option.value = "";
        option.textContent = promptGeneratorText("loadModelsFailed");
        select.appendChild(option);
        select.disabled = true;
        button.disabled = true;
    }

    button.addEventListener("click", () => void navigateToGenerate(root));
}

function initPromptGenerators() {
    document.querySelectorAll(".prompt-generator").forEach((root) => {
        void initPromptGenerator(root);
    });
}

function schedulePromptGenerators() {
    const roots = Array.from(document.querySelectorAll(".prompt-generator"));
    if (!roots.length) return;

    let initialized = false;
    const initialize = () => {
        if (initialized) return;
        initialized = true;
        roots.forEach((root) => void initPromptGenerator(root));
    };

    roots.forEach((root) => {
        root.addEventListener("pointerdown", initialize, { once: true, passive: true });
        root.addEventListener("focusin", initialize, { once: true });
    });

    window.setTimeout(initialize, 2500);
}

function initScrollToPromptLinks() {
    document.querySelectorAll("[data-scroll-to-prompt]").forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href")?.slice(1);
            const target = targetId ? document.getElementById(targetId) : null;
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.querySelector(".prompt-generator__input")?.focus();
        });
    });
}

function initPromptGeneratorSpotlights() {
    document
        .querySelectorAll(".home-hero .prompt-generator, .home-start-building .prompt-generator")
        .forEach((card) => {
            const moveGlow = (event) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--hero-glow-x", `${event.clientX - rect.left}px`);
                card.style.setProperty("--hero-glow-y", `${event.clientY - rect.top}px`);
            };

            card.addEventListener("pointerenter", (event) => {
                card.classList.add("is-glow-active");
                moveGlow(event);
            });
            card.addEventListener("pointermove", moveGlow);
            card.addEventListener("pointerleave", () => {
                card.classList.remove("is-glow-active");
            });
        });
}

function initPromptTypingPlaceholder(textarea) {
    if (!textarea) return;

    const root = textarea.closest(".prompt-generator");
    let userEdited = false;
    textarea.setAttribute("autocomplete", "off");
    textarea.addEventListener(
        "input",
        () => {
            userEdited = true;
        },
        { once: true }
    );

    const clearPrefilledValue = () => {
        if (userEdited) return;
        textarea.value = "";
    };

    clearPrefilledValue();
    window.requestAnimationFrame(clearPrefilledValue);
    window.setTimeout(clearPrefilledValue, 120);

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) return;

    const promptDataset = root?.dataset || {};
    const localizedPrompts = [
        promptDataset.placeholderPrompt1,
        promptDataset.placeholderPrompt2,
        promptDataset.placeholderPrompt3,
    ].filter(Boolean);
    const prompts = localizedPrompts.length
        ? localizedPrompts
        : promptGeneratorText("placeholderPrompts");
    const originalPlaceholder = textarea.getAttribute("placeholder") || "";
    const localizedPrefix = promptDataset.placeholderPrefix || promptGeneratorText("placeholderPrefix");
    const prefix = localizedPrefix || (originalPlaceholder.includes("Try this:")
        ? `${originalPlaceholder.split("Try this:")[0]}Try this: `
        : "");

    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let showCursor = true;

    const setPlaceholder = () => {
        const currentPrompt = prompts[promptIndex];
        const visiblePrompt = currentPrompt.slice(0, charIndex);
        textarea.setAttribute(
            "placeholder",
            `${prefix}${visiblePrompt}${showCursor ? "|" : ""}`
        );
    };

    const tick = () => {
        const currentPrompt = prompts[promptIndex];

        if (!isDeleting && charIndex < currentPrompt.length) {
            charIndex += 1;
            showCursor = true;
            setPlaceholder();
            window.setTimeout(tick, 48);
            return;
        }

        if (!isDeleting && charIndex === currentPrompt.length) {
            showCursor = !showCursor;
            setPlaceholder();
            window.setTimeout(() => {
                isDeleting = true;
                showCursor = true;
                tick();
            }, 1400);
            return;
        }

        if (isDeleting && charIndex > 0) {
            charIndex -= 1;
            showCursor = true;
            setPlaceholder();
            window.setTimeout(tick, 24);
            return;
        }

        promptIndex = (promptIndex + 1) % prompts.length;
        isDeleting = false;
        window.setTimeout(tick, 260);
    };

    tick();
}

function initPromptTypingPlaceholders() {
    document
        .querySelectorAll(
            ".home-hero .prompt-generator__input, .home-start-building .prompt-generator__input"
        )
        .forEach((textarea) => initPromptTypingPlaceholder(textarea));
}

function initHomeStartBuildingEntrance() {
    const section = document.querySelector(".home-start-building");
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
        section.classList.add("is-in-view");
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry?.isIntersecting) return;
            section.classList.add("is-in-view");
            observer.disconnect();
        },
        { threshold: 0.28 }
    );

    observer.observe(section);
}

function initHomePromptEffects() {
    initPromptGeneratorSpotlights();
    initHomeStartBuildingEntrance();
}

function initPromptGeneratorFeatures() {
    schedulePromptGenerators();
    initScrollToPromptLinks();
    initHomePromptEffects();
}

function initTemplateGallery() {
    document.querySelectorAll("[data-template-gallery]").forEach((gallery) => {
        const filters = Array.from(gallery.querySelectorAll("[data-template-filter]"));
        const cards = Array.from(gallery.querySelectorAll("[data-template-card]"));
        const setFilter = (filter) => {
            filters.forEach((button) => {
                const isActive = button.dataset.templateFilter === filter;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            cards.forEach((card) => {
                const categories = (card.dataset.templateCategories || "").split(/\s+/);
                card.hidden = filter !== "all" && !categories.includes(filter);
            });
        };

        filters.forEach((button) => {
            button.addEventListener("click", () => setFilter(button.dataset.templateFilter));
        });

        const defaultFilter = gallery.dataset.templateDefaultFilter || filters[0]?.dataset.templateFilter;
        if (defaultFilter) setFilter(defaultFilter);
    });

    document.querySelectorAll("[data-template-admin-path]").forEach((link) => {
        const path = link.dataset.templateAdminPath;
        if (!path) return;
        link.href = `${trimTrailingSlash(getAdminBase())}${path}`;
    });
}

function initDownloadPage() {
    const copyText = async (value) => {
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(value);
                return;
            } catch {
                // Fall back for non-secure or clipboard-restricted contexts.
            }
        }

        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Copy command is unavailable");
    };

    document.querySelectorAll("[data-download-page]").forEach((page) => {
        page.querySelectorAll("[data-copy-command]").forEach((button) => {
            let resetTimer;

            button.addEventListener("click", async () => {
                const code = button.closest(".download-command")?.querySelector("code");
                const value = code?.innerText.trim();
                if (!value) return;

                try {
                    await copyText(value);
                    window.clearTimeout(resetTimer);
                    button.classList.add("is-copied");
                    button.setAttribute("aria-label", "Copied");
                    resetTimer = window.setTimeout(() => {
                        button.classList.remove("is-copied");
                        button.setAttribute("aria-label", "Copy Linux install command");
                    }, 2000);
                } catch (error) {
                    console.error("[download] copy command failed:", error);
                }
            });
        });
    });
}

function initSitePageFeatures() {
    initTemplateGallery();
    initDownloadPage();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPromptGeneratorFeatures);
    document.addEventListener("DOMContentLoaded", initSitePageFeatures);
} else {
    initPromptGeneratorFeatures();
    initSitePageFeatures();
}
