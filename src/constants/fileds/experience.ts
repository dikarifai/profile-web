import { FormField } from "@/types/form"

export const experienceFields: FormField[] = [
    {
        type: "text",
        name: "title",
        label: "Title",

        className: "text-2xl font-semibold",
    },
    {
        type: "text",
        name: "company",
        label: "Company",
    },
    {
        type: "date",
        name: "startDate",
        label: "Start Date",
    },
    {
        type: "date",
        name: "endDate",
        label: "End Date",
    },
]
