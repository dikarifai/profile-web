import BlogAdminLayout from "@/components/Layouts/BlogAdminLayout"

const BlogAdminPage: React.FC = async () => {
    return <BlogAdminLayout type="BLOG" endpoint="/blogs" />
}

export default BlogAdminPage