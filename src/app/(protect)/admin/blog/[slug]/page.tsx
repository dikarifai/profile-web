import BlogDetailCreate from "@/components/Layouts/BlogDetailCreate"
import { blogService } from "@/services/blogService"

const BlogUpdatePage: React.FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
    const { slug } = await params

    const post = await blogService.getBySlug(slug)

    return <main>
        <header className="px-8 py-16">
            <h1 className="text-2xl font-bold">Update Blog</h1>
        </header>
        <BlogDetailCreate defaultValue={post.data} mode="edit" />
    </main>
}

export default BlogUpdatePage