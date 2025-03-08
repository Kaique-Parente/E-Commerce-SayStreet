package com.saystreet.backend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "produto")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProdutoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "produto_id")
    private Long produtoId;

    @Column(name = "produto_nome", nullable = false, length = 200)
    private String produtoNome;
    
    @Column(name = "produto_desc", nullable = false)
    private String produtoDesc;

    @Column(name = "produto_avali", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Double produtoAvaliacao;

    @Column(name = "produto_qtd", nullable = false)
    private Integer produtoQtd;

    @Column(name = "produto_Status", nullable = false)
    private boolean produtoStatus;

    @Column(name = "produto_preco", nullable = false)
    private double produtoPreco;

    @OneToMany(mappedBy = "produto", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true, fetch = FetchType.LAZY)
    @Setter(value = AccessLevel.NONE)
    @Builder.Default
    @JsonManagedReference
    private List<ImageModel> imagens = new ArrayList<>();
    
    public void setImagens(List<ImageModel> imagens) {
        imagens.forEach(imagem -> imagem.setProduto(this));
        this.imagens = imagens;
    }
}
