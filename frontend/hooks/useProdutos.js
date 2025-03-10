'use client'

import { useState, useEffect } from "react";
import { listarProduto, atualizarStatusUserProduto, encontrarProdutoId } from "@/services/ProdutoService";
import { useRouter } from "next/navigation";

export default function useProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [hiddenModel, setHiddenModel] = useState(true);
    const [lastStatus, setLastStatus] = useState('Inativar');
    const [lastProdutoChange, setLastProdutoChange] = useState(null);
    const [idUpdateProduto, setIdUpdateProduto] = useState(null);
    const [nomeFiltro, setNomeFiltro] = useState('');
    const [hiddenView, setHiddenView] = useState(true);

    const [viewImages, setViewImages] = useState([]);
    const [produtoView, setProdutoView] = useState(null);
    const router = useRouter();

    const atualizarTabela = async () => {
        try {
            const response = await listarProduto();
            console.log(response);

            setProdutos(response.map(produto => ({
                id: produto.produtoId,
                nome: produto.produtoNome,
                qtd: produto.produtoQtd,
                preco: produto.produtoPreco,
                status: produto.produtoStatus,
            })));

        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    const handleConfirmModel = () => {
        alert(`Você ${lastStatus === "Ativar" ? "Ativou" : "Inativou"} o produto com sucesso!`);

        setProdutos((produtos) => {
            return produtos.map((produto) => {
                if (produto.id === idUpdateProduto) {
                    const novoStatus = !produto.status;
                    setHiddenModel(false);
                    setLastProdutoChange(produto);
                    setLastStatus(produto.status ? "Ativar" : "Inativar");

                    atualizarStatusUserProduto(produto.id, novoStatus);

                    const updatedProduto = { ...produto, status: novoStatus };

                    setHiddenModel(true);
                    return updatedProduto;
                }
                return produto;
            });
        });
    }

    const handleCloseModel = () => {
        setHiddenModel(true);
    }

    const handleNomeFiltro = (e) => {
        setNomeFiltro(e.target.value);
    };

    const handleCloseView = () => {
        setHiddenView(true);
    }

    const handleViewProduto = async (id) => {
        setHiddenView(false);
        
        try{
            const response = await encontrarProdutoId(id);

            if(response !== null){
                setProdutoView(response);
            }

        }catch(error){
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }

    const handleAlternarStatus = (id) => {
        setHiddenModel(false);
        setIdUpdateProduto(id);

        produtos.forEach((produto) => {
            if (produto.id === id) {
                setLastStatus(produto.status ? "Inativar" : "Ativar");
            }
        });
    };

    return {
        produtos,
        hiddenModel,
        lastStatus,
        lastProdutoChange,
        idUpdateProduto,
        nomeFiltro,
        hiddenView,
        viewImages,
        produtoView,
        setProdutos,
        setHiddenModel,
        setLastStatus,
        setLastProdutoChange,
        setIdUpdateProduto,
        setNomeFiltro,
        setHiddenView,
        setViewImages,
        setProdutoView,
        atualizarTabela,
        handleConfirmModel,
        handleCloseModel,
        handleNomeFiltro,
        handleAlternarStatus,
        handleViewProduto
    };
}