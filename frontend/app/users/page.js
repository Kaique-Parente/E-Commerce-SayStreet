'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import { atualizarStatus, listarUsuario } from "@/services/UserService";
import { useAlterar } from "@/hooks/useAlterar";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import Tabela from "@/components/MUI/Tabela";
import useUsers from "@/hooks/useUsers";

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

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;

    height: 20px;
    margin-bottom: 20px;

    button{
        margin-left: 5px;
    }

    a{
        width: 40px;
        height: 40px;
        margin-left: 10px;
    }
`

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

export default function Users() {

    const {
        usuarios,
        hiddenModel,
        lastStatus,
        lastUserChange,
        idUpdateUser,
        nomeFiltro,
        setUsuarios,
        setHiddenModel,
        setlastStatus,
        setLastUserChange,
        setIdUpdateUser,
        setNomeFiltro,
        atualizarTabela,
        handleConfirmModel,
        handleCloseModel,
        handleOpenCadastrar,
        handleNomeFiltro,
        handleAlterarUsuario,
        handleAlternarStatus
    } = useUsers();

    useEffect(() => {
        atualizarTabela();
    }, [])

    const tableHeaderSetores = [
        {
            id: 'nome',
            numeric: false,
            disablePadding: false,
            label: 'Nome',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'grupo',
            numeric: false,
            disablePadding: false,
            label: 'Grupo',
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
            <h1>Lista de Usuário</h1>

            <InputContainer>
                <label className="label" htmlFor="nome">Pesquisar por Nome:</label>
                <input type="text" id="nome" value={nomeFiltro} onChange={handleNomeFiltro} />

                <a
                    onClick={handleOpenCadastrar}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: 40,
                        color: "white",
                        cursor: "pointer"
                    }}
                >+</a>
            </InputContainer>

            <div>
                <Modal isOpen={!hiddenModel}>
                    <TextModal>
                        <h3>Você tem certeza que deseja
                            <span style={{ fontWeight: "bold", color: lastStatus === "Ativar" ? "green" : "red" }}> {lastStatus}
                            </span>
                            <span> este usuário?</span></h3>

                        <div className="botoes">
                            <button onClick={handleCloseModel}>Cancelar</button>
                            <button onClick={handleConfirmModel}>Confirmar</button>
                        </div>
                    </TextModal>
                </Modal>
                <Tabela
                    title="Produtos"
                    tableHeader={tableHeaderSetores}
                    rows={usuarios}
                    nomeFiltro={nomeFiltro}
                    fontHeader={12}
                    visibilityDense={false}
                    disableHead={true}
                    disableDelete={true}
                    height={580}
                    rowsPerPage={15}
                    handleAlterarUsuario={handleAlterarUsuario}
                    handleAlternarStatus={handleAlternarStatus}
                />
            </div>
        </Container>
    );
}