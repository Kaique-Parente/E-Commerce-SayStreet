package com.saystreet.backend.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.server.ResponseStatusException;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.dto.EnderecosDto;
import com.saystreet.backend.dto.ItemPedidoDto;
import com.saystreet.backend.dto.MetodoPagamentoDto;
import com.saystreet.backend.dto.PedidoDto;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.PedidoModel;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.repository.PedidoRepository;
import com.saystreet.backend.repository.ProdutoRepository;
import com.saystreet.backend.security.TipoPagamento;

@ActiveProfiles("test")
public class PedidoServiceTest {
    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private ProdutoRepository produtoRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Autowired
    @InjectMocks
    private PedidoService pedidoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testCriarPedidoComSucesso() {

        ClienteModel cliente = new ClienteModel();
        cliente.setId(1L);
        cliente.setNome("João Silva");

        ProdutoModel produto = new ProdutoModel();
        produto.setProdutoQtd(10);
        produto.setProdutoPreco(100.0);

        ItemPedidoDto itemPedidoDto = new ItemPedidoDto(10L, 2);

        ClienteDto clienteDto = new ClienteDto();
        clienteDto.setId(1L);

        EnderecosDto endereco = new EnderecosDto();
        endereco.setCep("09760280");
        endereco.setLogradouro("Rua Teste");
        endereco.setNumero(123);
        endereco.setBairro("Bairro");
        endereco.setUf("SP");
        endereco.setLocalidade("São Paulo");
        endereco.setEstado("SP");

        MetodoPagamentoDto metodoPagamento = new MetodoPagamentoDto();
        metodoPagamento.setTipoPagamento(TipoPagamento.CARTAO);
        metodoPagamento.setNumeroCartao("000");
        metodoPagamento.setNomeNoCartao("Teste");
        metodoPagamento.setValidadeCartao("20/03/2030");
        metodoPagamento.setCvvCartao("333");
        metodoPagamento.setNumeroParcelas(1);

        PedidoDto pedidoDto = new PedidoDto();
        pedidoDto.setCliente(clienteDto);
        pedidoDto.setEnderecoEntrega(new EnderecosDto());
        pedidoDto.setFrete(20.0);
        pedidoDto.setProdutos(List.of(itemPedidoDto));
        pedidoDto.setMetodoPagamento(metodoPagamento);

        // Se chamar o método no teste, retorna um optional com o obj que eu preparei
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(produtoRepository.findById(10L)).thenReturn(Optional.of(produto));
        
        when(pedidoRepository.save(any(PedidoModel.class))).thenAnswer(i -> i.getArguments()[0]);

        PedidoModel resultado = pedidoService.criarPedido(pedidoDto);

        assertThat(resultado, notNullValue()); // Verificar se o pedido não é null
        assertThat(resultado.getCliente(), equalTo(cliente));
        assertThat(resultado.getItem().size(), is(1)); // Verifica se o carrinho possue a quantidade certa
        assertThat(resultado.getValorTotal(), greaterThan(0.0)); // Verificar o valor
        assertThat(resultado.getStatus(), equalTo("Aguardando Pagamento.")); // Verificar o status do pedido
        assertThat(resultado.getMetodoPagamento(), notNullValue()); // Verifica se o metodo não é null
        assertThat(resultado.getEnderecoEntrega(), notNullValue()); // Verifica se o endereço não é null
    }

    //Teste para verifciar se o cliente não está logada/existe
    @Test
    void testeCriarPedido_SemCliente() {
        PedidoDto pedidoDto = new PedidoDto();
        ClienteDto clienteDto = new ClienteDto();
        clienteDto.setId(1L);
        pedidoDto.setCliente(clienteDto);

        //Caso ache esse cliente, o mockito deve retornar como null, chamando a exception
        when(clienteRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> pedidoService.criarPedido(pedidoDto));
        // No service ele retornar um exceção caso o cliente não exista, esse teste
        // verifica se realmente lança essa exceptio
    }

    //Teste para verificar se o produto selecionado não existe
    @Test
    void testCriarPedido_ProdutoNaoEncontrado() {
        ClienteModel cliente = new ClienteModel();
        cliente.setId(1L);

        PedidoDto pedidoDto = new PedidoDto();
        ClienteDto clienteDto = new ClienteDto();
        clienteDto.setId(1L);
        pedidoDto.setCliente(clienteDto);
        
        ItemPedidoDto item = new ItemPedidoDto();
        item.setProdutoId(404L);
        item.setQuantidade(1);
        pedidoDto.setProdutos(List.of(item));

        pedidoDto.setEnderecoEntrega(new EnderecosDto());
        pedidoDto.setMetodoPagamento(new MetodoPagamentoDto());
        pedidoDto.setFrete(10.0);

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(produtoRepository.findById(404L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> 
        pedidoService.criarPedido(pedidoDto));
    }

}
