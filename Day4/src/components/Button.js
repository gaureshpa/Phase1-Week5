export function Button({ text, onClick, type = "button" }) {
    const button = document.createElement("button");
    button.type = type;
    button.textContent = text;
    if (onClick) {
        button.addEventListener("click", onClick);
    }
    return button;
}
