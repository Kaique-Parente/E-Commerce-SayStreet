"use client"

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import Footer from "@/components/ClientComponents/Footer";
import NavBar from "@/components/ClientComponents/NavBar";
import TransportadorasGroup from "@/components/ClientComponents/TransportadorasGroup";
import { useCarrinho } from "@/context/CarrinhoContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

const IdentificadorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #D9D9D9;
    width: 100%;
    margin: 30px 0px;
    position: relative;

    &:not(:last-child)::after {
        content: "";
        position: absolute;
        right: -30px;
        width: 0px;
        height: 100%;
        background: #D9D9D9;
        clip-path: polygon(0 0, 100% 50%, 0 100%);
    }

    .container {
        display: flex;
        align-items: center;
        gap: 15px;
        position: relative;
        width: 100%;
    }

    .identificador {
        background-color: #042940;
        color: #CFCFCF;
        border-radius: 50%;
        padding: 5px 10px;
        margin: 20px;
        font-size: 16px;
    }

    img {
        position: absolute;
    }

    .seta-identificador1 {
        left: 84%;
    }

    .seta-identificador2 {
        right: -9%;
    }
`;

const Etapa = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    padding: 10px;

    position: relative;

    &.ativo {
        background-color: #005C53;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        position: relative;
        clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 0 50%, 0% 0%);
    }

    &.ativo-2 {
        background-color: #005C53;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        position: relative;
        clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
    }

    &.ativo-3 {
        background-color: #005C53;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        position: relative;
        clip-path: polygon(90% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%, 0% 0%);
    }

    .identificador {
        background-color: ${(props) => (props.ativo ? "white" : "#042940")};
        color: ${(props) => (props.ativo ? "#042940" : "#CFCFCF")};
        border-radius: 50%;
        padding: 5px 10px;
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
    const [frete, setFrete] = useState(0.0);
    const [cep, setCep] = useState("");

    const [valorTotalProdutos, setValorTotalProdutos] = useState(0.0);
    const [valorTotalComFrete, setValorTotalComFrete] = useState(0.0);

    useEffect(() => {
        const totalProdutos = carrinho.reduce((acc, item) => acc + (item.produtoPreco * item.quantidade), 0);
        setValorTotalProdutos(totalProdutos);
    }, [carrinho]);

    useEffect(() => {
        setValorTotalComFrete(valorTotalProdutos + frete);

        console.log(valorTotalProdutos);
        console.log(frete);
        console.log(valorTotalProdutos + frete);
    }, [valorTotalProdutos, frete]);

    const handleCepChange = (e) => {
        const cepValue = e.target.value;
    
        const onlyNumbers = cepValue.replace(/\D/g, "");

        if (onlyNumbers.length <= 5) {
            setCep(onlyNumbers); 
        } else if (onlyNumbers.length <= 8) {
            setCep(onlyNumbers.replace(/(\d{5})(\d{3})/, "$1-$2"))
        }
    };

    return (
        <>
            <NavBar />
            <Container>
                <div style={{marginBottom: "30px"}}>
                    <IdentificadorContainer>
                        <Etapa className="ativo">
                            <div className="identificador">1</div>
                            <span>Carrinho</span>
                            <Image className="seta-identificador1" width={90} height={90} src={'/web/seta-identificador.svg'} alt="Imagem de uma seta"/>
                        </Etapa>

                        <Etapa className="">
                            <div className="identificador">2</div>
                            <span>Identificação</span>
                            <Image className="seta-identificador2" width={90} height={90} src={'/web/seta-identificador.svg'} alt="Imagem de uma seta"/>
                        </Etapa>

                        <Etapa className="">
                            <div className="identificador">3</div>
                            <span>Pagamento</span>
                        </Etapa>
                    </IdentificadorContainer>

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
                                <p>Valor dos produtos: <span>R$ {parseFloat(valorTotalProdutos).toFixed(2)}</span></p>
                                <p>Frete: <span>R$ {parseFloat(frete).toFixed(2)}</span></p>
                                <div className="total-pedido">
                                    <h3>Valor Total: <span>R$ {parseFloat(valorTotalComFrete).toFixed(2)}</span></h3>
                                    <p>(em até <span>10x</span> de <span>R$ {parseFloat(valorTotalComFrete / 10).toFixed(2)}</span> sem juros)</p>
                                </div>
                            </div>

                            <div className="frete">
                                <h2>Calcular Frete</h2>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="CEP:"
                                        value={cep}
                                        onChange={handleCepChange}
                                    />
                                    <button>OK</button>
                                </div>
                                <TransportadorasGroup transportadora={frete} setTransportadora={setFrete} />
                            </div>

                            <div style={{ marginTop: "5px" }}>
                                <BotaoPersonalizado width={"100%"} height={"50px"} color={"amarelo"}>
                                    Finalizar a Compra
                                </BotaoPersonalizado>
                            </div>
                        </DetailsContainer>
                    </div>
                </div>

                <Footer />
            </Container>
        </>
    );
}