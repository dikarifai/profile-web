import { navItems, sosmedItems } from "@/data/navigation";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <div className="bg-brand-bg flex flex-col justify-center h-52 items-center gap-4">
            <div className="flex justify-center flex-row gap-4">
                {navItems.map((item) => (
                    <Link
                        className="text-brand-text hover:opacity-50"
                        key={item.id}
                        children={item.label}
                        href={item.href}
                    />
                ))}
            </div>
            <div className="flex flex-row gap-4 items-center justify-center">
                {sosmedItems.map((item) => (
                    <a href={item.url} key={item.id}>
                        <item.icon className="text-brand-text hover:opacity-50" size={36} />
                    </a>
                ))}
            </div>
            <div className="flex items-center justify-center text-brand-text">
                <p>© 2025 Dika Rifai</p>
            </div>
        </div>
    );
};

export default Footer;
