import CellActions from "@/components/Fragments/CellActions";
import { BlogResponse } from "@/dtos/blog.dto";
import { ColumnDef } from "@tanstack/react-table";
import { BlogType } from "../../../generated/prisma/enums";

export function blogAdminColumns(
    type: BlogType,
    onDelete: (slug: string) => void
): ColumnDef<BlogResponse>[] {
    return [
        {
            accessorKey: "title",
            header: "Judul",
        },
        {
            accessorKey: "slug",
            header: "SLUG",
        },
        {
            accessorKey: "status",
            header: "STATUS",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                CellActions({ row, onDelete, type })
            ),
        },
    ]
}
