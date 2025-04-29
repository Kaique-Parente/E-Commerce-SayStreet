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
    background-color: blueviolet;
     margin: 20px 0;
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
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
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
                            <input
                                type="radio"
                                id="cartao"
                                name="metodoPagamento"
                                value="cartao"
                                checked={metodoPagamento === 'cartao'}
                                onChange={handleMetodoChange}
                            />
                            <label htmlFor="cartao">Cartão de Crédito</label>

                            {metodoPagamento === 'cartao' && (
                                <CampoCartao>
                                    <h3>Dados do Cartão de Crédito</h3>
                                    <div>
                                        <label>Número do Cartão</label><br />
                                        <input type="text" name="numeroCartao" />
                                    </div>
                                    <div>
                                        <label>Nome no Cartão</label><br />
                                        <input type="text" name="nomeCartao" />
                                    </div>
                                    <div>
                                        <label>Validade</label><br />
                                        <input type="text" name="validadeCartao" placeholder="MM/AA" />
                                    </div>
                                    <div>
                                        <label>CVV</label><br />
                                        <input type="text" name="cvvCartao" />
                                    </div>
                                </CampoCartao>
                            )}
                        </ContainerTipoPagamento>

                        <ContainerTipoPagamento>
                            <input
                                type="radio"
                                id="boleto"
                                name="metodoPagamento"
                                value="boleto"
                                checked={metodoPagamento === 'boleto'}
                                onChange={handleMetodoChange}
                            />
                            <label htmlFor="boleto">Boleto</label>

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
                            <input
                                type="radio"
                                id="pix"
                                name="metodoPagamento"
                                value="pix"
                                checked={metodoPagamento === 'pix'}
                                onChange={handleMetodoChange}
                            />
                            <label htmlFor="pix">Pix</label>

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


