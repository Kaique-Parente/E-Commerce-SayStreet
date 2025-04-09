package com.saystreet.backend.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
@Table (name = "cliente")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ClienteModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cliente_id")
    private Long id;

    @Column(name = "cliente_cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "cliente_nome", nullable = false)
    private String nome;

    @Column(name = "cliente_email", nullable = false)
    private String email;

    @Column(name = "cliente_password", nullable = false)
    private String password;

    @Column(name = "cliente_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "cliente_genero", nullable = false)
    private String genero;

    @Column(name = "cliente_status", nullable = false)
    private boolean status;

    @OneToMany (mappedBy = "cliente", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    @JsonManagedReference
    private List<EnderecoModel> enderecosEntrega = new ArrayList<>();

    public void setEnderecosEntrega(List<EnderecoModel> enderecosEntrega) {
        this.enderecosEntrega = enderecosEntrega;
    }

    public void setEnderecos(List<EnderecoModel> enderecos){
        enderecos.forEach(endereco -> endereco.setCliente(this));
        this.enderecosEntrega = enderecos;
    }

}
