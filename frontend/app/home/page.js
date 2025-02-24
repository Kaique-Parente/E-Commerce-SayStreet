'use client'
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border: 1px solid white;

    gap: 30px;
`

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    a{
        font-size: 30px;
        text-decoration: underline;
    }
`

export default function Home(){
    return (
        <Container>
            <h1>Principal</h1>

            <LinksContainer>
                <a>Listar Produto</a>
                <a>Listar Usuário</a>
                <a>Listar Pedidos</a>
            </LinksContainer>
        </Container>
    );
}