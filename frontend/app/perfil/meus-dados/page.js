"use client"

import InputPersonalizado from "@/components/ClientComponents/InputPersonalizado";
import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDadosCliente } from "@/hooks/web/useDadosCliente";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";
import SelectPersonalizado from "@/components/ClientComponents/SelectPersonalizado";
import { editarCliente } from "@/services/ClienteService";
import { useRouter } from "next/navigation";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 120px 120px 50px;
  
  background-color:rgba(236, 236, 236, 0.8);
  color: #005C53;
`;

const CardContainer = styled.div`
    background-color: rgb(255 251 251);
    padding: 50px 60px;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    gap: 30px;

    box-shadow: 1px 1px 24px 1px rgba(0,0,0,0.2);
`;

const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #584439;
`;

const InputsContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;

    label{
        font-size: 18px;
    }
`

const AddressContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 25px;
`

const TitleAddress = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const AddressContent = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isPrincipal'
})`
    height: 150px;
    font-size: 14px;
    padding: 10px;

    position: relative;

    border: ${(props) => props.isPrincipal ? "1px solid rgba(255, 227, 23, 0.95)" : "1px solid #005C53"};
    border-left: ${(props) => props.isPrincipal ? "4px solid rgba(255, 227, 23, 0.95)" : "4px solid #005C53"};

    h2 {
        font-size: 18px;
    }

    .principal-address {
        position: absolute;
        bottom: 15px;
        left: 15px;
        
        span{
            color: rgba(255, 227, 23, 0.95);
        }
    }

    button {
        position: absolute;
        bottom: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 14px;
        color: darkcyan;
        text-decoration: underline;
    }
`;

