import { withAuth } from "@/lib/withAuth"

const ProtectLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    return (
        <main className="flex-1 overflow-auto">
            {children}
        </main>
    )
}

export default withAuth(ProtectLayout)