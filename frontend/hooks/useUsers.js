'use client'

import { useState, useEffect } from "react";
import { listarUsuario, atualizarStatus } from "@/services/UserService";
import { useRouter } from "next/navigation";

export default function useUsers() {

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

    const router = useRouter();

    const atualizarTabela = async () => {
        try {
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

        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    }

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

    const handleAlterarUsuario = async (id) => {
        // Encontre o usuário
        const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
        console.log(usuarios);

        if (usuarioEncontrado) {
            router.push(`./alterar-user?cpfAlterar=${usuarioEncontrado.cpf}`);
        }
    };

    const handleAlternarStatus = (id) => {
        setHiddenModel(false);
        setIdUpdateUser(id);

        usuarios.map((usuario) => {
            if (usuario.id === id) {
                setlastStatus(usuario.status === true ? "Inativar" : "Ativar");
            }
        });
    };

    return {
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
        handleNomeFiltro,
        handleAlterarUsuario,
        handleAlternarStatus
    };
}
