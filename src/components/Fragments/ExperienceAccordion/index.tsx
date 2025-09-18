import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ExperienceAccordionProps {
    items: Experience[]
}

interface Experience {
    id: string
    company: string
    role: string
    period: string
    description: string
}

const ExperienceAccordion: React.FC<ExperienceAccordionProps> = ({ items }) => {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
        >
            {items.map((exp) => (
                <AccordionItem key={exp.id} value={exp.id}>
                    <AccordionTrigger className="cursor-pointer">
                        <div className="flex flex-col text-left">
                            <span className="font-semibold text-2xl">{exp.role}</span>
                            <span className="text-sm text-muted-foreground">
                                {exp.company} • {exp.period}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {exp.description}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion >
    )
}

export default ExperienceAccordion