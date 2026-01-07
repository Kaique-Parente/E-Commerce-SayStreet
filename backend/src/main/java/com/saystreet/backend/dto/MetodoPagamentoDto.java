package com.saystreet.backend.dto;

import com.saystreet.backend.security.TipoPagamento;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetodoPagamentoDto {

    private TipoPagamento tipoPagamento;
    private String numeroCartao;
    private String nomeNoCartao;
    private String validadeCartao;
    private String cvvCartao;
    private int numeroParcelas;
}
