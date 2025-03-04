'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    a{
        font-size: 30px;
        text-decoration: underline;
    }
`

export default function Home() {
    const searchParams = useSearchParams();
    const [setor, setSetor] = useState('');

    useEffect(() => {
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])

    return (
        <Container>
            <ContainerContent>
                <h1>Principal</h1>

                <LinksContainer>
                    {setor === 'adm' ? (
                        <>
                            <Link href="./users" style={{cursor: "pointer"}}>
                                <span>Listar Usuários</span>
                            </Link>

                            <Link href="./" style={{cursor: "pointer"}}>
                                <span>Listar Produto</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="./" style={{cursor: "pointer"}}>
                                <span>Listar Produto</span>
                            </Link>

                            <Link href="./" style={{cursor: "pointer"}}>
                                <span>Listar Pedido</span>
                            </Link>
                        </>
                    )}
                    
                </LinksContainer>
            </ContainerContent>
        </Container>
    );
}