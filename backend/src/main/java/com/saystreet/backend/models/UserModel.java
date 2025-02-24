package com.saystreet.backend.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "user")
@NoArgsConstructor
@Getter
@Setter
public class UserModel {
    
    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String cpf;

    @Indexed(unique = true)
    private String email;

    private String nome;

    private String password;

    private String grupo;

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
