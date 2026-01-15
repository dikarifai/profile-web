import BlogLayout from "@/components/Layouts/BlogLayout"
import { blogService } from "@/services/blogService"

type BlogPageProps = {
    searchParams?: Promise<{
        page?: string
    }>
}


const PortfolioPage: React.FC<BlogPageProps> = async ({ searchParams }) => {

    const page = Number((await searchParams)?.page ?? 1)

    const portfolio = await blogService.get({
        status: "PUBLISHED",
        limit: 9,
        page,
        type: "PORTFOLIO"
    })


    return (
        <BlogLayout res={portfolio} />
    )
}

export default PortfolioPage