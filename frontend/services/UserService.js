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