import Button from "@/components/Elements/Button";
import { posts } from "@/dummy/posts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // cari data berdasarkan slug
    const post = posts.find((p) => p.slug === slug);

    if (!post) return notFound();

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            {/* Cover */}
            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-8">
                <Image src={post.cover} alt={post.title} fill className="object-cover" />
            </div>


            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>


            {/* Meta */}
            <div className="text-sm text-neutral-500 mb-8">
                {post.date}
            </div>


            {/* Content */}
            <article
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex items-center justify-between h-12 mt-8">
                <div className="flex text-start"><Button className="flex"><ChevronLeft />  Prev</Button></div>
                <div className="border-l border-gray-300 h-full mx-2"></div>
                <div className="flex"><Button className="flex">Next<ChevronRight /></Button> </div>
            </div>

        </main>
    );
}
