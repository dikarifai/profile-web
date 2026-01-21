import { CreateExperienceRequest, createExperienceSchema, UpdateExperienceRequest } from "@/dtos/experience.dto"
import experienceRepository from "./experienceRepository"

const experienceService = {
    getAll: async () => {
        const experiences = await experienceRepository.findMany()

        return experiences
    },
    getById: async (id: string) => {
        const experience = await experienceRepository.findById(id)

        if (!experience)
            throw new Error("NOT_FOUND,Experience tidak ditemukan")

        return experience
    },
    create: async (body: CreateExperienceRequest & { authorId: string }) => {

        const result = await experienceRepository.create(body)

        return result
    },
    updateById: async (id: string, { body }: { body: UpdateExperienceRequest }) => {
        await experienceService.getById(id)

        const result = await experienceRepository.updateById(id, { data: body })

        return result
    },
    deleteById: async (id: string) => {

        await experienceService.getById(id)

        const experiece = await experienceRepository.deleteById(id)

        return experiece

    }
}

export default experienceService