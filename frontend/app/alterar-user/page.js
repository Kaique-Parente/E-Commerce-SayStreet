'use client'

import { useAlterar } from "@/hooks/useAlterar";
import { useCadastro } from "@/hooks/useCadastro"
import { useEffect } from "react";
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
    flex-direction: column;
    gap: 30px;

    padding: 100px 80px;
    border-radius: 12px;

    h2 {
        font-size: 30px;
        font-weight: bold;
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
        background-color:rgb(85, 76, 76);
        color: rgb(196, 190, 190);

        padding: 8px;
        border-radius: 8px;
        border: 2px solid white;
    }

    select {
        font-size: 16px;
        margin-top: 10px;
    }
`

export default function AlterarUser() {
    const { nome, setNome, cpf, setCpf, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify, grupo, setGrupo, erro, setErro, handleSubmit, handleNomeChange, handleCpfChange, handleEmailChange, handlePasswordChange, handlePasswordVerifyChange, handleGrupoChange } = useAlterar();

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

    useEffect(() => {
        console.log(grupo);
    }, [grupo])

    return (
        <div>
            <Container>
                <ContainerContent>
                    <h2>Alterar Usuário</h2>
                    <form onSubmit={handleSubmit}>
                        <h3>Informação Pessoal</h3>
                        <InputContainer>
                            <label className="label" htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" onChange={handleNomeChange} value={nome} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="cpf">CPF:</label>
                            <input required type="text" id="cpf" onChange={handleCpfChange} value={cpf} />
                        </InputContainer>

                        <h3>Informação de Contato</h3>
                        <InputContainer>
                            <label className="label" htmlFor="email">Email:</label>
                            <input disabled type="email" id="email" onChange={handleEmailChange} value={email} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="password">Senha:</label>
                            <input required type="password" id="password" onChange={handlePasswordChange} value={password} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="passwordVerify">Confirmar Senha:</label>
                            <input required type="password" id="passwordVerify" onChange={handlePasswordVerifyChange} value={passwordVerify} />
                        </InputContainer>


                        <InputContainer>
                            <label className="label" htmlFor="grupo">Grupo:</label>
                            <select
                                id="grupoSelect"
                                value={grupo}
                                onChange={handleGrupoChange}
                                style={{ padding: "8px", fontSize: "16px", marginTop: "10px" }}
                            >
                                <option value="admin">Admin</option>
                                <option value="estoquista">Estoquista</option>
                            </select>
                        </InputContainer>

                        <button type="submit">Confirmar</button>
                    </form>
                </ContainerContent>
            </Container>
        </div>
    );
}