export async function cadastrarUsuario(dadosUsuario){

    const url = "http://localhost:8080/user/create";
    console.log(dadosUsuario);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario)
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function listarUsuario(){

    const url = "http://localhost:8080/user/listar";
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.json();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function atualizarStatus(id, novoStatus){

    const url = `http://localhost:8080/user/alterar-status/${id}?status=${novoStatus}`;
    console.log(id);
    console.log(novoStatus);
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function encontrarUsuarioCpf(cpf){

    const url = `http://localhost:8080/user/encontrarUsuarioCpf/${cpf}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.json();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function encontrarIdBanco(cpf){

    const url = `http://localhost:8080/user/encontrarId/${cpf}`;


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function atualizarUsuario(id, dadosUsuario){

    const url = `http://localhost:8080/user/editar/${id}`;
    console.log(url);
    console.log(dadosUsuario);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario)
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function loginUsuario(dadosLogin) {
    const url = "http://localhost:8080/user/login";
    console.log(url);
    console.log(dadosLogin);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosLogin)
        });

        console.log(response);
        
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}

export async function encontrarSetorUsuarioEmail(email){

    const url = `http://localhost:8080/user/encontrarSetorUsuarioEmail/${email}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);
        if (!response.ok) {
            let errorMessage = await response.text();
            alert(`Erro: ${response.status} - ${errorMessage}`);
            return null;
        }

        return response.text();

    } catch (error) {
        alert("Erro de conexão: " + error.message);
        return null;
    }
}