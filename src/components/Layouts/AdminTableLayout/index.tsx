"use client"

import Button from "@/components/Elements/Button"
import { DataTable } from "@/components/Fragments/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

interface AdminTableLayoutProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    createHref: string
}

export function AdminTableLayout<T>({
    data,
    columns,
    createHref,
}: AdminTableLayoutProps<T>) {
    return (
        <div className="mx-4">
            <div className="flex justify-end mb-4">
                <Link href={createHref}>
                    <Button>Tambah +</Button>
                </Link>
            </div>

            <DataTable data={data} columns={columns} />
        </div>
    )
}

