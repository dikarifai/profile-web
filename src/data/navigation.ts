import { Github, Instagram, Linkedin } from "lucide-react";

export const navItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Experience", href: "/experience" },
    { id: 3, label: "Projects", href: "/projects" },
    { id: 4, label: "About", href: "/about" },
    { id: 5, label: "Contact", href: "/contact" },
];

export const sosmedItems = [
    {
        id: 0, label: "LinkedIn", url: "", icon: Linkedin,
    },
    {
        id: 1, label: "Github", url: "", icon: Github
    },
    {
        id: 2, label: "", url: "", icon: Instagram
    }
]