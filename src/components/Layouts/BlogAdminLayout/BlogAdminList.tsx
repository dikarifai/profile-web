"use client"

import Button from "@/components/Elements/Button"
import { DataTable } from "@/components/Fragments/DataTable"
import { BlogResponse } from "@/dtos/blog.dto"
import { fetcher } from "@/lib/fetcher"
import { blogService } from "@/services/blogService"
import { ApiResponse } from "@/types/api"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const BlogAdminList: React.FC = () => {
    const [data, setData] = useState<BlogResponse[]>([])
    const [isCreate, setIsCreate] = useState(false)

    const getData = async () => {
        const res = await fetcher("/blogs", { credentials: "include" }) as ApiResponse<BlogResponse[]>

        setData(res.data)
    }

    const handleDelete = async (slug: string) => {
        try {
            const res = blogService.deleteBySlug(slug)
            toast.success(res)
        } catch (error) {
            console.log("error: ", error);

        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns: ColumnDef<BlogResponse>[] = [
        {
            accessorKey: "title",
            header: "Judul"
        },
        {
            accessorKey: "slug",
            header: "SLUG"
        },
        {
            accessorKey: "status",
            header: "STATUS"
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex flex-row gap-2">
                    <Link href={`/admin/blog/${row.original.slug}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => handleDelete(row.original.slug)}>Delete</Button>
                </div>
            ),
            size: 80,
            minSize: 80,
            maxSize: 80,
        }
    ]

    return (
        <div className="mx-4">

            <div className="flex justify-end">
                <Link href={"/admin/blog/create"} >
                    <Button>Tambah +</Button>
                </Link>
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default BlogAdminList