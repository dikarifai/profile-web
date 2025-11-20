import Button from "@/components/Elements/Button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Image from "next/image"

interface BlogDetailLayoutProps {
    post: {
        slug: string;
        title: string;
        date: string;
        views: number;
        cover: string;
        content: string;
    }
}


const BlogDetailLayout: React.FC<BlogDetailLayoutProps> = ({ post }) => {
    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            {/* Meta */}
            <div className="text-sm text-neutral-500 mb-2 flex justify-center gap-4">
                <p>{post.date}</p> <p>|</p> <p className="flex flex-row gap-2"><Eye />{post.views}</p>
            </div>

            {/* Cover */}
            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-8">
                <Image src={post.cover} alt={post.title} fill className="object-cover" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-center">{post.title}</h1>


            {/* Content */}
            <article
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="grid grid-cols-7 items-center justify-between h-16 mt-8 border-t p-2">
                <div className="flex text-start items-center gap-2 col-span-3">
                    <Button className="flex"><ChevronLeft />  Prev</Button>
                    <p className="text-xl">
                        lorem ipsum dolor
                    </p>
                </div>
                <div className="border-l border-gray-300 h-full mx-2 justify-self-center"></div>
                <div className="flex justify-self-end gap-2 col-span-3">
                    <p className="text-xl text-right">sit amet consectetur adipisicing elit.</p>
                    <Button className="flex">Next<ChevronRight /></Button>
                </div>
            </div>

        </main>
    )
}

export default BlogDetailLayout