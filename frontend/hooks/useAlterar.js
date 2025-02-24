'use client'

import { atualizarUsuario, cadastrarUsuario, encontrarIdBanco, encontrarUsuarioCpf } from "@/services/UserService";
import { useEffect, useState } from "react"

export function useAlterar(){

    const [nome, setNome] = useState('');
    const [cpfAlterar, setCpfAlterar] = useState('');
    const [idBanco, setIdBanco] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [grupo, setGrupo] = useState('');

    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Pega os parâmetros da URL
        const queryParams = new URLSearchParams(window.location.search);
        const cpf = queryParams.get('cpfAlterar'); // Pega o valor de cpfAlterar
        setCpfAlterar(cpf);
    }, []);

    useEffect(() => {
        const carregarUsuario = async () => {
            if (cpfAlterar) {
                const usuario = await encontrarUsuarioCpf(cpfAlterar); // Chama o serviço para pegar os dados do usuário
                if (usuario) {
                    const idBanco = await encontrarIdBanco(cpfAlterar);
                    setIdBanco(idBanco);
                    console.log(idBanco);
                    // Preenche os dados nos hooks com os dados retornados
                    setNome(usuario.nome || '');
                    setEmail(usuario.email || '');
                    setGrupo(usuario.grupo || '');
                    setPassword('');  // Senha não é retornada, pois é apenas para alteração
                    setPasswordVerify(''); // Confirmação de senha também
                } else {
                    setErro('Usuário não encontrado');
                }
            }
        };

        carregarUsuario();
    }, [cpfAlterar])

    const handleSubmit = async (e) => {
        e.preventDefault();

       try{
            if(password === passwordVerify){
                const response = await atualizarUsuario(idBanco,{cpf: cpfAlterar, email, nome, password, grupo});
                console.log(response);

                if(response !== null){
                    alert(response);
                    window.location.href = './users';
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