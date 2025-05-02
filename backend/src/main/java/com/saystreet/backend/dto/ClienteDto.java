package com.saystreet.backend.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClienteDto {

    private String nome;

    private String cpf;

    private String genero; 

    private Date dataNascimento;

    private String email;

    private String senha;

    private Boolean status;

    private EnderecosDto enderecoFatura;
    
    // Implementar o endereço:
    private List<EnderecosDto> enderecos;
}
