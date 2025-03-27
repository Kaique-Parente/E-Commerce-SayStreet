"use client"

import { useCarrinho } from "@/context/CarrinhoContext";
import Image from "next/image";

export default function Carrinho() {
    const { carrinho } = useCarrinho();

    return (
        <>
            <h1>Meu Carrinho</h1>
            {carrinho.map((item) => {
                console.log(item); // Agora, o console.log está dentro da função de callback do map, antes do return
                return (
                    <div key={`${item.produtoId}-${item.produtoTamanho}`}>
                        <p>ID: {item.produtoId}</p>
                        <p>Nome: {item.produtoNome}</p>
                        <p>Preço: {item.produtoPreco}</p>
                        <p>Tamanho: {item.produtoTamanho}</p>

                        {/* Verificar se imagem é um objeto e renderizar a URL */}
                        {item.imagem && item.imagem.url ? (
                            <Image width={372} height={390} src={item.imagem.url} alt={item.produtoNome} />
                        ) : (
                            <p>Imagem não disponível</p>
                        )}

                        <p>Quantidade: {item.quantidade}</p>
                    </div>
                );
            })}

        </>
    );
}