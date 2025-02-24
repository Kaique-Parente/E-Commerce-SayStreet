'use client'

import { loginUsuario } from "@/services/UserService";
import { useState } from "react";

export default function UseLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState(null);

    // Função para envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUsuario({ email, password });

            if (response !== null) {
                alert(response);
                window.location.href = './home';
            } else {
                setErro(response);
            }
        } catch (error) {
            console.log(error);
            setErro("Erro de comunicação com o servidor!");
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return {
        email,
        password,
        erro,
        setEmail,
        setPassword,
        handleSubmit,
        handleEmailChange,
        handlePasswordChange,
    };
}
