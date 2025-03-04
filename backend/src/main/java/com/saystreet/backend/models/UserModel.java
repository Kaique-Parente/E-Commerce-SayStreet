package com.saystreet.backend.models;

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
@Table(name = "usuario")
@NoArgsConstructor
@Getter
@Setter
public class UserModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String grupo;

    @Column(nullable = false)
    private boolean status;

    public UserModel(String cpf, String email, String nome, String password, String grupo){
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.password = password;
        this.grupo = grupo;
        this.status = true;
    }
}
