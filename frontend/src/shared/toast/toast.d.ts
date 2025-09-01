export type Toast = {
    id: string
    title: string
    description?: string
    type?: "default" | "success" | "error"
}