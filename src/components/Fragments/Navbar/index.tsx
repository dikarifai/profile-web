import Button from "@/components/Elements/Button"
import { navItems } from "@/data/navigation"
import { Camera } from "lucide-react"
import Link from "next/link"

const Navbar: React.FC = () => {
    return <nav className="hidden z-50 md:flex flex-row items-center justify-between bg-brand-bg text-brand-text  md:mx-20 lg:mx-40 xl:mx-52 my-4 px-4 py-2 rounded-full sticky top-4">
        <div className="flex flex-row items-center gap-2">
            <Camera />
            <h4>Name</h4>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">{
            navItems.map(item => <Link className="hover:text-brand-highlight" key={item.id} id={item.id.toString()} href={item.href}>{item.label}</Link>)}</div>
        <Button className="bg-brand-text text-brand-bg py-2 px-4  rounded-xl">Contact Me</Button>
    </nav>
}

export default Navbar