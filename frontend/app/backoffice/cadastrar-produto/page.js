'use client'

import { CarouselWithIndicators } from "@/components/CoreUI/CarouselWithIndicators";
import Modal from "@/components/Modal";
import { useCadastroProduto } from "@/hooks/useCadastroProduto";
import { useCadastroUser } from "@/hooks/useCadastroUser"
import { cadastrarProduto } from "@/services/ProdutoService";
import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Rating } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainerContent = styled.div`
    background-color: #62656773;
    
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 920px;
    gap: 100px;

    padding: 100px 80px;
    border-radius: 12px;

    h2 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    h3 {
        margin: 15px 0;
    }

    button:hover {
        background-color: rgba(98, 101, 103, 0.9);
    }
`

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    gap: 5px;

    margin-bottom: 20px;

    input, select, .input-styles{
        background-color:rgb(85, 76, 76);

        padding: 8px;
        border-radius: 8px;
        border: 2px solid white;
    }

    input, select, textarea {
        color: rgb(196, 190, 190);
    }

    select {
        font-size: 16px;
        margin-top: 10px;
    }

    textarea{
        height: 100px;
    }
`

const ButtonsContainer = styled.div`
    button {
        background: none;
        border: 1px solid white;
        border-radius: 8px;

        padding: 10px 20px;
        margin-top: 10px;

        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5px;

    .btn-cancelar{
        width: 150px;
    }

    .btn-confirmar{
        width: 220px;
    }
`

const ContainerImagesOptions = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
    margin-bottom: 20px;

    span:nth-child(1) {
        font-size: 18px;
    }

    button{
        border: none;
        border-radius: 8px;

        padding: 6px 8px;
        background-color:rgba(255, 0, 0, 0.49);

        &:hover {
            background-color:rgba(255, 0, 0, 0.7);
        }
    }
`

const ViewContainerCarousel = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
`

export default function CadastrarProduto() {

    const {
        hostedUrl,
        nome,
        preco,
        estoque,
        descricao,
        avaliacao,
        setHostedUrl,
        handleNomeChange,
        handlePrecoChange,
        handleEstoqueChange,
        handleDescricaoChange,
        handleAvaliacaoChange,
        handleSuccessFile
    } = useCadastroProduto();

    const [images, setImages] = useState([]);
    const [setor, setSetor] = useState('');

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])

    useEffect(() => {
        console.log(hostedUrl);
        const imageArray = hostedUrl.map((item) => item.url); // Cria um array de URLs diretamente
        setImages(imageArray); // Atualiza o estado com o array de URLs
    }, [hostedUrl]);

    useEffect(() => {
        console.log('Imagens: ' + images);
    }, [images])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hostedUrl.length > 0) {
            const produto = {
                produtoNome: nome,
                produtoPreco: preco,
                produtoQtd: estoque,
                produtoDesc: descricao,
                produtoAvaliacao: avaliacao,
                produtoImagens: hostedUrl,
            };

            try {
                const response = await cadastrarProduto(produto);

                if (response !== null) {
                    alert(response);

                    router.push(`./produtos?setor=${setor}`);
                } else {
                    setErro(response);
                }


            } catch (error) {
                console.log(error);
                setErro("Erro de comunicação com o servidor!");
            }

        } else {
            alert('Adicione no mínimo uma imagem para o produto!');
        }
    };

    return (
        <div>
            <Container>
                <ContainerContent>
                    <form onSubmit={handleSubmit}>
                        <h2>Cadastrar Produto</h2>

                        <InputContainer>
                            <label className="label" htmlFor="nome">Nome do Produto:</label>
                            <input required type="text" id="nome" onChange={handleNomeChange} value={nome} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="preco">Preço:</label>
                            <input required type="number" id="preco" onChange={handlePrecoChange} value={preco} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="estoque">Em estoque:</label>
                            <input required type="number" id="estoque" onChange={handleEstoqueChange} value={estoque} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="descricao">Descrição detalhada:</label>
                            <textarea required className="input-styles" id="descricao" onChange={handleDescricaoChange} value={descricao} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="avaliacao">Avaliação:</label>
                            <Rating
                                name="simple-uncontrolled"
                                className="input-styles"
                                value={avaliacao}
                                onChange={handleAvaliacaoChange}
                                precision={0.5}
                                defaultValue={0.5}
                                size="large"
                            />
                        </InputContainer>

                        <ButtonsContainer>
                            <CldUploadWidget
                                uploadPreset="ml_default"
                                onSuccess={handleSuccessFile}
                            >
                                {({ open }) => {
                                    return (
                                        <button type="button" onClick={() => open()}>
                                            Adicionar Imagens do Produto
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>


                            <button className="btn-confirmar" type="submit">Confirmar</button>
                            <button className="btn-cancelar" onClick={() => router.push(`./produtos?setor=${setor}`)} type="button">Cancelar</button>
                        </ButtonsContainer>
                    </form>

                    <div>
                        {hostedUrl?.map((obj, idx) => (
                            <div key={idx}>
                                <ContainerImagesOptions>
                                    {/* Filtra a URL do hostedUrl removendo a URL que corresponde à imagem clicada */}
                                    <span>Item: {idx + 1}</span>
                                    <button onClick={() => {
                                        setHostedUrl((prevHostedUrl) => {
                                            // Remove o item clicado
                                            const updatedList = prevHostedUrl.filter((_, i) => i !== idx);

                                            // Se o item removido era o principal, define o primeiro como principal (se existir)
                                            if (obj.principal && updatedList.length > 0) {
                                                updatedList[0] = { ...updatedList[0], principal: true };
                                            }

                                            return updatedList;
                                        });
                                    }}
                                    >
                                        <Image width={18} height={18} src={'/backoffice/lixo.svg'} alt="Icone de um lixo" />
                                        Remover
                                    </button>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={obj.principal}
                                                onChange={() => {
                                                    setHostedUrl((prevHostedUrl) =>
                                                        prevHostedUrl.map((item, i) => ({
                                                            ...item,
                                                            principal: i === idx, // Define `true` apenas para o item clicado
                                                        }))
                                                    );
                                                }}
                                            />
                                        }
                                        label="Imagem Principal"
                                    />
                                </ContainerImagesOptions>
                            </div>
                        ))}
                        <ViewContainerCarousel>
                            <CarouselWithIndicators images={images} />
                        </ViewContainerCarousel>
                    </div>
                </ContainerContent>
            </Container>
        </div >
    );
}