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
import com.saystreet.backend.models.ClienteModel;
import com.saystreet.backend.models.EnderecoModel;
import com.saystreet.backend.repository.ClienteRepository;
import com.saystreet.backend.security.CpfValidator;
import com.saystreet.backend.security.NameValidator;
import com.saystreet.backend.security.PasswordEncryptionUtil;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;

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

        if(!NameValidator.validaNome(clienteDto.getNome())){
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
}