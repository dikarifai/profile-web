import BlogCard from "@/components/Fragments/BlogCard"
import { BlogCardProps } from "@/components/Fragments/BlogCard/BlogCard.types"
import Section from "@/components/Fragments/Section"

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
]



const BlogSection: React.FC = () => {
    return <Section title="Blog" description="Menulis blog kalau lagi pengen" className="grid md:grid-cols-3 gap-x-4 place-items-center">
        {
            blogPosts.map((item, index) => (

                <BlogCard key={index} description={item.description} title={item.title} date={item.date} href={item.href} imageUrl={item.imageUrl} />
            ))
        }

    </Section>
}

export default BlogSection