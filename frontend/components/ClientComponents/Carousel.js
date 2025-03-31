"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importação correta do router
import styled from "styled-components";
import Image from "next/image";

// Função para normalizar o slug
const normalizarSlug = (string) => {
  return string
    .toLowerCase()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, "") // Remove caracteres especiais
    .replace(/\-\-+/g, "-") // Remove hífens duplicados
    .replace(/^-+/, "") // Remove hífens no início
    .replace(/-+$/, ""); // Remove hífens no final  
};

// Defina o seu Carrossel normalmente
const ContainerCarrossel = styled.div`
  width: 80%;
  max-width: 1300px;
  overflow: hidden;
  position: relative;
  display: flex;
  alin-items = center;
  justifyContent: center;
`;

const MovCarrossel = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

const ItemCarrossel = styled.div`
  flex: 0 0 33.33%;
  padding: 0 10px; /* Espaçamento entre os itens */
  position: relative;
  cursor: pointer;
`;

const Setinha = styled.div`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  z-index: 1;
`;

const CartaoDestaque = styled.div`
  margin-top: 100px;
  padding: 20px 10px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: border 0.3s ease-in-out;
  transition: transform 3.2 ease-in-out;

  &:hover {
    border-color: rgba(255, 227, 23, 0.95);
    transform: scale(1.02) translateY(-15px);

    img {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  }

  transition: transform 0.3s ease-in-out, border 0.3s ease-in-out;
`;

const TextoCartaoDestaque = styled.div`
  position: absolute;
  text-align: center;
  bottom: 40px;
  right: 0;
  left: 0;
`;

const SpanCartaoDestaque = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;

  span:nth-child(1) {
    font-weight: bold;
  }
`;

export default function Carrossel({ produtoUpdate }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [eCliente, setECliente] = useState(false); // Para garantir que o useRouter funcione no cliente

  const router = useRouter();

  useEffect(() => {
    setECliente(true); // Apenas no cliente
  }, []);

  if (!eCliente) {
    return null; // Não renderiza nada até que o componente seja montado no cliente
  }

  const itensPorPagina = 3; // Exibir exatamente 3 itens por vez

  const handleProximo = () => {
    if (indiceAtual + itensPorPagina < produtoUpdate.length) {
      setIndiceAtual((prevIndex) => prevIndex + itensPorPagina);
    }
  };

  const handleAnterior = () => {
    if (indiceAtual - itensPorPagina >= 0) {
      setIndiceAtual((prevIndex) => prevIndex - itensPorPagina);
    }
  };

  return (
    <ContainerCarrossel>
      <Setinha direction="left" onClick={handleAnterior}>
        {"<"}
      </Setinha>
      <MovCarrossel
        style={{
          transform: `translateX(-${(indiceAtual * 100) / itensPorPagina}%)`,
        }}
      >
        {produtoUpdate.map((produto, index) => {
          const id = produto.produtoId || "000000";
          const slug = `${normalizarSlug(produto.produtoNome)}-${id}`;

          return (
            <ItemCarrossel key={index}>
              <CartaoDestaque onClick={() => router.push(`${slug}`)}>
                <Image
                  style={{ objectFit: "contain" }}
                  width={372}
                  height={390}
                  src={
                    produto.imagens.length > 0
                      ? produto.imagens[0].url
                      : "/web/default.png"
                  }
                  alt={produto.produtoNome}
                />
                <TextoCartaoDestaque>
                  <h3>{produto.produtoNome}</h3>
                  <SpanCartaoDestaque>
                    <span>R$ {produto.produtoPreco.toFixed(2)}</span>
                    <span>10x R$ {(produto.produtoPreco / 10).toFixed(2)}</span>
                  </SpanCartaoDestaque>
                </TextoCartaoDestaque>
              </CartaoDestaque>
            </ItemCarrossel>
          );
        })}
      </MovCarrossel>
      <Setinha direction="right" onClick={handleProximo}>
        {">"}
      </Setinha>
    </ContainerCarrossel>
  );
}
