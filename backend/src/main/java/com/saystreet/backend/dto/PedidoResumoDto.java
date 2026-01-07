package com.saystreet.backend.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoResumoDto {
    
    private Long id;
    private Date dataPedido;
    private double valorTotal;
    private String status;
}
