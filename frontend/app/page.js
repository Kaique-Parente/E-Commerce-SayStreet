'use client'

import UseLogin from "@/hooks/useLogin";
import { useEffect, useState } from "react";
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

    input {
        background-color: #5f3e3e;

        padding: 8px;
        border-radius: 8px;
        border: 2px solid white;
    }
`

export default function Login(){
    const { email, password, erro, setEmail, setPassword, handleSubmit, handleEmailChange, handlePasswordChange } = UseLogin();

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

    return (
        <Container>
            <ContainerContent>
                <h2>Login backOffice</h2>
                <form onSubmit={handleSubmit}>
                    
                    <InputContainer>
                        <label className="label" htmlFor="email">Email:</label>
                        <input required type="email" id="email" onChange={handleEmailChange} value={email} />
                    </InputContainer>

                    <InputContainer>
                        <label className="label" htmlFor="password">Password:</label>
                        <input required type="password" id="password" onChange={handlePasswordChange} value={password} />
                    </InputContainer>

                    <button type="submit">Confirmar</button>
                </form>
            </ContainerContent>
        </Container>
    );
}