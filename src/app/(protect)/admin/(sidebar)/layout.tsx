import { AppSidebar } from "@/components/Fragments/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const ProtectSidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
}

export default ProtectSidebarLayout