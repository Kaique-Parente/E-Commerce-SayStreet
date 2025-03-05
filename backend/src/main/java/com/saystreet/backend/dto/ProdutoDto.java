package com.saystreet.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProdutoDto {
    
    private String produto_name;
    
    private double produto_avaliacao;

    private Integer produto_qtd;

    private boolean status;

    private String nome_imagem;
}
