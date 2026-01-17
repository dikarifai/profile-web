import { createExperienceSchema } from "@/dtos/experience.dto"
import { requireAuth } from "@/lib/authz"
import { paginatedQuery } from "@/lib/paginatedQuery"
import { prisma } from "@/lib/prisma"
import { validateRequest } from "@/lib/validation"
import { NextResponse } from "next/server"

const experienceService = {
    getExperience: async (req: Request) => {

        const { data: experiences, limit, page, total, totalPages } = await paginatedQuery({
            findMany: prisma.experience.findMany,
            count: prisma.experience.count,
            req: req
        })

        return NextResponse.json({
            data: experiences,
            pagination: {
                page,
                total,
                limit,
                totalPages,
            }
        })
    },
    createExperience: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;
        const body = await req.json()
        const authorId = session?.user.id


        const { data, error: errorValidation } = await validateRequest(body, createExperienceSchema)
        if (!data || errorValidation) return errorValidation;

        const result = await prisma.experience.create({ data: { ...data, authorId } })

        return NextResponse.json({
            data: result,
            message: "Experience berhasil dibuat"
        })

    },
}

export default experienceService