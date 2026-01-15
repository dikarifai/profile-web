"use client"

import Button from "@/components/Elements/Button"
import DragDropFileInput from "@/components/Fragments/DragAndDropInput"
import FormFields from "@/components/Fragments/FormFields"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlogResponse, UpdateBlogRequest } from "@/dtos/blog.dto"
import { blogService } from "@/services/blogService"
import { FormField } from "@/types/form"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { BlogType } from "../../../../generated/prisma/enums"

type BlogForm = Partial<UpdateBlogRequest>

interface BlogDetailCreateProps {
    defaultValue?: BlogResponse
    mode?: "create" | "edit"
    onChange?: (key: string, value: string | File) => void
    fields: FormField[]
    type: BlogType
}




const BlogDetailCreate: React.FC<BlogDetailCreateProps> = ({ defaultValue, mode = "create", onChange, fields, type }) => {
    const params = useParams<{ slug: string }>()
    const [form, setForm] = useState<BlogForm>({
        image: defaultValue?.image
    })

    const route = useRouter()


    const handleChange = (key: string, value: string | File) => {
        setForm({ ...form, [key]: value })
        onChange && onChange(key, value)
    }

    const handleSubmit = async () => {
        const formData = new FormData()

        form && Object.entries(form).forEach(([key, value]) => {

            if (value === null || value === undefined) return;

            if (value instanceof File) {
                formData.append(key, value);
            } else if (value instanceof Date) {
                formData.append(key, value.toISOString());
            } else if (Array.isArray(value)) {
                value.forEach((v) => formData.append(`${key}[]`, v));
            } else {
                formData.append(key, String(value));
            }
        })

        try {
            if (mode === "create") {
                formData.append("type", type)
                const res = await blogService.create(formData)
                toast.success("Blog berhasil dibuat")
                setForm(res)
            }
            else if (mode === "edit") {
                const res = await blogService.patch(params.slug, formData)
                setForm(res)
                toast.success("Blog berhasil diedit")
            }
            route.replace(`/admin/${type.toLowerCase()}`)
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
        }
    }

    const fileChangeHandler = (image: File | null) => {
        if (image instanceof File) {
            return setForm({ ...form, image, isRemove: false })
        }
        setForm({ ...form, image: null, isRemove: true })
    }

    return (
        <main>
            <div className="max-w-3xl mx-auto px-4">
                {/* Cover */}
                <div className="w-full h-64 relative rounded-xl overflow-hidden mb-8">
                    <DragDropFileInput imageUrl={form?.image || ""} onFileChange={fileChangeHandler} />
                </div>
                <FormFields
                    fields={fields}
                    form={form}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                />
            </div>
            <SimpleEditor onChange={(e) => handleChange("content", e)} content={form?.content || defaultValue?.content || ""} />
            <Button onClick={handleSubmit}>Simpan</Button>
        </main>
    )
}

export default BlogDetailCreate