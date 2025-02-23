package com.saystreet.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.UserDto;
import com.saystreet.backend.models.UserModel;
import com.saystreet.backend.repository.UserRepository;
import com.saystreet.backend.security.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<String> login(UserModel user) {

        Optional<UserModel> userOpt = userRepository.findByEmail(user.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos.");
        }

        UserModel users = userOpt.get();

        if (!users.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos.");
        }

        return ResponseEntity.ok("Login realizado com sucesso");
    }

    public ResponseEntity<String> create(UserDto user) throws Exception {

        Optional<UserModel> userOpt = userRepository.findByEmail(user.getEmail());

        if (!userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Esse email já está cadastrado no sistema!");
        }

        String cpf = String.valueOf(user.getCpf());

        if(!CpfValidator.isValidCPF(cpf)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getPassword());
        UserModel userModel = new UserModel(user.getCpf(), user.getEmail(), encryptedPassword, user.getGrupo());
        userRepository.save(userModel);

        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }
}
