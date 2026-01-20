import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExperienceResponse } from "@/dtos/experience.dto"
import { formatDate } from "@/lib/formatter"
import { ApiResponse } from "@/types/api"

interface ExperienceAccordionProps {
    items: ApiResponse<ExperienceResponse[]>
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
            {items.data.map((exp) => (
                <AccordionItem key={exp.id} value={exp.id}>
                    <AccordionTrigger className="cursor-pointer">
                        <div className="flex flex-col text-left">
                            <span className="font-semibold text-2xl">{exp.title}</span>
                            <span className="text-sm text-muted-foreground">
                                {exp.company} • {formatDate(exp.startDate)} - {!exp.endDate && exp.startDate ? "Now" : exp.endDate && formatDate(exp.endDate)}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent >
                        <div className="prose prose-lg prose-neutral" dangerouslySetInnerHTML={{ __html: exp.description || "" }}></div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion >
    )
}

export default ExperienceAccordion