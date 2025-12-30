"use client"

import Button from "@/components/Elements/Button"
import DragDropFileInput from "@/components/Fragments/DragAndDropInput"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Input } from "@/components/ui/input"
import { BlogResponse } from "@/dtos/blog.dto"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface BlogDetailCreateProps {
    post?: BlogResponse
    mode?: "create" | "edit"
}


const BlogDetailCreate: React.FC<BlogDetailCreateProps> = ({ post, mode = "create" }) => {

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        console.log("Content", content);
        console.log("🚀 ~ BlogDetailCreate ~ file:", file)
    }, [content, file])

    const handleSubmit = async () => {
        const form = new FormData()

        form.append("title", title)
        form.append("content", content)
        if (file) {
            form.append("image", file)
        }

        try {

            const response = await fetch("http://localhost:3000/api/blogs/", {
                method: "POST",
                body: form,
                credentials: "include"
            })
            console.log("Resp", response);

        } catch (error) {
            console.log("Error", error);

        }
    }

    return (
        <main>
            <div className="max-w-3xl mx-auto px-4">
                {/* Cover */}
                <div className="w-full h-64 relative rounded-xl overflow-hidden mb-8">
                    <DragDropFileInput onFileChange={setFile} />
                </div>

                {/* Title */}
                <Input value={title} className="text-4xl font-bold  text-center" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <SimpleEditor onChange={(e) => setContent(e)} content={content} />
            <Button onClick={handleSubmit}>Simpan</Button>
        </main>
    )
}

export default BlogDetailCreate