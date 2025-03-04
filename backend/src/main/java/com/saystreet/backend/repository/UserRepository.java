package com.saystreet.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByCpf(String cpf);
}
