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

export default function Login(){
    const { email, password, erro, setEmail, setPassword, handleSubmit, handleEmailChange, handlePasswordChange } = UseLogin();

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

    return (
        <Container>
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
            </Container>
    );
}