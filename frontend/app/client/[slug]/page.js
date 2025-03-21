'use client'

import NavBar from "@/components/ClientComponents/NavBar";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`

export default function ProdutoDetalhes({ params }) {

    const [id, setId] = useState(null);

    // Acessando o 'slug' vindo da URL
    const resolvedParams = use(params); // Usando React.use() para resolver a Promise de params
    const slug = resolvedParams?.slug;

    useEffect(() => {
        if (slug) {
            // Extraindo o ID do produto (último valor do slug)
            const produtoId = slug.split('-').pop();
            setId(produtoId);
        }
    }, [slug]);

    return (
        <>
            <NavBar />
            <Container>
                <div>
                    <h1 style={{ marginTop: 100 }}>Detalhes do Produto</h1>
                    <p>Produto: {slug}</p>
                    <p>ID: {id}</p>
                </div>
            </Container>
           
        </>
    );
}