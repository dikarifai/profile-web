import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, FileText, Settings, User, Podcast } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {

    const items = [
        {
            title: "Home",
            url: "/admin",
            icon: Home,
        },
        {
            title: "Blog",
            url: "/admin/blog",
            icon: Podcast
        }
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-4 text-xl font-semibold">Dashboard</div>
            </SidebarHeader>

            <SidebarContent>
                {/* Main Menu */}

                <SidebarMenu>
                    {
                        items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }

                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <div className="p-4 text-sm text-muted-foreground">© 2025 MyApp</div>
            </SidebarFooter>
        </Sidebar>
    )
}
