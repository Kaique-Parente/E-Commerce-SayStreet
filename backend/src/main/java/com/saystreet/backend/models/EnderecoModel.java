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
@Table (name = "endereco_entrega")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EnderecoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "endereco_id")
    private Long id;

    @Column(name = "endereco_cep", nullable = false)
    private String cep;

    @Column(name = "endereco_logradouro", nullable = false)
    private String logradouro;

    @Column(name = "endereco_numero", nullable = false)
    private String numero;

    @Column(name = "endereco_complemento", nullable = false)
    private String complemento;

    @Column(name = "endereco_bairro", nullable = false)
    private String bairro;

    @Column(name = "endereco_cidade", nullable = false)
    private String cidade; 

    @Column(name = "endereco_uf", nullable = false)
    private String uf;

    @Column(name = "isPrincipal", nullable = false)
    private boolean principal;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "cliente_id")
    @ToString.Exclude
    @JsonBackReference
    private ClienteModel cliente;
}
