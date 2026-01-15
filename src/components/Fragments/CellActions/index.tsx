import Button from "@/components/Elements/Button"
import { Row } from "@tanstack/react-table"
import Link from "next/link"
import { BlogType } from "../../../../generated/prisma/enums"



interface CellActionsProps<TData extends { slug: string }> {
    row: Row<TData>
    onDelete: (slug: string) => void,
    type: BlogType
}

const CellActions = <TData extends { slug: string }>({ row, onDelete, type }: CellActionsProps<TData>) => {
    return <div className="flex gap-2">
        <Link href={`/admin/${type.toLowerCase()}/${row.original.slug}`}>
            <Button>Edit</Button>
        </Link>
        <Button
            onClick={() => onDelete(row.original.slug)}
        >
            Delete
        </Button>
    </div>
}

export default CellActions