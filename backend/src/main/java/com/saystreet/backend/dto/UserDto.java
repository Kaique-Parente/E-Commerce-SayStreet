package com.saystreet.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class UserDto {

    private String cpf;
    
    private String email;

    private String nome;

    private String password;

    private boolean status;

    private String grupo; 

    public UserDto(String nome, String email, boolean status, String grupo){
        this.nome = nome;
        this.email = email;
        this.status = status;
        this.grupo = grupo;
    }
}
