package com.saystreet.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.service.ClienteService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @Operation(summary = "Login Cliente", description = "Realiza o login do cliente.", tags = "cliente")
    @PostMapping("/login")
    public ResponseEntity<ClienteModel> login(@RequestBody ClienteModel user) throws Exception{
        return ResponseEntity.status(HttpStatus.OK).body(clienteService.login(user));
    }

    @Operation(summary = "Cadastrar Cliente", description = "Método para cadastrar um cliente.", tags = "cliente")
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody ClienteDto clienteDto) throws Exception {
        return clienteService.create(clienteDto);
    }

    @Operation(summary = "Editar Cliente", description = "Método para editar um cliente.", tags = "cliente")
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editar(@PathVariable Long id, @RequestBody
            ClienteDto clienteDto) throws Exception {

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.editCliente(id, clienteDto));
    }

    @Operation(summary = "Listar clientes", description = "Método listar todos os clientes.", tags = "cliente")
    @GetMapping("/listar")
    public List<ClienteModel> listar() {
        return clienteService.listAll();
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<ClienteModel> buscaId (@PathVariable Long id) throws Exception{
        ClienteModel user = clienteService.buscarCliente(id);
        return ResponseEntity.ok(user);
    }

}
