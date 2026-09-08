interface ButtonProps {
    text: string;
    onClick?: (event: MouseEvent) => void;
    type?: "button" | "submit" | "reset";
}

export function Button({
    text,
    onClick,
    type = "button"
}: ButtonProps): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = type;
    button.textContent = text;

    if (onClick) {
        button.addEventListener("click", onClick);
    }

    return button;
}
