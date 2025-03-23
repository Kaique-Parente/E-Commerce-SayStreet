"use client";

import { useState } from "react";
import styled from "styled-components";

const TamanhosContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BotaoTamanho = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid ${({ $selecionado }) => ($selecionado ? "#ff6600" : "#ccc")};
  background-color: ${({ $selecionado }) => ($selecionado ? "#ff6600" : "white")};
  color: ${({ $selecionado }) => ($selecionado ? "white" : "black")};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff6600;
    background-color: #ffcc99;
  }
`;

export default function EscolherTamanho() {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

  const tamanhos = [38, 39, 40, 41, 42, 43, 44];

  return (
    <TamanhosContainer>
      {tamanhos.map((tamanho) => (
        <BotaoTamanho
          key={tamanho}
          $selecionado={tamanho === tamanhoSelecionado} // ⚠️ Agora usa "$selecionado"
          onClick={() => setTamanhoSelecionado(tamanho)}
        >
          {tamanho}
        </BotaoTamanho>
      ))}
    </TamanhosContainer>
  );
}
