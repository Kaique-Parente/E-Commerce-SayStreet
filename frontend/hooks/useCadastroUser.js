'use client'

import { cadastrarUsuario } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useState } from "react"

export function useCadastroUser(){

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [grupo, setGrupo] = useState('admin');

    const [erro, setErro] = useState(null);

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