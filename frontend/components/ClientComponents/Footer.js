'use client'

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const ContainerFooter = styled.div`
    background-color: #005C53;
    color: #CFCFCF;

    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    padding: 50px 120px
`

const ContentFooter = styled.div`
    width: 1024px;

    @media (max-width: 1050px) {
        width: 860px;
    }
`

const FooterLinks = styled.div`
    

    display: flex;
    justify-content: space-between;

    a{
        display: block;
    }

    .footerTextLink, .footerTextLinkSub {
        display: flex;
        flex-direction: column;
    }

    .footerTextLink{
        a{
            font-size: 18px;
        }
        gap: 12px;
    }

    .footerTextLinkSub{
        a{
            font-size: 16px;
        }
        gap: 5px;
    }

    .socialFooter, .paymentFooter{
        margin: 12px 0px;

        display: flex;
    }

    .socialFooter{
        gap: 10px
    }

    .paymentFooter{
        max-width: 200px;

        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        img{
            width: 50px;
            background-color: #CFCFCF;

            padding: 5px;
            border-radius: 4px;
        }
    }
`

const DivisorFooter = styled.div`
    width: 100%;
    height: 1px;

    margin: 30px 0px;

    border-bottom: 1px solid #FFE317;
    border-radius: 6px;
`

const InfoFooter = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;

    .info-1{
        display: flex;
        gap: 10px;
    }

    .info-2{
        width: 500px;
        text-align: end;
    }
`

export default function Footer() {
    return (
        <ContainerFooter>
            <ContentFooter>
                <FooterLinks>
                    <div className="footerTextLink">
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                    </div>

                    <div className="footerTextLinkSub">
                        <h4>Ajuda</h4>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                    </div>

                    <div className="footerTextLinkSub">
                        <h4>Sobre nós</h4>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                        <Link href={""}>Encontre Uma Loja Nike</Link>
                    </div>

                    <div>
                        <div>
                            <h3>Redes Sociais</h3>
                            <div className="socialFooter">
                                <Link href="https://www.facebook.com" target="_blank">
                                    <Image width={28} height={28} src="/web/facebook.svg" alt="Ícone Facebook" />
                                </Link>
                                <Link href="https://www.instagram.com" target="_blank">
                                    <Image width={28} height={28} src="/web/instagram.svg" alt="Ícone Instagram" />
                                </Link>
                                <Link href="https://www.linkedin.com" target="_blank">
                                    <Image width={28} height={28} src="/web/linkedin.svg" alt="Ícone LinkedIn" />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3>Formas de Pagamento</h3>
                            <div className="paymentFooter">
                                <Image width={32} height={32} src={'./web/paymentMethods/mastercard.svg'} alt="Ícone Mastercard" />
                                <Image width={32} height={32} src={'./web/paymentMethods/visa.svg'} alt="Ícone Visa" />
                                <Image width={32} height={32} src={'./web/paymentMethods/american-express.svg'} alt="Ícone American Express" />
                                <Image width={32} height={32} src={'./web/paymentMethods/elo.svg'} alt="Ícone Elo" />
                                <Image width={32} height={32} src={'./web/paymentMethods/pix.svg'} alt="Ícone Pix" />
                                <Image width={32} height={32} src={'./web/paymentMethods/hipercard.svg'} alt="Ícone Hipercard" />
                                <Image width={32} height={32} src={'./web/paymentMethods/discover.svg'} alt="Ícone Discover" />
                            </div>
                        </div>
                    </div>
                </FooterLinks>

                <DivisorFooter />

                <InfoFooter>
                    <div className="info-1">
                        <Link href={""}>Brasil</Link>
                        <Link href={""}>Política de Privacidade</Link>
                        <Link href={""}>Política de Cookies</Link>
                        <Link href={""}>Termos de Uso</Link>
                    </div>

                    <div className="info-2">
                        <span>© 2025 Nike. Todos os direitos reservados. Fisia Comércio de Produtos
                            Esportivos Ltda - CNPJ: 59.546.515/0045-55 Rodovia Fernão Dias, S/N Km 947.5 -
                            Galpão Modulo 3640 - CEP 37640-903 - Extrema - MG</span>
                    </div>
                </InfoFooter>
            </ContentFooter>
        </ContainerFooter>
    );
}