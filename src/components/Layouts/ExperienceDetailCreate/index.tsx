"use client"

import FormFields from "@/components/Fragments/FormFields"
import { Toolbar, ToolbarGroup } from "@/components/tiptap-ui-primitive/toolbar"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { experienceFields } from "@/constants/fileds/experience"
import { UpdateExperienceRequest } from "@/dtos/experience.dto"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useRef, useState } from "react"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import { experienceService } from "@/services/experienceService"
import Button from "@/components/Elements/Button"
import { toast } from "sonner"



const ExperienceDetailCreate: React.FC = () => {
    const [form, setForm] = useState<UpdateExperienceRequest>({})
    const editor = useEditor({
        immediatelyRender: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor",
            },
        },
        extensions: [
            StarterKit.configure({
                heading: false,
                bold: false,
                italic: false,
                strike: false,
                code: false,
                blockquote: false,
                horizontalRule: false,
            }),
            TaskList,
            TaskItem
        ],
        onUpdate({ editor }) {
            handleChange("description", editor.getHTML())
        },
        content: form.description
    })
    const toolbarRef = useRef<HTMLDivElement>(null)

    if (!editor) return null

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value })
    }

    const handleSubmit = async () => {
        const res: any = await experienceService.create(form)

        toast.success(res.message)
    }


    return <>
        <FormFields fields={experienceFields} form={form} onChange={handleChange} />
        <div className="simple-editor-wrapper">
            <EditorContext.Provider value={{ editor }}>
                <Toolbar
                    ref={toolbarRef}
                >
                    <ToolbarGroup className="bg-white">
                        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
                        <ListDropdownMenu
                            types={["bulletList", "orderedList", "taskList"]}
                        />
                        <BlockquoteButton />
                        <CodeBlockButton />
                    </ToolbarGroup>
                </Toolbar>

                <EditorContent
                    editor={editor}
                    role="presentation"
                    className="simple-editor-content"
                />
            </EditorContext.Provider>
        </div>
        <Button onClick={handleSubmit}>Simpan</Button>
    </>
}

export default ExperienceDetailCreate