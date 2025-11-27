import BlogLayout from "@/components/Layouts/BlogLayout"
import { BlogResponse } from "@/dtos/blog.dto"
import { fetcher } from "@/lib/fetcher"
import { ApiResponse } from "@/types/api"



const BlogPage: React.FC = async () => {
    const blog = await fetcher<ApiResponse<BlogResponse[]>>("http://localhost:3000/api/blogs")


    return (
        <BlogLayout res={blog} />
    )
}

export default BlogPage