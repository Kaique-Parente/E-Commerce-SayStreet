package com.saystreet.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.ClienteDto;
import com.saystreet.backend.dto.EnderecoDto;
import com.saystreet.backend.exceptions.CpfAlreadyExistsException;
import com.saystreet.backend.exceptions.EmailAlreadyExistsException;
import com.saystreet.backend.exceptions.InvalidCpfException;
import com.saystreet.backend.exceptions.InvalidPasswordException;
import com.saystreet.backend.exceptions.UnauthorizedAccessException;
import com.saystreet.backend.exceptions.UserInactiveException;
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.security.CpfValidator;
import com.saystreet.backend.security.PasswordEncryptionUtil;

@Service
public class ClienteService {
    
    @Autowired
    ClienteRepository clienteRepository;

    public ClienteModel login(UserModel user) throws Exception{
        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(user.getEmail());

        if (clienteOpt.isEmpty()) {
            throw new UnauthorizedAccessException("Acesso negado! E-mail não encontrado.");
        }

        ClienteModel existingClient = clienteOpt.get();

        // Criptografa a senha fornecida e compara com a armazenada no banco
        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getPassword());

        if (!existingClient.getPassword().equals(encryptedPassword)) {
            throw new InvalidPasswordException("Senha incorreta!");
        }

        // Verifica se o usuário está ativo
        if (!existingClient.isStatus()) {
            throw new UserInactiveException("Usuário inativado.");
        }

        return existingClient;
    }

    public String create(ClienteDto clienteDto) throws Exception{

        Optional<ClienteModel> clienteOpt = clienteRepository.findByEmail(clienteDto.getEmail());
        if(clienteOpt.isPresent()){
            throw new EmailAlreadyExistsException("Esse email já está cadastrado no sistema!");
        }

        clienteOpt = clienteRepository.findByEmail(clienteDto.getEmail());
        if(clienteOpt.isPresent()){
            throw new CpfAlreadyExistsException("Esse CPF já está cadastrado no sistema!");
        }

        if(!CpfValidator.isValidCPF(clienteDto.getCpf())){
            throw new InvalidCpfException("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(clienteDto.getPassword());
        ClienteModel cliente = ClienteModel.builder()
                .cpf(clienteDto.getCpf())
                .nome(clienteDto.getNome())
                .email(clienteDto.getEmail())
                .password(encryptedPassword)
                .dataNascimento(clienteDto.getDataNascimento())
                .genero(clienteDto.getGenero())
                .status(true)
                .build();

        ArrayList<EnderecoModel> enderecos = new ArrayList<>();
        boolean temPrincipal = false;
        
        if (clienteDto.getEnderecosEntrega() != null && !clienteDto.getEnderecosEntrega().isEmpty()) {
                for (EnderecoDto endDto : clienteDto.getEnderecosEntrega()) {
                    boolean isPrincipal = endDto.isPrincipal();

                    if (isPrincipal) {
                        if (temPrincipal) {
                            throw new IllegalArgumentException("Só pode haver um endereço principal.");
                        }
                        temPrincipal = true;
                    }

                    enderecos.add(EnderecoModel.builder()
                        .cep(endDto.getCep())
                        .logradouro(endDto.getLogradouro())
                        .numero(endDto.getNumero())
                        .complemento(endDto.getComplemento())
                        .bairro(endDto.getBairro())
                        .cidade(endDto.getCidade())
                        .uf(endDto.getUf())
                        .principal(isPrincipal)
                        .cliente(cliente)
                        .build());
                }
            }

            // Caso nenhum endereço tenha sido marcada como principal, o primeiro será
            // definida como true
            if (!temPrincipal && !enderecos.isEmpty()) {
                enderecos.get(0).setPrincipal(true);
            }

            cliente.setEnderecos(enderecos);
            clienteRepository.save(cliente);

            return "Produto criado com sucesso";
    }

    public List<ClienteModel> listAll() {
        return clienteRepository.findAll();
    }

}
