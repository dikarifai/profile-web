import BlogLayout from "@/components/Layouts/BlogLayout"
import { blogService } from "@/services/blogService"




const BlogPage: React.FC = async () => {
    const blog = await blogService.get({ status: "PUBLISHED", limit: 6 })


    return (
        <BlogLayout res={blog} />
    )
}

export default BlogPage