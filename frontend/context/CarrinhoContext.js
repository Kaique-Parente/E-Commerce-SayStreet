"use client"

import { createContext, useContext, useEffect, useState } from "react"

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
    const [valorTotal, setValorTotal] = useState(0.0);
    const [frete, setFrete] = useState(0.0);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState('');

    const [valorTotalFrete, setValorTotalFrete] = useState(0.0);
    const [metodoPagamento, setMetodoPagamento] = useState({});
    const [desconto, setDesconto] = useState(0.0);
    const [numeroParcelas, setNumeroParcelas] = useState(0);

    const salvarCarrinhoNoLocalStorage = (novoCarrinho) => {
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    };

    // Carregar o carrinho do localStorage, se existir
    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
    }, []);

    useEffect(() => {
        const totalProdutos = carrinho.reduce((acc, item) => acc + (item.produtoPreco * item.quantidade), 0);
        setValorTotal(totalProdutos);
    }, [carrinho]);

    // Função para adicionar item ao carrinho
    const adicionarItem = (novoItem) => {
        setCarrinho((prev) => {
            const itemExistente = prev.find(
                (item) => item.produtoId === novoItem.produtoId && item.produtoTamanho === novoItem.produtoTamanho
            );

            let novoCarrinho;
            if (itemExistente) {
                novoCarrinho = prev.map((item) =>
                    item.produtoId === novoItem.produtoId && item.produtoTamanho === novoItem.produtoTamanho
                        ? { ...item, quantidade: item.quantidade + novoItem.quantidade }
                        : item
                );
            } else {
                novoCarrinho = [...prev, novoItem];
            }

            // Salva o carrinho atualizado no localStorage
            salvarCarrinhoNoLocalStorage(novoCarrinho);
            return novoCarrinho;
        });
    };

    // Função para incrementar a quantidade de um item no carrinho
    const incrementarQuantidade = (produtoId, produtoTamanho) => {
        setCarrinho((prev) => {
            const novoCarrinho = prev.map((item) =>
                item.produtoId === produtoId && item.produtoTamanho === produtoTamanho
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            );
            salvarCarrinhoNoLocalStorage(novoCarrinho);
            return novoCarrinho;
        });
    };

    // Função para decrementar a quantidade de um item no carrinho
    const decrementarQuantidade = (produtoId, produtoTamanho) => {
        setCarrinho((prev) => {
            const novoCarrinho = prev.map((item) =>
                item.produtoId === produtoId && item.produtoTamanho === produtoTamanho && item.quantidade > 1
                    ? { ...item, quantidade: item.quantidade - 1 }
                    : item
            );
            salvarCarrinhoNoLocalStorage(novoCarrinho);
            return novoCarrinho;
        });
    };

    // Função para remover um item do carrinho
    const removerProduto = (produtoId, produtoTamanho) => {
        setCarrinho((prev) => {
            const novoCarrinho = prev.filter(
                (item) => item.produtoId !== produtoId || item.produtoTamanho !== produtoTamanho
            );
            salvarCarrinhoNoLocalStorage(novoCarrinho);
            return novoCarrinho;
        });
    };

    //Função para limpar o carrinho
    const limparCarrinho = () => {
        setCarrinho([]);
        localStorage.removeItem("carrinho");
    };

    // Calcular a quantidade total de itens no carrinho
    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                quantidadeTotal,
                adicionarItem,
                incrementarQuantidade,
                decrementarQuantidade,
                removerProduto,
                limparCarrinho,
                enderecoSelecionado,
                setEnderecoSelecionado,
                frete, 
                setFrete,
                valorTotal,
                valorTotalFrete, 
                setValorTotalFrete,
                metodoPagamento, 
                setMetodoPagamento,
                desconto, 
                setDesconto,
                numeroParcelas, 
                setNumeroParcelas,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => {
    return useContext(CarrinhoContext);
};
