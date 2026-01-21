import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
                const value =
                    form[field.name] ??
                    defaultValue?.[field.name] ??
                    ""
                const newValue = field.type === "date" ? value.split("T")[0] : value



                const commonProps = {
                    value: newValue,
                    onChange: (e: any) =>
                        onChange(field.name, e?.target?.value ?? e),
                }

                return (
                    <div key={field.name} className="space-y-1 px-3">
                        {field.label && (
                            <label className="text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                        )}

                        {(() => {
                            switch (field.type) {
                                case "text":
                                    return (
                                        <Input
                                            {...commonProps}
                                            className={field.className}
                                            placeholder={field.placeholder}
                                        />
                                    )

                                case "date":
                                    return (
                                        <Input
                                            type="date"
                                            {...commonProps}
                                        />
                                    )


                                case "select":
                                    return (
                                        <Select
                                            value={value || undefined}
                                            onValueChange={(v) =>
                                                onChange(field.name, v)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        field.placeholder ??
                                                        `Select ${field.label ?? field.name}`
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {field.options?.map((opt) => (
                                                        <SelectItem
                                                            key={opt.value}
                                                            value={opt.value}
                                                        >
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )

                                default:
                                    return null
                            }
                        })()}

                        {field.description && (
                            <p className="text-xs text-gray-500">
                                {field.description}
                            </p>
                        )}
                    </div>
                )
            })}
        </>
    )
}

export default FormFields
