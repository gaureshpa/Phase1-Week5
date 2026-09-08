interface ButtonProps {
    text: string;
    onClick?: (event: MouseEvent) => void;
    type?: "button" | "submit" | "reset";
}
export declare function Button({ text, onClick, type }: ButtonProps): HTMLButtonElement;
export {};
