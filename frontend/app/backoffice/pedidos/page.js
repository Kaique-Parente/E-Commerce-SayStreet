'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useRouter, useSearchParams } from "next/navigation";
import Tabela from "@/components/MUI/Tabela";
import useUsers from "@/hooks/useUsers";
import Link from "next/link";
import Image from "next/image";
import useProdutos from "@/hooks/useProdutos";
import { Rating } from "@mui/material";
import ModalView from "@/components/ModalView";
import { CarouselWithIndicatorsBack } from "@/components/CoreUI/CarouselWithIndicatorsBack";
import usePedidos from "@/hooks/usePedidos";

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
    justify-content: end;
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

    span{
        text-decoration: underline;
        color: white;
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
        z-index: 10000;

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

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 10px;

    position: absolute;
    top: 30px;
    left: 20px;

    background-color:rgb(128, 227, 85);

    border: none;
    border-radius: 8px;
    
    cursor: pointer;

    &:hover{
        background-color:rgb(84, 149, 56);
    }

    span{
        font-weight: bold;
        font-size: 14px;
    }
`


export default function Pedidos() {

    const {
        pedidos,
        nomeFiltro,
        hiddenView,
        setPedidos,
        setNomeFiltro,
        atualizarTabela,
        handleNomeFiltro,
        handleChangeStatusPedido,
        openConfirmModal,
        setOpenConfirmModal,
        novoStatusTemp,
        setNovoStatusTemp,
        pedidoSelecionado,
        setPedidoSelecionado
    } = usePedidos();

    const tableHeaderPedidos = [
        {
            id: 'id',
            numeric: true,
            disablePadding: false,
            label: 'Número do Pedido',
        },
        {
            id: 'dataPedido',
            numeric: false,
            disablePadding: false,
            label: 'Data do Pedido',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'valorTotal',
            numeric: true,
            disablePadding: false,
            label: 'Valor Total',
        }
    ];

    const [setor, setSetor] = useState('');
    const [viewButtonVisible, setViewButtonVisible] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();


    useEffect(() => {
        atualizarTabela();
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])


    useEffect(() => {
        if (setor == 'admin') {
            setViewButtonVisible(true);
        }
    }, [setor])

    const confirmarAlteracaoStatus = () => {
        alterarStatusPedido(pedidoSelecionado, novoStatusTemp);
        setOpenConfirmModal(false);
    };

    const alterarStatusPedido = async (pedidoId, status) => {
        try {
            const response = await fetch(`http://localhost:8080/pedido/alterar-status/${pedidoId}?status=${status}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                atualizarTabela();
            } else {
                const errorMessage = await response.text();
                alert(`Erro ao alterar o status: ${errorMessage}`);
            }
        } catch (error) {
            alert(`Erro de conexão: ${error.message}`);
        }
    };

    return (
        <Container>
            <BackButton onClick={() => router.push(`./home?setor=${setor}`)}>
                <Image width={24} height={24} src={'/backoffice/voltar.svg'} alt="Seta para a esquerda" />
                <span>Voltar</span>
            </BackButton>
            <ContentContainer>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}>
                    <div>
                        <h1>Lista de Pedidos</h1>
                    </div>

                    <SearchContainer>
                        <SearchIcon width={18} height={18} alt='Um icone de lupa' src="/backoffice/pesquisar.png" />
                        <input type="text" id="nome" placeholder="Pesquisar Número do Pedido:"
                            value={nomeFiltro} onChange={handleNomeFiltro}
                        />
                    </SearchContainer>
                </div>

                <div>

                    <Modal isOpen={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                        <TextModal>
                            <h3 style={{ fontWeight: "400" }}>Deseja realmente alterar o status do pedido #{pedidoSelecionado} para
                                <br />
                                <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{novoStatusTemp}</span>?
                            </h3>

                            <div className="botoes">
                                <button onClick={() => setOpenConfirmModal(false)}>Cancelar</button>
                                <button onClick={confirmarAlteracaoStatus}>Confirmar</button>
                            </div>
                        </TextModal>
                    </Modal>

                    <Tabela
                        title="Produtos"
                        tableHeader={tableHeaderPedidos}
                        rows={pedidos}
                        nomeFiltro={nomeFiltro}
                        campoFiltro={"id"}
                        fontHeader={12}
                        visibilityDense={false}
                        disableHead={true}
                        disableDelete={true}
                        height={580}
                        rowsPerPage={15}
                        viewButton={viewButtonVisible}
                        isPedido={true}
                        onStatusSelect={handleChangeStatusPedido}
                    //handleAlterarRow={handleAlterarProduto}
                    //handleViewRow={handleViewProduto}
                    //handleAlternarStatus={handleAlternarStatus}
                    />
                </div>
            </ContentContainer>
        </Container>
    );
}