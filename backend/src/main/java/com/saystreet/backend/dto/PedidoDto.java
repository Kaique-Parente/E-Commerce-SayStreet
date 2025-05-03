package com.saystreet.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDto {
    
    private ClienteDto cliente;
    private EnderecosDto enderecoEntrega;
    private List<ItemPedidoDto> produtos;
    private MetodoPagamentoDto metodoPagamento;
    private Double frete;

}
