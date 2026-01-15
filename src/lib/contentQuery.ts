import { BlogType } from "../../generated/prisma/enums"
import { requireAuth } from "./authz"

type ContentQueryOptions = {
    searchFields: string[]
    type: BlogType
    req: Request
}

export async function buildContentWhere({
    searchFields,
    type,
    req
}: ContentQueryOptions) {
    const { searchParams } = new URL(req.url)

    const category = searchParams.get("category") || undefined
    const search = searchParams.get("search") || undefined
    const status = searchParams.get("status") || undefined
    const where: any = {}

    if (search) {
        where.OR = searchFields.map(field => ({
            [field]: { contains: search, mode: "insensitive" }
        }))
    }

    if (category) {
        where.category = { slug: category }
    }

    if (status !== "PUBLISHED") {
        const { session, error } = await requireAuth()
        if (!session || error) throw "UNAUTHORIZED, Login required"
    }

    if (status) {
        where.status = status
    }

    if (type) {
        where.type = type
    }

    return where
}
