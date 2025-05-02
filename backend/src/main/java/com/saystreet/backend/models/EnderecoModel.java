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
@Table(name = "endereco_cliente")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EnderecoModel {
    
    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    //@Column(name = "endereco_id")
    private Long id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = true)
    private String complemento;

    @Column(nullable = false)
    private String bairro; 

    @Column(nullable = false)
    private String localidade;

    @Column(nullable = false)
    private String  uf;

    @Column(nullable = false)
    private String estado; 

    @Column(nullable = false)
    private Integer numero;

    @Column(name = "isPadrao", nullable = false)
    private boolean enderecoPadrao;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "cliente_id")
    @ToString.Exclude
    @JsonBackReference
    private ClienteModel cliente;
    
}
