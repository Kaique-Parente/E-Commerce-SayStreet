'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { listarResumoPedidos } from "@/services/PedidoService";

export default function usePedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [nomeFiltro, setNomeFiltro] = useState('');
    const [hiddenView, setHiddenView] = useState(true);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [novoStatusTemp, setNovoStatusTemp] = useState('');
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);


    const router = useRouter();

    const atualizarTabela = async () => {
        try {
            const response = await listarResumoPedidos();
            console.log(response);

            setPedidos(response.map(pedido => ({
                id: pedido.id,
                dataPedido: pedido.dataPedido,
                status: pedido.status,
                valorTotal: pedido.valorTotal,
            })));

        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    const handleNomeFiltro = (e) => {
        setNomeFiltro(e.target.value);
    };

    /*
    const handleViewProduto = async (id) => {
        setHiddenView(false);
        
        try{
            const response = await encontrarProdutoId(id);

            if(response !== null){
                setProdutoView(response);
            }

        }catch(error){
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }
        */

    const handleChangeStatusPedido = (pedidoId, novoStatus) => {
        setPedidoSelecionado(pedidoId);
        setNovoStatusTemp(novoStatus);
        setOpenConfirmModal(true);
    };



    return {
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
    };
}