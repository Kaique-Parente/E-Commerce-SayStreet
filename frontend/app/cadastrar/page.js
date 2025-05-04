"use client"

import InputPersonalizado from "@/components/ClientComponents/InputPersonalizado";
import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCadastroCliente } from "@/hooks/web/useCadastroCliente";
import RadiusButton from "@/components/MUI/RadiusButton";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";
import NavBar from "@/components/ClientComponents/NavBar";
import { useRouter } from "next/navigation";
import SelectPersonalizado from "@/components/ClientComponents/SelectPersonalizado";
import { cadastrarCliente } from "@/services/ClienteService";

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
    height: 160px;
    font-size: 14px;
    padding: 10px;

    position: relative;

    border: ${(props) => props.isPrincipal ? "1px solid rgba(255, 227, 23, 0.95)" : "1px solid #005C53"};
    border-left: ${(props) => props.isPrincipal ? "4px solid rgba(255, 227, 23, 0.95)" : "4px solid #005C53"};

    h2 {
        font-size: 18px;
    }

    .principal-address {
        font-size: 16px;
        margin-top: 10px;
        
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

export default function Cadastrar() {

    const {
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
    } = useCadastroCliente();

    const [user, setUser] = useState({});
    const [enderecos, setEnderecos] = useState([]);

    const [newAddress, setNewAddress] = useState({});
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const router = useRouter();

    useEffect(() => {
        console.log(principal);
    }, [principal])

    const handleCancelarEndereco = () => {
        setCepValido(false);
        setIsAddingAddress(false)
    }

    const handleEnderecoFaturamento = (id) => {
        const updateEnderecos = enderecos.map((endereco) => ({
            ...endereco,
            isEnderecoFaturamento: endereco.id === id
        }));
        setEnderecos(updateEnderecos);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (enderecos.length === 0) {
            alert("Cadastre pelo menos um endereço antes de continuar.");
            return;
        }

        const enderecoFatura = enderecos.find((end) => end.isEnderecoFaturamento === true);

        const updateEnderecoFatura = enderecoFatura
            ? (({ isEnderecoFaturamento, ...rest }) => ({
                ...rest,
                enderecoPadrao: false,
            }))(enderecoFatura)
            : null;

        const updateEnderecos = enderecos.map((endereco) => {
            const { isEnderecoFaturamento, ...rest } = endereco;
            return rest;
        });

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
            const mensagem = await cadastrarCliente(dadosCliente);

            if (mensagem) {
                alert(mensagem);
                router.back("/login");
            }
        } catch (error) {
            alert("Erro no cadastro: " + error.message);
        }
    };


    return (
        <>
            <NavBar />
            <Container>
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", marginBottom: "30px" }}>
                        <Image src={"/web/sidebar/dados.png"} width={32} height={32} alt="Dados" />
                        <h2>Criar Conta</h2>
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
                                            placeholder="CPF"
                                            isRequired
                                            maxLength={14}
                                        />
                                    </InputsContainer>

                                    <InputsContainer>
                                        <label htmlFor="email">Email</label>
                                        <InputPersonalizado
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
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
                                            isRequired
                                        />
                                    </InputsContainer>

                                    <InputsContainer>
                                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                                        <InputPersonalizado
                                            id="dataNascimento"
                                            type="date"
                                            value={dataNascimento}
                                            onChange={handleDataNascimentoChange}
                                            min="1900-01-01"
                                            max="2100-12-31"
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
                                        >
                                            <option value="">Selecione</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="feminino">Feminino</option>
                                            <option value="nao-informado">Prefiro não informar</option>
                                        </SelectPersonalizado>
                                    </InputsContainer>
                                </FormGrid>

                                <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "30px" }}>
                                    <BotaoPersonalizado
                                        onClick={() => router.back("/login")}
                                        type="button"
                                        color="marrom"
                                        width="25%"
                                    >
                                        Voltar
                                    </BotaoPersonalizado>

                                    <BotaoPersonalizado
                                        type="submit"
                                        color="amarelo"
                                        width="75%"
                                    >
                                        Realizar Cadastro
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
                                                    isEnderecoFaturamento: enderecos.length === 0
                                                }

                                                setEnderecos((prevEnderecos) => {
                                                    const atualizados = principal
                                                        ? prevEnderecos.map((end) => ({ ...end, enderecoPadrao: false }))
                                                        : [...prevEnderecos];

                                                    return [...atualizados, newAddress];
                                                });

                                                console.log(newAddress);
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
                                                    disabled={cepValido}
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
                                        <>
                                            {enderecos && enderecos.length > 0 ? (
                                                enderecos.map((address) => (
                                                    <AddressContent key={address.numero} isPrincipal={address.enderecoPadrao}>
                                                        <h2>Endereço</h2>
                                                        <p>{address.logradouro}</p>
                                                        <p>Número: {address.numero}{address.complemento && `, ${address.complemento}`}</p>
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
                                                    </AddressContent>
                                                ))
                                            ) : (
                                                <p style={{ textAlign: "center" }}>Nenhum endereço cadastrado.</p>
                                            )}
                                        </>
                                    )}
                                </AddressContainer>

                                {!isAddingAddress && (
                                    <BotaoPersonalizado
                                        type="button"
                                        color="amarelo"
                                        width="100%"
                                        style={{ marginTop: "50px" }}
                                        onClick={() => {
                                            setIsAddingAddress(true);
                                            setLogradouro("");
                                            setNumero("");
                                            setComplemento("");
                                            setCep("");
                                            setCidade("");
                                            setUf("");
                                            setPrincipal("");
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
        </>
    );
}