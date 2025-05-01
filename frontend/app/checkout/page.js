'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NavBar from '@/components/ClientComponents/NavBar';
import styled from 'styled-components';
import { useCarrinho } from '@/context/CarrinhoContext';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { formatCvvCartao, formatNomeCartao, formatNumeroCartao, formatValidadeCartao } from '@/utils/regex';
import BotaoPersonalizado from '@/components/ClientComponents/BotaoPersonalizado';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  

  padding-top: 50px;

  form{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 75px;
  }
`;

const ContainerTipoPagamento = styled.div`
    width: 750px;
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
  top: 17%;
  right: 17%;

  border-radius: 50%;
  background-color: ${props => props.selecionado ? 'rgba(255, 227, 23, 95)' : 'transparent'};
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
        height: 340px;

        background-color: #CFCFCF;
        border-radius: 6px;
        padding: 20px 25px;

        display: flex;
        justify-content: center;
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
    const [cartaoFocus, setCartaoFocus] = useState('');

    const [valorTotalFrete, setValorTotalFrete] = useState(0.00);
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [desconto, setDesconto] = useState(0.0);
    const [numeroParcelas, setNumeroParcelas] = useState(1);

    const { data: session, status } = useSession();
    const user = session?.user;
    const router = useRouter();

    useEffect(() => {
        setValorTotalFrete(valorTotal + frete);
    }, [valorTotal, frete])

    useEffect(() => {
        switch (metodoPagamento) {
            case "boleto":
                setDesconto(valorTotalFrete * 0.05);
                break;
            case "pix":
                setDesconto(valorTotalFrete * 0.2);
                break;
            case "cartao":
                setDesconto(valorTotalFrete * 0.1);
                break;
        }

    }, [metodoPagamento])

    useEffect(() => {
        console.log(desconto);
    }, [desconto])

    const handleMetodoChange = (e) => {
        setMetodoPagamento(e.target.value);
    };

    const handleNumeroParcelas = (e) => {
        const quantidade = Number(e.target.value);

        switch (quantidade) {
            case 1:
                setDesconto(valorTotalFrete * 0.1);
                break;
            default:
                setDesconto(0.0);   
                break;
        }
        setNumeroParcelas(quantidade);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (metodoPagamento === 'cartao') {
            const numero = numeroCartao.replace(/\s/g, '');
            const [mes, ano] = validadeCartao.split('/');
            const agora = new Date();
            const validade = new Date(`20${ano}`, mes);

            if (numero.length !== 16) {
                alert("Número do cartão incompleto.");
                return;
            }

            if (!/^\d{2}\/\d{2}$/.test(validadeCartao)) {
                alert("Formato da validade inválido.");
                return;
            }

            if (validade < agora) {
                alert("O cartão está expirado.");
                return;
            }

            if (cvvCartao.length < 3) {
                alert("CVV inválido.");
                return;
            }

            if (nomeNoCartao.trim().length < 3) {
                alert("Nome no cartão muito curto.");
                return;
            }

            alert("Clickey Cartao");
        }

        if (metodoPagamento === "boleto") {
            alert("Clickey Boleto");
        }

        if (metodoPagamento === "pix") {
            alert("Clickey Pix");
        }


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
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1 style={{ color: "#005c53", margin: "50px 0px" }}>Selecione o método de pagamento</h1>

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
                                    <Cards
                                        number={numeroCartao || ''}
                                        name={nomeNoCartao || ''}
                                        expiry={validadeCartao || ''}
                                        cvc={cvvCartao || ''}
                                        focused={cartaoFocus || ''}
                                        id="credit-card"
                                    />

                                    <CampoCartaoInputs>
                                        <div>
                                            <label>Número do Cartão</label><br />
                                            <input
                                                type="text"
                                                name="number"
                                                value={numeroCartao}
                                                onChange={(e) => setNumeroCartao(formatNumeroCartao(e.target.value))}
                                                required
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
                                                value={nomeNoCartao}
                                                onChange={(e) => setNomeNoCartao(formatNomeCartao(e.target.value))}
                                                required
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
                                                value={validadeCartao}
                                                onChange={(e) => setValidadeCartao(formatValidadeCartao(e.target.value))}
                                                required
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
                                                value={cvvCartao}
                                                onChange={(e) => setCvvCartao(formatCvvCartao(e.target.value))}
                                                required
                                                maxLength={4}
                                                placeholder="CVV"
                                                pattern="\d{3,4}"
                                                title="Formato: 000"
                                                onFocus={() => setCartaoFocus('cvc')}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="select-parcelas">Selecione a quantidade de parcelas</label>
                                            <br/>
                                            <select
                                                id="select-parcelas"
                                                value={numeroParcelas}
                                                onChange={handleNumeroParcelas}
                                                required
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
                                    <p>Até 20% de desconto com aprovação imediata que torna a expedição mais rápida do pedido.</p>
                                </CampoInformacoes>
                            )}
                        </ContainerTipoPagamento>

                    </div>

                    <DetailsContainer>
                        <div className="resumo-pedido">
                            <h2>Resumo do Pedido</h2>
                            <p>Valor dos produtos: <span>R$ {parseFloat(valorTotal).toFixed(2)}</span></p>
                            <p>Frete: <span>R$ {parseFloat(frete).toFixed(2)}</span></p>
                            <p>Desconto: <span style={{ color: "#005c53" }}>R$ -{parseFloat(desconto).toFixed(2)}</span></p>
                            <div className="total-pedido">
                                <h3>Valor Total: <span>R$ {parseFloat(valorTotalFrete - desconto).toFixed(2)}</span></h3>
                                <p>(em até <span>10x</span> de <span>R$ {parseFloat((valorTotalFrete - desconto) / 10).toFixed(2)}</span> sem juros)</p>
                            </div>
                        </div>


                        <div style={{ width: "100%", textAlign: "center" }}>
                            <BotaoPersonalizado
                                width={"75%"}
                                height={"45px"}
                                color="amarelo"
                                type="submit"
                            >
                                Confirmar Pagamento
                            </BotaoPersonalizado>
                        </div>
                    </DetailsContainer>
                </form>
            </Container>
        </>
    )
}


