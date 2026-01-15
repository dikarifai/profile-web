import { paginationParams } from "./pagination"

type FindManyFn<T> = (args: any) => Promise<T[]>
type CountFn = (args?: any) => Promise<number>

export async function paginatedQuery<T>({
    req,
    findMany,
    count,
    where,
    orderBy,
}: {
    req: Request
    findMany: FindManyFn<T>
    count: CountFn
    where?: any
    orderBy?: any
}) {

    const { skip, limit, page } = paginationParams(req)

    const [data, total] = await Promise.all([
        findMany({ skip, take: limit, where, orderBy }),
        count({ where }),
    ])

    return {
        data,
        total,
        totalPages: Math.ceil(total / limit),
        limit,
        page
    }
}
