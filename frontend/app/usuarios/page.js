'use client'

import { useCadastro } from "@/hooks/useCadastro"
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 30px;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    gap: 5px;

    margin-bottom: 20px;
`

export default function Usuarios() {
    const { nome, setNome, cpf, setCpf, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify, grupo, setGrupo, erro, setErro, handleSubmit, handleNomeChange, handleCpfChange, handleEmailChange, handlePasswordChange, handlePasswordVerifyChange, handleGrupoChange } = useCadastro();

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

    return (
        <div>
            <Container>
                <h2>Cadastrar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Informação Pessoal</h3>
                    <InputContainer>
                        <label className="label" htmlFor="nome">Nome:</label>
                        <input  type="text" id="nome" onChange={handleNomeChange} value={nome} />
                    </InputContainer>

                    <InputContainer>
                        <label className="label" htmlFor="cpf">CPF:</label>
                        <input required type="text" id="cpf" onChange={handleCpfChange} value={cpf} />
                    </InputContainer>

                    <h3>Informação de Contato</h3>
                    <InputContainer>
                        <label className="label" htmlFor="email">Email:</label>
                        <input required type="email" id="email" onChange={handleEmailChange} value={email} />
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
            </Container>
        </div>
    );
}