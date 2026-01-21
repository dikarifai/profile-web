import BlogDetailCreate from "@/components/Layouts/BlogDetailCreate"
import FormLayout from "@/components/Layouts/FormLayout"
import { blogService } from "@/services/blogService"
import { FormField } from "@/types/form"
import Link from "next/link"

const BlogUpdatePage: React.FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
    const { slug } = await params

    const post = await blogService.getBySlug({ slug, credentials: "include", type: "BLOG" })

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
        <FormLayout title="Update Blog" breadcrumbLabel="Edit" description="Silahkan update blogmu">
            <BlogDetailCreate
                fields={fields}
                defaultValue={post.data}
                type="BLOG"
                mode="edit"
            />
        </FormLayout>
    )
}

export default BlogUpdatePage