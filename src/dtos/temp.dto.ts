import { z } from "zod"

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]

export const createTempSchema = z.object({
    temp: z
        .instanceof(File)
        .refine(
            (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
            { message: "Format file tidak didukung" }
        ),
})