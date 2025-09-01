export type ToastType = "default" | "success" | "error" | "info";

export type Toast = {
    id: string;
    text: string;
    type?: ToastType;
}