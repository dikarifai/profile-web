import { CreateExperienceRequest } from "@/dtos/experience.dto";
import { prisma } from "@/lib/prisma";

const { experience } = prisma

const experienceRepository = {
    findMany: async () => (
        experience.findMany({ orderBy: { startDate: "desc" } })
    ),
    findById: async (id: string) => (
        experience.findFirst({ where: { id } })
    ),
    create: async (data: CreateExperienceRequest & { authorId: string }) => (
        experience.create({ data })
    ),
    deleteById: async (id: string) => (
        experience.delete({
            where: {
                id
            }
        })
    )
}

export default experienceRepository