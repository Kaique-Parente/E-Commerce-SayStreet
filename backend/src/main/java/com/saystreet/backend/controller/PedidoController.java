package com.saystreet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saystreet.backend.dto.PedidoDto;
import com.saystreet.backend.models.PedidoModel;
import com.saystreet.backend.service.PedidoService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.PostMapping;
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
  public ResponseEntity<PedidoModel> buscarPorId(@PathVariable Long id) {
    PedidoModel pedido = pedidoService.buscarPorId(id);
    return ResponseEntity.ok().body(pedido);
  }
}
