import BlogCard from "@/components/Fragments/BlogCard"
import ContentSection from "@/components/Fragments/ContentSection"
import { blogService } from "@/services/blogService"

const PortfolioSection: React.FC = async () => {
    const blog = await blogService.get({ status: "PUBLISHED", limit: 3, type: "PORTFOLIO" })


    return (
        <ContentSection title="Portfolio" description="Kumpulan Portfolio" href="/portfolio">
            <div className="grid md:grid-cols-3  gap-x-4 place-items-center w-full">
                {
                    blog.data.map((item, index) => (
                        <BlogCard key={index} description={item.content || ""} title={item.title} date={item.createdAt} href={`/blog/${item.slug}`} imageUrl={item.image || ""} />
                    ))
                }
            </div>
        </ContentSection>
    )
}

export default PortfolioSection