export default function MeusDados() {
    const { data: session, update } = useSession();

    const user = session?.user;
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const [newAddress, setNewAddress] = useState(null);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const handleCancelarEndereco = () => {
        setCepValido(false);
        setIsAddingAddress(false)
    }

    const {
        nome,
        cpf,
        email,
        senha,
        dataNascimento,
        genero,
        setNome,
        setEmail,
        setSenha,
        setCpf,
        setDataNascimento,
        setGenero,
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
    } = useDadosCliente();

    const [enderecos, setEnderecos] = useState([]);
    const [enderecoFatura, setEnderecoFatura] = useState({});

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [])

    useEffect(() => {
        if (user) {
            setNome(user.nome || '');
            setEmail(user.email || '');
            setSenha(user.senha || '');
            setCpf(user.cpf || '');
            setDataNascimento(user.dataNascimento?.split('T')[0] || ''); // pega só a parte da data
            setGenero(user.genero || '');
            setEnderecoFatura(user.enderecoFatura || []);
            
            const updateEnderecos = user.enderecos.map((endereco, index) => ({
                ...endereco,
                isEnderecoFaturamento: user.enderecoFatura
                    ? endereco.cep === user.enderecoFatura.cep &&
                      endereco.numero === user.enderecoFatura.numero &&
                      endereco.logradouro === user.enderecoFatura.logradouro &&
                      endereco.uf === user.enderecoFatura.uf
                    : index === 0 // se não tiver enderecoFatura, marca o primeiro como true
            }));
            
            setEnderecos(updateEnderecos || []);

            console.log(user);
        }
    }, [user]);

    useEffect(() => {
        console.log(isEditing);
    }, [isEditing])

    useEffect(() => {
        console.log(enderecos);
    }, [enderecos])

    const handleEnderecoFaturamento = (id) => {
        const updateEnderecos = enderecos.map((endereco) => ({
            ...endereco,
            isEnderecoFaturamento: endereco.id === id
        }));
        setEnderecos(updateEnderecos);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let enderecoFaturaSearch = enderecos.find((end) => end.isEnderecoFaturamento === true);

        if (!enderecoFaturaSearch && enderecos.length === 1) {
            enderecoFaturaSearch = enderecos[0];
        }

        const updateEnderecos = enderecos.map((endereco) => {
            const { isEnderecoFaturamento, ...rest } = endereco;
            return rest;
        });

        const updateEnderecoFatura = enderecoFaturaSearch
            ? (({ isEnderecoFaturamento, ...rest }) => ({
                ...rest,
                enderecoPadrao: false,
            }))(enderecoFaturaSearch)
            : null;

        const dadosCliente = {
            nome,
            cpf,
            email,
            senha,
            dataNascimento,
            genero,
            enderecos: updateEnderecos,
            enderecoFatura: updateEnderecoFatura,
        };

        console.log(dadosCliente);

        try {
            const response = await editarCliente(user.id, dadosCliente);
            console.log(response);

            if (response) {
                alert(response);

                await update({
                    id: user.id,
                    nome: dadosCliente.nome,
                    email: dadosCliente.email,
                    cpf: dadosCliente.cpf,
                    dataNascimento: dadosCliente.dataNascimento,
                    genero: dadosCliente.genero,
                    enderecos: dadosCliente.enderecos,
                    enderecoFatura: dadosCliente.enderecoFatura,
                    status: user.status,
                });
            }

        } catch (error) {
            console.error("Erro ao tentar atualizar os dados:", error);
            alert("Ocorreu um erro inesperado. Tente novamente.");
        }
    };

    if (!session) {
        return (
            <div style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <Container>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", marginBottom: "30px" }}>
                    <Image src={"/web/sidebar/dados.png"} width={32} height={32} alt="Dados" />
                    <h2>Meus Dados</h2>
                </div>

                <div style={{ display: "flex", gap: "50px" }}>
                    <CardContainer>
                        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
                            <FormGrid>
                                <InputsContainer>
                                    <label htmlFor="nome">Nome</label>
                                    <InputPersonalizado
                                        id="nome"
                                        value={nome}
                                        onChange={handleNomeChange}
                                        disabled={!isEditing}
                                        placeholder="Nome"
                                        isRequired
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="cpf">CPF</label>
                                    <InputPersonalizado
                                        id="cpf"
                                        value={cpf}
                                        onChange={handleCpfChange}
                                        disabled={true}
                                        placeholder="CPF"
                                        isRequired
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="email">Email</label>
                                    <InputPersonalizado
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled={true}
                                        placeholder="Email"
                                        isRequired
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="senha">Senha</label>
                                    <InputPersonalizado
                                        id="senha"
                                        type="password"
                                        value={senha}
                                        onChange={handleSenhaChange}
                                        placeholder="Senha"
                                        disabled={!isEditing}
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                                    <InputPersonalizado
                                        id="dataNascimento"
                                        type="date"
                                        value={dataNascimento}
                                        onChange={handleDataNascimentoChange}
                                        disabled={!isEditing}
                                        placeholder="Data de Nascimento"
                                        isRequired
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="genero">Gênero</label>
                                    <SelectPersonalizado
                                        id="genero"
                                        value={genero}
                                        onChange={handleGeneroChange}
                                        isRequired
                                        disabled={!isEditing}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="nao-informado">Prefiro não informar</option>
                                    </SelectPersonalizado>
                                </InputsContainer>
                            </FormGrid>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <BotaoPersonalizado
                                    onClick={() => setIsEditing(true)}
                                    type="button"
                                    color="marrom"
                                    width="100%"
                                    style={{ marginTop: "30px" }}
                                >
                                    Editar dados
                                </BotaoPersonalizado>
                                <BotaoPersonalizado
                                    onClick={handleSubmit}
                                    type="submit"
                                    color="amarelo"
                                    width="75%"
                                    style={{ marginTop: "30px" }}
                                >
                                    Salvar Todas as Alterações
                                </BotaoPersonalizado>
                            </div>

                        </form>
                    </CardContainer>

                    <CardContainer style={{ width: "450px", justifyContent: "start", padding: "50px 20px" }}>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <AddressContainer>
                                <TitleAddress>
                                    <Image src="/web/sidebar/endereco.png" width={32} height={32} alt="Endereco" />
                                    <h3>Meus endereços</h3>
                                </TitleAddress>

                                {isAddingAddress ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();

                                            setIsAddingAddress(false);
                                            if (logradouro !== "" && bairro !== "" && cidade !== "") {
                                                const newAddress = {
                                                    id: Date.now(),
                                                    logradouro: logradouro,
                                                    numero: numero,
                                                    complemento: complemento,
                                                    cep: cep,
                                                    localidade: cidade,
                                                    uf: uf,
                                                    estado: uf,
                                                    enderecoPadrao: enderecos.length === 0 ? true : principal,
                                                    bairro: bairro,
                                                    isEnderecoFaturamento: enderecos.length === 0,
                                                }

                                                setEnderecos((prevEnderecos) => {
                                                    const atualizados = principal
                                                        ? prevEnderecos.map((end) => ({ ...end, enderecoPadrao: false }))
                                                        : [...prevEnderecos];

                                                    return [...atualizados, newAddress];
                                                });
                                            } else {
                                                alert("Valide o CEP para continuar com o cadastro!");
                                            }

                                            console.log(newAddress);  // Aqui você pode enviar para o servidor ou armazenar no estado
                                        }}
                                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                    >
                                        <label>CEP</label>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <InputPersonalizado
                                                name="cep"
                                                value={cep}
                                                onChange={handleCepChange}
                                                placeholder="CEP"
                                                isRequired
                                                maxLength={10}
                                                disabled={false}
                                            />
                                            <BotaoPersonalizado
                                                type="button"
                                                color="marrom"
                                                width="100%"
                                                onClick={handleCepValidate}
                                            >
                                                Validar
                                            </BotaoPersonalizado>
                                        </div>
                                        <label>Logradouro</label>
                                        <InputPersonalizado
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={handleLogradouroChange}
                                            placeholder="Logradouro"
                                            isRequired
                                            disabled={true}
                                        />
                                        <label>Número</label>
                                        <InputPersonalizado
                                            name="numero"
                                            type="number"
                                            value={numero}
                                            onChange={handleNumeroChange}
                                            placeholder="Número"
                                            isRequired
                                        />
                                        <label>Complemento</label>
                                        <InputPersonalizado
                                            name="complemento"
                                            value={complemento}
                                            onChange={handleComplementoChange}
                                            placeholder="Complemento"
                                        />
                                        <label>Bairro</label>
                                        <InputPersonalizado
                                            name="bairro"
                                            value={bairro}
                                            onChange={handleBairroChange}
                                            placeholder="Bairro"
                                            isRequired
                                            disabled={true}
                                        />
                                        <label>Cidade</label>
                                        <InputPersonalizado
                                            name="cidade"
                                            value={cidade}
                                            onChange={handleCidadeChange}
                                            placeholder="Cidade"
                                            isRequired
                                            disabled={true}
                                        />
                                        <label>UF</label>
                                        <InputPersonalizado
                                            name="uf"
                                            value={uf}
                                            onChange={handleUfChange}
                                            placeholder="UF"
                                            isRequired
                                            disabled={true}
                                        />

                                        <FormControlLabel control={
                                            <Switch
                                                checked={principal}
                                                onChange={handlePrincipalChange}
                                            />
                                        }
                                            label={principal ? "Endereço principal" : "Endereço comum"}
                                        />

                                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                            <BotaoPersonalizado
                                                type="button"
                                                color="marrom"
                                                width="100%"
                                                onClick={handleCancelarEndereco}
                                            >
                                                Cancelar
                                            </BotaoPersonalizado>
                                            <BotaoPersonalizado type="submit" color="amarelo" width="100%">
                                                Salvar
                                            </BotaoPersonalizado>
                                        </div>
                                    </form>
                                ) : (
                                    enderecos.map((address, index) => (
                                        <div key={address.id || index} style={{ marginBottom: "15px" }}>
                                            {editingAddressId === address.id ? (
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();

                                                        const updated = [...enderecos];
                                                        updated[index] = {
                                                            ...updated[index],
                                                            logradouro,
                                                            numero,
                                                            complemento,
                                                            cep,
                                                            localidade: cidade,
                                                            uf,
                                                            estado: uf,
                                                            enderecoPadrao: enderecos.length === 1 ? true : principal,
                                                            bairro,
                                                            isEnderecoFaturamento: enderecos.length === 1 ? true : !!address.isEnderecoFaturamento,
                                                        };

                                                        // Se o endereço for marcado como principal, zera os outros
                                                        if (principal) {
                                                            for (let i = 0; i < updated.length; i++) {
                                                                if (updated[i].id !== address.id) {
                                                                    updated[i].enderecoPadrao = false;
                                                                }
                                                            }
                                                        }

                                                        setEnderecos(updated);
                                                        setEditingAddressId(null);
                                                    }}
                                                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                                >
                                                    <label>CEP</label>
                                                    <div style={{ display: "flex", gap: "10px" }}>
                                                        <InputPersonalizado
                                                            name="cep"
                                                            value={cep}
                                                            onChange={handleCepChange}
                                                            placeholder="CEP"
                                                            isRequired
                                                            maxLength={10}
                                                            disabled={true}
                                                        />
                                                        <BotaoPersonalizado
                                                            type="button"
                                                            color="marrom"
                                                            width="100%"
                                                            onClick={handleCepValidate}
                                                        >
                                                            Validar
                                                        </BotaoPersonalizado>
                                                    </div>
                                                    <label>Logradouro</label>
                                                    <InputPersonalizado
                                                        value={logradouro}
                                                        onChange={handleLogradouroChange}
                                                        placeholder="Logradouro"
                                                        isRequired
                                                        disabled={true}
                                                    />

                                                    <label>Número</label>
                                                    <InputPersonalizado
                                                        value={numero}
                                                        onChange={handleNumeroChange}
                                                        placeholder="Número"
                                                        isRequired
                                                    />

                                                    <label>Complemento</label>
                                                    <InputPersonalizado
                                                        value={complemento}
                                                        onChange={handleComplementoChange}
                                                        placeholder="Complemento"
                                                    />

                                                    <label>Bairro</label>
                                                    <InputPersonalizado
                                                        value={bairro}
                                                        onChange={handleBairroChange}
                                                        placeholder="Bairro"
                                                        disabled={true}
                                                    />

                                                    <label>Cidade</label>
                                                    <InputPersonalizado
                                                        value={cidade}
                                                        onChange={handleCidadeChange}
                                                        placeholder="Cidade"
                                                        isRequired
                                                        disabled={true}
                                                    />

                                                    <label>UF</label>
                                                    <InputPersonalizado
                                                        value={uf}
                                                        onChange={handleUfChange}
                                                        placeholder="UF"
                                                        isRequired
                                                        disabled={true}
                                                    />

                                                    <FormControlLabel
                                                        control={
                                                            address.enderecoPadrao ?
                                                                <Switch
                                                                    checked={address.enderecoPadrao}
                                                                    disabled={address.enderecoPadrao}
                                                                />
                                                                :
                                                                <Switch
                                                                    checked={principal}
                                                                    onChange={handlePrincipalChange}
                                                                />
                                                        }
                                                        label={principal || address.enderecoPadrao ? "Endereço principal" : "Endereço comum"}
                                                    />

                                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                        <BotaoPersonalizado
                                                            type="button"
                                                            color="marrom"
                                                            width="100%"
                                                            onClick={() => setEditingAddressId(null)}
                                                        >
                                                            Cancelar
                                                        </BotaoPersonalizado>
                                                        <BotaoPersonalizado type="submit" color="amarelo" width="100%">
                                                            Salvar
                                                        </BotaoPersonalizado>
                                                    </div>
                                                </form>
                                            ) : (
                                                <AddressContent isPrincipal={address.enderecoPadrao}>
                                                    <h2>Endereço</h2>
                                                    <p>{address.logradouro}</p>
                                                    <p>Número: {address.numero}, {address.complemento}</p>
                                                    <p>CEP: {address.cep} - {address.cidade}, {address.uf}</p>

                                                    {address.principal && (
                                                        <p className="principal-address">
                                                            <span>(</span>Endereço Padrão<span>)</span>
                                                        </p>
                                                    )}

                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={address.isEnderecoFaturamento}
                                                                onChange={() => {
                                                                    if (!address.isEnderecoFaturamento) {
                                                                        handleEnderecoFaturamento(address.id);
                                                                    }
                                                                }}
                                                            />
                                                        }

                                                        label="Endereço faturamento"
                                                        labelPlacement="end"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingAddressId(address.id);
                                                            setCep(address.cep || "");
                                                            setLogradouro(address.logradouro || "");
                                                            setNumero(address.numero || "");
                                                            setComplemento(address.complemento || "");
                                                            setCidade(address.localidade || "");
                                                            setUf(address.uf || "");
                                                            setBairro(address.bairro || "");
                                                            setPrincipal(address.principal || false);
                                                        }}
                                                    >
                                                        Editar
                                                    </button>
                                                </AddressContent>
                                            )}
                                        </div>
                                    ))
                                )}
                            </AddressContainer>

                            {!isAddingAddress && (
                                <BotaoPersonalizado
                                    type="button"
                                    color="amarelo"
                                    width="100%"
                                    style={{ marginTop: "50px" }}
                                    onClick={() => {
                                        setEditingAddressId(null);
                                        setIsAddingAddress(true);
                                        setIsAddingAddress(true);
                                        setLogradouro("");
                                        setNumero("");
                                        setComplemento("");
                                        setCep("");
                                        setCidade("");
                                        setUf("");
                                        setPrincipal(false);
                                        setBairro("");
                                    }}
                                >
                                    + Cadastrar novo endereço
                                </BotaoPersonalizado>
                            )}
                        </div>
                    </CardContainer>
                </div>
            </div>
        </Container>
    );
}
