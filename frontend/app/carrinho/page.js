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
    align-items: center;
    flex-direction: column;
    padding-top: 80px;

    h3{
        font-size: 16px;
    }
`;

const ContainerCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin-bottom: 60px;
`

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #777;
`;

const CardProduct = styled.div`
    background-color: #D9D9D9;

    display: flex;
    align-items: center;
    padding: 20px 15px;
    gap: 20px;
    
    border-radius: 6px;

    .nome-produto{
        width: 200px;

        a{
            font-size: 20px;
        }

        p{
            font-weight: 300;
            margin-top: 5px;
        }
    }

    .quantidade{
        display: flex;
        flex-direction: column;
        align-items: center;

        .seta-container{
            display: flex;
            align-items: center;
            position: relative;

            margin: 12px 0px 15px 0px;

            p{
                font-size: 18px;
            }
        }

        .seta{
            display: flex;
            align-items: center;
            justify-content: center;

            background: none;
            border: none;
            cursor: pointer;

            position: absolute;
        }

        .seta-esquerda{
            left: -30px;
        }

        .seta-direita{
            right: -30px;
        }
    }

    .btn-remover{
        background: aliceblue;
        color: red;
        cursor: pointer;
        
        display: flex;
        align-items: center;
        gap: 5px;

        border: none;
        border-radius: 6px;
        padding: 5px 8px;
    }

    .btn-remover:hover{
        span{
            text-decoration: underline;
        }
    }

    .valores{
        margin-left: 10px;

        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    

    .resumo-pedido, .frete{   
        background-color: #CFCFCF;
        border-radius: 6px;
        padding: 20px 25px;

        display: flex;
        flex-direction: column;
        gap: 12px;

        h2{
            font-size: 20px;
        }
    }

    .resumo-pedido{
        p, h3{
            display: flex;
            justify-content: space-between;
            gap: 5px;
        }

        h3{
            margin-bottom: 10px;
        }

        span{
            font-weight: bold;
        }
    }

    .total-pedido{
        color: #CFCFCF;
        background-color: #005C53;
        border-radius: 6px;
        padding: 10px 15px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        margin-top: 10px;
    }

    .frete{

        .input-container{
            display: flex;
            gap: 10px;

            input, button{
                padding: 14px;
                border-radius: 4px;
            }

            input{
                width: 75%;
                background-color: #E9E9E9;
                border: none;

                font-size: 14px;
            }
            
            button{
                width: 25%;
                background-color: rgb(8, 61, 94);
                color: #CFCFCF;
                border: none;

                cursor: pointer;
            }

            button:hover{
                background-color: #042940;
            }
        }

    }
`

export default function Carrinho() {
    const { carrinho, incrementarQuantidade, decrementarQuantidade, removerProduto } = useCarrinho();
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

                <div style={{ display: "flex", gap: "30px" }}>
                    <ContainerCards>
                        {carrinho.length === 0 ? (
                            <EmptyCartMessage>
                                Não existe nenhum produto no carrinho.
                            </EmptyCartMessage>
                        ) : (
                            carrinho.map((item) => {
                                return (
                                    <div key={`${item.produtoId}-${item.produtoTamanho}`}>
                                        <CardProduct>
                                            <div>
                                                {item.imagem && item.imagem.url ? (
                                                    <Image
                                                        width={150}
                                                        height={150}
                                                        src={item.imagem.url}
                                                        alt={item.produtoNome}
                                                        style={{ objectFit: "contain", background: "white" }}
                                                    />
                                                ) : (
                                                    <p>Imagem não disponível</p>
                                                )}
                                            </div>

                                            <div className="nome-produto">
                                                <Link href={""}>{item.produtoNome}</Link>
                                                <p>Tamanho: {item.produtoTamanho}</p>
                                            </div>

                                            <div className="quantidade">
                                                <h3>Quantidade</h3>
                                                <div className="seta-container">
                                                    <button className="seta seta-esquerda"
                                                        onClick={() => decrementarQuantidade(item.produtoId, item.produtoTamanho)}
                                                        disabled={item.quantidade <= 1} // Desabilita a seta se a quantidade for 1
                                                    >
                                                        <Image
                                                            width={18}
                                                            height={18}
                                                            src={"/web/seta-esquerda.svg"}
                                                            alt="Ícone de seta para a esquerda"
                                                        />
                                                    </button>
                                                    <p>{item.quantidade}</p>
                                                    <button className="seta seta-direita"
                                                        onClick={() => incrementarQuantidade(item.produtoId, item.produtoTamanho)}
                                                    >
                                                        <Image
                                                            width={18}
                                                            height={18}
                                                            src={"/web/seta-direita.svg"}
                                                            alt="Ícone de seta para a direita"
                                                        />
                                                    </button>
                                                </div>
                                                <div>
                                                    <button className="btn-remover"
                                                        onClick={() => removerProduto(item.produtoId, item.produtoTamanho)}>
                                                        <Image width={16} height={16} src={"/backoffice/lixo.svg"} alt="Ícone de Lixo" />
                                                        <span>Remover</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="valores">
                                                <div>
                                                    <h3>Valor unitário</h3>
                                                    <p>R$ {item.produtoPreco}</p>
                                                </div>

                                                <div>
                                                    <h3>Valor total</h3>
                                                    <p>R$ {(item.produtoPreco * item.quantidade).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </CardProduct>
                                    </div>
                                );
                            })
                        )}
                    </ContainerCards>

                    <DetailsContainer>
                        <div className="resumo-pedido">
                            <h2>Resumo do Pedido</h2>
                            <p>Valor dos produtos: <span>R$ {0.00}</span></p>
                            <p>Frete: <span>R$ {0.00}</span></p>
                            <div className="total-pedido">
                                <h3>Valor Total: <span>R$ {0.00}</span></h3>
                                <p>(em até <span>10x</span> de <span>R$ 585,88</span> sem juros)</p>
                            </div>
                        </div>

                        <div className="frete">
                            <h2>Calcular Frete</h2>
                            <div className="input-container">
                                <input type="number" placeholder="CEP:" />
                                <button>OK</button>
                            </div>
                            <TransportadorasGroup transportadora={transportadora} setTransportadora={setTransportadora} />
                        </div>

                        <div style={{ marginTop: "5px" }}>
                            <BotaoPersonalizado
                                width={"100%"}
                                height={"50px"}
                                color={"amarelo"}
                            >
                                Finalizar a Compra
                            </BotaoPersonalizado>
                        </div>
                    </DetailsContainer>
                </div>

                <Footer />
            </Container>
        </>
    );
}