import z from "zod"
import { Experience } from "../../generated/prisma/client"

/**
 * =========================
 * Base Experience Schema
 * =========================
 */
const baseExperienceSchema = z
    .object({
        title: z
            .string()
            .min(1, "Title wajib diisi"),

        company: z
            .string()
            .min(1, "Company wajib diisi"),

        startDate: z.coerce
            .date()
            .refine((val) => !isNaN(val.getTime()), {
                message: "Start date wajib diisi",
            }),

        endDate: z.coerce
            .date()
            .optional()
            .nullable(),

        description: z
            .string()
            .optional()
            .nullable(),
    })
    .superRefine((data, ctx) => {
        if (data.endDate && data.endDate < data.startDate) {
            ctx.addIssue({
                path: ["endDate"],
                message: "End date tidak boleh lebih awal dari start date",
                code: z.ZodIssueCode.custom,
            })
        }
    })

/**
 * =========================
 * Create Experience Schema
 * =========================
 */
export const createExperienceSchema = baseExperienceSchema

export type CreateExperienceRequest = z.infer<
    typeof createExperienceSchema
>

/**
 * =========================
 * Update Experience Schema
 * =========================
 */
export const updateExperienceSchema = baseExperienceSchema
    .partial()

export type UpdateExperienceRequest = z.infer<
    typeof updateExperienceSchema
>

/**
 * =========================
 * Response Type
 * =========================
 */
export type ExperienceResponse = Experience
