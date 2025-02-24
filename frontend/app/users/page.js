'use client'

import styled from "styled-components";
import { useEffect, useState } from "react";
import { atualizarStatus, listarUsuario } from "@/services/UserService";
import { useAlterar } from "@/hooks/useAlterar";
import Modal from "@/components/Modal";

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

export default function Users(){

    const [usuarios, setUsuarios] = useState([
        { id: 1, nome: 'João', email: 'joao@example.com', status: 'Ativo', grupo: 'admin' },
        { id: 2, nome: 'Maria', email: 'maria@example.com', status: 'Desativado', grupo: 'admin' },
        { id: 3, nome: 'Carlos', email: 'carlos@example.com', status: 'Ativo', grupo: 'admin' }
    ]);

    const [hiddenModel, setHiddenModel] = useState(true);
    const [lastStatus, setlastStatus] = useState('Inativar');
    const [lastUserChange, setLastUserChange] = useState(null);
    const [idUpdateUser, setIdUpdateUser] = useState(null);
    
    const [nomeFiltro, setNomeFiltro] = useState('');
    
    const atualizarTabela = async () => {
        try{
            const response = await listarUsuario();
            console.log(response);

            setUsuarios(response.map(user => ({
                id: user.id.timestamp,
                cpf: user.cpf,
                nome: user.nome,
                email: user.email,
                status: user.status,
                grupo: user.grupo
            })));

        }catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

    const alterarUsuario = async (id) => {
        // Encontre o usuário
        const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
    
        if (usuarioEncontrado) {
            window.location.href = `/alterar-user?cpfAlterar=${usuarioEncontrado.cpf}`; 
        }
    };
    useEffect(() => {
        atualizarTabela();
    }, [])

    useEffect(() => {
        
        console.log(usuarios);

    }, [usuarios])

    const alternarStatus = (id) => {
        setHiddenModel(false);
        setIdUpdateUser(id);

        usuarios.map((usuario) => {
            if(usuario.id === id){
                setlastStatus(usuario.status === true ? "Inativar" : "Ativar");
            }
        });
        
    };

    const handleConfirmModel = () => {
        alert(`Você ${lastStatus === "Ativar" ? "Ativou" : "Inativou"} o usuário com sucesso!`);

        setUsuarios((usuarios) => {
            return usuarios.map((usuario) => {
                if (usuario.id === idUpdateUser) {
                    const novoStatus = usuario.status === true ? false : true;
                    setHiddenModel(false);
                    setLastUserChange(usuario);
                    setlastStatus(usuario.status === false ? "Inativar" : "Ativar");
                    
                    // Chame a função para alterar o status no backend (API)
                    atualizarStatus(usuario.cpf, novoStatus); // Certifique-se de que a função de API está correta
    
                    // Cria uma cópia do usuário com o novo status
                    const updatedUser = { ...usuario, status: novoStatus };
                    
                    setHiddenModel(true);
                    return updatedUser;
                    
                }
                return usuario;
            });
        });
        
        
    }

    const handleCloseModel = () => {
        setHiddenModel(true);
    }

    const handleNomeFiltro = (e) => {
        setNomeFiltro(e.target.value);
    };


    console.log(usuarios);
    const usuariosFiltrados = (nomeFiltro ? usuarios.filter((usuario) =>
        String(usuario.nome).toLowerCase().includes(nomeFiltro.toLowerCase()),
    )
    : usuarios);

    return(
        <Container>
            <h1>Lista de Usuário</h1>

                <InputContainer>
                    <label className="label" htmlFor="nome">Pesquisar por Nome:</label>
                    <input  type="text" id="nome" value={nomeFiltro} onChange={handleNomeFiltro}/>

                    <a 
                        onClick={() => window.location.href = './cadastrar-user'}
                        style={{
                            display: "flex", 
                            justifyContent: "center", 
                            fontSize: 40, 
                            color: "white", 
                            cursor: "pointer"}}
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
                <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Grupo</th>
                            <th>Alterar</th>
                            <th>Habilitar/Desabilitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.status ? "Ativo" : "Inativo"}</td>
                                <td>{usuario.grupo}</td>
                                <td>
                                    <button onClick={() => alterarUsuario(usuario.id)}>Alterar</button>
                                </td>
                                <td>
                                    <button onClick={() => alternarStatus(usuario.id)}>
                                        {usuario.status === true ? 'Desabilitar' : 'Habilitar'}
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