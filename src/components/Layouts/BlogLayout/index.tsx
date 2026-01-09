import BlogCard from "../../Fragments/BlogCard"
import Section from "../../Fragments/Section"
import { BlogResponse } from "@/dtos/blog.dto"
import { ApiResponse } from "@/types/api"
import EmptyBlog from "../../Fragments/EmptyBlog"
import PaginationBlog from "./PaginationBlog"

interface BlogLayoutProps {
    res: ApiResponse<BlogResponse[]>
}


const BlogLayout: React.FC<BlogLayoutProps> = ({ res }) => {
    const { data, pagination } = res
    const { page, limit, total, totalPages } = pagination

    return <Section title="Kumpulan Blog" description="Blog yang ditulis pada saat senggang saja">
        {/* Kategori */}
        {/* <div><span></span></div> */}
        {
            data.length < 1 ?
                // <>test</>
                <EmptyBlog />
                :
                <>
                    <div className="grid grid-cols-3 gap-y-4">
                        {
                            data?.map((item, index) => <BlogCard description={item.content || ""}
                                title={item.title}
                                date={item.createdAt.toLocaleString()}
                                href={item.slug ? `/blog/${item.slug}` : ""}
                                imageUrl={item.image || ""}
                                key={index} />
                            )
                        }
                    </div>
                    <PaginationBlog currentPage={page} totalPages={totalPages} />
                </>
        }
    </Section>
}

export default BlogLayout