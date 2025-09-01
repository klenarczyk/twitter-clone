"use client"
import React, {createContext, ReactNode, useState} from "react"
import {Toast} from "@/shared/toast/toast";
import {AnimatePresence, motion} from "framer-motion";
import Success from "@/shared/ui/icons/Success";
import {X} from "lucide-react";

type ToastContextType = {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, "id">) => void
    removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({children}: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = (toast: Omit<Toast, "id">) => {
        const id = crypto.randomUUID()
        setToasts((prev) => [...prev, {id, ...toast}])
        setTimeout(() => removeToast(id), 2000)
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{toasts, addToast, removeToast}}>
            {children}

            <div
                className="fixed top-0 right-0 z-[100] flex max-h-screen gap-2 w-full flex-col-reverse p-4 md:max-w-[420px]">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{opacity: 0, x: 100, y: 0}}
                            animate={{opacity: 1, x: 0, y: 0}}
                            exit={{opacity: 0, x: 100, y: 0, transition: {duration: 0.1}}}
                            transition={{
                                x: {type: "spring", stiffness: 400, damping: 25},
                                y: {type: "spring", stiffness: 400, damping: 25},
                                opacity: {duration: 0.15},
                                layout: {type: "spring", stiffness: 300, damping: 25},
                            }}
                            layout
                            className={`pointer-events-auto relative flex w-full items-center justify-start overflow-hidden rounded-lg border px-4 py-6 shadow-lg ${
                                t.type === "error"
                                    ? "border-destructive bg-destructive text-destructive-foreground"
                                    : t.type === "success"
                                        ? "bg-green-500"
                                        : "border bg-[#111111] text-foreground"
                            }`}
                        >
                            <div className="flex items-center justify-center size-5 rounded-full bg-green-500"
                                 style={{boxShadow: "0 0 20px 1px rgba(72, 187, 120, 0.75)"}}>
                                <Success className="text-black size-2/3"/>
                            </div>


                            <div className="flex-1 px-4">
                                {/*<span className="font-bold text-white">{t.title}</span>*/}
                                {t.description && <p className="text-sm text-white">{t.description}</p>}
                            </div>

                            <X className="text-gray-300 size-5 cursor-pointer" onClick={() => removeToast(t.id)}/>

                            {/* Timer */}
                            {/*<motion.div*/}
                            {/*    className="absolute bottom-0 left-0 h-0.5 bg-white/50"*/}
                            {/*    initial={{width: "100%"}}*/}
                            {/*    animate={{width: 0}}*/}
                            {/*    transition={{duration: 2, ease: "linear"}}*/}
                            {/*/>*/}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
