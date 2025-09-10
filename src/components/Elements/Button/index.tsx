import { cn } from "@/libs/utils"
import { ButtonPorps } from "./Button.types"

const Button: React.FC<ButtonPorps> = ({ children, className, ...props }) => {
    return <button {...props} className={cn("bg-brand-text text-brand-bg py-2 px-4  rounded-xl", className)}>{children}</button>

}

export default Button