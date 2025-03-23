'use client'

import NavBar from "@/components/ClientComponents/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Destaque = styled.div`
    display: flex;
    justify-content: center;

    position: relative;
    z-index: 1;

    width: 100%;
    height: 360px;
    background-color: rgba(4, 41, 64, 95);

    padding: 0px 130px;

    h1 {
        font-size: 24px;
        color: #CFCFCF;

        padding: 30px 0px;
    }
`

const CardDestaque = styled.div`
    margin-top: 100px;
    padding: 20px 10px;
    border: 1px solid black;
    border-radius: 4px;

    cursor: pointer;
    transition: border 0.3s ease-in-out;
    transition: transform 3.2 ease-in-out;
    
    &:hover {
        border-color: rgba(255, 227, 23, 0.95);
        transform: scale(1.02) translateY(-15px);

        img {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
        }
    }

    transition: transform 0.3s ease-in-out, border 0.3s ease-in-out;
    
`

const TextCardDestaque = styled.div`
    position: absolute;
    text-align: center;
    bottom: 40px;
    right: 0;
    left: 0;
`

const SpanCardDestaque = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 10px;

    span:nth-child(1){
        font-weight: bold;
    }
`

const Novidade = styled.div`

    display: flex;
    justify-content: center;

    margin: 70px 0px;
    padding: 5px 130px;

    h2{
        margin-bottom: 30px;
    }
`

const ConhecaTambem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 0px 130px;

    h2{
        margin-bottom: 30px;
    }
`

const CardConheca = styled.div`
    position: relative;

    width: 292px;
    height: 450px;
    margin-bottom: 70px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;

    /* Filtro escuro sobre a imagem */
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        background: rgba(0, 0, 0, 0.5); /* Fundo escuro */
        z-index: 1; /* Garante que fique sobre a imagem */
        transition: background 0.3s ease-in-out;
    }

    &:hover::before {
        background: rgba(0, 0, 0, 0.3); /* Clareia no hover */
    }

    /* Garante que a imagem fique no fundo */
    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0; /* Imagem no fundo */
    }

    /* Texto e botão sobre a imagem */
    .content {
        position: relative;
        z-index: 2; /* Acima do filtro */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    button {
        background-color: #ffcc00;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background-color: #e6b800;
        }
    }
