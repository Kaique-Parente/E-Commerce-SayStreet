'use client';

import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import Tabela from "@/components/MUI/Tabela";
import useProdutos from "@/hooks/useProdutos";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "@mui/material";
import ModalView from "@/components/ModalView";
import { CarouselWithIndicatorsBack } from "@/components/CoreUI/CarouselWithIndicatorsBack";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid white;
    gap: 30px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    height: 20px;
    margin: 20px 0px 35px 0px;
    font-size: 18px;
`;

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
`;

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
`;

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
`;

const ViewContainerCarousel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 300px;
`;

const ViewContainerContent = styled.div`
    button {
        background-color: gray;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 8px;
    }
`;

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
`;

export default function ProdutosClient() {

    const {
        produtos,
        hiddenModel,
        lastStatus,
        lastProdutoChange,
        idUpdateProduto,
        nomeFiltro,
        hiddenView,
        viewImages,
        produtoView,
        setHiddenModel,
        setHiddenView,
        setViewImages,
        atualizarTabela,
        handleConfirmModel,
        handleCloseModel,
        handleNomeFiltro,
        handleAlternarStatus,
        handleViewProduto
    } = useProdutos();

    const tableHeaderSetores = [
        { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
        { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' },
        { id: 'qtd', numeric: true, disablePadding: false, label: 'Quantidade' },
        { id: 'preco', numeric: true, disablePadding: false, label: 'Preço' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'opcoes', numeric: false, disablePadding: false, label: 'Opções' },
    ];

    const [setor, setSetor] = useState(null);
    const [viewButtonVisible, setViewButtonVisible] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleAlterarProduto = (id) => {
        const produtoEncontrado = produtos.find((p) => p.id === id);
        if (produtoEncontrado) {
            router.push(`./alterar-produto?id=${produtoEncontrado.id}&setor=${setor}`);
        }
    };

    useEffect(() => {
        atualizarTabela();
        setSetor(searchParams.get('setor'));
    }, [searchParams]);

    useEffect(() => {
        setViewButtonVisible(setor === 'admin');
    }, [setor]);

    useEffect(() => {
        if (produtoView) {
            setViewImages(produtoView.imagens?.map(i => i.url) || []);
        }
    }, [produtoView]);

    return (
        <Container>
            <BackButton onClick={() => router.push(`./home?setor=${setor}`)}>
                <Image width={24} height={24} src={'/backoffice/voltar.svg'} alt="Voltar" />
                <span>Voltar</span>
            </BackButton>

            <ContentContainer>
                <h1>Lista de Produtos</h1>

                <InputContainer>
                    <CreateContainer>
                        <Link href={`./cadastrar-produto?setor=${setor}`}>
                            <Image width={14} height={14} alt="+" src="/backoffice/mais.png" />
                            <span>Novo Produto</span>
                        </Link>
                    </CreateContainer>

                    <SearchContainer>
                        <SearchIcon width={18} height={18} alt="Lupa" src="/backoffice/pesquisar.png" />
                        <input
                            type="text"
                            placeholder="Pesquisar por Nome:"
                            value={nomeFiltro}
                            onChange={handleNomeFiltro}
                        />
                    </SearchContainer>
                </InputContainer>

                <Modal isOpen={!hiddenModel} onClose={() => setHiddenModel(true)}>
                    <TextModal>
                        <h3>
                            Você tem certeza que deseja
                            <span style={{ fontWeight: "bold", color: lastStatus === "Ativar" ? "green" : "red" }}>
                                {" "}{lastStatus}
                            </span> este produto?
                        </h3>

                        <div className="botoes">
                            <button onClick={handleCloseModel}>Cancelar</button>
                            <button onClick={handleConfirmModel}>Confirmar</button>
                        </div>
                    </TextModal>
                </Modal>

                <ModalView isOpen={!hiddenView} onClose={() => setHiddenView(true)}>
                    <ViewContainerCarousel>
                        <h1>{produtoView?.produtoNome}</h1>
                        <CarouselWithIndicatorsBack images={viewImages} />
                    </ViewContainerCarousel>

                    <ViewContainerContent>
                        <Rating value={produtoView?.produtoAvaliacao || 0.5} precision={0.5} readOnly />
                        <p>Preço: R$ {produtoView?.produtoPreco}</p>
                        <p>Quantidade disponível: {produtoView?.produtoQtd}</p>
                        <button disabled>Comprar</button>
                    </ViewContainerContent>
                </ModalView>

                <Tabela
                    title="Produtos"
                    tableHeader={tableHeaderSetores}
                    rows={produtos}
                    nomeFiltro={nomeFiltro}
                    campoFiltro="nome"
                    rowsPerPage={15}
                    viewButton={viewButtonVisible}
                    handleAlterarRow={handleAlterarProduto}
                    handleViewRow={handleViewProduto}
                    handleAlternarStatus={handleAlternarStatus}
                />
            </ContentContainer>
        </Container>
    );
}
