package com.saystreet.backend.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/pedido")
@CrossOrigin(origins = "*")
public class PedidoController {
    
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/gerar")
      public ResponseEntity<PedidoModel> gerarPedido(@RequestBody PedidoDto pedidoDto) {
            PedidoModel pedidoCriado = pedidoService.criarPedido(pedidoDto);
            return new ResponseEntity<>(pedidoCriado, HttpStatus.CREATED);
    }

    @GetMapping("/listar/{clienteId}")
    public List<PedidoModel> listar(@PathVariable Long clienteId){
      return pedidoService.listarPedidos(clienteId);
    }
    
}
