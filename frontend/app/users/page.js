'use client'

import styled from "styled-components";
import { useState } from "react";

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
    gap: 5px;

    margin-bottom: 20px;
`

export default function Users(){
    const [usuarios, setUsuarios] = useState([
        { id: 1, nome: 'João', email: 'joao@example.com', status: 'Ativo' },
        { id: 2, nome: 'Maria', email: 'maria@example.com', status: 'Desativado' },
        { id: 3, nome: 'Carlos', email: 'carlos@example.com', status: 'Ativo' }
    ]);

    const alternarStatus = (id) => {
        setUsuarios((usuarios) =>
            usuarios.map((usuario) =>
                usuario.id === id
                    ? { ...usuario, status: usuario.status === 'Ativo' ? 'Desativado' : 'Ativo' }
                    : usuario
            )
        );
    };

    return(
        <Container>
            <h1>Lista de Usuário</h1>

            <InputContainer>
                <label className="label" htmlFor="nome">Nome:</label>
                <input  type="text" id="nome"/>
                <button>Procurar</button>
                <a><img></img></a>
            </InputContainer>

            <div>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Alterar</th>
                            <th>Habilitar/Desabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.status}</td>
                                <td>
                                    <button onClick={() => alterarUsuario(usuario.id)}>Alterar</button>
                                </td>
                                <td>
                                    <button onClick={() => alternarStatus(usuario.id)}>
                                        {usuario.status === 'Ativo' ? 'Desabilitar' : 'Habilitar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}