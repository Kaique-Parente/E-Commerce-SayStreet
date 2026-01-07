"use client";

import NavBar from '@/components/ClientComponents/NavBar';
import { Sidebar } from '@/components/CoreUI/Sidebar';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 120px 120px 50px;
`;

export default function Perfil() {

    const { data: session, status } = useSession();
    const user = session?.user;
    const genero = user?.genero.toLowerCase();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [])

    if (!session) {
        return (
            <div style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <Container>
            <h1>{genero === 'masculino' ? "Bem-vindo " : "Bem-vinda "}{user?.nome}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores veritatis, libero sequi voluptate nobis magnam sunt alias atque molestias earum tempora exercitationem fugit maiores nam dolorum sed repellat, quasi animi!</p>
        </Container>
    );
}