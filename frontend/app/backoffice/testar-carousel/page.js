'use client'
import { CarouselWithIndicators } from "@/components/CoreUI/CarouselWithIndicators";

const images = [
    "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741478685/mais_mjszjf.png",
    "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741478150/procurar_wfmsby.svg",
    "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741478150/editar_qwloeo.svg"
]

export default function Testar() {
    return (
        <div className="p-3">
            <CarouselWithIndicators images={images}/>
        </div>
    );
}