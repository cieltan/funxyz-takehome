'use client'

import { FC, ReactNode } from "react"
import { cn } from "@/utils/helper"

interface CustomButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

const FilledButton: FC<CustomButtonProps> = ({ children, className, onClick, disabled }) => {
    return <button className={cn(
        "bg-primary p-4 text-greyLight-900 rounded-4xl transition-all duration-300",
        "shadow-[inset_.2rem_.2rem_1rem_var(--primary-light),inset_-.2rem_-.2rem_1rem_var(--primary-dark),var(--shadow-default)]",
        "hover:text-white active:text-white",
        "active:shadow-[inset_.2rem_.2rem_1rem_var(--primary-dark),inset_-.2rem_-.2rem_1rem_var(--primary-light)]",
        className,
        disabled && "opacity-50 cursor-not-allowed "
    )} onClick={onClick}>
        {children}
    </button>
}

export default FilledButton