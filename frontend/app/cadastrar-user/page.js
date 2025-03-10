'use client'

import { useCadastroUser } from "@/hooks/useCadastroUser"
import { cadastrarUsuario } from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

const ContainerContent = styled.div`
    background-color: #62656773;
    
    display: flex;
    flex-direction: column;
    gap: 30px;

    padding: 100px 80px;
    border-radius: 12px;

    h2 {
        font-size: 30px;
        font-weight: bold;
    }

    h3 {
        margin: 15px 0;
    }

    button {
        background: none;
        border: 1px solid white;
        border-radius: 8px;

        padding: 10px 20px;
        margin-top: 10px;

        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: rgba(98, 101, 103, 0.9);
    }
`

const InputContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    gap: 5px;

    margin-bottom: 20px;

    input, select{
        background-color:rgb(85, 76, 76);
        color: rgb(196, 190, 190);

        padding: 8px;
        border-radius: 8px;
        border: 2px solid white;
    }

    select {
        font-size: 16px;
        margin-top: 10px;
    }
`

export default function CadastrarUser() {
    const {
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
    } = useCadastroUser();

    const [setor, setSetor] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const setor = searchParams.get('setor');
        setSetor(setor);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password === passwordVerify) {
                const response = await cadastrarUsuario({ cpf, email, nome, password, grupo });

                if (response !== null) {
                    alert(response);

                    router.push(`./users?setor=${setor}`);
                } else {
                    setErro(response);
                }
            } else {
                setErro("As senhas não são iguais!");
            }
        } catch (error) {
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    }

    useEffect(() => {
        if (erro) {
            alert(erro.toString());
        }
    }, [erro])

    return (
        <div>
            <Container>
                <ContainerContent>
                    <h2>Cadastrar Usuário</h2>
                    <form onSubmit={handleSubmit}>
                        <h3>Informação Pessoal</h3>
                        <InputContainer>
                            <label className="label" htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" onChange={handleNomeChange} value={nome} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="cpf">CPF:</label>
                            <input required type="text" id="cpf" onChange={handleCpfChange} value={cpf} />
                        </InputContainer>

                        <h3>Informação de Contato</h3>
                        <InputContainer>
                            <label className="label" htmlFor="email">Email:</label>
                            <input required type="email" id="email" onChange={handleEmailChange} value={email} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="password">Senha:</label>
                            <input required type="password" id="password" onChange={handlePasswordChange} value={password} />
                        </InputContainer>

                        <InputContainer>
                            <label className="label" htmlFor="passwordVerify">Confirmar Senha:</label>
                            <input required type="password" id="passwordVerify" onChange={handlePasswordVerifyChange} value={passwordVerify} />
                        </InputContainer>


                        <InputContainer>
                            <label className="label" htmlFor="grupo">Grupo:</label>
                            <select
                                id="grupoSelect"
                                value={grupo}
                                onChange={handleGrupoChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="estoquista">Estoquista</option>
                            </select>
                        </InputContainer>

                        <div style={{display: "flex", gap: 10}}>
                            <button type="button" onClick={() => router.push(`./users?setor=${setor}`)}>Cancelar</button>
                            <button style={{ width: "200px" }} type="submit">Confirmar</button>
                        </div>
                    </form>
                </ContainerContent>
            </Container>
        </div >
    );
}