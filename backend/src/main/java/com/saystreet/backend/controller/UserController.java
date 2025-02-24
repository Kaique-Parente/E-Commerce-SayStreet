package com.saystreet.backend.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<UserModel> editar(@PathVariable ObjectId id, @RequestBody UserDto user) throws Exception{
        return ResponseEntity.ok(userService.editar(id, user));
    }

    @GetMapping("/listar")
    public List<UserModel> listar(){
        return userService.listAll();
    }

    @GetMapping("/encontrarUsuario/{cpf}")
    public ResponseEntity<UserModel> encontrarUsuario(@PathVariable String cpf){
        return ResponseEntity.ok(userService.encontrarUsuario(cpf));
    }

    @GetMapping("/encontrarId/{cpf}")
    public ResponseEntity<String> encontrarId(@PathVariable String cpf){
        return ResponseEntity.ok(userService.encontrarId(cpf));
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
