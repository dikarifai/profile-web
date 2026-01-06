import { BlogResponse, UpdateBlogRequest } from "@/dtos/blog.dto";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse, ApiResponseWithNavigation } from "@/types/api";
import { notFound } from "next/navigation";

const isServer = typeof window === "undefined"

export const blogService = {
    patch: async (slug: string, data: FormData): Promise<BlogResponse> => {
        const res = await fetcher<BlogResponse>(`/blogs/${slug}`, {
            method: "PATCH",
            body: data,
            credentials: "include"
        })

        return res

    },
    create: async () => {

    },
    get: async (params?: { status: "DRAFT" | "PUBLISHED" }): Promise<ApiResponse<BlogResponse[]>> => {
        const searchParams = new URLSearchParams()
        let isPublic = false

        if (params?.status) {
            searchParams.append("status", params.status)
            params.status === "PUBLISHED" && (isPublic = true)
        }


        const res = await fetcher<ApiResponse<BlogResponse[]>>(`/blogs?${searchParams.toString()}`, { credentials: isPublic ? "omit" : "include" })

        return res
    },
    getBySlug: async (slug: string): Promise<ApiResponseWithNavigation<BlogResponse>> => {
        const res = await fetcher<ApiResponseWithNavigation<BlogResponse>>(`/blogs/${slug}`)
        if (!res) return notFound();

        return res
    }

}