import BlogDetailLayout from "@/components/Layouts/BlogDetailLayout";
import { blogService } from "@/services/blogService";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // cari data berdasarkan slug
    const post = await blogService.getBySlug(slug)

    return (
        <BlogDetailLayout post={post} />
    );
}
