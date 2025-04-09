package com.saystreet.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.service.ClienteService;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    @Autowired
    ClienteService clienteService;

    @PostMapping("/login")
    public ResponseEntity<ClienteModel> login(@RequestBody UserModel user) throws Exception{
        return ResponseEntity.ok(clienteService.login(user));
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ClienteDto cliente) throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(cliente));
    }

    @GetMapping("/listar")
    public List<ClienteModel> listar(){
        return clienteService.listAll();
    }

}
