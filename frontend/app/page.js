'use client'

import Image from "next/image";
import styled from "styled-components";

const NavBar = styled.div`
    background-color: rgba(255, 227, 23, 95);
    width: 100%;
    height: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;

    position: fixed;
    z-index: 1;

    padding: 5px 130px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    img, a{
        cursor: pointer;
    }
`
const LinksNavBar = styled.div`
    display: flex;
    text-align: center;
    gap: 20px;

    font-size: 14px;
    font-weight: 500;
    color: #005C53;

    a {
        border-bottom: 2px solid transparent;
        transition: border-color 0.3s ease;
    }

    a:hover{
        border-bottom: 2px solid #005C53;
    }
`

const ActionsNavBar = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const SearchBar = styled.div`
    display: flex;
    padding: 5px 8px;
    gap: 8px;

    border: 1px solid #005C53;
    border-radius: 4px;

    img {
        margin-top: 2px;
    }

    input {
        background: none;
        border: none;
        outline: none;

        color: #005C53;
    }      

    input:focus {
        border: none;
    }
`

const Destaque = styled.div`
    display: flex;
    justify-content: center;

    position: relative;
    z-index: -1;

    width: 100%;
    height: 230px;
    background-color: rgba(4, 41, 64, 95);

    padding: 0px 130px;

    h1 {
        font-size: 24px;
        color: #CFCFCF;

        padding: 30px 0px;
    }
`

const DestaqueImages = styled.div`

`


export default function LadingPage() {
    return (
        <>
            <NavBar>
                <Image style={{ marginLeft: "25px" }} width={80} height={80} src={'/web/logo.svg'} alt="Logo Say Street" />
                <LinksNavBar>
                    <a>NOVIDADES</a>
                    <a>TÊNIS</a>
                    <a>ROUPAS</a>
                    <a>ACESSÓRIOS</a>
                </LinksNavBar>
                <ActionsNavBar>
                    <SearchBar>
                        <label htmlFor="pesquisa">
                            <Image width={14} height={14} src={'/web/procurar.svg'} alt="Ícone Lupa" />
                        </label>
                        <input id="pesquisa" type="text" placeholder="Pesquisar" />
                    </SearchBar>
                    <Image width={18} height={18} src={'/web/pessoa.svg'} alt="Ícone pessoa" />
                    <Image width={18} height={18} src={'/web/sacola.svg'} alt="Ícone sacola" />
                </ActionsNavBar>
            </NavBar>
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        minHeight: '410px',
                        objectFit: 'cover',
                    }}
                >
                    <source src="/web/videos/video-fundo.mp4" type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            </div>

            <div style={{height: 380}}>
                <Destaque>
                    <div>
                        <h1>DESTAQUES</h1>
                        <Image width={372} height={290} src={'/web/procurar.svg'} alt="Ícone Lupa" />
                        <Image width={372} height={290} src={'/web/procurar.svg'} alt="Ícone Lupa" />
                    </div>
                </Destaque>
            </div>

            {/* Conteúdo de Novidades */}
            <div id="novidades" style={{ padding: '50px 20px' }}>
                <h2>Novidades</h2>
                <div>
                    <p>Confira as últimas novidades da nossa coleção!</p>
                </div>
            </div>
        </>
    );
}