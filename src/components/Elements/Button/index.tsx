import { cn } from "@/libs/utils"
import { ButtonPorps } from "./Button.types"

const Button: React.FC<ButtonPorps> = ({ children, className, ...props }) => {
    return <button {...props} className={cn(`
        bg-primary text-white px-5 py-3 rounded-xl font-medium
        shadow-[4px_6px_0_#1c3f7c]
        active:shadow-[2px_2px_0_var(--accent)]
        active:translate-y-[4px]
        active:translate-x-[2px]
        transition-all duration-100
        select-none cursor-pointer
        hover:bg-brand-highlight
      `, className)}>{children}</button>

}

export default Button