"use client"

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import Footer from "@/components/ClientComponents/Footer";
import NavBar from "@/components/ClientComponents/NavBar";
import TransportadorasGroup from "@/components/ClientComponents/TransportadorasGroup";
import { useCarrinho } from "@/context/CarrinhoContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    padding-top: 80px;
`

export default function Carrinho() {
    const { carrinho } = useCarrinho();
    const [transportadora, setTransportadora] = useState("");

    return (
        <>
            <NavBar />
            <Container>
                <div>
                    <div>
                        <div>1</div>
                        <span>Carrinho</span>
                    </div>
                    <div>
                        <div>2</div>
                        <span>Identificação</span>
                    </div>
                    <div>
                        <div>3</div>
                        <span>Pagamento</span>
                    </div>
                </div>
                {carrinho.map((item) => {
                    console.log(item); // Agora, o console.log está dentro da função de callback do map, antes do return
                    return (
                        <>
                            <div key={`${item.produtoId}-${item.produtoTamanho}`}>

                                <div>
                                    {item.imagem && item.imagem.url ? (
                                        <Image width={372} height={390} src={item.imagem.url} alt={item.produtoNome} style={{ objectFit: "contain" }} />
                                    ) : (
                                        <p>Imagem não disponível</p>
                                    )}
                                </div>

                                <div>
                                    <Link href={""}>Nome: {item.produtoNome}</Link>
                                    <p>Tamanho: {item.produtoTamanho}</p>
                                </div>

                                <div>
                                    <h3>Quantidade:</h3>
                                    <div>
                                        <button>
                                            <Image width={14} height={14} src={"/web/seta-esquerda.svg"} alt="Ícone de seta para a esquerda" />
                                        </button>
                                        <p>{item.quantidade}</p>
                                        <button>
                                            <Image width={14} height={14} src={"/web/seta-direita.svg"} alt="Ícone de seta para a direita" />
                                        </button>
                                    </div>
                                    <div>
                                        <button>
                                            <Image width={14} height={14} src={"/backoffice/lixo.svg"} alt="Ícone de Lixo" />
                                            <span>Remover</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3>Valor total</h3>
                                    <p>{item.produtoPreco * item.quantidade}</p>
                                </div>

                            </div>
                        </>
                    );
                })}

                <div>
                    <div>
                        <div>
                            <h2>Resumo do Pedido</h2>
                            <p>Valor dos produtos: <span>R$ {0.00}</span></p>
                            <p>Frete: <span>R$ {0.00}</span></p>
                            <div>
                                <h3>Valor Total: <span>R$ {0.00}</span></h3>
                                <p>(em até <span>10x</span> de <span>R$ 585,88</span> sem juros)</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{width: "500px"}}>
                            <h2>Calcular Frete</h2>
                            <div>
                                <input type="number" placeholder="CEP:" />
                                <button>OK</button>
                            </div>
                            <TransportadorasGroup transportadora={transportadora} setTransportadora={setTransportadora}/>
                        </div>
                    </div>

                    <BotaoPersonalizado width={300} height={100}>Finalizar a Compra</BotaoPersonalizado>
                </div>

                <Footer />
            </Container>
        </>
    );
}