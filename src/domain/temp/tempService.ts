import { createTempSchema } from "@/dtos/temp.dto";
import { requireAuth } from "@/lib/authz";
import { formDataToObject } from "@/lib/formDatatoObject";
import { saveImage } from "@/lib/saveImage";
import { validateRequest } from "@/lib/validation";
import cuid from "cuid";
import { NextResponse } from "next/server";

const tempService = {
    createTemps: async (req: Request) => {
        const { session, error: errorAuth } = await requireAuth()
        if (!session || errorAuth) return errorAuth;

        const formData = await req.formData()
        const raw = formDataToObject(formData)
        const tempId = cuid();


        const { data, error: errorValidation } = await validateRequest(raw, createTempSchema)
        if (!data || errorValidation) return errorValidation;

        const imageUrl = await saveImage(data.temp, "temp", tempId)

        return NextResponse.json({
            url: imageUrl
        })
    },
}

export default tempService