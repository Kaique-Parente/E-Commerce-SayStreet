package com.saystreet.backend.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ClienteModel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "cliente_id")
    private Long id;

    @Column(name = "cliente_nome", nullable = false)
    private String nome;

    @Column(name = "cliente_cpf",nullable = false, unique = true)
    private String cpf;

    @Column(name = "cliente_genero", nullable = false)
    private String genero;

    
    @Column(name = "data_nascimento", nullable = false)
    private Date dataNascimento;

    @Column(name = "cliente_email",nullable = false, unique = true)
    private String email;

    @Column(name = "cliente_senha", nullable = false)
    private String senha;

    @Column(name = "cliente_status", nullable =  false)
    private Boolean status;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "endereco_fatura_id", nullable = true)
    private EnderecoModel enderecoFatura;

    @OneToMany(mappedBy = "cliente", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, 
    orphanRemoval = true, fetch = FetchType.LAZY)
    @Setter(value = AccessLevel.NONE)
    @Builder.Default
    @JsonManagedReference
    @Column(nullable = true)
    private List<EnderecoModel> enderecos = new ArrayList<>();
    
    public void setEnderecos(List<EnderecoModel> enderecos){
        enderecos.forEach(endereco -> endereco.setCliente(this));
        this.enderecos = enderecos;
    }
}
