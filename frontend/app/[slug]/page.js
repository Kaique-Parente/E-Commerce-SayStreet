'use client'

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import EscolherTamanho from "@/components/ClientComponents/EscolherTamanho";
import NavBar from "@/components/ClientComponents/NavBar";
import { CarouselWithIndicators } from "@/components/CoreUI/CarouselWithIndicators";
import { encontrarProdutoId } from "@/services/ProdutoService";
import { assignRef } from "@coreui/react/dist/esm/hooks/useForkedRef";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-top: 380px;
`

const ProductContainer = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;

    gap: 50px;
`

const DescribeContainer = styled.div`
    width: 350px;

    h1{
        font-size: 30px;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    padding-top: 20px;

    button:nth-child(2){
        width: 110px;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
`

const DetailsContainer = styled.div`
    max-width: 1200px;

    margin: 0px auto;
    margin-top: 120px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    padding: 0px 115px;

    p{
        word-wrap: break-word; /* Quebra palavras longas */
        white-space: pre-wrap; /* Mantém quebras de linha do texto */
        overflow-wrap: break-word; /* Garante a quebra em navegadores modernos */
    }
`

export default function ProdutoDetalhes({ params }) {

    const [id, setId] = useState(null);
    const [produto, setProduto] = useState(null);
    const [images, setImages] = useState([]);
    const [erro, setErro] = useState([]);

    const handleProcurarProduto = async (e) => {
        console.log(id);
        try {
            const response = await encontrarProdutoId(id);
            if (response != null) {
                setProduto(response);
            } else {
                alert("Produto não encontrado");
            }
        } catch (error) {
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }

    const resolvedParams = use(params);
    const slug = resolvedParams?.slug;

    useEffect(() => {
        if (slug) {
            const produtoId = slug.split('-').pop();
            setId(produtoId);
        }
    }, [slug]);

    useEffect(() => {
        if (id) {
            handleProcurarProduto();
        }
    }, [id])

    useEffect(() => {
        console.log(produto);

        if (produto) {
            const imageArray = produto.imagens.map((img) => img.url);
            setImages(imageArray);
        }
    }, [produto])


    return (
        <>
            <NavBar />
            <Container>

                <ProductContainer>
                    <div style={{ width: 570, height: 510 }}>
                        <CarouselWithIndicators images={images} />
                    </div>
                    <DescribeContainer>
                        <h1>{produto?.produtoNome || "Carregando..."}</h1>
                        <span>R$ {produto?.produtoPreco || "Carregando..."}</span>
                        <div>
                            <label className="label" htmlFor="avaliacao">Avaliação:</label>
                            <Rating
                                name="simple-uncontrolled"
                                className="input-styles"
                                value={produto?.produtoAvaliacao || 5}
                                precision={0.5}
                                defaultValue={0.5}
                                disabled
                                size="large"
                            />
                        </div>

                        <div>
                            <h4>Escolher Tamanho:</h4>
                            <EscolherTamanho />
                        </div>

                        <ButtonContainer>
                            <BotaoPersonalizado
                                width={250}
                                height={45}
                                color="amarelo"
                            >
                                Comprar Agora
                            </BotaoPersonalizado>
                            <button>
                                <Image width={18} height={18} src={'./web/sacola.svg'} alt="Icone de uma sacola" />
                                <span>+</span>
                            </button>
                        </ButtonContainer>
                    </DescribeContainer>


                </ProductContainer>

                <DetailsContainer>
                    <h2>Detalhes do Produto</h2>
                    <p>dwadawdaw</p>
                </DetailsContainer>

            </Container>

        </>
    );
}