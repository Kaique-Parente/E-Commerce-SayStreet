'use client'

import Modal from "@/components/Modal";
import { useCadastro } from "@/hooks/useCadastro"
import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
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

    width: 920px;
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

    input, select{
        background-color: #5f3e3e;

        padding: 8px;
        border-radius: 8px;
        border: 2px solid white;
    }

    select {
        font-size: 16px;
        margin-top: 10px;
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

const TextModal = styled.div`
   
`

const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file);
}

export default function CadastrarProduto() {
    const { nome, setNome, cpf, setCpf, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify, grupo, setGrupo, erro, setErro, handleSubmit, handleNomeChange, handleCpfChange, handleEmailChange, handlePasswordChange, handlePasswordVerifyChange, handleGrupoChange } = useCadastro();

    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleCloseModel = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])


    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    const handleRemoveImage = (idx) => {
        setHostedUrl((prevUrls) => prevUrls.filter((_, i) => i !== idx));
    };

    const handleUpload = async () => {
        if (!hostedFile) {
            alert('Selecione um arquivo primeiro.');
            return;
        }

        const formData = new FormData();
        formData.append('file', hostedFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Usando a variável de ambiente

        // Enviar o arquivo para o Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setImageUrl(data.secure_url); // Recebe a URL da imagem do Cloudinary
            alert('Upload realizado com sucesso!');
            saveImageUrl(data.secure_url);  // Envia a URL para o backend para salvar no banco
        } else {
            alert('Erro ao fazer upload.');
        }
    };

    const saveImageUrl = async (imageUrl) => {
        const produtoData = {
            nome: 'Produto exemplo', // Exemplo de nome do produto
            imagemUrl: imageUrl,     // URL da imagem que vem do Cloudinary
        };

        /*
        const response = await fetch('http://localhost:8080/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoData),
        });
        

        if (response.ok) {
            alert('Produto salvo com a URL da imagem!');
        } else {
            alert('Erro ao salvar produto no backend.');
        }
        */
    };

    /*
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Enviar para Cloudinary</button>
            {imageUrl && <img src={imageUrl} alt="Imagem do Produto" />}
        </div>
    );
    */

    //** Parte do vídeo */

    const [hostedUrl, setHostedUrl] = useState([]);
    const [ImageUrlProduct, setImageUrlProduct] = useState([{}]);

    useEffect(() => {
        console.log(hostedUrl);
        console.log(ImageUrlProduct);
    }, [hostedUrl])

    return (
        <div>
            <Container>
                <ContainerContent>
                    <form onSubmit={handleSubmit}>
                        <h2>Cadastrar Produto</h2>

                        <InputContainer>
                            <label className="label" htmlFor="nome">Nome do Produto:</label>
                            <input type="text" id="nome" onChange={handleNomeChange} value={nome} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="cpf">Preço:</label>
                            <input required type="text" id="cpf" onChange={handleCpfChange} value={cpf} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="email">Em estoque:</label>
                            <input required type="email" id="email" onChange={handleEmailChange} value={email} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="password">Descrição detalhada:</label>
                            <input required type="password" id="password" onChange={handlePasswordChange} value={password} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="passwordVerify">Avaliação:</label>
                            <input required type="password" id="passwordVerify" onChange={handlePasswordVerifyChange} value={passwordVerify} />
                        </InputContainer>

                        <ButtonsContainer>
                            <input
                                style={{ position: "absolute", right: "-99999px" }}
                                type="file"
                                onChange={handleFileChange}
                            />

                            <CldUploadWidget
                                uploadPreset="ml_default"
                                onSuccess={(results) => {
                                    setHostedUrl((prevHostedUrl) => [
                                        ...prevHostedUrl,
                                        { url: results?.info?.url, principal: prevHostedUrl.length === 0 },
                                    ]);
                                }}
                            >
                                {({ open }) => {
                                    return (
                                        <button type="button" onClick={() => open()}>
                                            Adicionar Imagens do Produto
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>


                            <button className="btn-confirmar" type="button">Confirmar</button>
                            <button className="btn-cancelar" type="button">Cancelar</button>
                        </ButtonsContainer>
                    </form>

                    {hostedUrl?.map((obj, idx) => (
                        <div key={idx}>
                            <div>
                                {/* Filtra a URL do hostedUrl removendo a URL que corresponde à imagem clicada */}
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
                                    XXX
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
                                    label="Produto Principal"
                                />
                                <Image src={obj.url} alt="Imagem do Produto" width={300} height={300} />
                            </div>
                        </div>
                    ))}
                </ContainerContent>
            </Container>
        </div >
    );
}