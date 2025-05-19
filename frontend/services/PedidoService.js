const BASE_URL = "http://localhost:8080/pedido";

async function handleRequest(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return await response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function gerarPedido(dadosPedido){
    const url = `${BASE_URL}/gerar`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosPedido)
    })
}

export async function listarResumoPedidos(){
    const url = `${BASE_URL}/lista-resumo`
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function buscarPedidosIdCliente(clienteId){
    const url = `${BASE_URL}/listar/${clienteId}`
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function buscarPedidoId(pedidoId){
    const url = `${BASE_URL}/buscar/${pedidoId}`
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function alterarStatusPedido(id, status) {
    const url = `${BASE_URL}/alterar-status/${id}?status=${status}`;
    return await handleRequest(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' }
    });
}