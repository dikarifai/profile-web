import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField } from "@/types/form"

interface FormFieldsProps {
    fields: FormField[]
    form: Record<string, any>
    defaultValue?: Record<string, any>
    onChange: (key: string, value: any) => void
}

const FormFields: React.FC<FormFieldsProps> = ({
    fields,
    form,
    defaultValue,
    onChange,
}) => {
    return (
        <>
            {fields.map((field) => {
                const value = form[field.name] ?? defaultValue?.[field.name] ?? ""

                switch (field.type) {
                    case "text":
                        return (
                            <Input
                                key={field.name}
                                value={value}
                                className={field.className}
                                onChange={(e) => onChange(field.name, e.target.value)}
                            />
                        )

                    case "select":
                        return (
                            <Select
                                key={field.name}
                                value={value}
                                onValueChange={(v) => onChange(field.name, v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select ${field.name}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {field.options.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                }
            })}
        </>
    )
}

export default FormFields