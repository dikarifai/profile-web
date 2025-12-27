export interface ApiResponse<T> {
    data: T,
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
    }
}

export interface ApiResponseWithNavigation<T> {
    data: T,
    navigation: {
        next: T,
        prev: T
    }
}