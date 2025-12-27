"use client"

import Button from "@/components/Elements/Button"
import { DataTable } from "@/components/Fragments/DataTable"
import { BlogResponse } from "@/dtos/blog.dto"
import { fetcher } from "@/lib/fetcher"
import { ApiResponse } from "@/types/api"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"

const BlogAdminList: React.FC = () => {
    const [data, setData] = useState<BlogResponse[]>([])

    const getData = async () => {
        const res = await fetcher("/api/blogs", { credentials: "include" }) as ApiResponse<BlogResponse[]>

        setData(res.data)
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
                <Button onClick={() => console.log(row.original)}>Edit</Button>
            ),
        }
    ]

    return (
        <div className="mx-4">
            <div className="flex justify-end">
                <Button>Tambah +</Button>
            </div>
            <DataTable data={data} columns={columns} />
        </div>
    )
}

export default BlogAdminList