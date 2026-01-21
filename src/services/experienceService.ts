import { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from "@/dtos/experience.dto"
import { fetcher } from "@/lib/fetcher"
import { ApiResponse } from "@/types/api"

export const experienceService = {
    get: async (params?: { limit?: number, page?: number }): Promise<ApiResponse<ExperienceResponse[]>> => {
        const searchParams = new URLSearchParams()

        params && Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value))
        })


        const res = await fetcher<ApiResponse<ExperienceResponse[]>>(`/experiences?${searchParams.toString()}`)

        return res
    },
    getById: async (id: string) => {
        const res = await fetcher<{ data: ExperienceResponse }>(`/experiences/${id}`)

        return res
    },
    create: async (body: Partial<CreateExperienceRequest>): Promise<{ data: ExperienceResponse }> => {
        const res = await fetcher<{ data: ExperienceResponse }>("/experiences", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body)
        })

        return res
    },
    patch: async (id: string, { body }: { body: UpdateExperienceRequest }): Promise<{ data: ExperienceResponse }> => {
        const res = await fetcher<{ data: ExperienceResponse }>(`/experiences/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(body)
        })

        return res
    }
}