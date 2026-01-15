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
import { sidebarItems } from "@/constants/sidebar"
import Link from "next/link"

export function AppSidebar() {


    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-4 text-xl font-semibold">Dashboard</div>
            </SidebarHeader>

            <SidebarContent>
                {/* Main Menu */}

                <SidebarMenu>
                    {
                        sidebarItems.map((item) => (
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
