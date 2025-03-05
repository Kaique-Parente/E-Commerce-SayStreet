package com.saystreet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.service.ProdutoService;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> salvar(
            @RequestParam("produto") String produtoJson,
            @RequestParam("file") MultipartFile arquivo) throws JsonMappingException, JsonProcessingException {
        
        // Convertendo o JSON para ProdutoModel
        ProdutoModel produto = new ObjectMapper().readValue(produtoJson, ProdutoModel.class);
        
        return ResponseEntity.ok(produtoService.create(produto, arquivo));
    }
}
