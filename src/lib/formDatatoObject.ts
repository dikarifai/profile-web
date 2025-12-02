// lib/formDataToObject.ts
export function formDataToObject(formData: FormData) {
    const obj: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            obj[key] = value.size === 0 ? null : value;
            continue;
        }
        const v = String(value).trim();
        if (v === "") { obj[key] = null; continue; }
        if (v === "true") { obj[key] = true; continue; }
        if (v === "false") { obj[key] = false; continue; }
        try {
            obj[key] = JSON.parse(v);
            continue;
        } catch { }
        obj[key] = v;
    }
    return obj;
}
