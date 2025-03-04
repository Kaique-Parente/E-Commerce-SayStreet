package com.saystreet.backend.controller;

import java.util.List;

import org.bson.types.ObjectId;
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

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserModel user) throws Exception{
        return ResponseEntity.ok(userService.login(user));
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody UserDto user) throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(user));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editar(@PathVariable ObjectId id, @RequestBody UserDto user) throws Exception{
        return ResponseEntity.ok(userService.editar(id, user));
    }

    @GetMapping("/listar")
    public List<UserModel> listar(){
        return userService.listAll();
    }
    
    @GetMapping("/encontrarUsuarioCpf/{cpf}")
    public ResponseEntity<?> encontrarUsuarioCpf(@PathVariable String cpf) {
        return ResponseEntity.ok(userService.encontrarUsuarioCpf(cpf));
    }
    
    @GetMapping("/encontrarId/{cpf}")
    public ResponseEntity<?> encontrarId(@PathVariable String cpf) {
        return ResponseEntity.ok(userService.encontrarId(cpf));
    }
    
    @GetMapping("/encontrarSetorUsuarioEmail/{email}")
    public ResponseEntity<String> encontrarSetorUsuarioEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.encontrarSetorUsuarioEmail(email));
    }
    
    @PutMapping("/alterar-status/{cpf}")
    public ResponseEntity<String> alterarStatus(@PathVariable String cpf, @RequestParam boolean status) {
        userService.alterarStatus(cpf, status);
        return ResponseEntity.ok("Status do usuário alterado com sucesso.");
    }

}
