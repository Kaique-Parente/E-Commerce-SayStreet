const BASE_URL = "http://localhost:8080/cliente";

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

export async function cadastrarCliente(dadosCliente) {
    const url = `${BASE_URL}/cadastrar`;
    return await handleRequest(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
    });
}

export async function listarClientes() {
    const url = `${BASE_URL}/listar`;
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function editarCliente(id, dadosCliente) {
    const url = `${BASE_URL}/editar/${id}`;
    return await handleRequest(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCliente)
    });
}

export async function buscarClientePorId(id) {
    const url = `${BASE_URL}/buscar/${id}`;
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function buscarCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return await handleRequest(url, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    });
}