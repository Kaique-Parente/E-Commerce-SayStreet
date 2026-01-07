import { buscarCep } from '@/services/ClienteService';
import { formatCep, formatCpf } from '@/utils/regex';
import { useState } from 'react';

export const useCadastroCliente = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');

    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [bairro, setBairro] = useState("");

    const [principal, setPrincipal] = useState(false);

    const [cepValido, setCepValido] = useState(false);

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleCpfChange = (e) => {
        const formattedCpf = formatCpf(e.target.value);
        setCpf(formattedCpf);
    }
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleDataNascimentoChange = (e) => {
        const value = e.target.value;
    
        const regex = /^\d{4}-\d{2}-\d{2}$/;
    
        if (value.length <= 10 && (value === '' || regex.test(value))) {
            setDataNascimento(value);
        }
    };
    
    const handleGeneroChange = (e) => setGenero(e.target.value);

    const handleLogradouroChange = (e) => setLogradouro(e.target.value);
    const handleNumeroChange = (e) => setNumero(e.target.value);
    const handleComplementoChange = (e) => setComplemento(e.target.value);
    const handleCepChange = (e) => {
        const formattedCep = formatCep(e.target.value);
        setCep(formattedCep);
    };
    const handleCidadeChange = (e) => setCidade(e.target.value);
    const handleUfChange = (e) => setUf(e.target.value);
    const handleBairroChange = (e) => setUf(e.target.value);

    const handlePrincipalChange = (e) => setPrincipal(e.target.checked);

    const handleCepValidate = async () => {
        if (cep.length === 9) {
            const cepFormatado = cep.replace("-", "");

            const dadosCep = await buscarCep(cepFormatado);
    
            if (dadosCep && dadosCep.logradouro && dadosCep.localidade && dadosCep.uf) {
                setLogradouro(dadosCep.logradouro);
                setCidade(dadosCep.localidade);
                setUf(dadosCep.uf);
                setBairro(dadosCep.bairro);

                setCepValido(true);
            } else {
                alert("Erro ao buscar os dados do CEP");
            }
        } else {
            alert("CEP inválido");
        }
    };

    return {
        nome,
        cpf,
        email,
        senha,
        dataNascimento,
        genero,
        handleNomeChange,
        handleCpfChange,
        handleEmailChange,
        handleSenhaChange,
        handleDataNascimentoChange,
        handleGeneroChange,

        logradouro,
        numero,
        complemento,
        cep,
        cidade,
        uf,
        principal,
        bairro,
        setLogradouro,
        setNumero,
        setComplemento,
        setCep,
        setCidade,
        setUf,
        setPrincipal,
        setCepValido,
        setBairro,

        handleLogradouroChange,
        handleNumeroChange,
        handleComplementoChange,
        handleCepChange,
        handleCidadeChange,
        handleUfChange,
        handlePrincipalChange,
        handleBairroChange,

        cepValido,
        handleCepValidate,
    };
};