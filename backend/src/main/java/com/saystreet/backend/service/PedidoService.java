package com.saystreet.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.saystreet.backend.dto.EnderecosDto;
import com.saystreet.backend.dto.ItemPedidoDto;
import com.saystreet.backend.dto.MetodoPagamentoDto;
import com.saystreet.backend.dto.PedidoDto;
import com.saystreet.backend.dto.PedidoResumoDto;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.models.ItemPedido;
import com.saystreet.backend.models.MetodoPagamento;
import com.saystreet.backend.models.PedidoModel;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.repository.PedidoRepository;
import com.saystreet.backend.repository.ProdutoRepository;
import com.saystreet.backend.security.TipoPagamento;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Alterar o Status do pedido para um enum? Talvez
    public PedidoModel criarPedido(PedidoDto pedidoDto) {

        double valorTotal = 0;

        PedidoModel pedido = new PedidoModel();

        ClienteModel cliente = clienteRepository.findById(pedidoDto.getCliente().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Cliente não encontrado"));
        pedido.setCliente(cliente);

        EnderecosDto enderecoDto = pedidoDto.getEnderecoEntrega();
        EnderecoModel endereco = new EnderecoModel();

        endereco.setCep(enderecoDto.getCep());
        endereco.setLogradouro(enderecoDto.getLogradouro());
        endereco.setComplemento(enderecoDto.getComplemento());
        endereco.setBairro(enderecoDto.getBairro());
        endereco.setLocalidade(enderecoDto.getLocalidade());
        endereco.setUf(enderecoDto.getUf());
        endereco.setEstado(enderecoDto.getEstado());
        endereco.setNumero(enderecoDto.getNumero());
        endereco.setEnderecoPadrao(true);
        endereco.setCliente(null);

        pedido.setEnderecoEntrega(endereco);

        pedido.setStatus("Aguardando Pagamento.");
        pedido.setDataPedido(new Date());
        pedido.setFrete(pedidoDto.getFrete());

        // Lógica para adicionar uma lista de produtos ao pedido:
        List<ItemPedido> itens = new ArrayList<>();

        for (ItemPedidoDto itemDto : pedidoDto.getProdutos()) {
            ProdutoModel produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto não encontrado"));

            ItemPedido itemPedido = new ItemPedido();

            if (produto.getProdutoQtd() - itemDto.getQuantidade() < 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade indisponível.");
            }
            itemPedido.setQtdProduto(itemDto.getQuantidade());
            produto.setProdutoQtd(produto.getProdutoQtd() - itemDto.getQuantidade());

            valorTotal += produto.getProdutoPreco() * itemDto.getQuantidade();

            itemPedido.setProduto(produto);
            itemPedido.setPedido(pedido);
            itens.add(itemPedido);
        }
        pedido.setItemPedido(itens); // Após a população da lista, adiciona a lista no pedido

        // Lógica para calcular o valor total:
        MetodoPagamentoDto metodoDto = pedidoDto.getMetodoPagamento();
        TipoPagamento tipo = metodoDto.getTipoPagamento();

        // Instaciar um metodo de pagamento
        MetodoPagamento metodoPagamento = new MetodoPagamento();
        metodoPagamento.setTipoPagamento(tipo);
        metodoPagamento.setNumeroCartao(metodoDto.getNumeroCartao());
        metodoPagamento.setNomeNoCartao(metodoDto.getNomeNoCartao());
        metodoPagamento.setValidadeCartao(metodoDto.getValidadeCartao());
        metodoPagamento.setCvvCartao(metodoDto.getCvvCartao());
        metodoPagamento.setNumeroParcelas(metodoDto.getNumeroParcelas());
        metodoPagamento.setPedido(pedido);

        pedido.setMetodoPagamento(metodoPagamento);

        double totalComDesconto = tipo.aplicarDesconto(valorTotal + pedido.getFrete());
        pedido.setValorTotal(totalComDesconto);

        pedidoRepository.save(pedido);

        return pedido;
    }

    public PedidoModel buscarPedidoId(Long pedidoId) throws Exception {
        Optional<PedidoModel> pedidoExistente = pedidoRepository.findById(pedidoId);

        if (pedidoExistente.isPresent()) {
            return pedidoExistente.get();
        }

        throw new Exception("Pedido não econtrado!");
    }

    public String alterarStatus(Long id, String status) throws Exception {
        PedidoModel pedidoOpt = buscarPedidoId(id);

        pedidoOpt.setStatus(status);
        pedidoRepository.save(pedidoOpt);
        return "Status do pedido alterado com sucesso!";
    }

    public List<PedidoResumoDto> listarResumo() {
        List<PedidoModel> pedidos = pedidoRepository.findAll();

        return pedidos.stream()
                .map(pedido -> new PedidoResumoDto(
                        pedido.getId(),
                        pedido.getDataPedido(),
                        pedido.getValorTotal(),
                        pedido.getStatus()))
                .collect(Collectors.toList()); //Transforma todo os elementos acima em uma lista
    }
}
