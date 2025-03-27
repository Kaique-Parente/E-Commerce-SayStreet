"use client"

import { createContext, useContext, useEffect, useState } from "react"

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

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

    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarItem }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export const useCarrinho = () => {
    return useContext(CarrinhoContext);
}