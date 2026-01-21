import ExperienceDetailCreate from "@/components/Layouts/ExperienceDetailCreate"
import FormLayout from "@/components/Layouts/FormLayout"
import { experienceService } from "@/services/experienceService"

const ExperienceUpdatePage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const { id } = await params

    const experience = await experienceService.getById(id)

    return (
        <FormLayout title="Update Experience" breadcrumbLabel="Edit" >

            <ExperienceDetailCreate mode="edit" defaultValue={experience.data} />
        </FormLayout>
    )
}

export default ExperienceUpdatePage