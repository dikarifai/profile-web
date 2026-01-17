import Link from "next/link"
import BlogCard from "../BlogCard"
import Section from "../Section"
import Button from "@/components/Elements/Button"

interface ContentSectionProps {
    children: React.ReactNode
    title?: string
    description?: string
    href?: string
}

const ContentSection: React.FC<ContentSectionProps> = async ({ children, title, description, href }) => {

    return (
        <Section title={title} description={description} className="flex flex-col items-center gap-4">
            {children}
            {
                href &&
                <Link href={href} className="col-start-2" >
                    <Button>Lebih Banyak</Button>
                </Link>
            }
        </Section>
    )
}

export default ContentSection