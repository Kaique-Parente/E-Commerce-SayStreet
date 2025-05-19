"use client"

import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import Footer from "@/components/ClientComponents/Footer";
import NavBar from "@/components/ClientComponents/NavBar";
import TransportadorasGroup from "@/components/ClientComponents/TransportadorasGroup";
import { useCarrinho } from "@/context/CarrinhoContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import styled from "styled-components";

import normalizeSlug from "@/utils/normalizeSlug";
import { useSession } from "next-auth/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, Switch } from "@mui/material";
import { useDadosCliente } from "@/hooks/web/useDadosCliente";
import InputPersonalizado from "@/components/ClientComponents/InputPersonalizado";
import { editarCliente } from "@/services/ClienteService";

import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { buscarPedidoId, gerarPedido } from "@/services/PedidoService";

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

    .title-icon{
        display: flex;
        align-items: center;
        gap: 10px;

        margin-bottom: 10px;
    }
`;

const ContainerCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    margin-bottom: 60px;
`

const CardProduct = styled.div`
    background-color: #D9D9D9;

    display: flex;
    align-items: center;
    padding: 20px 15px;
    gap: 20px;
    
    border-radius: 6px;

    .nome-produto{
        width: 200px;

        button{
            background: none;
            border: none;

            text-align: start;
            font-size: 20px;
            cursor: pointer;
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
        background: #b9bbbd;
        color: #ff00005c;
        
        display: flex;
        align-items: center;
        gap: 5px;

        border: none;
        border-radius: 6px;
        padding: 5px 8px;
    }

    .valores{
        margin-left: 10px;

        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`

const ContainerTipoPagamento = styled.div`
    width: 750px;
    margin-bottom: 20px;
`;

const MetodoLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'selecionado'
})`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;

  border-radius: ${props => props.selecionado ? '10px 10px 0px 0px' : '10px'};
  
  border: 2px solid ${props => props.selecionado ? 'rgba(0, 0, 0, 0.38)' : '#ccc'};
  background-color: ${props => props.selecionado ? '#e1f5f2' : '#f9f9f9'};

  transition: 0.2s;

  span {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
`;

const RadioContainer = styled.div`
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid rgb(75 73 63);
`

const RadioVisual = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'selecionado'
})`
  width: 15px;
  height: 15px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 50%;
  background-color: ${props => props.selecionado ? 'rgba(0, 0, 0, 0.38)' : 'transparent'};
  transition: 0.2s;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const CampoCartao = styled.div`
  width: 100%;
  background: #f0f0f0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  flex-wrap: wrap;
  
  border: 1px solid #ccc;
  border-radius: 0px 0px 10px 10px; 

  .rccs{
    margin: 0;
  }
`;

const CampoCartaoInputs = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    input, #select-parcelas{
      width: 100%;
      padding: 5px 8px;
      border-radius: 6px;
      border: 1.99px solid #005C53;
      transition: border-color 0.2s;

      &:hover {
        border-color: #C8B312;
      }

      &:focus {
        border-color: #C8B312;
        outline: none;
      }
    }
  }
`;

