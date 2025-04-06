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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.UserDto;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    
    @Operation(summary = "Logar", description = "Método para realizar o Login.",
    tags = "User")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserModel user) throws Exception{
        return ResponseEntity.ok(userService.login(user));
    }

    @Operation(summary = "Cadastrar usuário", description = "Método para cadastrar um usuário.",
    tags = "User")
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody UserDto user) throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(user));
    }
    
    @Operation(summary = "Editar usuário", description = "Método para editar um usuário.",
    tags = "User")
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editar(@PathVariable Long id, @RequestBody UserDto user) throws Exception{
        return ResponseEntity.ok(userService.editar(id, user));
    }
    
    @Operation(summary = "Listar usuário", description = "Método para listar todos os usuários.",
    tags = "User")
    @GetMapping("/listar")
    public List<UserModel> listar(){
        return userService.listAll();
    }
    
    @Operation(summary = "Buscar usuário pelo CPF", description = "Método para buscar o usuário pelo CPF.",
    tags = "User")
    @GetMapping("/encontrarUsuarioCpf/{cpf}")
    public ResponseEntity<?> encontrarUsuarioCpf(@PathVariable String cpf) {
        return ResponseEntity.ok(userService.encontrarUsuarioCpf(cpf));
    }
    
    
    @Operation(summary = "Buscar usuário", description = "Método para buscar o usuário pelo ID.",
    tags = "User")
    @GetMapping("/encontrarId/{cpf}")
    public ResponseEntity<?> encontrarId(@PathVariable String cpf) {
        return ResponseEntity.ok(userService.encontrarId(cpf));
    }
    
    @Operation(summary = "Buscar setor do usuário", description = "Método para buscar o setor do usuário através do e-mail.",
    tags = "User")
    @GetMapping("/encontrarSetorUsuarioEmail/{email}")
    public ResponseEntity<String> encontrarSetorUsuarioEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.encontrarSetorUsuarioEmail(email));
    }
    
    @Operation(summary = "Alterar Status", description = "Método para inativar/reativar um usuário.",
    tags = "User")
    @PutMapping("/alterar-status/{cpf}")
    public ResponseEntity<String> alterarStatus(@PathVariable String cpf, @RequestParam boolean status) {
        userService.alterarStatus(cpf, status);
        return ResponseEntity.ok("Status do usuário alterado com sucesso.");
    }

}
