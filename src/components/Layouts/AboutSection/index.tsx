import Button from "@/components/Elements/Button"

const AboutSection: React.FC = () => {
    return <div className="w-full  flex flex-col justify-center md:items-center gap-4 rounded-2xl py-8 text-brand-text">
        <div className="max-w-2xl bg-brand-highlight flex flex-col items-center justify-center p-8 rounded-2xl gap-4">
            <h2 className="text-4xl font-bold">Tentang Saya</h2>
            <p className="max-w-xl rounded-4xl md:text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae provident ratione minus nihil quod, ducimus dolorum nostrum, maxime deserunt eius ipsum! Ratione, velit harum doloremque minima dolor quasi animi minus.
            </p>
            <Button>Lebih Banyak</Button>
        </div>
    </div>
}

export default AboutSection