export const paginationParams = (req: Request) => {

    const { searchParams } = new URL(req.url)


    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 10)

    const skip = (page - 1) * limit

    return { page, limit, skip }

}