'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Tabela from "@/components/MUI/Tabela";
import useUsers from "@/hooks/useUsers";
import Link from "next/link";
import Image from "next/image";
import useProdutos from "@/hooks/useProdutos";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border: 1px solid white;

    gap: 30px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    height: 20px;
    margin: 20px 0px 35px 0px;

    font-size: 18px;
`
const CreateContainer = styled.div`
   a{
        background-color: #3B8C6E;

        display: flex;
        align-items: center;
        padding: 8px;
        
        border-radius: 4px;

   }

   a:hover {
        background-color: #2F7359; 
    }
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    position: relative;

    input{
        border: 0.5px solid black;
        border-radius: 4px;

        width: 300px;
        padding: 8px 8px 8px 35px;
    }
`

const SearchIcon = styled(Image)`
  position: absolute;
  left: 10px;
`;

const TextModal = styled.div`
    margin: 50px;

    h3 {
        text-align: center;
        font-size: 25px;
        color: black;
    }

    .botoes {
        display: flex;
        justify-content: center;
        margin-top: 60px;

        gap: 40px;
    }

    .botoes button {
        width: 150px;
        height: 50px;

        border: none;
        border-radius: 8px;
        background-color: green;

        cursor: pointer;
    }

    .botoes button:nth-child(1) {
        background-color: red;
    }
`

export default function Produtos() {

    const {
        produtos,
        hiddenModel,
        lastStatus,
        lastProdutoChange,
        idUpdateProduto,
        nomeFiltro,
        setProdutos,
        setHiddenModel,
        setLastStatus,
        setLastProdutoChange,
        setIdUpdateProduto,
        setNomeFiltro,
        atualizarTabela,
        handleConfirmModel,
        handleCloseModel,
        handleNomeFiltro,
        handleAlterarProduto,
        handleAlternarStatus
    } = useProdutos();

    useEffect(() => {
        atualizarTabela();
    }, [])

    const tableHeaderSetores = [
        {
            id: 'id',
            numeric: true,
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'nome',
            numeric: false,
            disablePadding: false,
            label: 'Nome',
        },
        {
            id: 'qtd',
            numeric: true,
            disablePadding: false,
            label: 'Quantidade',
        },
        {
            id: 'preco',
            numeric: true,
            disablePadding: false,
            label: 'Preço',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'opcoes',
            numeric: false,
            disablePadding: false,
            label: 'Opções',
        },
    ];

    return (
        <Container>
            <ContentContainer>
                <div>
                    <h1>Lista de Produtos</h1>
                </div>

                <InputContainer>
                    <CreateContainer>
                        <Link
                            href={'./cadastrar-produto'}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",

                                cursor: "pointer"
                            }}
                        >
                            <Image width={14} height={14} alt='Um icone de mais' src="/mais.png" />
                            <span>Novo Produto</span>
                        </Link>
                    </CreateContainer>

                    <SearchContainer>
                        <SearchIcon width={18} height={18} alt='Um icone de lupa' src="/pesquisar.png" />
                        <input type="text" id="nome" placeholder="Pesquisar por Nome:" 
                            value={nomeFiltro} onChange={handleNomeFiltro} 
                        />
                    </SearchContainer>
                </InputContainer>

                <div>
                    <Modal isOpen={!hiddenModel} onClose={() => setHiddenModel(true)}>
                        <TextModal>
                            <h3>Você tem certeza que deseja
                                <span style={{ fontWeight: "bold", color: lastStatus === "Ativar" ? "green" : "red" }}> {lastStatus}
                                </span>
                                <span> este produto?</span></h3>

                            <div className="botoes">
                                <button onClick={handleCloseModel}>Cancelar</button>
                                <button onClick={handleConfirmModel}>Confirmar</button>
                            </div>
                        </TextModal>
                    </Modal>
                    <Tabela
                        title="Produtos"
                        tableHeader={tableHeaderSetores}
                        rows={produtos}
                        nomeFiltro={nomeFiltro}
                        fontHeader={12}
                        visibilityDense={false}
                        disableHead={true}
                        disableDelete={true}
                        height={580}
                        rowsPerPage={15}
                        handleAlterarUsuario={handleAlterarProduto}
                        handleAlternarStatus={handleAlternarStatus}
                    />
                </div>
            </ContentContainer>
        </Container>
    );
}