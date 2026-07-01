document.documentElement.classList.add("site-ready");

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
    document.addEventListener("DOMContentLoaded", initHomeBusinessAccordion);
} else {
    initHomeBusinessAccordion();
}

const ADMIN_BASE = "/_Admin/";
const AI_PROVIDERS_API = "/_api/v2/ai/providers";
const STARTER_PROMPT_QUERY = "prompt";
const STARTER_PROVIDER_QUERY = "provider";
const STARTER_MODEL_QUERY = "model";
const STARTER_HANDOFF_SESSION_KEY = "kooboo_starter_handoff";
const MODEL_PREFERENCE_KEY = "kooboo_ai_chat_model_preference";
const MODEL_VALUE_SEP = "|";

const PROMPT_GENERATOR_STRINGS = {
    zh: {
        noModelsAvailable: "暂无可用模型",
        loadModelsFailed: "模型加载失败",
    },
    en: {
        noModelsAvailable: "No models available",
        loadModelsFailed: "Failed to load models",
    },
};

function detectPromptGeneratorLang(root) {
    const sample = root.querySelector(".prompt-generator__model-label")?.textContent || "";
    return /[\u4e00-\u9fa5]/.test(sample) ? "zh" : "en";
}

function promptGeneratorText(lang, key) {
    return (PROMPT_GENERATOR_STRINGS[lang] || PROMPT_GENERATOR_STRINGS.en)[key];
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

function populateModelSelect(select, providers, preferred, lang) {
    select.replaceChildren();

    if (!providers.length) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = promptGeneratorText(lang, "noModelsAvailable");
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

function buildAdminHandoffUrl(handoff) {
    const params = new URLSearchParams();
    if (handoff.prompt) params.set(STARTER_PROMPT_QUERY, handoff.prompt);
    if (handoff.provider) params.set(STARTER_PROVIDER_QUERY, handoff.provider);
    if (handoff.model) params.set(STARTER_MODEL_QUERY, handoff.model);
    const query = params.toString();
    const adminBase = trimTrailingSlash(getAdminBase());
    return query ? `${adminBase}/?${query}` : `${adminBase}`;
}

function buildLoginUrl(handoff) {
    const returnUrl = buildAdminHandoffUrl(handoff);
    const params = new URLSearchParams();
    if (handoff.prompt) params.set(STARTER_PROMPT_QUERY, handoff.prompt);
    if (handoff.provider) params.set(STARTER_PROVIDER_QUERY, handoff.provider);
    if (handoff.model) params.set(STARTER_MODEL_QUERY, handoff.model);
    params.set("returnurl", returnUrl);
    return `${getAdminBase()}/login?${params.toString()}`;
}

function persistStarterHandoff(handoff) {
    try {
        sessionStorage.setItem(STARTER_HANDOFF_SESSION_KEY, JSON.stringify(handoff));
    } catch {
        // ignore storage failures
    }
}

function navigateToGenerate(root) {
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
    persistStarterHandoff(handoff);
    window.location.href = isKoobooLoggedIn()
        ? buildAdminHandoffUrl(handoff)
        : buildLoginUrl(handoff);
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

    const lang = detectPromptGeneratorLang(root);

    try {
        const providers = await getAiProviders();
        const hasModel = populateModelSelect(
            select,
            providers,
            loadSavedModelPreference(),
            lang
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
        option.textContent = promptGeneratorText(lang, "loadModelsFailed");
        select.appendChild(option);
        select.disabled = true;
        button.disabled = true;
    }

    button.addEventListener("click", () => navigateToGenerate(root));
}

function initPromptGenerators() {
    document.querySelectorAll(".prompt-generator").forEach((root) => {
        void initPromptGenerator(root);
    });
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

function initPromptGeneratorFeatures() {
    initPromptGenerators();
    initScrollToPromptLinks();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPromptGeneratorFeatures);
} else {
    initPromptGeneratorFeatures();
}
