"use client"

import { Sidebar } from "@/components/CoreUI/Sidebar";
import { useSession } from "next-auth/react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px;
`;

export default function MeusDados() {
    const { data: session, status } = useSession();
    const user = session?.user;

    return (
        <Container>
            <h1>MEUS DADOS</h1>
            <p><strong>Nome:</strong> {user?.nome}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>CPF:</strong> {user?.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {user?.dataNascimento}</p>
            <p><strong>Gênero:</strong> {user?.genero}</p>
        </Container>
    );
}