import React from "react"
import Link from "next/link"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface CreatePageLayoutProps {
    title: string
    description?: string
    breadcrumbs?: BreadcrumbItem[]
    children: React.ReactNode
}

const CreatePageLayout: React.FC<CreatePageLayoutProps> = ({
    title,
    description,
    breadcrumbs = [],
    children
}) => {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="px-6 py-8">
                    <div className="flex flex-col gap-3">
                        {/* Breadcrumb */}
                        {breadcrumbs.length > 0 && (
                            <nav className="text-sm text-gray-500">
                                {breadcrumbs.map((item, index) => (
                                    <span key={index}>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="hover:text-gray-700"
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-700 font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                        {index < breadcrumbs.length - 1 && (
                                            <span className="mx-2">/</span>
                                        )}
                                    </span>
                                ))}
                            </nav>
                        )}

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

export default CreatePageLayout
