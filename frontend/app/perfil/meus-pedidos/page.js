"use client"
import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 120px 120px 50px;
  
  background-color:rgba(236, 236, 236, 0.8);
  color: #005C53;
`;

const CardsProdutos = styled.div`
    width: 750px;
    padding: 10px;
    background-color: white;
`

export default function MeusPedidos() {
    const [meusPedidos, setMeusPedidos] = useState([]);

    return (
        <Container>
            <h1>Meus Pedidos</h1>
            {meusPedidos?.map((pedido) => (
                <CardsProdutos>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p><strong style={{ color: "#005c53" }}>Pedido:</strong>{pedido?.id} - {dataPedidoFormatada}</p>
                        <BotaoPersonalizado onClick={() => console.log("detalhes")} width={"100%"} height={"50px"} color={"amarelo"}>
                            Detalhes
                        </BotaoPersonalizado>
                    </div>
                    <p>{pedido?.status}</p>
                    <h3>Valor total: {pedido?.valorTotal}</h3>
                </CardsProdutos>
            ))}
        </Container>
    );
}