'use client'

import { useState } from "react"

export function useCadastroCliente() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');

  const [enderecos, setEnderecos] = useState([]);
  const [newAddress, setNewAddress] = useState({
    logradouro: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    uf: '',
  });

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [erro, setErro] = useState(null);

  const handleNomeChange = (e) => setNome(e.target.value);
  const handleCpfChange = (e) => setCpf(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleDataNascimentoChange = (e) => setDataNascimento(e.target.value);
  const handleGeneroChange = (e) => setGenero(e.target.value);

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const adicionarEndereco = () => {
    setEnderecos([...enderecos, newAddress]);
    setNewAddress({
      logradouro: '',
      numero: '',
      complemento: '',
      cep: '',
      cidade: '',
      uf: '',
    });
    setIsAddingAddress(false);
  };

  return {
    nome,
    cpf,
    email,
    dataNascimento,
    genero,
    enderecos,
    newAddress,
    isAddingAddress,
    erro,
    handleNomeChange,
    handleCpfChange,
    handleEmailChange,
    handleDataNascimentoChange,
    handleGeneroChange,
    handleEnderecoChange,
    adicionarEndereco,
    setNewAddress,
    setIsAddingAddress,
    setErro,
  }
}