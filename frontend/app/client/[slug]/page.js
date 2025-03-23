'use client'

import NavBar from "@/components/ClientComponents/NavBar";
import { encontrarProdutoId } from "@/services/ProdutoService";
import { assignRef } from "@coreui/react/dist/esm/hooks/useForkedRef";
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
    const [produto, setProduto] = useState({});
    const [erro, setErro] = useState([]);

    const handleProcurarProduto = async (e) => {
        console.log(id);
        try{
            const response = await encontrarProdutoId(id);
            if(response!=null){
               setProduto(response);
            }else {
                alert("Produto não encontrado");
            }
        }catch (error) {
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }


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

    useEffect(() => {
        if(id){
            handleProcurarProduto();
        }
    }, [id])

    useEffect(() => {
        console.log(produto);
    }, [produto])

   
    return (
        <>
            <NavBar />
            <Container>
                <div>
                    <div>
                        
                    </div>

                    <div>

                    </div>

                    <h1 style={{ marginTop: 100 }}>Detalhes do Produto</h1>
                    <p>Produto: {slug}</p>
                    <p>Nome do Produto: {produto.produtoNome}</p>
                    <p>ID: {id}</p>
                </div>
            </Container>
           
        </>
    );
}