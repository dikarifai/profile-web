"use client"

import { Pagination } from "@/components/Fragments/Pagination"
import { useRouter } from "next/navigation"

interface PaginationBlogProps {
    currentPage: number
    totalPages: number
}

const PaginationBlog: React.FC<PaginationBlogProps> = ({ currentPage, totalPages }) => {
    const route = useRouter()

    return (
        <Pagination className="justify-center" currentPage={currentPage} onPageChange={(page) => route.push(`/blog?page=${page}`)} totalPages={totalPages} />
    )
}

export default PaginationBlog