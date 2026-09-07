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
        const rotationInterval = Number(root.dataset.businessAccordionInterval) || 6000;
        let isRootVisible = !("IntersectionObserver" in window);
        let isPageVisible = !document.hidden;
        let isPointerInside = false;
        let isFocusWithin = false;
        let rotationTimer = null;

        const createCarouselState = (carousel) => {
            const slides = Array.from(carousel.querySelectorAll("[data-business-slide]"));
            const controls = Array.from(carousel.querySelectorAll("[data-business-slide-control]"));
            const interval = Number(carousel.dataset.businessCarouselInterval) || 4500;
            let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
            let timer = null;
            let transitionTimer = null;

            const updateControls = () => {
                controls.forEach((control, controlIndex) => {
                    const isActive = controlIndex === activeIndex;

                    control.classList.toggle("is-active", isActive);
                    control.setAttribute("aria-current", String(isActive));
                });
            };

            const setSlide = (index, direction = 1, immediate = false) => {
                if (!slides.length) return;

                const nextIndex = (index + slides.length) % slides.length;

                if (!immediate && nextIndex === activeIndex) return;

                window.clearTimeout(transitionTimer);
                slides.forEach((slide) => slide.classList.remove("is-leaving"));

                if (immediate || reducedMotion) {
                    activeIndex = nextIndex;

                    slides.forEach((slide, slideIndex) => {
                        slide.classList.toggle("is-active", slideIndex === activeIndex);
                        slide.style.removeProperty("--home-business-slide-enter-x");
                        slide.style.removeProperty("--home-business-slide-exit-x");
                    });

                    updateControls();
                    return;
                }

                const previousSlide = slides[activeIndex];
                const nextSlide = slides[nextIndex];
                const travelDirection = direction >= 0 ? 1 : -1;

                nextSlide.classList.remove("is-active");
                nextSlide.style.setProperty("--home-business-slide-enter-x", `${travelDirection * 5}%`);
                previousSlide.style.setProperty("--home-business-slide-exit-x", `${travelDirection * -4}%`);

                // Commit the incoming slide's starting position before transitioning it into view.
                void nextSlide.offsetWidth;

                previousSlide.classList.add("is-leaving");
                previousSlide.classList.remove("is-active");
                nextSlide.classList.add("is-active");
                activeIndex = nextIndex;
                updateControls();

                transitionTimer = window.setTimeout(() => {
                    previousSlide.classList.remove("is-leaving");
                    previousSlide.style.removeProperty("--home-business-slide-exit-x");
                    nextSlide.style.removeProperty("--home-business-slide-enter-x");
                }, 950);
            };

            const stop = () => {
                if (!timer) return;

                window.clearInterval(timer);
                timer = null;
            };

            const start = () => {
                stop();

                if (
                    reducedMotion ||
                    slides.length < 2 ||
                    !carousel.classList.contains("is-active") ||
                    !isRootVisible ||
                    !isPageVisible
                ) return;

                timer = window.setInterval(() => {
                    setSlide(activeIndex + 1, 1);
                }, interval);
            };

            controls.forEach((control, controlIndex) => {
                control.addEventListener("click", () => {
                    setSlide(controlIndex, controlIndex > activeIndex ? 1 : -1);
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

            setSlide(activeIndex, 1, true);

            return { start, stop };
        };

        carousels.forEach((carousel) => {
            carouselState.set(carousel, createCarouselState(carousel));
        });

        const updateCarouselPlayback = () => {
            carousels.forEach((carousel) => {
                const state = carouselState.get(carousel);

                if (isRootVisible && isPageVisible && carousel.classList.contains("is-active")) {
                    state?.start();
                } else {
                    state?.stop();
                }
            });
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    isRootVisible = entry.isIntersecting;
                    updatePlayback();
                },
                { threshold: 0.2 }
            );

            observer.observe(root);
        }

        document.addEventListener("visibilitychange", () => {
            isPageVisible = !document.hidden;
            updatePlayback();
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

        const stopRotation = () => {
            if (!rotationTimer) return;

            window.clearInterval(rotationTimer);
            rotationTimer = null;
        };

        const startRotation = () => {
            stopRotation();

            if (
                reducedMotion ||
                items.length < 2 ||
                !isRootVisible ||
                !isPageVisible ||
                isPointerInside ||
                isFocusWithin
            ) return;

            rotationTimer = window.setInterval(() => {
                const activeIndex = Math.max(
                    0,
                    items.findIndex((item) => item.classList.contains("is-active"))
                );
                const nextItem = items[(activeIndex + 1) % items.length];

                if (nextItem) {
                    setActive(nextItem.dataset.businessItem);
                }
            }, rotationInterval);
        };

        function updatePlayback() {
            updateCarouselPlayback();
            startRotation();
        }

        items.forEach((item) => {
            const trigger = item.querySelector(".home-business__trigger");

            trigger?.addEventListener("click", () => {
                setActive(item.dataset.businessItem);
                startRotation();
            });
        });

        root.addEventListener("mouseenter", () => {
            isPointerInside = true;
            stopRotation();
        });
        root.addEventListener("mouseleave", () => {
            isPointerInside = false;
            startRotation();
        });
        root.addEventListener("focusin", () => {
            isFocusWithin = true;
            stopRotation();
        });
        root.addEventListener("focusout", (event) => {
            if (!root.contains(event.relatedTarget)) {
                isFocusWithin = false;
                startRotation();
            }
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

        const activeItem = items[0];

        if (activeItem) {
            setActive(activeItem.dataset.businessItem);
        }

        updatePlayback();
    });
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
        initHomeBusinessAccordion();
        scheduleSiteScrollReveal();
    });
} else {
    initSiteHeaderScrollState();
    initHomeBusinessAccordion();
    scheduleSiteScrollReveal();
}

const ADMIN_BASE = "/_Admin/";
const AI_PROVIDERS_API = "/api/ai-models";
const STARTER_PROMPT_QUERY = "prompt";
const STARTER_PROVIDER_QUERY = "provider";
const STARTER_MODEL_QUERY = "model";
const MODEL_PREFERENCE_KEY = "kooboo_ai_chat_model_preference";
const MODEL_VALUE_SEP = "|";

const PROMPT_GENERATOR_STRINGS = {
    noModelsAvailable: "No models available",
    loadModelsFailed: "Failed to load models",
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

function buildAiChatStartUrl(handoff, accessToken) {
    const url = new URL(
        `${trimTrailingSlash(getAdminBase())}/ai-chat/start`,
        window.location.origin
    );
    if (handoff.prompt) url.searchParams.set(STARTER_PROMPT_QUERY, handoff.prompt);
    if (handoff.provider) {
        url.searchParams.set(STARTER_PROVIDER_QUERY, handoff.provider);
    }
    if (handoff.model) url.searchParams.set(STARTER_MODEL_QUERY, handoff.model);
    if (accessToken) url.searchParams.set("access_token", accessToken);
    url.searchParams.set("lang", "en");
    return url;
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

    const accessToken = getCookieValue("jwt_token");
    const startUrl = buildAiChatStartUrl(handoff, accessToken);
    window.location.href = startUrl.href;
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

    button.addEventListener("click", () => navigateToGenerate(root));
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
        if (userEdited || textarea.value) return;

        if (document.hidden) {
            window.setTimeout(tick, 500);
            return;
        }

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
    const startTyping = () => {
        document
            .querySelectorAll(".home-hero .prompt-generator__input")
            .forEach((textarea) => initPromptTypingPlaceholder(textarea));
    };

    const scheduleTyping = () => window.setTimeout(startTyping, 700);

    if (document.readyState === "complete") {
        scheduleTyping();
    } else {
        window.addEventListener("load", scheduleTyping, { once: true });
    }
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
    initPromptTypingPlaceholders();
    initHomeStartBuildingEntrance();
}

function initPromptGeneratorFeatures() {
    schedulePromptGenerators();
    initScrollToPromptLinks();
    initHomePromptEffects();
}

function initTemplateGallery() {
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
