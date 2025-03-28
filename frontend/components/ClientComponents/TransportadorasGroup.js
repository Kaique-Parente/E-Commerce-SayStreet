"use client"

import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState, useEffect } from "react";

export default function TransportadorasGroup({ transportadora, setTransportadora }) {
    const [dataEntrega, setDataEntrega] = useState("");

    // Função para calcular a data de entrega (data atual + X dias)
    useEffect(() => {
        // Se não houver transportadora selecionada, não faz nada
        if (!transportadora) return;

        const dataAtual = new Date();

        // Definir os prazos de entrega de acordo com a transportadora selecionada
        switch (transportadora) {
            case "transportadora1":
                dataAtual.setDate(dataAtual.getDate() + 5); // 5 dias
                break;
            case "transportadora2":
                dataAtual.setDate(dataAtual.getDate() + 3); // 3 dias
                break;
            case "transportadora3":
                dataAtual.setDate(dataAtual.getDate() + 2); // 2 dias
                break;
            default:
                break;
        }

        const dataFormatada = dataAtual.toLocaleDateString(); // Formato padrão de data
        setDataEntrega(dataFormatada);
    }, [transportadora]);

    const handleChange = (event) => {
        // Atualiza o estado da transportadora com o valor selecionado
        setTransportadora(Number(event.target.value));
    };

    return (
        <FormControl style={{ width: "100%" }}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={transportadora}
                onChange={handleChange} // A função que atualiza o estado
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControlLabel
                        value="20"
                        control={<Radio />}
                        label={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Transportadora 1</span>
                                <span style={{fontWeight: "bold"}}>R$ 20,00</span>
                            </div>
                        }
                        sx={{
                            '.css-rizt0-MuiTypography-root': {
                            width: "100%"
                            }
                        }}
                    />
                    <p style={{marginBottom: "5px"}}>Chegará até: {new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString()}</p>
                    <FormControlLabel
                        value="25"
                        control={<Radio />}
                        label={
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                                <span>Transportadora 2</span>
                                <span style={{fontWeight: "bold"}}>R$ 25,00</span>
                            </div>
                        }
                        sx={{
                            '.css-rizt0-MuiTypography-root': {
                            width: "100%"
                            }
                        }}
                    />
                    <p style={{marginBottom: "5px"}}>Chegará até: {new Date(new Date().setDate(new Date().getDate() + 3)).toLocaleDateString()}</p>
                    <FormControlLabel
                        value="30"
                        control={<Radio />}
                        label={
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                                <span>Transportadora 3</span>
                                <span style={{fontWeight: "bold"}}>R$ 30,00</span>
                            </div>
                        }
                        sx={{
                            '.css-rizt0-MuiTypography-root': {
                            width: "100%"
                            }
                        }}
                    />
                    <p>Chegará até: {new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}</p>
                </div>
            </RadioGroup>
        </FormControl>
    );
}
