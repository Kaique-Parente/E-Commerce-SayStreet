import React from 'react'
import '@/app/styles/coreUI.css'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

export const CarouselWithIndicatorsBack = ({ images, image }) => {

    if (!Array.isArray(images) || images.length === 0) {
        return <p>Sem imagens disponíveis</p>; // Ou pode retornar null se não quiser exibir nada
    }

    return (
        <CCarousel controls indicators dark>
                {images.map((img, key) => {
                    return (
                        <CCarouselItem key={key}>
                    <CImage style={{objectFit: 'contain'}} className="d-block w-100" src={img} alt={`Slide ${key}`} />
                        </CCarouselItem>
                    );
                })}
            </CCarousel>
    )
}
