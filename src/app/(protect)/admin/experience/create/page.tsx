import CreatePageLayout from "@/components/Layouts/CreatePageLayout"
import ExperienceDetailCreate from "@/components/Layouts/ExperienceDetailCreate"

const PageDetailCreate: React.FC = () => {
    return <CreatePageLayout
        title="Create Experience"
        description="Buat experience baru"
        breadcrumbs={[
            { label: "Experience", href: "/experience" },
            { label: "Create" }
        ]}
    >
        <ExperienceDetailCreate />
    </CreatePageLayout>
}

export default PageDetailCreate