'use client'

import { cadastrarUsuario } from "@/services/UserService";
import { useEffect, useState } from "react"

export function useAlterar(){

    const [nome, setNome] = useState('');
    const [cpfAlterar, setCpfAlterar] = useState('ddddddddddd');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [grupo, setGrupo] = useState('');

    const [erro, setErro] = useState(null);

    useEffect(() => {
        console.log(cpfAlterar);
    }, [])

    useEffect(() => {
        console.log(cpfAlterar);
    }, [cpfAlterar])

    const handleSubmit = async (e) => {
        e.preventDefault();

       try{
            if(password === passwordVerify){
                const response = await cadastrarUsuario({cpf, email, nome, password, grupo});

                if(response !== null){
                    alert(response);

                } else{
                    setErro(response);
                }
            }else {
                setErro("As senhas não são iguais!");
            }
       }catch(error){
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }

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
        cpfAlterar,
        setCpfAlterar,
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
        handleSubmit,
        handleNomeChange,
        handleCpfChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordVerifyChange,
        handleGrupoChange
    }
}