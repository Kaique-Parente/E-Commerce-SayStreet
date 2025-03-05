package com.saystreet.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.UserDto;
import com.saystreet.backend.exceptions.CpfAlreadyExistsException;
import com.saystreet.backend.exceptions.EmailAlreadyExistsException;
import com.saystreet.backend.exceptions.InvalidCpfException;
import com.saystreet.backend.exceptions.InvalidPasswordException;
import com.saystreet.backend.exceptions.UnauthorizedAccessException;
import com.saystreet.backend.exceptions.UserInactiveException;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.repository.UserRepository;
import com.saystreet.backend.security.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public String login(UserModel user) throws Exception {

        Optional<UserModel> userOpt = userRepository.findByEmail(user.getEmail());

        if (userOpt.isEmpty()) {
            throw new UnauthorizedAccessException("Acesso negado! E-mail não encontrado.");
        }

        UserModel existingUser = userOpt.get();

        // Criptografa a senha fornecida e compara com a armazenada no banco
        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getPassword());

        if (!existingUser.getPassword().equals(encryptedPassword)) {
            throw new InvalidPasswordException("Senha incorreta!");
        }

        // Verifica se o usuário está ativo
        if (!existingUser.isStatus()) {
            throw new UserInactiveException("Usuário inativado.");
        }

        return "Login realizado com sucesso";
    }


    public String create(UserDto userDto) throws Exception {

        Optional<UserModel> userOpt = userRepository.findByEmail(userDto.getEmail());
        if (userOpt.isPresent()) {
            throw new EmailAlreadyExistsException("Esse email já está cadastrado no sistema!");
        }
    
        userOpt = userRepository.findByCpf(userDto.getCpf());
        if (userOpt.isPresent()) {
            throw new CpfAlreadyExistsException("Esse CPF já está cadastrado no sistema!");
        }
    
        if (!CpfValidator.isValidCPF(userDto.getCpf())) {
            throw new InvalidCpfException("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(userDto.getPassword());
        UserModel userModel = new UserModel(userDto.getCpf(), userDto.getEmail(), userDto.getNome(), encryptedPassword, userDto.getGrupo());
        userRepository.save(userModel);
        
        return "Cadastro realizado com sucesso!";
    }


    public String editar(Long id, UserDto userAtt) throws Exception {

        Optional<UserModel> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new NoSuchElementException("Usuário não encontrado com o ID: " + id);
        }

        UserModel userModel = userOptional.get();

        if (!CpfValidator.isValidCPF(userAtt.getCpf())) {
            throw new InvalidCpfException("CPF inválido");
        }

        userModel.setCpf(userAtt.getCpf());
        userModel.setNome(userAtt.getNome());
        userModel.setPassword(userAtt.getPassword());

        String encryptedPassword = PasswordEncryptionUtil.encrypt(userAtt.getPassword());
        userModel.setPassword(encryptedPassword);
        userModel.setGrupo(userAtt.getGrupo());

        userRepository.save(userModel);
        return "Usuário atualizado com sucesso!";
    }

    public List<UserModel> listAll() {
        return userRepository.findAll();
    }

    public void alterarStatus(String cpf, boolean status) {
        Optional<UserModel> userOpt = userRepository.findByCpf(cpf);
    
        if (userOpt.isEmpty()) {  
            throw new NoSuchElementException("Usuário com CPF " + cpf + " não encontrado.");
        }
        
        UserModel user = userOpt.get();
        user.setStatus(status);  
        userRepository.save(user);
        
    }

    public String encontrarId(String Cpf) {
        Optional<UserModel> user = userRepository.findByCpf(Cpf);
        
        if (user.isPresent()) {
            String id = user.get().getId().toString();
            return id;
        }
        
        throw new NoSuchElementException("Usuário não encontrado com o CPF: " + Cpf);
    }
    
    public UserModel encontrarUsuarioCpf(String Cpf) {
        Optional<UserModel> user = userRepository.findByCpf(Cpf);
        if (user.isPresent()) {
            return user.get();
        }
        
        throw new NoSuchElementException("Usuário não encontrado com o CPF: " + Cpf);
    }
    
    public String encontrarSetorUsuarioEmail(String email) {
        Optional<UserModel> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get().getGrupo();
        }
        
        throw new NoSuchElementException("Usuário não encontrado com o e-mail: " + email);
    }
}
