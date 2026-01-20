type FieldType =
    | "text"
    | "date"
    | "textarea"
    | "select"
    | "editor"

interface BaseField {
    name: string
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
}

/* ========== Text / Date ========== */
interface TextField extends BaseField {
    type: "text" | "date"
    className?: string
}

/* ========== Textarea ========== */
interface TextareaField extends BaseField {
    type: "textarea"
    rows?: number
}

/* ========== Select ========== */
interface SelectField extends BaseField {
    type: "select"
    options: {
        label: string
        value: string
    }[]
}

/* ========== Rich Text Editor ========== */
interface EditorField extends BaseField {
    type: "editor"
}

/* ========== Union ========== */
export type FormField =
    | TextField
    | TextareaField
    | SelectField
    | EditorField
