package com.saystreet.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
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

    public ResponseEntity<String> login(UserModel user) throws Exception {

        Optional<UserModel> userOpt = userRepository.findByEmail(user.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso negado!");
        }

        UserModel users = userOpt.get();
        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getPassword());

        if (!users.getPassword().equals(encryptedPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta!");
        }

        if(!userOpt.get().isStatus()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário inativado.");
        }

        return ResponseEntity.ok("Login realizado com sucesso");
    }


    public ResponseEntity<String> create(UserDto user) throws Exception {

        Optional<UserModel> userOpt = userRepository.findByEmail(user.getEmail());

        if (!userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Esse email já está cadastrado no sistema!");
        }

        userOpt = userRepository.findByCpf(user.getCpf());

        if (!userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Esse CPF já está cadastrado no sistema!");
        }

        if(!CpfValidator.isValidCPF(user.getCpf())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Este CPF não é válido. Por favor, digite um CPF válido.");
        }

        String encryptedPassword = PasswordEncryptionUtil.encrypt(user.getPassword());
        UserModel userModel = new UserModel(user.getCpf(), user.getEmail(), user.getNome(), encryptedPassword, user.getGrupo());
        userRepository.save(userModel);

        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }


    public String editar(ObjectId id, UserDto userAtt) throws Exception {

        Optional<UserModel> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            UserModel userModel = userOptional.get();

            if(CpfValidator.isValidCPF(userAtt.getCpf())) {
                userModel.setCpf(userAtt.getCpf());
            }else {
                throw new RuntimeException("CPF inválido");
            }
            
            userModel.setNome(userAtt.getNome());
            userModel.setPassword(userAtt.getPassword());
            String encryptedPassword = PasswordEncryptionUtil.encrypt(userAtt.getPassword());
            userModel.setPassword(encryptedPassword);
            userModel.setStatus(userAtt.isStatus());
            userModel.setGrupo(userAtt.getGrupo());

            userRepository.save(userModel);
            return "Usuário atualizado com sucesso!";
        } else {
            throw new RuntimeException("Usuário não encontrado com o ID: " + id);
        }
    }

    public List<UserModel> listAll() {
        return userRepository.findAll();
    }

    public boolean alterarStatus(String cpf, boolean status) {
        Optional<UserModel> userOpt = userRepository.findByCpf(cpf);
    
        if (userOpt.isPresent()) {
            UserModel user = userOpt.get();
            user.setStatus(status);  
    
            userRepository.save(user); 
            return true;  
        } else {
            return false;  
        }
    }

    public String encontrarId(String Cpf){
        Optional<UserModel> user = userRepository.findByCpf(Cpf);
        if(user.isPresent()){
            String id = user.get().getId().toString();
            return id;
        }

        return null;
    }

    public UserModel encontrarUsuario(String Cpf){
        Optional<UserModel> user = userRepository.findByCpf(Cpf);
        if(user.isPresent()){
            return user.get();
        }

        return null;
    }
}
