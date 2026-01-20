import { createExperienceSchema } from "@/dtos/experience.dto"
import { requireAuth } from "@/lib/authz"
import { paginatedQuery } from "@/lib/paginatedQuery"
import { prisma } from "@/lib/prisma"
import { validateRequest } from "@/lib/validation"
import { NextResponse } from "next/server"
import experienceService from "./experienceService"

const experienceController = {
    getExperience: async (req: Request) => {
        const experiences = await experienceService.getAll()

        return NextResponse.json({
            data: experiences,
        })
    },
    getExperienceById: async (req: Request, { params }: { params: Promise<{ experienceId: string }> }) => {
        const { experienceId } = await params
        console.log("🚀 ~ experienceId:", experienceId)
        const experience = await experienceService.getById(experienceId)

        if (!experience)
            throw new Error("NOT_FOUND, Experience tidak ditemukan")

        return NextResponse.json({
            data: experience
        })
    },
    createExperience: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;
        const body = await req.json()
        const authorId = session?.user.id


        const { data, error: errorValidation } = await validateRequest(body, createExperienceSchema)
        if (!data || errorValidation) return errorValidation;

        const result = await experienceService.create({ ...data, authorId })

        return NextResponse.json({
            data: result,
            message: "Experience berhasil dibuat"
        })
    },
    deleteExperience: async (req: Request, { params }: { params: Promise<{ experienceId: string }> }) => {
        const { experienceId } = await params
        console.log("🚀 ~ experienceId:", experienceId)

        const experiece = await experienceService.deleteById(experienceId)

        return NextResponse.json({
            message: `${experiece?.title} berhasil dihapus`
        })

    }
}

export default experienceController