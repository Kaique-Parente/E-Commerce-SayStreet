package com.saystreet.backend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ClienteDto {

    private String cpf;

    private String nome;
    
    private String email;
    
    private String password;

    private LocalDate dataNascimento;

    private String genero;

    private boolean status;

    private List<EnderecoDto> enderecosEntrega;
}
