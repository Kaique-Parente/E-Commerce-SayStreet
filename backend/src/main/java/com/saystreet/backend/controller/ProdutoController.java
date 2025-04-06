package com.saystreet.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    ProdutoService produtoService;

    @Operation(summary = "Cadastrar produto", description = "Método para registrar um produto.", tags = "Produto")
    @PostMapping("/cadastrar")
    public ResponseEntity<?> salvar(@RequestBody ProdutoDto produto) {
        try {
            return ResponseEntity.ok(produtoService.create(produto));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Erro: Campos obrigatórios não foram preenchidos corretamente.");
        }
    }

    @Operation(summary = "Buscar produto", description = "Método para buscar um produto pelo ID.", tags = "Produto")
    @GetMapping("/buscar/{id}")
    public ResponseEntity<ProdutoModel> buscarProduto(@PathVariable Long id) {
        ProdutoModel produto = produtoService.buscarProdutoPorId(id);
        return ResponseEntity.ok(produto);
    }

    @Operation(summary = "Editar produto", description = "Método para editar um produto, buscando pelo ID.", tags = "Produto")
    @PutMapping("/editar/{id}")
    public ResponseEntity<String> editarProduto(@PathVariable Long id,
            @RequestBody ProdutoDto produtoDto) {

        return ResponseEntity.ok(produtoService.editarProduto(id, produtoDto));
    }

    @Operation(summary = "Alterar Status do produto", description = "Método para invativar/reativar um produto.", tags = "Produto")
    @PutMapping("/alterar-status/{id}")
    public ResponseEntity<String> alterarStatus(@PathVariable Long id, @RequestParam boolean status) {
        return ResponseEntity.ok(produtoService.alterarStatus(id, status));
    }

    @Operation(summary = "Alterar quantidade", description = "Método para alterar a quantidade de um produto no estoque.", tags = "Produto")
    @PutMapping("/alterar-qtd/{id}")
    public ResponseEntity<?> alterarQtd(@PathVariable Long id, @RequestBody ProdutoDto produtoDto) {
        return ResponseEntity.ok(produtoService.editarQTD(id, produtoDto));
    }

    @Operation(summary = "Listar produtos", description = "Método listar todos os produtos.", tags = "Produto")
    @GetMapping("/listar")
    public List<ProdutoModel> listar() {
        return produtoService.listAll();
    }

}
