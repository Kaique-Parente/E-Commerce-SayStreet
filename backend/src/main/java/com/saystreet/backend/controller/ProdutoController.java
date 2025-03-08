package com.saystreet.backend.controller;

import java.util.List;

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
    public ResponseEntity<?> salvar(@RequestBody ProdutoDto produto){
        return ResponseEntity.ok(produtoService.create(produto));
    }
    
     @GetMapping("/buscar/{id}")
    public ResponseEntity<ProdutoModel> buscarProduto(@PathVariable Long id) {
        ProdutoModel produto = produtoService.buscarProdutoPorId(id);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarProduto(@PathVariable Long id,
            @RequestBody ProdutoDto produtoDto) {

        return ResponseEntity.ok(produtoService.editarProduto(id, produtoDto));
    }
    
    @PutMapping("/alterar-status/{id}")
    public ResponseEntity<String> alterarStatus(@PathVariable Long id, @RequestParam boolean status) {
        return ResponseEntity.ok(produtoService.alterarStatus(id, status));
    }

    @PutMapping("/alterar-qtd/{id}")
    public ResponseEntity<?> alterarQtd(@PathVariable Long id, @RequestBody ProdutoDto produtoDto){
        return ResponseEntity.ok(produtoService.editarQTD(id, produtoDto));
    }

    @GetMapping("/listar")
    public List<ProdutoModel> listar() {
        return produtoService.listAll();
    }
    


}
