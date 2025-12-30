import Link from "next/link"
import { BlogCardProps } from "./BlogCard.types"
import Image from "next/image"

const BlogCard: React.FC<BlogCardProps> = ({ title, date, description, href, imageUrl }) => {

    const str = description.replace(/<[^>]*>/g, '')
    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col max-w-[480px] w-full">
            <div className="relative w-full aspect-video bg-gray-400">
                {
                    imageUrl &&
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                    />
                }
            </div>
            <div className="flex-1 flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{date}</p>
                <h3 className="text-xl font-bold mb-2 h-14 w-full line-clamp-2">{title}</h3>
                <p className="line-clamp-3 h-18">{str}</p>
                {
                    href &&
                    <Link
                        href={href}
                        className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                    >
                        Baca Selengkapnya →
                    </Link>
                }
            </div>
        </div>
    )
}


export default BlogCard