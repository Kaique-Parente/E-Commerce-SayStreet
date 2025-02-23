package com.saystreet.backend.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.UserDto;
import com.saystreet.backend.model.UserModel;
import com.saystreet.backend.repository.UserRepository;

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

    public ResponseEntity<String> create(UserDto user) {
        int id = autoIncrement();
        
        UserModel userModel = new UserModel(id, user.getEmail(), user.getPassword());
        userModel.setStatus(true);
        userRepository.save(userModel);

        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }

    private int autoIncrement(){
        List<UserModel> users = userRepository.findAll();
        return users.isEmpty()? 1:
            users.stream().max(Comparator.comparing(UserModel::getId)).get().getId() + 1;
    }
}
