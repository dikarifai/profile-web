import Link from "next/link"
import { ReactNode } from "react"

interface FormLayoutProps {
    title: string
    description?: string
    children: ReactNode
}

const FormLayout: React.FC<FormLayoutProps> = ({
    title,
    description,
    children
}) => {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="px-6 py-8">
                    <div className="flex flex-col gap-3">
                        {/* Breadcrumb */}

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-1 text-gray-500">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="px-6 py-12 overflow-hidden">
                <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                    <div className="py-10">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FormLayout
