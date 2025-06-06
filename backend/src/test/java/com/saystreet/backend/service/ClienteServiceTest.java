package com.saystreet.backend.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.dto.EnderecosDto;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.security.PasswordEncryptionUtil;

@ActiveProfiles("test")
public class ClienteServiceTest {

    @InjectMocks
    private ClienteService clienteService;

    @Mock
    private ClienteRepository clienteRepository;

    private ClienteDto clientePreCriado;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        clientePreCriado = gerarClienteTest();
    }

    // Teste para o método de login:
    @Test
    void testLogin_ComSucesso() throws Exception {

        String senhaTeste = "senha123";
        String senhaCripto = PasswordEncryptionUtil.encrypt(senhaTeste);

        ClienteModel clienteSalvo = new ClienteModel();
        clienteSalvo.setEmail("joao@teste.com");
        clienteSalvo.setSenha(senhaCripto);
        clienteSalvo.setStatus(true);

        ClienteModel login = new ClienteModel();
        login.setEmail("joao@teste.com");
        login.setSenha(senhaTeste);

        //na chamada do método, retona o cliente salvo
        when(clienteRepository.findByEmail("joao@teste.com")).thenReturn(Optional.of(clienteSalvo));

        ClienteModel resultado = clienteService.login(login);

        assertThat(resultado, notNullValue());
        assertThat(resultado.getEmail(), is("joao@teste.com"));
        assertThat(resultado.getSenha(), is(senhaCripto));
        assertThat(resultado.isStatus(), is(true));
    }

    // Testes para o método de criar cliente
    @Test
    void testCreateCliente_Sucesso() throws Exception {
        
        when(clienteRepository.findByEmail(clientePreCriado.getEmail())).thenReturn(Optional.empty());
        when(clienteRepository.findByCpf(clientePreCriado.getCpf())).thenReturn(Optional.empty());

        ResponseEntity<String> resposta = clienteService.create(clientePreCriado);

        assertThat(resposta.getStatusCode(), is(HttpStatus.CREATED));
        assertThat(resposta.getBody(), is("Cliente cadastrado com sucesso!"));
    }

    //Testa o método de criar, mas com erro porque já tem e-mail cadastrado
    @Test
    void testCreateCliente_EmailExistente() throws Exception {

        when(clienteRepository.findByEmail(clientePreCriado.getEmail()))
                .thenReturn(Optional.of(new ClienteModel()));

        ResponseEntity<String> resposta = clienteService.create(clientePreCriado);

        assertThat(resposta.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        assertThat(resposta.getBody(), is("E-mail já cadastrado no sistema."));
    }

    @Test
    void testCreateCliente_CpfExistente() throws Exception {

        when(clienteRepository.findByEmail(clientePreCriado.getEmail())).thenReturn(Optional.empty());
        when(clienteRepository.findByCpf(clientePreCriado.getCpf())).thenReturn(Optional.of(new ClienteModel()));

        ResponseEntity<String> resposta = clienteService.create(clientePreCriado);

        assertThat(resposta.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        assertThat(resposta.getBody(), is("Esse CPF já está cadastrado no sistema!"));
    }

    @Test
    void testCreateCliente_CpfInvalido() throws Exception {

        clientePreCriado.setCpf("12345678900"); // CPF inválido

        when(clienteRepository.findByEmail(clientePreCriado.getEmail())).thenReturn(Optional.empty());
        when(clienteRepository.findByCpf(clientePreCriado.getCpf())).thenReturn(Optional.empty());

        ResponseEntity<String> resposta = clienteService.create(clientePreCriado);

        assertThat(resposta.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        assertThat(resposta.getBody(), containsString("CPF não é válido"));
    }

    @Test
    void testCreateCliente_NomeInvalido() throws Exception {
        clientePreCriado.setNome("Ana"); 

        when(clienteRepository.findByEmail(clientePreCriado.getEmail())).thenReturn(Optional.empty());
        when(clienteRepository.findByCpf(clientePreCriado.getCpf())).thenReturn(Optional.empty());

        ResponseEntity<String> resposta = clienteService.create(clientePreCriado);

        assertThat(resposta.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        assertThat(resposta.getBody(), containsString("nome não é válido"));
    }


    //Teste para o método de editar cliente
    @Test
    void testEditCliente_Sucesso() throws Exception {
        Long clienteId = 1L;

        // Cliente já existente:
        ClienteModel clienteExistente = new ClienteModel();
        clienteExistente.setId(clienteId);
        clienteExistente.setNome("Nome Antigo");
        clienteExistente.setCpf("12345678909");
        clienteExistente.setEmail("joao@teste.com");
        clienteExistente.setSenha("senhaAntiga");
        clienteExistente.setStatus(true);
        clienteExistente.setEnderecos(new ArrayList<>());
        clienteExistente.setEnderecoFatura(new EnderecoModel());

        // Noovos dados do client
        clientePreCriado.setNome("Novo Nome");
        clientePreCriado.setSenha("novaSenha");

        when(clienteRepository.findById(clienteId)).thenReturn(Optional.of(clienteExistente));

        String resposta = clienteService.editCliente(clienteId, clientePreCriado);

        assertThat(resposta, is("Cliente atualizado com sucesso!"));
        assertThat(clienteExistente.getNome(), is("Novo Nome"));
        assertThat(clienteExistente.getSenha(), not("novaSenha"));
        assertThat(clienteExistente.isStatus(), is(true));
        assertThat(clienteExistente.getEnderecos(), hasSize(1));

        verify(clienteRepository).save(clienteExistente);
    }

    // Cria um cliente valido para os testes
    private ClienteDto gerarClienteTest() {
        EnderecosDto endereco = new EnderecosDto();
        endereco.setCep("09760280");
        endereco.setLogradouro("Rua Exemplo");
        endereco.setNumero(123);
        endereco.setComplemento("Apto 1");
        endereco.setBairro("Centro");
        endereco.setLocalidade("São Paulo");
        endereco.setUf("SP");
        endereco.setEstado("SP");
        endereco.setEnderecoPadrao(true);

        ClienteDto dto = new ClienteDto();
        dto.setNome("João Silva");
        dto.setCpf("12345678909");
        dto.setEmail("joao@teste.com");
        dto.setSenha("senha123");
        dto.setGenero("Masculino");
        dto.setDataNascimento(new Date());
        dto.setEnderecoFatura(endereco);
        dto.setEnderecos(List.of(endereco));
        return dto;
    }
}
