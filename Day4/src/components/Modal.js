export function Modal({ title, content, onClose }) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const modal = document.createElement("div");
    modal.className = "modal";
    const heading = document.createElement("h2");
    heading.className = "modal-title";
    heading.textContent = title;
    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.type = "button";
    closeButton.textContent = "x";
    closeButton.setAttribute("aria-label", "Close modal");
    function closeModal() {
        overlay.remove();
        if (onClose) {
            onClose();
        }
        document.removeEventListener("keydown", handleKeyDown);
    }
    function handleKeyDown(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }
    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });
    document.addEventListener("keydown", handleKeyDown);
    modal.append(closeButton, heading, content);
    overlay.append(modal);
    return overlay;
}
