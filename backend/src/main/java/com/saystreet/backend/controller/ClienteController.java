package com.saystreet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.service.ClienteService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    @Autowired
    ClienteService clienteService;

    @Operation(summary = "Cadastrar Cliente", description = "Método para cadastrar um cliente.",
    tags = "cliente")
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar (@RequestBody ClienteDto clienteDto) throws Exception{

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(clienteDto));
    }
}
