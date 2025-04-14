"use client"

import InputPersonalizado from "@/components/ClientComponents/InputPersonalizado";
import BotaoPersonalizado from "@/components/ClientComponents/BotaoPersonalizado";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCadastroCliente } from "@/hooks/web/useCadastroCliente";

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

export default function Cadastrar() {

    const {
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
        setIsAddingAddress
    } = useCadastroCliente();

    const [user, setUser] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados atualizados:", user);
    };

    return (
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
                                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                                    <InputPersonalizado
                                        id="dataNascimento"
                                        type="date"
                                        value={dataNascimento}
                                        onChange={handleDataNascimentoChange}
                                        placeholder="Data de Nascimento"
                                        isRequired
                                    />
                                </InputsContainer>

                                <InputsContainer>
                                    <label htmlFor="genero">Gênero</label>
                                    <InputPersonalizado
                                        id="genero"
                                        value={genero}
                                        onChange={handleGeneroChange}
                                        placeholder="Gênero"
                                        isRequired
                                    />
                                </InputsContainer>
                            </FormGrid>

                            <div>
                                <BotaoPersonalizado
                                    type="submit"
                                    color="amarelo"
                                    width="100%"
                                    style={{ marginTop: "30px" }}
                                >
                                    Salvar alterações
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
                                            // Salvar novo endereço
                                            setIsAddingAddress(false);
                                        }}
                                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                    >
                                        <label>Logradouro</label>
                                        <InputPersonalizado
                                            name="logradouro"
                                            value={newAddress.logradouro}
                                            onChange={handleEnderecoChange}
                                            placeholder="Logradouro"
                                            isRequired
                                        />
                                        <label>Número</label>
                                        <InputPersonalizado
                                            name="numero"
                                            value={newAddress.numero}
                                            onChange={handleEnderecoChange}
                                            placeholder="Número"
                                            isRequired
                                        />
                                        <label>Complemento</label>
                                        <InputPersonalizado
                                            name="complemento"
                                            value={newAddress.complemento}
                                            onChange={handleEnderecoChange}
                                            placeholder="Complemento"
                                        />
                                        <label>CEP</label>
                                        <InputPersonalizado
                                            name="cep"
                                            value={newAddress.cep}
                                            onChange={handleEnderecoChange}
                                            placeholder="CEP"
                                            isRequired
                                        />
                                        <label>Cidade</label>
                                        <InputPersonalizado
                                            name="cidade"
                                            value={newAddress.cidade}
                                            onChange={handleEnderecoChange}
                                            placeholder="Cidade"
                                            isRequired
                                        />
                                        <label>UF</label>
                                        <InputPersonalizado
                                            name="uf"
                                            value={newAddress.uf}
                                            onChange={handleEnderecoChange}
                                            placeholder="UF"
                                            isRequired
                                        />

                                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                            <BotaoPersonalizado
                                                type="button"
                                                color="marrom"
                                                width="100%"
                                                onClick={() => setIsAddingAddress(false)}
                                            >
                                                Cancelar
                                            </BotaoPersonalizado>
                                            <BotaoPersonalizado type="submit" color="amarelo" width="100%">
                                                Salvar
                                            </BotaoPersonalizado>
                                        </div>
                                    </form>
                                ) : (
                                    user.enderecosEntrega && user.enderecosEntrega.length > 0 ? (
                                        user.enderecosEntrega.map((address, index) => (
                                            <div key={address.id} style={{ marginBottom: "25px" }}>
                                                {editingAddressId === address.id ? (
                                                    <form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            setEditingAddressId(null);
                                                            // Salvar alterações no endereço
                                                        }}
                                                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                                                    >
                                                        <label>Logradouro</label>
                                                        <InputPersonalizado
                                                            value={address.logradouro}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].logradouro = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="Logradouro"
                                                            isRequired
                                                        />

                                                        <label>Número</label>
                                                        <InputPersonalizado
                                                            value={address.numero}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].numero = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="Número"
                                                            isRequired
                                                        />

                                                        <label>Complemento</label>
                                                        <InputPersonalizado
                                                            value={address.complemento}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].complemento = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="Complemento"
                                                        />

                                                        <label>CEP</label>
                                                        <InputPersonalizado
                                                            value={address.cep}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].cep = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="CEP"
                                                            isRequired
                                                        />

                                                        <label>Cidade</label>
                                                        <InputPersonalizado
                                                            value={address.cidade}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].cidade = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="Cidade"
                                                            isRequired
                                                        />

                                                        <label>UF</label>
                                                        <InputPersonalizado
                                                            value={address.uf}
                                                            onChange={(e) => {
                                                                const updated = [...formData.enderecosEntrega];
                                                                updated[index].uf = e.target.value;
                                                                setFormData({ ...formData, enderecosEntrega: updated });
                                                            }}
                                                            placeholder="UF"
                                                            isRequired
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
                                                    <AddressContent isPrincipal={address.principal}>
                                                        <h2>Endereço</h2>
                                                        <p>{address.logradouro}</p>
                                                        <p>Número: {address.numero}, {address.complemento}</p>
                                                        <p>CEP: {address.cep} - {address.cidade}, {address.uf}</p>

                                                        {address.principal && (
                                                            <p className="principal-address">
                                                                <span>(</span>Endereço Padrão<span>)</span>
                                                            </p>
                                                        )}

                                                        <button type="button" onClick={() => setEditingAddressId(address.id)}>
                                                            Editar
                                                        </button>
                                                    </AddressContent>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nenhum endereço cadastrado.</p>
                                    )
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
                                        setNewAddress({
                                            logradouro: "",
                                            numero: "",
                                            complemento: "",
                                            cep: "",
                                            cidade: "",
                                            uf: "",
                                            principal: false,
                                        });
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