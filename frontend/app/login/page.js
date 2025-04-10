"use client"

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import NavBar from "@/components/ClientComponents/NavBar";
import { TextField } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
`;

const CardContainer = styled.div`
    background-color: rgb(255 251 251);
    margin-top: 100px;
    padding: 80px 60px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 600px;

    box-shadow: 1px 1px 24px 1px rgba(0,0,0,0.2);
`;

const FormContainer = styled.form`
    color: #584439;
`

const TextContainer = styled.div`
    h1{
        margin-bottom: 10px;
    }
`

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin: 35px 0px 25px;

    label{
        font-size: 18px;
    }

    input{
        margin-bottom: 15px;
        padding: 15px 18px;

        border: 1px solid #584439;
        border-radius: 6px;

        font-size: 14px;
    }

    input:focus{
        border: 2px solid rgb(43, 34, 29);
    }
`

const LinhaDivisao = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    div{
        background:rgba(168, 167, 167, 0.62);

        width: 75%;
        padding: 1px;
        border-radius: 18px;
        margin-top: 40px;
    }
`

const CriarContaContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    a{
        text-decoration: underline;
    }
    
`

export default function Login() {

    const { data: session, status } = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value || "");
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value || "");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (response.ok) {
            alert("Sucesso!");
            router.push("./");
        } else {
            alert(response.error);
        }
    }

    useEffect(() => {
        if(session){
            console.log(session.user);
        }
    }, [session])

    return (
        <>
            <NavBar />
            <Container>
                <CardContainer>
                    <FormContainer onSubmit={handleSubmit}>
                        <TextContainer>
                            <h1>Faça o Login</h1>
                            <p>Entre e aproveite o melhor do StreetWear</p>
                        </TextContainer>

                        <InputsContainer>
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                id="email"
                                value={email || ""}
                                onChange={handleEmailChange}
                                type="email"
                                placeholder="Email"
                            />

                            <label htmlFor="password">Senha</label>
                            <input
                                required
                                id="password"
                                value={password || ""}
                                onChange={handlePasswordChange}
                                type="password"
                                placeholder="Senha"
                            />
                        </InputsContainer>

                        <BotaoPersonalizado color="amarelo" type="submit" width="100%">
                            Enviar
                        </BotaoPersonalizado>

                    </FormContainer>

                    <LinhaDivisao>
                        <div />
                    </LinhaDivisao>

                    <CriarContaContainer>
                        <Link href={"./cadastrar"}>Criar nova conta</Link>
                    </CriarContaContainer>
                </CardContainer>
            </Container>
        </>
    );
}