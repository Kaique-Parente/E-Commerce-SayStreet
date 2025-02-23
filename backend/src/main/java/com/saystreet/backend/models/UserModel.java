package com.saystreet.backend.models;

import org.springframework.data.annotation.Id;
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
    private Long cpf;

    private String email;

    private String password;

    private String grupo;

    private boolean status;

    public UserModel(Long cpf, String email, String password, String grupo){
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.grupo = grupo;
        this.status = true;
    }
}
