package com.saystreet.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.dto.EnderecosDto;
import com.saystreet.backend.exceptions.CpfAlreadyExistsException;
import com.saystreet.backend.exceptions.EmailAlreadyExistsException;
import com.saystreet.backend.exceptions.InvalidCpfException;
import com.saystreet.backend.exceptions.InvalidNameException;
import com.saystreet.backend.exceptions.InvalidPasswordException;
import com.saystreet.backend.exceptions.UnauthorizedAccessException;
import com.saystreet.backend.exceptions.UserInactiveException;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.security.CpfValidator;
import com.saystreet.backend.security.NameValidator;
import com.saystreet.backend.security.PasswordEncryptionUtil;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

    public ClienteModel login(ClienteModel user) throws Exception{
        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(user.getEmail());
        System.out.println("EMAILLLL:" + user.getEmail());

        if (clienteOpt.isEmpty()) {
            throw new UnauthorizedAccessException("Acesso negado! E-mail não encontrado.");
        }

        ClienteModel existingClient = clienteOpt.get();

        // Criptografa a senha fornecida e compara com a armazenada no banco
        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getSenha());

        if (!existingClient.getSenha().equals(encryptedPassword)) {
            throw new InvalidPasswordException("Senha incorreta!");
        }

        // Verifica se o usuário está ativo
        if (!existingClient.isStatus()) {
            throw new UserInactiveException("Usuário inativado.");
        }

        return existingClient;
    }

    public String create(ClienteDto clienteDto) throws Exception {

        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(clienteDto.getEmail());
        if (clienteOpt.isPresent()) {
            throw new EmailAlreadyExistsException("Esse email já está cadastrado no sistema!");
        }

        clienteOpt = clienteRepository.findByCpf(clienteDto.getCpf());
        if (clienteOpt.isPresent()) {
            throw new CpfAlreadyExistsException("Esse CPF já está cadastrado no sistema!");
        }

        if (!CpfValidator.isValidCPF(clienteDto.getCpf())) {
            throw new InvalidCpfException("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        if (!NameValidator.validaNome(clienteDto.getNome())) {
            throw new InvalidNameException("Este nome não é válido. Por favor, digite um nome válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(clienteDto.getSenha());

        ClienteModel cliente = ClienteModel.builder()
                .nome(clienteDto.getNome())
                .cpf(clienteDto.getCpf())
                .genero(clienteDto.getGenero())
                .dataNascimento(clienteDto.getDataNascimento())
                .email(clienteDto.getEmail())
                .senha(encryptedPassword)
                .status(true)
                .build();

        List<EnderecoModel> enderecos = new ArrayList<>();
        boolean temPradrao = false;

        if (clienteDto.getEnderecos() != null && !clienteDto.getEnderecos().isEmpty()) {
            for (EnderecosDto enderecoDTO : clienteDto.getEnderecos()) {
                boolean isPrincipal = enderecoDTO.isEnderecoPadrao();

                if (isPrincipal) {
                    if (temPradrao) {
                        throw new IllegalArgumentException("Só pode haver um endereço padrão.");
                    }
                    temPradrao = true;
                }

                enderecos.add(EnderecoModel.builder()
                        .cep(enderecoDTO.getCep())
                        .logradouro(enderecoDTO.getLogradouro())
                        .complemento(enderecoDTO.getComplemento())
                        .bairro(enderecoDTO.getBairro())
                        .localidade(enderecoDTO.getLocalidade())
                        .uf(enderecoDTO.getUf())
                        .estado(enderecoDTO.getEstado())
                        .numero(enderecoDTO.getNumero())
                        .enderecoPadrao(isPrincipal)
                        .build());
            }
        }

        if (!temPradrao && !enderecos.isEmpty()) {
            enderecos.get(0).setEnderecoPadrao(true);
        }

        cliente.setEnderecos(enderecos);
        clienteRepository.save(cliente);

        return "Cadastro realizado com sucesso";
    }

    // Método para buscar um cliente pelo id
    public ClienteModel buscarCliente(Long id) throws Exception {
        Optional<ClienteModel> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {
            ClienteModel newCliente = clienteExistente.get();
            return newCliente;
        }
        throw new Exception("Cliente não encontrado");
    }

    // Método para editar um cliente
    public String editCliente(Long id, ClienteDto dto) throws Exception {

        ClienteModel cliente = buscarCliente(id);

        if (dto.getNome() != null) {
            if (!NameValidator.validaNome(dto.getNome())) {
                throw new InvalidNameException("Este nome não é válido. Por favor, digite um nome válido.");
            }
            cliente.setNome(dto.getNome());
        }

        if (dto.getDataNascimento() != null) {
            cliente.setDataNascimento(dto.getDataNascimento());
        }

        if (dto.getGenero() != null) {
            cliente.setGenero(dto.getGenero());
        }

        if (dto.getSenha() != null) {
            String encryptedPassword = PasswordEncryptionUtil.encrypt(dto.getSenha());
            cliente.setSenha(encryptedPassword);
        }

        cliente.setStatus(dto.isStatus());

        cliente.getEnderecos().clear();
        boolean temPradrao = false;

        if (dto.getEnderecos() != null && !dto.getEnderecos().isEmpty()) {
            for (EnderecosDto enderecoDTO : dto.getEnderecos()) {
                boolean isPrincipal = enderecoDTO.isEnderecoPadrao();

                if (isPrincipal) {
                    if (temPradrao) {
                        throw new IllegalArgumentException("Só pode haver um endereço padrão.");
                    }
                    temPradrao = true;
                }

                cliente.getEnderecos().add(EnderecoModel.builder()
                        .cep(enderecoDTO.getCep())
                        .logradouro(enderecoDTO.getLogradouro())
                        .complemento(enderecoDTO.getComplemento())
                        .bairro(enderecoDTO.getBairro())
                        .localidade(enderecoDTO.getLocalidade())
                        .uf(enderecoDTO.getUf())
                        .estado(enderecoDTO.getEstado())
                        .numero(enderecoDTO.getNumero())
                        .enderecoPadrao(isPrincipal)
                        .cliente(cliente)
                        .build());
            }
        }

        clienteRepository.save(cliente);

        return "Cliente atualizado com sucesso!";
    }

    public List<ClienteModel> listAll() {
        return this.clienteRepository.findAll();
    }
}