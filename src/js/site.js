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
