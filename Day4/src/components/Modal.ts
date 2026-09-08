interface ModalProps {
    title: string;
    content: HTMLElement;
    onClose?: () => void;
}

export function Modal({
    title,
    content,
    onClose
}: ModalProps): HTMLDivElement {
    
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

    function closeModal(): void {
        overlay.remove();

        if (onClose) {
            onClose();
        }

        document.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            closeModal();
        }
    }

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", (event: MouseEvent) => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", handleKeyDown);

    modal.append(closeButton, heading, content);
    overlay.append(modal);

    return overlay;
}
