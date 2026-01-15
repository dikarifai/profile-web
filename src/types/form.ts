type FieldType = "text" | "select"

interface BaseField {
    name: string
    label?: string
}

interface TextField extends BaseField {
    type: "text"
    className?: string
}

interface SelectField extends BaseField {
    type: "select"
    options: { label: string; value: string }[]
}



export type FormField = TextField | SelectField