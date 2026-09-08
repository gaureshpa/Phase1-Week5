interface ModalProps {
    title: string;
    content: HTMLElement;
    onClose?: () => void;
}
export declare function Modal({ title, content, onClose }: ModalProps): HTMLDivElement;
export {};
