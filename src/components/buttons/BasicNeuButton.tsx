'use client'

import { FC, ReactNode } from "react"
import { cn } from "@/utils/helper"

interface CustomButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
}

const BasicNeuButton: FC<CustomButtonProps> = ({ children, className, onClick }) => {
    return <button
        onClick={onClick}
        className={cn(
            "flex justify-center items-center min-h-12 sm:min-h-16 min-w-12 sm:min-w-16 text-4xl shadow-[var(--shadow-default)] p-2 sm:p-4 hover:text-purple-500 active:text-purple-500 transition-all duration-300 active:shadow-[var(--shadow-set)]",
            "rounded-xl",
            className
        )}
    >
        {children}
    </button>
}

export default BasicNeuButton