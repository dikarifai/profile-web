import BlogDetailCreate from "@/components/Layouts/BlogDetailCreate"
import { FormField } from "@/types/form"

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

const BlogCreatePage: React.FC = () => {
    return <BlogDetailCreate type="PORTFOLIO" fields={fields} mode="create" />
}

export default BlogCreatePage