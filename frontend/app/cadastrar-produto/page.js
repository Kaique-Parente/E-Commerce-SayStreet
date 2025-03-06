'use client'

import { useCadastro } from "@/hooks/useCadastro"
import Image from "next/image";
import { useEffect, useRef } from "react";
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

    button {
        background: none;
        border: 1px solid white;
        border-radius: 8px;

        padding: 10px 20px;
        margin-top: 10px;

        cursor: pointer;
        transition: background-color 0.3s ease;
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
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5px;

    .btn-cancelar{
        width: 150px;
    }
`

const handleFileChange = (e) =>{
    const file = e.target.files?.[0];
    console.log(file);
}

export default function CadastrarProduto() {
    const { nome, setNome, cpf, setCpf, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify, grupo, setGrupo, erro, setErro, handleSubmit, handleNomeChange, handleCpfChange, handleEmailChange, handlePasswordChange, handlePasswordVerifyChange, handleGrupoChange } = useCadastro();

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

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
                                ref={fileInputRef} 
                                style={{position: "absolute", right: "-99999px"}} 
                                type="file"
                                onChange={handleFileChange}
                            />
                            <button type="button" onClick={() => {
                                fileInputRef.current?.click();
                            }}
                            >
                                Adicionar Imagens do Produto
                            </button>
                            <button className="btn-cancelar" type="button">Cancelar</button>
                        </ButtonsContainer>
                    </form>

                    <Image src={'/pesquisar.png'} alt="Imagem do Produto" width={300} height={300}/>
                </ContainerContent>
            </Container>
        </div >
    );
}