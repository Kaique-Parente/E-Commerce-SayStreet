'use client';

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
`;

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
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;
    position: absolute;
    top: 30px;
    left: 20px;
    background-color: rgb(128, 227, 85);
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: rgb(84, 149, 56);
    }

    span {
        font-weight: bold;
        font-size: 14px;
    }
`;

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;

    span {
        font-size: 30px;
        text-decoration: underline;
        cursor: pointer;
    }
`;

export default function HomeClient() {
    const [setor, setSetor] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setSetor(searchParams.get('setor'));
    }, [searchParams]);

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
                            <span onClick={() => router.push(`./users?setor=${setor}`)}>
                                Listar Usuários
                            </span>
                            <span onClick={() => router.push(`./produtos?setor=${setor}`)}>
                                Listar Produto
                            </span>
                        </>
                    ) : (
                        <>
                            <span onClick={() => router.push(`./produtos?setor=${setor}`)}>
                                Listar Produto
                            </span>
                            <span onClick={() => router.push(`./pedidos?setor=${setor}`)}>
                                Listar Pedido
                            </span>
                        </>
                    )}
                </LinksContainer>
            </ContainerContent>
        </Container>
    );
}