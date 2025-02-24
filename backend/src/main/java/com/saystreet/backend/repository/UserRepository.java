package com.saystreet.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.models.UserModel;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {
    
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByCpf(String cpf);
}
