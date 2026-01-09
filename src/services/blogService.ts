import { BlogResponse, UpdateBlogRequest } from "@/dtos/blog.dto";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse, ApiResponseWithNavigation } from "@/types/api";
import { notFound } from "next/navigation";

export const blogService = {
    patch: async (slug: string, data: FormData): Promise<BlogResponse> => {
        const res = await fetcher<BlogResponse>(`/blogs/${slug}`, {
            method: "PATCH",
            body: data,
            credentials: "include"
        })

        return res

    },
    create: async (data: FormData): Promise<BlogResponse> => {
        const res = await fetcher<BlogResponse>("/blogs", {
            method: "POST",
            body: data,
            credentials: "include"
        })

        return res
    },
    get: async (params?: { status: "DRAFT" | "PUBLISHED", limit?: number, page?: number }): Promise<ApiResponse<BlogResponse[]>> => {
        const searchParams = new URLSearchParams()
        let isPublic = false

        if (params?.status) {
            searchParams.append("status", params.status)
            params.status === "PUBLISHED" && (isPublic = true)
        }

        params && Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value))
            if (key === "status") {
                value === "PUBLISHED" && (isPublic = true)
            }
        })


        const res = await fetcher<ApiResponse<BlogResponse[]>>(`/blogs?${searchParams.toString()}`, { credentials: isPublic ? "omit" : "include" })

        return res
    },
    getBySlug: async (slug: string): Promise<ApiResponseWithNavigation<BlogResponse>> => {
        const res = await fetcher<ApiResponseWithNavigation<BlogResponse>>(`/blogs/${slug}`)
        if (!res) return notFound();

        return res
    },
    deleteBySlug: async (slug: string): Promise<string> => {
        const res = await fetcher<string>(`/blogs/${slug}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        )
        return res
    }

}