`
const produtosExm =
    [
        {
            "produtoId": 1,
            "produtoNome": "Tênis Nike Air Force 12 '07 Feminino",
            "produtoDesc": "Confortável, durável e atemporal - o AF1 é um favorito dos fãs por um motivo. A construção clássica dos anos 80 é combinada com detalhes ousados para para um estilo que acompanha se você está na quadra ou em movimento. E como não resistimos a um mimo tentador, uma cor especial para o Dia dos Namorados adoça o look.\n\n\nBenefícios\n\nAs camadas costuradas na parte de cima trazem estilo, durabilidade e sustentação clássicos.\nProjetado originalmente para jogos de basquete de alto desempenho, o amortecimento Nike Air adiciona leveza para conforto o dia todo.\nA silhueta de corte baixo proporciona um look limpo e simplificado.\nA boca acolchoada é macia e confortável.\n\nDetalhes do Produto\n\nEntressola de espuma\nPerfurações na região dos dedos\nSolado de borracha",
            "produtoAvaliacao": "4.0",
            "produtoQtd": 100,
            "produtoStatus": true,
            "produtoPreco": 645.99,
            "imagens": [
                {
                    "id": 77,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625502/02798651A5_ncazrq.avif",
                    "principal": true
                },
                {
                    "id": 78,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625505/02798651A2_a1dcjf.avif",
                    "principal": false
                },
                {
                    "id": 79,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625508/02798651A4_ztyess.avif",
                    "principal": false
                },
                {
                    "id": 80,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625513/02798651A10_ze7sjo.avif",
                    "principal": false
                },
                {
                    "id": 81,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625515/02798651A7_dv5gxq.avif",
                    "principal": false
                },
                {
                    "id": 82,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625518/02798651A9_b7anzq.avif",
                    "principal": false
                },
                {
                    "id": 83,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625522/02798651A1_w7bdog.avif",
                    "principal": false
                }
            ]
        },
        {
            "produtoId": 2,
            "produtoNome": "Tênis Nike Air Force 1 ´07 LV8 Masculino",
            "produtoDesc": "Características\nO Tênis Nike Air Force 1 ´07 LV8 Masculino na cor Cinza é a combinação perfeita de estilo e conforto. Seu material de alta qualidade proporciona durabilidade e um ajuste confortável, ideal para o dia a dia. Além disso, o design moderno e versátil do tênis adiciona um toque de sofisticação ao seu visual. A cor Cinza é uma escolha versátil que combina facilmente com diferentes estilos, desde um look mais casual até produções mais estilosas, garantindo um visual contemporâneo em todas as ocasiões.\n\nVersatilidade\nCom o Tênis Nike Air Force 1 ´07 LV8 Masculino Cinza, você tem em mãos um calçado versátil que pode ser usado em diversas ocasiões. Seja para um passeio no parque, um dia de trabalho mais descontraído ou até mesmo para um happy hour com os amigos, esse tênis se adapta perfeitamente a diferentes momentos. Sua versatilidade no estilo Athleisure permite que você esteja sempre confortável sem abrir mão do estilo, garantindo um visual moderno e despojado em todas as situações.",
            "produtoAvaliacao": "4.5",
            "produtoQtd": 5,
            "produtoStatus": true,
            "produtoPreco": 899.99,
            "imagens": [
                {
                    "id": 23,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741625996/FQ871-4-004-2_l2qbhf.webp",
                    "principal": true
                },
                {
                    "id": 24,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-6_v1d2vc.webp",
                    "principal": false
                },
                {
                    "id": 25,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-7_leio2x.jpg",
                    "principal": false
                },
                {
                    "id": 26,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-4_zpfofs.webp",
                    "principal": false
                },
                {
                    "id": 27,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-5_w8sjqd.webp",
                    "principal": false
                },
                {
                    "id": 28,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-8_dq2v9e.jpg",
                    "principal": false
                },
                {
                    "id": 29,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626007/FQ871-4-004-1_pplwtm.webp",
                    "principal": false
                },
                {
                    "id": 30,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741626006/FQ871-4-004-3_lerb2f.webp",
                    "principal": false
                }
            ]
        },
        {
            "produtoId": 3,
            "produtoNome": "Tênis Nike Dunk Low Retro Masculino",
            "produtoDesc": "wadhawhdlakwhdawkldalwkhd awlh dluawh dluaw duhawudhawuih dlaihdwliu hawliuhdlauwhdlawdhalwhdlawihdlauwh dlauwh dlawh udahwliudhawliudhawu dauwh duawh dahw",
            "produtoAvaliacao": "5.0",
            "produtoQtd": 10,
            "produtoStatus": true,
            "produtoPreco": 899.99,
            "imagens": [
                {
                    "id": 84,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741651016/518094-800-auto_mjyyx4.webp",
                    "principal": false
                },
                {
                    "id": 85,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741651016/518211-800-auto_ks9xa3.webp",
                    "principal": false
                },
                {
                    "id": 86,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741651016/517977-800-auto_ab0are.webp",
                    "principal": true
                },
                {
                    "id": 87,
                    "url": "http://res.cloudinary.com/dmhmsnuxz/image/upload/v1741651016/518328-800-auto_wsktfa.webp",
                    "principal": false
                }
            ]
        }
]

const produtoUpdate = produtosExm.map(produto => ({
    produtoId: produto.produtoId,
    produtoNome: produto.produtoNome,
    produtoPreco: produto.produtoPreco,
    imagens: produto.imagens.filter(img => img.principal)
}));

const normalizeSlug = (str) => {
    return str
      .toString()
      .normalize("NFD") // Decompõe os caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-") // Substitui espaços e caracteres especiais por "-"
      .replace(/-+/g, "-") // Remove hífens duplicados
      .replace(/^-|-$/g, ""); // Remove hífens no início e no fim
  };
  


export default function LadingPage() {
    const router = useRouter();

    return (
        <>
            <NavBar />
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                    }}
                >
                    <source src="/web/videos/video-fundo.mp4" type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            </div>

            <div style={{ height: 536 }}>

                <Destaque>
                    <h1>DESTAQUES</h1>
                    <div style={{ position: "absolute", display: "flex" }}>
                        <CardDestaque style={{ position: "relative" }}>
                            <Image
                                width={372}
                                height={390}
                                src={'/web/destaque1.png'}
                                alt="Ícone Lupa"
                                style={{ objectFit: "contain" }}
                            />
                            <TextCardDestaque>
                                <h3>Tênis Puma MB.04 Masculino</h3>
                                <SpanCardDestaque>
                                    <span>R$ 1.799,99</span>
                                    <span>10x R$ 179,99</span>
                                </SpanCardDestaque>
                            </TextCardDestaque>
                        </CardDestaque>

                        <CardDestaque style={{ position: "relative", marginLeft: "15px" }}>
                            <Image
                                style={{ objectFit: "contain" }}
                                width={372}
                                height={390}
                                src={'/web/destaque2.png'}
                                alt="Ícone Lupa"
                            />
                            <TextCardDestaque>
                                <h3>Tênis Air Jordan 5 Retro Og Masculino</h3>
                                <SpanCardDestaque>
                                    <span>R$ 1.799,99</span>
                                    <span>10x R$ 179,99</span>
                                </SpanCardDestaque>
                            </TextCardDestaque>
                        </CardDestaque>
                    </div>

                </Destaque>
            </div>

            {/* Conteúdo de Novidades */}
            <Novidade>
                <h2>NOVIDADES</h2>
                <div style={{ display: "flex", }}>
                    {produtoUpdate.map((produto) => {
                        const id = produto.produtoId || "000000";
                        const slug = `${normalizeSlug(produto.produtoNome)}-${id}`;

                        return (
                            <CardDestaque
                                onClick={() => router.push(`${slug}`)}
                                key={produto.produtoId}
                                style={{ position: "relative", marginLeft: "15px" }}
                            >
                                <Image
                                    style={{ objectFit: "contain" }}
                                    width={372}
                                    height={390}
                                    src={produto.imagens.length > 0 ? produto.imagens[0].url : "/web/default.png"}
                                    alt={produto.produtoNome}
                                />
                                <TextCardDestaque>
                                    <h3>{produto.produtoNome}</h3>
                                    <SpanCardDestaque>
                                        <span>R$ {produto.produtoPreco.toFixed(2)}</span>
                                        <span>10x R$ {(produto.produtoPreco / 10).toFixed(2)}</span>
                                    </SpanCardDestaque>
                                </TextCardDestaque>
                            </CardDestaque>
                        );
                    })}
                </div>
            </Novidade>

            {/* 
            <div style={{display: "flex", justifyContent: "center"}}>
            <ConhecaTambem>
                <h2>CONHEÇA TAMBÉM</h2>

                <div style={{ display: "flex", gap: 20 }}>
                    <CardConheca>
                        <Image
                            width={240}
                            height={380}
                            src={'/web/conhecaTambem.avif'}
                            alt="Ícone Lupa"
                        />
                        <div className="content">
                            <p>Conheça também</p>
                            <button>Saiba mais</button>
                        </div>
                    </CardConheca>
                    <CardConheca>

                    </CardConheca>
                </div>
                

            </ConhecaTambem>
            </div>
            */}
        </>
    );
}