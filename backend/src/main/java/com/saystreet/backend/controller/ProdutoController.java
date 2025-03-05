package com.saystreet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saystreet.backend.dto.ProdutoDto;
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
        
        // Convertendo o JSON para ProdutoDTO
        ProdutoDto produto = new ObjectMapper().readValue(produtoJson, ProdutoDto.class);

        return ResponseEntity.ok(produtoService.create(produto, arquivo));
    }

     @GetMapping("/buscar/{id}")
    public ResponseEntity<ProdutoModel> buscarProduto(@PathVariable Long id) {
        ProdutoModel produto = produtoService.buscarProdutoPorId(id);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarProduto(
            @PathVariable Long id,
            @RequestParam("produto") String produtoJson,
            @RequestParam("file") MultipartFile arquivo) throws JsonProcessingException {

        // Convertendo o JSON para ProdutoDTO        
        ProdutoDto produtoDto = new ObjectMapper().readValue(produtoJson, ProdutoDto.class);

        return ResponseEntity.ok(produtoService.editarProduto(id, produtoDto, arquivo));
    }
    
    @PutMapping("/alterar-status/{id}")
    public ResponseEntity<String> alterarStatus(
            @PathVariable Long id,
            @RequestParam boolean status) {

        produtoService.alterarStatus(id, status);

        return ResponseEntity.ok("Status do produto alterado com sucesso!");
    }
}
