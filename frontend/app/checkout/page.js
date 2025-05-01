'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NavBar from '@/components/ClientComponents/NavBar';
import styled from 'styled-components';
import { useCarrinho } from '@/context/CarrinhoContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 80px;

  form{
    width: 750px;
  }
`;

const ContainerTipoPagamento = styled.div`
    width: 100%;
    margin: 20px 0;
`;

const MetodoLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'selecionado'
})`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;

  border-radius: ${props => props.selecionado ? '10px 10px 0px 0px' : '10px'};
  
  border: 2px solid ${props => props.selecionado ? 'rgba(255, 227, 23, 95)' : '#ccc'};
  background-color: ${props => props.selecionado ? '#e1f5f2' : '#f9f9f9'};

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #dff4f0;
    border-color: #C8B312;
  }

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
  top: 15%;
  right: 12%;

  border-radius: 50%;
  background-color: ${props => props.selecionado ? 'rgba(255, 227, 23, 95)' : 'transparent'};
  transition: 0.2s;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const CampoInformacoes = styled.div`
  margin-top: 10px;
  padding: 15px;
  border-left: 4px solid #0070f3;
  background: #f0f0f0;
  border-radius: 8px;
  max-width: 500px;
`;

const CampoCartao = styled.div`
  padding: 20px;
  border: 1px solid #ccc;

  border-radius: 0px 0px 10px 10px;
  max-width: 500px;
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

export default function Checkout() {
    const { valorTotal, frete } = useCarrinho();

    const [numeroCartao, setNumeroCartao] = useState('');
    const [nomeNoCartao, setNomeNoCartao] = useState('');
    const [validadeCartao, setValidadeCartao] = useState('');
    const [cvvCartao, setCvvCartao] = useState('');

    const [metodoPagamento, setMetodoPagamento] = useState('');
    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();

    const handleMetodoChange = (e) => {
        setMetodoPagamento(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (frete <= 0.00) {
            router.push("/carrinho");
            alert("Por favor, volte para o carrinho e selecione um método de entrega!");
        }
    }, [])

    if (frete <= 0.00) {
        return (
            <div style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <Container>
                <div>
                    <h1 style={{ margin: "50px 0px" }}>Selecione o método de pagamento</h1>
                    <form onSubmit={handleSubmit}>
                        <ContainerTipoPagamento>
                            <HiddenRadio
                                type="radio"
                                id="cartao"
                                name="metodoPagamento"
                                value="cartao"
                                checked={metodoPagamento === 'cartao'}
                                onChange={handleMetodoChange}
                            />
                            <MetodoLabel htmlFor="cartao" selecionado={metodoPagamento === 'cartao'}>
                                <RadioContainer>
                                    <RadioVisual selecionado={metodoPagamento === 'cartao'} />
                                </RadioContainer>
                                <span>Cartão de Crédito</span>
                            </MetodoLabel>
                            {metodoPagamento === 'cartao' && (
                                <CampoCartao>
                                    <h3>Dados do Cartão de Crédito</h3>
                                    <div>
                                        <label>
                                            <div className="radio-btn"></div>
                                            <span>Número do Cartão</span>
                                        </label>
                                        <br />
                                        <input className="input-radio" type="text" name="numeroCartao" />
                                    </div>
                                    <div>
                                        <label>Nome no Cartão</label><br />
                                        <input className="input-radio" type="text" name="nomeCartao" />
                                    </div>
                                    <div>
                                        <label>Validade</label><br />
                                        <input className="input-radio" type="text" name="validadeCartao" placeholder="MM/AA" />
                                    </div>
                                    <div>
                                        <label>CVV</label><br />
                                        <input className="input-radio" type="text" name="cvvCartao" />
                                    </div>
                                </CampoCartao>
                            )}
                        </ContainerTipoPagamento>

                        <ContainerTipoPagamento>
                            <HiddenRadio
                                type="radio"
                                id="boleto"
                                name="metodoPagamento"
                                value="boleto"
                                checked={metodoPagamento === 'boleto'}
                                onChange={handleMetodoChange}
                            />
                            <MetodoLabel htmlFor="boleto" selecionado={metodoPagamento === 'boleto'}>
                                <RadioContainer>
                                    <RadioVisual selecionado={metodoPagamento === 'boleto'} />
                                </RadioContainer>
                                <span>Boleto</span>
                            </MetodoLabel>

                            {metodoPagamento === 'boleto' && (
                                <CampoInformacoes>
                                    Até 5% de desconto. Você poderá visualizar ou imprimir o boleto após a finalização do pedido.
                                    <br />
                                    <br />
                                    Mas fique de olho! Passada a data de vencimento, seu pedido perderá automaticamente a validade.
                                </CampoInformacoes>
                            )}
                        </ContainerTipoPagamento>

                        <ContainerTipoPagamento>
                            <HiddenRadio
                                type="radio"
                                id="pix"
                                name="metodoPagamento"
                                value="pix"
                                checked={metodoPagamento === 'pix'}
                                onChange={handleMetodoChange}
                            />
                            <MetodoLabel htmlFor="pix" selecionado={metodoPagamento === 'pix'}>
                                <RadioContainer>
                                    <RadioVisual selecionado={metodoPagamento === 'pix'} />
                                </RadioContainer>
                                <span>Pix</span>
                            </MetodoLabel>
                            {metodoPagamento === 'pix' && (
                                <CampoInformacoes>
                                    Até 20% de desconto com aprovação imediata que torna a expedição mais rápida do pedido.
                                </CampoInformacoes>
                            )}
                        </ContainerTipoPagamento>
                    </form>
                </div>

                <DetailsContainer>
                    <div className="resumo-pedido">
                        <h2>Resumo do Pedido</h2>
                        <p>Valor dos produtos: <span>R$ {parseFloat(valorTotal).toFixed(2)}</span></p>
                        <p>Frete: <span>R$ {parseFloat(frete).toFixed(2)}</span></p>
                        <div className="total-pedido">
                            <h3>Valor Total: <span>R$ {parseFloat(valorTotal + frete).toFixed(2)}</span></h3>
                            <p>(em até <span>10x</span> de <span>R$ {parseFloat(valorTotal + frete / 10).toFixed(2)}</span> sem juros)</p>
                        </div>
                    </div>

                    <button type="submit" style={{ marginTop: '20px' }}>Confirmar Pagamento</button>
                </DetailsContainer>
            </Container>
        </>
    )
}


