package com.saystreet.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDto {

    private Long cpf;
    
    private String email;

    private String password;

    private boolean status;

    private String grupo; 
}
