import BlogDetailCreate from "@/components/Layouts/BlogDetailCreate"
import BlogDetailLayout from "@/components/Layouts/BlogDetailLayout"
import { withAuth } from "@/lib/withAuth"

const BlogCreatePage: React.FC = () => {
    return <BlogDetailCreate mode="create" />
}

export default withAuth(BlogCreatePage)