const CampoInformacoes = styled.div`
  width: 100%;
  background: #f0f0f0;
  
  display: flex;
  flex-direction: column;
  padding: 15px;

  color: #005c53;
  font-weight: 600;

  border: 1px solid #ccc;
  border-radius: 0px 0px 10px 10px; 
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .resumo-pedido, .frete{   
        background-color: #CFCFCF;
        border-radius: 6px;
        padding: 20px 25px;

        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 12px;

        h2{
            font-size: 18px;
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

export default function PedidoDetalhes({ params }) {
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

    const router = useRouter();

    const { data: session, status, update } = useSession();
    const user = session?.user;

    const [enderecoSelecionado, setEnderecoSelecionado] = useState({});
    const [enderecoSelecionadoValue, setEnderecoSelecionadoValue] = useState("");
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [numeroParcelas, setNumeroParcelas] = useState(0);

    const [frete, setFrete] = useState(0.0);
    const [valorTotal, setValorTotal] = useState(0.0);
    const [valorDesconto, setValorDesconto] = useState(0.0);
    const [valorFinal, setValorFinal] = useState(0.0);
    const [valorTotalFrete, setValorTotalFrete] = useState(0.0);

    const [pedidoId, setPedidoId] = useState();
    const [pedidoDetalhes, setPedidoDetalhes] = useState({});
    const [loading, setLoading] = useState(true);

    const resolvedParams = use(params);
    const slug = resolvedParams?.slug;

    useEffect(() => {
        if (slug) {
            const produtoId = slug.split('-').pop();
            setPedidoId(produtoId);
        }
    }, [slug]);

    useEffect(() => {
        if (pedidoId >= 0) {
            console.log("pedidoId: " + pedidoId);
            handleProcurarPedido();
        }
    }, [pedidoId])

    useEffect(() => {
        if (pedidoDetalhes) {
            console.log(pedidoDetalhes);
        }
    }, [pedidoDetalhes])

    const handleProcurarPedido = async () => {
        try {
            const response = await buscarPedidoId(pedidoId);
            if (response != null) {
                setPedidoDetalhes(response);
            } else {
                alert("Pedido não encontrado!")
                router.push("/perfil/meus-pedidos");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!pedidoDetalhes?.item || pedidoDetalhes.item.length === 0) {
            setValorDesconto(0.0);
            setValorFinal(0.0);
            setValorTotal(0.0);
            return;
        }

        const enderecoEntrega = pedidoDetalhes?.enderecoEntrega;
        setEnderecoSelecionadoValue(enderecoEntrega?.logradouro)
        setEnderecoSelecionado(enderecoEntrega);
        setMostrarOpcoes(true);

        const valorTotalCalculado = pedidoDetalhes.item.reduce((acc, item) => {
            return acc + (item.produto?.produtoPreco || 0) * (item.qtdProduto || 1);
        }, 0);

        const tipoPagamento = pedidoDetalhes?.metodoPagamento?.tipoPagamento;
        const parcelas = pedidoDetalhes?.metodoPagamento?.numeroParcelas;
        const numeroParcelas = parcelas === null ? 0 : parcelas;

        let percentualDesconto = 0;

        if (tipoPagamento === "PIX") {
            percentualDesconto = 0.20;
        } else if (tipoPagamento === "BOLETO") {
            percentualDesconto = 0.05;
        } else if (tipoPagamento === "CARTAO" && Number(numeroParcelas) === 1) {
            percentualDesconto = 0.10;
        }

        const valorDescontoCalculado = valorTotalCalculado * percentualDesconto;
        const valorComDesconto = valorTotalCalculado - valorDescontoCalculado;
        const fretePedido = pedidoDetalhes?.frete || 0;
        const valorTotalFrete = valorTotalCalculado + fretePedido;
        const valorFinalComFrete = valorComDesconto + fretePedido;

        setFrete(fretePedido);
        setValorTotal(valorTotalCalculado);
        setValorTotalFrete(valorTotalFrete);
        setValorDesconto(valorDescontoCalculado);
        setValorFinal(valorFinalComFrete);
        setNumeroParcelas(numeroParcelas);
    }, [pedidoDetalhes]);

    const handleSlugClick = (nome, id) => {
        const slug = `${normalizeSlug(nome)}-${id}`;
        router.push(slug);
    }

    const handleNomeDoMetodoChange = (e) => {
        setTipoPagamento(e.target.value);
    };

    const handleNumeroParcelas = (e) => {
        const quantidade = Number(e.target.value);
    }

    const handleEnderecoSelecionado = (e) => {
        setEnderecoSelecionado(e.target.value);
    }

    return (
        <>
            <NavBar />
            <Container>
                <div style={{ marginBottom: "30px" }}>
                    <div className="title-icon" style={{ margin: "30px 0px" }}>
                        <Image width={32} height={32} src={"/web/sidebar/carrinho.png"} alt="Ícone carrinho de compras" />
                        <h1 style={{ color: "rgb(0, 92, 83)" }}>
                            Detalhes do pedido
                        </h1>
                    </div>
                    <div style={{ display: "flex", gap: "30px" }}>
                        <ContainerCards>
                            {pedidoDetalhes.item?.map((item) => {
                                const imagemPrincipal = item.produto?.imagens?.find(img => img.principal);
                                return (
                                    <div key={`${item.produto?.produtoId}-${item.produto?.produtoTamanho}`}>
                                        <CardProduct>
                                            <div>
                                                {imagemPrincipal && imagemPrincipal?.url ? (
                                                    <Image
                                                        width={150}
                                                        height={150}
                                                        src={imagemPrincipal?.url}
                                                        alt={item.produto?.produtoNome}
                                                        style={{ objectFit: "contain", background: "white", cursor: "pointer" }}
                                                        onClick={() => handleSlugClick(item.produto?.produtoNome, item.produto?.produtoId)}
                                                    />
                                                ) : (
                                                    <p>Imagem não disponível</p>
                                                )}
                                            </div>

                                            <div className="nome-produto">
                                                <button onClick={() => handleSlugClick(item.produto?.produtoNome, item.produto?.produtoId)}>{item.produto?.produtoNome}</button>
                                                <p>Tamanho: {item.produto?.produtoTamanho}</p>
                                            </div>

                                            <div className="quantidade">
                                                <h3>Quantidade</h3>
                                                <div className="seta-container">
                                                    <button className="seta seta-esquerda"
                                                        disabled={true}
                                                    >
                                                        <Image
                                                            width={18}
                                                            height={18}
                                                            src={"/web/seta-esquerda.svg"}
                                                            alt="Ícone de seta para a esquerda"
                                                        />
                                                    </button>
                                                    <p>{item.qtdProduto}</p>
                                                    <button className="seta seta-direita"
                                                        disabled={true}
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
                                                        disabled={true}>
                                                        <Image width={16} height={16} src={"/backoffice/lixo.svg"} alt="Ícone de Lixo" />
                                                        <span>Remover</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="valores">
                                                <div>
                                                    <h3>Valor unitário</h3>
                                                    <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.produto?.produtoPreco)}</p>
                                                </div>

                                                <div>
                                                    <h3>Valor total</h3>
                                                    <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.produto?.produtoPreco * item.qtdProduto))}</p>
                                                </div>
                                            </div>
                                        </CardProduct>
                                    </div>
                                );
                            })}

                            <div className="title-icon" style={{ marginTop: "15px" }}>
                                <Image width={32} height={32} src={"/web/sidebar/carteira.png"} alt="Ícone carteira de bolso" />
                                <h2 style={{ color: "#005c53" }}>Método de pagamento</h2>
                            </div>

                            <div>
                                <ContainerTipoPagamento>
                                    <HiddenRadio
                                        type="radio"
                                        id="cartao"
                                        name="tipoPagamento"
                                        value="CARTAO"
                                        checked={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "CARTAO"}
                                        onChange={handleNomeDoMetodoChange}
                                        disabled
                                    />
                                    <MetodoLabel htmlFor="cartao" selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "CARTAO"}>
                                        <RadioContainer>
                                            <RadioVisual selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "CARTAO"} />
                                        </RadioContainer>
                                        <span>Cartão de Crédito</span>
                                    </MetodoLabel>
                                    {pedidoDetalhes?.metodoPagamento?.tipoPagamento === "CARTAO" && (
                                        <CampoCartao>
                                            <Cards
                                                number={pedidoDetalhes?.metodoPagamento?.numeroCartao || ''}
                                                name={pedidoDetalhes?.metodoPagamento?.nomeNoCartao || ''}
                                                expiry={pedidoDetalhes?.metodoPagamento?.validadeCartao || ''}
                                                cvc={pedidoDetalhes?.metodoPagamento?.cvvCartao || ''}
                                                focused={pedidoDetalhes?.metodoPagamento?.cartaoFocus || ''}
                                                id="credit-card"
                                            />

                                            <CampoCartaoInputs>
                                                <div>
                                                    <label>Número do Cartão</label><br />
                                                    <input
                                                        type="text"
                                                        name="number"
                                                        value={pedidoDetalhes?.metodoPagamento?.numeroCartao || "0000 0000 0000 0000"}
                                                        onChange={(e) => setNumeroCartao(formatNumeroCartao(e.target.value))}
                                                        disabled
                                                        maxLength={19}
                                                        placeholder="Número do Cartão"
                                                        pattern="\d{4} \d{4} \d{4} \d{4}"
                                                        title="Formato: 0000 0000 0000 0000"
                                                        onFocus={() => setCartaoFocus('number')}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Nome no Cartão</label><br />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={pedidoDetalhes?.metodoPagamento?.nomeNoCartao || ""}
                                                        onChange={(e) => setNomeNoCartao(formatNomeCartao(e.target.value))}
                                                        disabled
                                                        maxLength={18}
                                                        placeholder="Nome no Cartão"
                                                        title="Máximo de 18 caracteres"
                                                        onFocus={() => setCartaoFocus('name')}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Validade</label><br />
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={pedidoDetalhes?.metodoPagamento?.validadeCartao || "00/00"}
                                                        onChange={(e) => setValidadeCartao(formatValidadeCartao(e.target.value))}
                                                        disabled
                                                        maxLength={5}
                                                        placeholder="MM/AA"
                                                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                                                        title="Formato: MM/AA"
                                                        onFocus={() => setCartaoFocus('expiry')}
                                                    />
                                                </div>
                                                <div>
                                                    <label>CVV</label><br />
                                                    <input
                                                        type="text"
                                                        name="cvc"
                                                        value={pedidoDetalhes?.metodoPagamento?.cvvCartao || "000"}
                                                        onChange={(e) => setCvvCartao(formatCvvCartao(e.target.value))}
                                                        disabled
                                                        maxLength={4}
                                                        placeholder="CVV"
                                                        pattern="\d{3,4}"
                                                        title="Formato: 000"
                                                        onFocus={() => setCartaoFocus('cvc')}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="select-parcelas">Selecione a quantidade de parcelas</label>
                                                    <br />
                                                    <select
                                                        id="select-parcelas"
                                                        value={numeroParcelas}
                                                        onChange={handleNumeroParcelas}
                                                        disabled
                                                    >
                                                        <option value={"1"}>
                                                            1x sem juros - Até 10% de desconto
                                                        </option>
                                                        <option value={"2"}>2x sem juros - R$ {parseFloat((valorTotalFrete) / 2).toFixed(2)}</option>
                                                        <option value={"3"}>3x sem juros - R$ {parseFloat((valorTotalFrete) / 3).toFixed(2)}</option>
                                                        <option value={"4"}>4x sem juros - R$ {parseFloat((valorTotalFrete) / 4).toFixed(2)}</option>
                                                        <option value={"5"}>5x sem juros - R$ {parseFloat((valorTotalFrete) / 5).toFixed(2)}</option>
                                                        <option value={"6"}>6x sem juros - R$ {parseFloat((valorTotalFrete) / 6).toFixed(2)}</option>
                                                        <option value={"7"}>7x sem juros - R$ {parseFloat((valorTotalFrete) / 7).toFixed(2)}</option>
                                                        <option value={"8"}>8x sem juros - R$ {parseFloat((valorTotalFrete) / 8).toFixed(2)}</option>
                                                        <option value={"9"}>9x sem juros - R$ {parseFloat((valorTotalFrete) / 9).toFixed(2)}</option>
                                                        <option value={"10"}>10x sem juros - R$ {parseFloat((valorTotalFrete) / 10).toFixed(2)}</option>
                                                    </select>
                                                </div>

                                            </CampoCartaoInputs>

                                        </CampoCartao>
                                    )}
                                </ContainerTipoPagamento>

                                <ContainerTipoPagamento>
                                    <HiddenRadio
                                        type="radio"
                                        id="boleto"
                                        name="tipoPagamento"
                                        value="BOLETO"
                                        checked={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "BOLETO"}
                                        onChange={handleNomeDoMetodoChange}
                                        disabled
                                    />
                                    <MetodoLabel htmlFor="boleto" selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "BOLETO"}>
                                        <RadioContainer>
                                            <RadioVisual selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "BOLETO"} />
                                        </RadioContainer>
                                        <span>Boleto</span>
                                    </MetodoLabel>

                                    {pedidoDetalhes?.metodoPagamento?.tipoPagamento === "BOLETO" && (
                                        <CampoInformacoes>
                                            <p>Até 5% de desconto. Você poderá visualizar ou imprimir o boleto após a finalização do pedido.</p>
                                            <br />
                                            <br />
                                            <p>Mas fique de olho! Passada a data de vencimento, seu pedido perderá automaticamente a validade.</p>
                                        </CampoInformacoes>
                                    )}
                                </ContainerTipoPagamento>

                                <ContainerTipoPagamento>
                                    <HiddenRadio
                                        type="radio"
                                        id="pix"
                                        name="tipoPagamento"
                                        value="PIX"
                                        checked={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "PIX"}
                                        onChange={handleNomeDoMetodoChange}
                                        disabled
                                    />
                                    <MetodoLabel htmlFor="pix" selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "PIX"}>
                                        <RadioContainer>
                                            <RadioVisual selecionado={pedidoDetalhes?.metodoPagamento?.tipoPagamento === "PIX"} />
                                        </RadioContainer>
                                        <span>Pix</span>
                                    </MetodoLabel>
                                    {pedidoDetalhes?.metodoPagamento?.tipoPagamento === "PIX" && (
                                        <CampoInformacoes>
                                            <p>Até 20% de desconto com aprovação imediata que torna a expedição mais rápida do pedido.</p>
                                        </CampoInformacoes>
                                    )}
                                </ContainerTipoPagamento>
                            </div>
                        </ContainerCards>

                        <DetailsContainer>
                            <div className="resumo-pedido">
                                <div className="title-icon">
                                    <Image width={24} height={24} src={"/web/sidebar/dados.png"} alt="Ícone de ficha de dados" />
                                    <h2>Resumo dos valores</h2>
                                </div>

                                <p>Valor dos produtos: <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}</span></p>
                                <p>Frete: <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete)}</span></p>
                                <p>Desconto: <span style={{ color: "#005c53" }}>
                                    -
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorDesconto)}
                                </span>
                                </p>
                                <div className="total-pedido">
                                    <h3>Valor Total: <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorFinal)}</span></h3>
                                    <p>(em até <span>10x</span> de <span>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorFinal / 10)}
                                    </span> sem juros)</p>
                                </div>
                            </div>

                            <div>
                                <div className="frete">
                                    <div className="title-icon">
                                        <Image width={24} height={24} src={"/web/sidebar/caminhao.png"} alt="Ícone de caminhão" />
                                        <h2>Endereço de Entrega</h2>
                                    </div>
                                    <div className="input-container">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Endereço de Entrega</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={enderecoSelecionadoValue}
                                                label="Selecionar endereço"
                                                onChange={handleEnderecoSelecionado}
                                                disabled={true}
                                            >

                                                <MenuItem value={enderecoSelecionado?.logradouro}>
                                                    {enderecoSelecionado?.logradouro + ", " + enderecoSelecionado?.numero}
                                                    <br />
                                                    {"CEP: " + enderecoSelecionado?.cep}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {mostrarOpcoes && (
                                        <TransportadorasGroup isDisabled={true} transportadora={frete} setTransportadora={setFrete} />
                                    )}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center", marginTop: "5px" }}>
                                <BotaoPersonalizado onClick={() => router.push("/perfil/meus-pedidos")} width={"80%"} height={"50px"} color={"marrom"}>
                                    Voltar
                                </BotaoPersonalizado>
                            </div>
                        </DetailsContainer>
                    </div>
                </div>

                <Footer />
            </Container>
        </>
    )
}