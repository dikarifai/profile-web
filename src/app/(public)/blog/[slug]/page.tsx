import Button from "@/components/Elements/Button";
import BlogDetailLayout from "@/components/Layouts/BlogDetailLayout";
import { posts } from "@/dummy/posts";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // cari data berdasarkan slug
    const post = posts.find((p) => p.slug === slug);

    if (!post) return notFound();

    return (
        <BlogDetailLayout post={post} />
    );
}
