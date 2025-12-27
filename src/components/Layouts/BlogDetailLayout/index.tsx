import DragDropFileInput from "@/components/Fragments/DragAndDropInput"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { BlogResponse } from "@/dtos/blog.dto"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Image from "next/image"

interface BlogDetailLayoutProps {
    post?: BlogResponse
    mode?: "create" | "edit" | "view"
}


const BlogDetailLayout: React.FC<BlogDetailLayoutProps> = ({ post, mode = "view" }) => {
    return (
        <main className="min-h-screen py-12">
            <article className="max-w-3xl mx-auto px-4">
                {/* Meta */}
                <div className="text-sm text-neutral-500 mb-4 flex justify-center items-center gap-3">
                    <time dateTime={new Date(post?.createdAt || "").toLocaleDateString()}>
                        {post?.createdAt ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }) : ""}
                    </time>
                </div>

                {/* Cover */}
                <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8 shadow-lg">
                    {
                        mode === "create" ? <DragDropFileInput />
                            :
                            <Image
                                src={post?.image || "/file.svg"}
                                alt={post?.title || ""}
                                fill
                                className="object-cover"
                                priority
                            />
                    }
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 leading-tight">{post?.title}</h1>


                {/* Content */}
                {
                    (mode !== "create" && mode !== "edit") &&
                    <div
                        className="prose prose-lg prose-neutral max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                    />
                }

                {/* Navigation */}
                {
                    (mode !== "edit" && mode !== "create") && (
                        <nav className="grid md:grid-cols-2 gap-6 mt-16 pt-8 border-t border-neutral-200">
                            <div className="group">
                                <Button variant={"ghost"} className="w-full justify-start gap-2 p-4 h-auto text-left hover:bg-neutral-50 rounded-xl transition-colors">
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                                            <ChevronLeft className="w-4 h-4" /> Previous
                                        </span>
                                        <span className="text-sm font-medium text-neutral-900">lorem ipsum dolor</span>
                                    </div>
                                </Button>
                            </div>
                            <div className="group">
                                <Button variant={"ghost"} className="w-full justify-end gap-2 p-4 h-auto text-right hover:bg-neutral-50 rounded-xl transition-colors">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                                            Next <ChevronRight className="w-4 h-4" />
                                        </span>
                                        <span className="text-sm font-medium text-neutral-900">sit amet consectetur adipisicing elit.</span>
                                    </div>
                                </Button>
                            </div>
                        </nav>
                    )
                }
            </article>
        </main>
    )
}

export default BlogDetailLayout