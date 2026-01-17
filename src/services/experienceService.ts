import { ExperienceResponse } from "@/dtos/experience.dto"
import { fetcher } from "@/lib/fetcher"
import { ApiResponse } from "@/types/api"

export const experienceService = {
    get: async (params?: { limit?: number, page?: number, type: "BLOG" | "PORTFOLIO" }): Promise<ApiResponse<ExperienceResponse[]>> => {
        const searchParams = new URLSearchParams()

        params && Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value))
        })


        const res = await fetcher<ApiResponse<ExperienceResponse[]>>(`/experiences?${searchParams.toString()}`)

        return res
    },
}