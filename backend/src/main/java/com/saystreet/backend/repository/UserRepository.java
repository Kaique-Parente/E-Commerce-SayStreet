package com.saystreet.backend.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.models.UserModel;

@Repository
public interface UserRepository extends MongoRepository<UserModel, ObjectId> {
    Optional<UserModel> findById(ObjectId id);
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByCpf(String cpf);
}
