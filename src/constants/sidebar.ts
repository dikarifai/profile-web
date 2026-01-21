import { Building, Code, Home, Podcast } from "lucide-react";

export const sidebarItems = [
    {
        title: "Home",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Blog",
        url: "/admin/blog",
        icon: Podcast
    },
    {
        title: "Portfolio",
        url: "/admin/portfolio",
        icon: Code
    },
    {
        title: "Experience",
        url: "/admin/experience",
        icon: Building
    }
]