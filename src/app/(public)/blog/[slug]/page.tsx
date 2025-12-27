import Button from "@/components/Elements/Button";
import BlogDetailLayout from "@/components/Layouts/BlogDetailLayout";
import { BlogResponse } from "@/dtos/blog.dto";
import { posts } from "@/dummy/posts";
import { fetcher } from "@/lib/fetcher";
import { ApiResponseWithNavigation } from "@/types/api";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // cari data berdasarkan slug
    const post = await fetcher<ApiResponseWithNavigation<BlogResponse>>(`http://localhost:3000/api/blogs/${slug}`)

    if (!post) return notFound();

    return (
        <BlogDetailLayout post={post} />
    );
}
