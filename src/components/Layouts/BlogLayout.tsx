"use client"

import { useState } from "react"
import BlogCard from "../Fragments/BlogCard"
import { BlogCardProps } from "../Fragments/BlogCard/BlogCard.types"
import { Pagination } from "../Fragments/Pagination"
import Section from "../Fragments/Section"

export const blogPosts: BlogCardProps[] = [
    {
        date: "17 Sep 2025",
        title: "Belajar React dengan Cepat",
        description:
            "React adalah library JavaScript populer untuk membangun UI. Artikel ini membahas cara memulai React dari dasar dengan cepat dan efisien.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/react-cepat",
    },
    {
        date: "10 Sep 2025",
        title: "Tips Membuat Komponen Reusable",
        description:
            "Komponen reusable membantu aplikasi lebih mudah di-maintain. Pelajari prinsip-prinsip dasar membuat UI yang bisa dipakai berulang kali.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/ui-reusable",
    },
    {
        date: "01 Sep 2025",
        title: "Mengenal Tailwind CSS",
        description:
            "Tailwind CSS adalah utility-first CSS framework yang sangat fleksibel. Artikel ini menjelaskan dasar-dasarnya dan bagaimana menggunakannya.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/tailwind-css",
    },
    {
        date: "17 Sep 2025",
        title: "Belajar React dengan Cepat",
        description:
            "React adalah library JavaScript populer untuk membangun UI. Artikel ini membahas cara memulai React dari dasar dengan cepat dan efisien.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/react-cepat",
    },
    {
        date: "10 Sep 2025",
        title: "Tips Membuat Komponen Reusable",
        description:
            "Komponen reusable membantu aplikasi lebih mudah di-maintain. Pelajari prinsip-prinsip dasar membuat UI yang bisa dipakai berulang kali.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/ui-reusable",
    },
    {
        date: "01 Sep 2025",
        title: "Mengenal Tailwind CSS",
        description:
            "Tailwind CSS adalah utility-first CSS framework yang sangat fleksibel. Artikel ini menjelaskan dasar-dasarnya dan bagaimana menggunakannya.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        href: "/blog/tailwind-css",
    },
]


const BlogLayout: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    return <Section title="Kumpulan Blog" description="Blog yang ditulis pada saat senggang saja">
        {/* Kategori */}
        {/* <div><span></span></div> */}
        <div className="grid grid-cols-3 gap-y-4">
            {
                blogPosts.map((item, index) => <BlogCard description={item.description}
                    title={item.title}
                    date={item.date}
                    href={item.href}
                    imageUrl={item.imageUrl}
                    key={index} />
                )
            }
        </div>
        <Pagination className="justify-center" currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} totalPages={10} />
    </Section>
}

export default BlogLayout