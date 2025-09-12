import Button from "@/components/Elements/Button"
import HeroPhoto from "@/components/Fragments/HeroPhoto"

const HeroSection: React.FC = () => {
    return <div className="flex w-full flex-col-reverse max-md:gap-4 items-center md:flex-row md:justify-around full max-md:px-4 py-8">
        <div className="flex-1 flex flex-col justify-center items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold">Dika Rahman Rifai</h1>
                <h2 className="text-3xl mb-8">Frontend Developer</h2>
                <div></div>
                <Button className="bg-brand-primary text-brand-text">Lihat Portofolio</Button>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center"><HeroPhoto /></div>
    </div>
}

export default HeroSection