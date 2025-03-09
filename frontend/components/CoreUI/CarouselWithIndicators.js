import React from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'

export const CarouselWithIndicators = ({ images }) => {
    return (
        <CCarousel controls indicators>
            {images.map((img, key) => (
                <CCarouselItem key={key}>
                    <CImage className="d-block w-100" src={img} alt={`Slide ${key}`} />
                </CCarouselItem>
            ))}
        </CCarousel>
    )
}
