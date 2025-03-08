package com.saystreet.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProdutoDto {
    
    private String produtoNome;

    private double produtoPreco;

    private Integer produtoQtd;

    private String produtoDesc;

    private double produtoAvaliacao;

    private boolean status;

    private List<ImageDto> produtoImagens;
}
