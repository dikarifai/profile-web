import BlogLayout from "@/components/Layouts/BlogLayout"
import { blogService } from "@/services/blogService"

type BlogPageProps = {
    searchParams?: Promise<{
        page?: string
    }>
}


const BlogPage: React.FC<BlogPageProps> = async ({ searchParams }) => {

    const page = Number((await searchParams)?.page ?? 1)

    const blog = await blogService.get({
        status: "PUBLISHED",
        limit: 9,
        page
    })


    return (
        <BlogLayout res={blog} />
    )
}

export default BlogPage