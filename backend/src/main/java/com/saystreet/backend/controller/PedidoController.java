package com.saystreet.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.PedidoDto;
import com.saystreet.backend.dto.PedidoResumoDto;
import com.saystreet.backend.models.PedidoModel;
import com.saystreet.backend.service.PedidoService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController {

  @Autowired
  private PedidoService pedidoService;

  @Operation(summary = "Gerar pedido", description = "Método para gerar um pedido", tags = "Pedido")
  @PostMapping("/gerar")
  public ResponseEntity<PedidoModel> gerarPedido(@RequestBody PedidoDto pedidoDto) {
    PedidoModel pedidoCriado = pedidoService.criarPedido(pedidoDto);
    return new ResponseEntity<>(pedidoCriado, HttpStatus.CREATED);
  }

  @Operation(summary = "Buscar pedido", description = "Método para buscar um pedido pelo ID.", tags = "Pedido")
  @GetMapping("/buscar/{id}")
  public ResponseEntity<PedidoModel> buscarId(@PathVariable Long id) throws Exception{
    PedidoModel pedido = pedidoService.buscarPedidoId(id);
    return ResponseEntity.ok(pedido);
  }

  @Operation(summary = "Alterar Status do pedido", description = "Método para alterar o status de um pedido", tags = "Pedido")
  @PutMapping("/alterar-status/{id}")
  public ResponseEntity<String> alterarStatus(@PathVariable Long id, @RequestParam String status) throws Exception{
          return ResponseEntity.ok(pedidoService.alterarStatus(id, status));
  }

  @Operation(summary = "Listar pedido resumido", description = "Método para listar todos os pedidos resumido", tags = "Pedido")
  @GetMapping("/lista-resumo")
    public ResponseEntity<List<PedidoResumoDto>> listarResumo() {
        List<PedidoResumoDto> pedidos = pedidoService.listarResumo();
        return ResponseEntity.ok(pedidos);
    }
}
