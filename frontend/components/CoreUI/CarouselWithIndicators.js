import React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

export const CarouselWithIndicators = ({ images, image }) => {
    console.log(images);
    return (
        <CCarousel controls indicators>
            {images && images.length > 0 ? (
                images.map((img, key) => (
                    <CCarouselItem key={key}>
                        <CImage className="d-block w-100" src={img} alt={`Slide ${key}`} />
                    </CCarouselItem>
                ))
            ) : null                                                                                                                                                                    } {/* Se não houver imagens ou imagem, não renderiza nada */}
        </CCarousel>
    )
}
