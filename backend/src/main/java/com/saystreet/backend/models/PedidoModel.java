package com.saystreet.backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pedido_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "cliente_id")
    @JsonIgnore
    private ClienteModel cliente;

    @OneToMany(mappedBy = "pedido", cascade = { CascadeType.PERSIST,
            CascadeType.MERGE }, orphanRemoval = true, fetch = FetchType.LAZY)
    @Setter(value = AccessLevel.NONE)
    private List<ItemPedido> item;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "endereco_entrega_id", referencedColumnName = "id")
    private EnderecoModel enderecoEntrega;

    @Column(name = "data_pedido", nullable = false)
    private Date dataPedido;

    @Column(name = "status_pedido", nullable = false)
    private String status;

    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL)
    @JoinColumn(name = "metodo_pagamento_id")
    private MetodoPagamento metodoPagamento;

    @Column(name = "pedido_frete")
    private Double frete;

    @Column(name = "pedido_valor")
    private Double valorTotal;

    public void setItemPedido(List<ItemPedido> listaPedido) {
        for (ItemPedido l : listaPedido) {
            l.setPedido(this);
        }
        this.item = listaPedido;
    }
}
