import { cn } from "@/libs/utils"
import { HTMLAttributes } from "react"

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    children?: React.ReactNode
    title?: React.ReactNode,
    description?: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ children, description, title, className, ...props }) => {
    return (
        <section {...props} className="min-h-96 flex flex-col gap-8">
            <div>
                <h2 className="text-4xl font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <div className={cn(className)}>
                {children}
            </div>
        </section>)
}

export default Section