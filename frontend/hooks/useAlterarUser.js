'use client'

import { atualizarUsuario, cadastrarUsuario, encontrarIdBanco, encontrarUsuarioCpf } from "@/services/UserService";
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export function useAlterarUser(){

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [idBanco, setIdBanco] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [grupo, setGrupo] = useState('admin');

    const [erro, setErro] = useState(null);

    const [cpfUrl, setCpfUrl] = useState(''); // Não foi exportado
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        // Pega os parâmetros da URL
        const cpfUrl = searchParams.get('cpfAlterar'); // Pega o valor de cpfUrl
        setCpfUrl(cpfUrl);
        setCpf(cpfUrl);
    }, []);

    useEffect(() => {
        const carregarUsuario = async () => {
            if (cpfUrl) {
                const usuario = await encontrarUsuarioCpf(cpfUrl); // Chama o serviço para pegar os dados do usuário
                if (usuario) {
                    const idBanco = await encontrarIdBanco(cpfUrl);
                    setIdBanco(idBanco);
                    // Preenche os dados nos hooks com os dados retornados
                    setNome(usuario.nome || '');
                    setEmail(usuario.email || '');
                    setGrupo(usuario.grupo === '' ? grupo : usuario.grupo);
                    setPassword('');  // Senha não é retornada, pois é apenas para alteração
                    setPasswordVerify(''); // Confirmação de senha também
                } else {
                    setErro('Usuário não encontrado');
                }
            }
        };

        carregarUsuario();
    }, [cpfUrl])

    useEffect(() => {
        console.log('ID BANCO: ' + idBanco)
    }, [idBanco]);

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    }

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordVerifyChange = (event) => {
        setPasswordVerify(event.target.value);
    }

    const handleGrupoChange = (event) => {
        setGrupo(event.target.value);
    }

    return{
        idBanco,
        setIdBanco,
        nome,
        setNome,
        cpf,
        setCpf,
        email,
        setEmail,
        password,
        setPassword,
        passwordVerify,
        setPasswordVerify,
        grupo,
        setGrupo,
        erro,
        setErro,
        handleNomeChange,
        handleCpfChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordVerifyChange,
        handleGrupoChange
    }
}