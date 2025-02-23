package com.saystreet.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.model.UserModel;

@Repository
public interface UserRepository extends MongoRepository<UserModel, Integer> {
    
    Optional<UserModel> findByEmail(String email);
}
