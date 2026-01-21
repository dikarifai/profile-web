import Button from "@/components/Elements/Button"
import { Row } from "@tanstack/react-table"
import Link from "next/link"
import { BlogType } from "../../../../generated/prisma/enums"



interface CellActionsProps {
    key: string
    onDelete: (slug: string) => void,
    type: string
}

const CellActions = ({ key, onDelete, type }: CellActionsProps) => {
    return <div className="flex gap-2">
        <Link href={`/admin/${type.toLowerCase()}/${key}`}>
            <Button>Edit</Button>
        </Link>
        <Button
            onClick={() => onDelete(key)}
        >
            Delete
        </Button>
    </div>
}

export default CellActions