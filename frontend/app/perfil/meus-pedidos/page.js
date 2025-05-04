"use client"
import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 120px 120px 50px;
  gap: 30px;
  
  background-color:rgba(236, 236, 236, 0.8);
  color: #005C53;
`;

const CardsProdutos = styled.div`
    width: 800px;
    padding: 20px 30px;
    background-color: white;
    border-radius: 12px;

    strong { 
        color: #005c53;
    }
`

const CardHeaderProduto = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px 20px 0px;

    border-bottom: 1px solid black;
`

const CardContainerProduto = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    div{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`

const CardContainerStatus = styled.p`
    margin: 15px 0px;
`

const CardContainerPagamento = styled.div`
    display: flex; 
    align-items: center; 
    gap: 10px; 
`

export default function MeusPedidos() {
    const { data: session, status, update } = useSession();
    const user = session?.user;

    const [meusPedidos, setMeusPedidos] = useState([]);

    useEffect(() => {
        if (user) {
            const pedidos = user.pedidos;
            setMeusPedidos(pedidos)
            console.log(pedidos)
        }
    }, [user]);

    function capsLockPrimeiraLetra(frase) {
        if (!frase) return "";
        return frase.charAt(0).toUpperCase() + frase.slice(1);
    }

    return (
        <Container>
            <h1>Meus Pedidos</h1>
            {Array.isArray(meusPedidos) && meusPedidos.length > 0 ? (
                meusPedidos.map((pedido) => {
                    const primeiroItem = pedido.item[0];
                    const nomeProduto = primeiroItem.produto.produtoNome;
                    const imagemPrincipal = primeiroItem.produto.imagens.find(img => img.principal);
                    const quantidade = primeiroItem.qtdProduto;
                    const metodoPagamento = pedido.metodoPagamento.tipoPagamento.toLowerCase();

                    const dataPedidoFormatada = new Date(pedido.dataPedido).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                    return (
                        <CardsProdutos key={pedido?.id}>
                            <CardHeaderProduto>
                                <div>
                                    <p>
                                        <strong>Número do Pedido:</strong> {pedido?.id}
                                    </p>

                                    <p>
                                        <strong>Data da compra:</strong> {dataPedidoFormatada}
                                    </p>
                                </div>

                                <BotaoPersonalizado onClick={() => console.log("detalhes")} width={"25%"} height={"40px"} color={"amarelo"}>
                                    Detalhes
                                </BotaoPersonalizado>
                            </CardHeaderProduto>

                            <CardContainerStatus><strong>Status:</strong> {pedido?.status}</CardContainerStatus>

                            <CardContainerPagamento>
                                <p><strong>Método de pagamento: </strong>{capsLockPrimeiraLetra(metodoPagamento)}</p>
                                <Image width={24} height={24} src={`/web/paymentMethods/${metodoPagamento === "pix" ? metodoPagamento + ".svg" : metodoPagamento + ".png"}`} alt="Ícone do método pagamento" />
                            </CardContainerPagamento>

                            <CardContainerProduto>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px", border: "1px solid rgba(0, 0, 0, 0.25)"}}>
                                    {imagemPrincipal && (
                                        <img src={imagemPrincipal.url} alt={nomeProduto} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                                    )}
                                </div>

                                <div>
                                    <p><strong>Produto:</strong> {nomeProduto}</p>
                                    <p><strong>Quantidade:</strong> {quantidade}</p>
                                </div>
                            </CardContainerProduto>

                            <h3 style={{marginTop: "10px", fontWeight: "400"}}><strong>Valor total:</strong> {pedido?.valorTotal}</h3>

                        </CardsProdutos>
                    );
                })
            ) : (
                <h2>Não existe pedidos</h2>
            )}
        </Container>
    );
}