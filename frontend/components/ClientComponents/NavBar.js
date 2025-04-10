'use client'

import { useCarrinho } from "@/context/CarrinhoContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color: rgba(255, 227, 23, 95);
    width: 100%;
    height: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;

    position: fixed;
    z-index: 10000;

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


export default function NavBar() {
    const { data: session, status } = useSession();
    const cliente = session?.user;

    const { carrinho } = useCarrinho();  // Pegando o carrinho do contexto
    const [quantidadeTotal, setQuantidadeTotal] = useState(0);

    useEffect(() => {
        // Sempre que o carrinho mudar, recalcula a quantidade total
        const total = carrinho.reduce((total, item) => total + item.quantidade, 0);
        setQuantidadeTotal(total);
    }, [carrinho]);

    return (
        <Container>
            <Link href={"./"}>
                <Image style={{ marginLeft: "25px" }} width={80} height={80} src={'/web/logo.svg'} alt="Logo Say Street" />
            </Link>
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
                <Link href={cliente !== null ? "./perfil" : "./login"}>
                    <Image width={20} height={20} src={'/web/pessoa.svg'} alt="Ícone pessoa" />
                </Link>
                <Link href={"./carrinho"} style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: -8, right: -12, padding: "0px 8px", backgroundColor: "red", borderRadius: "20px", fontSize: "14px", color: "white" }}>{quantidadeTotal}</div>
                    <Image width={20} height={20} src={'/web/sacola.svg'} alt="Ícone sacola" />
                </Link>
            </ActionsNavBar>
        </Container>
    );
}