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
        return userService.login(user);
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody UserDto user) throws Exception{
        return userService.create(user);
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
        UserModel user = userService.encontrarUsuarioCpf(cpf);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Não foi possível encontrar nenhum usuário com CPF: " + cpf);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/encontrarId/{cpf}")
    public ResponseEntity<?> encontrarId(@PathVariable String cpf) {
        UserModel user = userService.encontrarUsuarioCpf(cpf);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Não foi possível encontrar nenhum usuário com CPF: " + cpf);
        }
        return ResponseEntity.ok(userService.encontrarId(cpf));
    }

    @GetMapping("/encontrarSetorUsuarioEmail/{email}")
    public ResponseEntity<String> encontrarSetorUsuarioEmail(@PathVariable String email) {
        String setor = userService.encontrarSetorUsuarioEmail(email);
        if (setor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Não foi possível encontrar nenhum usuário com e-mail: " + email);
        }
        return ResponseEntity.ok(setor);
    }

    @PutMapping("/alterar-status/{cpf}")
    public ResponseEntity<String> alterarStatus(@PathVariable String cpf, @RequestParam boolean status) {
        boolean sucesso = userService.alterarStatus(cpf, status);

        if (sucesso) {
            return ResponseEntity.ok("Status do usuário alterado com sucesso.");
        } else {
            return ResponseEntity.status(404).body("Usuário não encontrado.");
        }
    }

}
