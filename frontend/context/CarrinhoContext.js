"use client"

import { createContext, useContext, useState } from "react"

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarItem = (novoItem) => {
        setCarrinho((prev) => {
            const itemExistente = prev.find((item) => item.produtoId === novoItem.produtoId);
            const itemTamanhoExistente = prev.find((item) => item.produtoTamanho === novoItem.produtoTamanho)

            if (itemExistente && itemTamanhoExistente) {
                return prev.map((item) =>
                    item.produtoId === novoItem.produtoId
                        ? { ...item, quantidade: item.quantidade + novoItem.quantidade }
                        : item
                );
            } else {
                return [...prev, novoItem];
            }
        });
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarItem }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export const useCarrinho = () => {
    return useContext(CarrinhoContext);
}