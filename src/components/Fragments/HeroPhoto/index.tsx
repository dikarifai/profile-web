import Image from "next/image"
import { HeroImage } from "../../../../public/assets/images"

const HeroPhoto: React.FC = () => {
    return <div className="relative h-60 w-60 md:h-96 md:w-96 rounded-full overflow-hidden">
        <Image className="object-cover" fill src={HeroImage} alt="Dika Rifai" />
    </div>
}

export default HeroPhoto