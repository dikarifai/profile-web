"use client"

import { ApiResponse } from "@/types/api"
import BlogAdminList from "./BlogAdminList"
import { BlogResponse } from "@/dtos/blog.dto"
import { useEffect, useState } from "react"
import { fetcher } from "@/lib/fetcher"
import { AdminTableLayout } from "../AdminTableLayout"
import { blogService } from "@/services/blogService"
import { toast } from "sonner"
import { blogAdminColumns } from "@/constants/dataTable/blog"
import { BlogType } from "../../../../generated/prisma/enums"

interface BlogAdminLayoutProps {
    endpoint: "/blogs" | "/portfolios"
    type: BlogType
}

const BlogAdminLayout: React.FC<BlogAdminLayoutProps> = ({ endpoint, type }) => {
    const [data, setData] = useState<BlogResponse[]>([])

    const getData = async () => {
        const res = await fetcher(endpoint, {
            credentials: "include",
        }) as ApiResponse<BlogResponse[]>

        setData(res.data)
    }

    const handleDelete = async (slug: string) => {
        try {
            const message = await blogService.deleteBySlug(slug)
            toast.success(message)
            getData()
        } catch (err) {
            console.error(err)
            toast.error("Gagal menghapus blog")
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <AdminTableLayout
            data={data}
            columns={blogAdminColumns(type, handleDelete)}
            createHref={`/admin/${type.toLowerCase()}/create`}
        />
    )
}

export default BlogAdminLayout