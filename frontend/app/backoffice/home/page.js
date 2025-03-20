'use client'
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
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
    flex-direction: column;
    gap: 30px;

    padding: 100px 80px;
    border-radius: 12px;

    h1 {
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

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;

    position: absolute;
    top: 30px;
    left: 20px;

    background-color:rgb(128, 227, 85);

    border: none;
    border-radius: 8px;
    
    cursor: pointer;

    &:hover{
        background-color:rgb(84, 149, 56);
    }

    span{
        font-weight: bold;
        font-size: 14px;
    }
`

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    span{
        font-size: 30px;
        text-decoration: underline;
    }
`

export default function Home() {
    const [setor, setSetor] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])

    return (
        <Container>
            <BackButton onClick={() => router.push(`./`)}>
                <Image width={24} height={24} src={'/backoffice/porta-aberta.svg'} alt="Porta aberta" />
                <span>Sair</span>
            </BackButton>
            <ContainerContent>
                <h1>Principal</h1>

                <LinksContainer>
                    {setor === 'admin' ? (
                        <>
                            <a onClick={() => router.push(`./users?setor=${setor}`)} style={{ cursor: "pointer" }}>
                                <span>Listar Usuários</span>
                            </a>

                            <a onClick={() => router.push(`./produtos?setor=${setor}`)} style={{ cursor: "pointer" }}>
                                <span>Listar Produto</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <a onClick={() => router.push(`./produtos?setor=${setor}`)} style={{ cursor: "pointer" }}>
                                <span>Listar Produto</span>
                            </a>

                            <a onClick={() => router.push(`./users?setor=${setor}`)} style={{ cursor: "pointer" }}>
                                <span>Listar Pedido</span>
                            </a>
                        </>
                    )}

                </LinksContainer>
            </ContainerContent>
        </Container>
    );
}