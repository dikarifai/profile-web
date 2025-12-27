import { SidebarTrigger } from "@/components/ui/sidebar"

const ProtectLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className="flex-1 overflow-auto">
            {children}
        </main>
    )
}

export default ProtectLayout