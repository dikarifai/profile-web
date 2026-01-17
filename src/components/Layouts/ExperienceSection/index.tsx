import ExperienceAccordion from "@/components/Fragments/ExperienceAccordion"
import Section from "@/components/Fragments/Section"
import { experienceService } from "@/services/experienceService"




const ExperienceSection: React.FC = async () => {
    const experiences = await experienceService.get()

    return <Section title="Experience">
        <ExperienceAccordion items={experiences} />
    </Section>
}

export default ExperienceSection