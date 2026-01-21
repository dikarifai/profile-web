import BlogDetailCreate from "@/components/Layouts/BlogDetailCreate"
import BlogFormLayout from "@/components/Layouts/FormLayout"
import { blogService } from "@/services/blogService"
import { FormField } from "@/types/form"

const PortfolioUpdatePage: React.FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
    const { slug } = await params

    const post = await blogService.getBySlug({ slug, credentials: "include", type: "PORTFOLIO" })

    const fields: FormField[] = [
        {
            type: "text",
            name: "title",
            className: "text-4xl font-bold text-center",
        },
        {
            type: "select",
            name: "status",
            options: [
                { label: "Draft", value: "DRAFT" },
                { label: "Published", value: "PUBLISHED" },
            ],
        },
    ]


    return (
        <BlogFormLayout title="Update Blog" breadcrumbLabel="Edit" description="Silahkan update portfoliomumu">
            <BlogDetailCreate
                fields={fields}
                defaultValue={post.data}
                type="PORTFOLIO"
                mode="edit"
            />
        </BlogFormLayout>
    )
}

export default PortfolioUpdatePage