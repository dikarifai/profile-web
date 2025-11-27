export interface ApiResponse<T> {
    data: T,
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
    }
}