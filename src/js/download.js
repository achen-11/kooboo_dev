// @k-url /download.js

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

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDownloadPage);
} else {
    initDownloadPage();
}
