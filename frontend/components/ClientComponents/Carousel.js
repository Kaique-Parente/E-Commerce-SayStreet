'use client'

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const CarouselContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;

const CarouselWrapper = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`;

const CarouselImage = styled.div`
    min-width: 33.33%;  /* Exibir 3 imagens lado a lado */
    height: 100%;
    padding: 0 10px;  /* Espaçamento entre as imagens */
    position: relative;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
`;

const Arrow = styled.div`
    position: absolute;
    top: 50%;
    ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    cursor: pointer;
    color: white;
    font-size: 24px;
    z-index: 1;
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.6;
    }
`;

const ImageText = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    z-index: 2;
`;

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: "/web/destaque1.png", alt: "Tênis Puma MB.04 Masculino", link: "/detalhes/1" },
        { src: "/web/destaque2.png", alt: "Tênis Air Jordan 5 Retro Og Masculino", link: "/detalhes/2" },
        { src: "/web/destaque1.png", alt: "Tênis Nike Air Max", link: "/detalhes/3" },
        { src: "/web/destaque2.png", alt: "Tênis Adidas UltraBoost", link: "/detalhes/4" },
        { src: "/web/destaque1.png", alt: "Tênis New Balance 990", link: "/detalhes/5" },
        { src: "/web/destaque2.png", alt: "Tênis Converse All Star", link: "/detalhes/6" },
    ];

    const imagesPerPage = 3;  // Exibir 3 imagens por vez

    const handleNext = () => {
        if (currentIndex + imagesPerPage < images.length) {
            setCurrentIndex(prevIndex => prevIndex + imagesPerPage);
        } else {
            setCurrentIndex(0);  // Voltar para o início do carousel
        }
    };

    const handlePrev = () => {
        if (currentIndex - imagesPerPage >= 0) {
            setCurrentIndex(prevIndex => prevIndex - imagesPerPage);
        } else {
            setCurrentIndex(Math.floor((images.length - 1) / imagesPerPage) * imagesPerPage);  // Voltar para o final do carousel
        }
    };

    return (
        <CarouselContainer>
            <Arrow direction="left" onClick={handlePrev}>{"<"}</Arrow>
            <CarouselWrapper style={{ transform: `translateX(-${(currentIndex * 100) / imagesPerPage}%)` }}>
                {images.map((image, index) => (
                    <CarouselImage key={index}>
                        <Link href={image.link}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={200}
                                height={400}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                            <ImageOverlay />
                            <ImageText>{image.alt}</ImageText>
                        </Link>
                    </CarouselImage>
                ))}
            </CarouselWrapper>
            <Arrow direction="right" onClick={handleNext}>{">"}</Arrow>
        </CarouselContainer>
    );
}
