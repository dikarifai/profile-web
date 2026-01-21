import CellActions from "@/components/Fragments/CellActions"
import { ExperienceResponse } from "@/dtos/experience.dto"
import { formatDate } from "@/lib/formatter"
import { ColumnDef } from "@tanstack/react-table"

export function experienceAdminColumns({ onDelete }: {
    onDelete: () => void
}
): ColumnDef<ExperienceResponse>[] {
    return [
        {
            accessorKey: "title",
            header: "Judul"
        },
        {
            accessorKey: "company",
            header: "Perusahaan"
        },
        {
            accessorKey: "startDate",
            header: "Tanggal Mulai",
            cell: ({ row }) => {

                return formatDate(row.original.startDate)
            }
        },
        {
            accessorKey: "endDate",
            header: "Tanggal Mulai",
            cell: ({ row }) => {

                return row.original.endDate && formatDate(row.original.endDate)
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                CellActions({ key: row.original.id, onDelete: () => onDelete(), type: "experience" })
            ),
        },
    ]
} 