import Button from "@/components/Elements/Button"
import BlogCard from "@/components/Fragments/BlogCard"
import ContentSection from "@/components/Fragments/ContentSection"
import { blogService } from "@/services/blogService"
import Link from "next/link"



const BlogSection: React.FC = async () => {
    const blog = await blogService.get({ status: "PUBLISHED", limit: 3 })


    return (
        <ContentSection title="Blog" description="Menulis blog kalau lagi pengen" href="/blog">
            <div className="grid md:grid-cols-3  gap-x-4 place-items-center">
                {
                    blog.data.map((item, index) => (
                        <BlogCard key={index} description={item.content || ""} title={item.title} date={item.createdAt.toLocaleString()} href={`/blog/${item.slug}`} imageUrl={item.image || ""} />
                    ))
                }
            </div>
        </ContentSection>
    )
}

export default BlogSection