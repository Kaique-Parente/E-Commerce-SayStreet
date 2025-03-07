package com.saystreet.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "produto")
@NoArgsConstructor
@Getter
@Setter
public class ProdutoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long produto_id;

    @Column(nullable = false, length = 200)
    private String produto_name;
    
    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Double produto_avaliacao;

    @Column(nullable = false)
    private Integer produto_qtd;

    @Column(nullable = false)
    private boolean produto_status;

    private String nome_imagem;

    public ProdutoModel(String name, double avali, Integer qtd, String img){
        this.produto_name = name;
        this.produto_avaliacao = avali;
        this.produto_qtd = qtd;
        this.nome_imagem = img;
        this.produto_status = true;
    }

}
