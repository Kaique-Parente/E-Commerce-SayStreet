package com.saystreet.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.saystreet.backend.security.TipoPagamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "metodo_pagamento")
@Getter
@Setter
@NoArgsConstructor
public class MetodoPagamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPagamento tipoPagamento;

    private String numeroCartao;
    private String nomeNoCartao;
    private String validadeCartao;
    private String cvvCartao;
    private int numeroParcelas;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    @JsonIgnore
    private PedidoModel pedido;
}
