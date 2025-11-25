import z from "zod";

export async function parseFormData<T>(
    formData: FormData,
    schema: z.ZodSchema<T>
): Promise<T> {
    const raw: any = {};
    const shape = (schema as any)._def.shape();

    for (const key of Object.keys(shape)) {
        const fieldSchema = shape[key];
        const typeName = fieldSchema._def.typeName;

        // --- HANDLE ARRAY ---
        if (typeName === "ZodArray") {
            const elementType = fieldSchema._def.type._def.typeName;

            const values = formData.getAll(key);

            if (values.length === 0) {
                raw[key] = [];
                continue;
            }

            raw[key] = values.map((v) => {
                if (v instanceof File) return v.size > 0 ? v : undefined;

                switch (elementType) {
                    case "ZodNumber":
                        return Number(v);
                    case "ZodBoolean":
                        return v === "true";
                    default:
                        return v;
                }
            });

            continue;
        }

        // -------------- FILE --------------
        const value = formData.get(key);

        if (value instanceof File) {
            raw[key] = value.size > 0 ? value : undefined;
            continue;
        }

        // -------------- PRIMITIVE TYPES --------------
        const fieldType = fieldSchema._def.typeName;

        if (value == null || value === "") {
            raw[key] = undefined;
            continue;
        }

        switch (fieldType) {
            case "ZodNumber":
                raw[key] = Number(value);
                break;
            case "ZodBoolean":
                raw[key] = value === "true";
                break;
            default:
                raw[key] = value;
                break;
        }
    }

    return schema.parse(raw);
}
