
package com.saystreet.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "imagem_produto")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ImageModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "img_url", nullable = false)
    private String url;
    
    @Column(name = "isPrincipal", nullable = false)
    private boolean principal;

    @ManyToOne
    @JoinColumn(name = "produto_id", referencedColumnName = "produto_id")
    @ToString.Exclude
    @JsonBackReference
    private ProdutoModel produto;

}