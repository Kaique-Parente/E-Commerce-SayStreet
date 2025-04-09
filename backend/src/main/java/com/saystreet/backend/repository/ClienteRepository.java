package com.saystreet.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saystreet.backend.models.ClienteModel;

public interface ClienteRepository extends JpaRepository <ClienteModel, Long> {
    
    Optional<ClienteModel> findByEmail(String email);
    Optional<ClienteModel> findByCpf(String cpf);
}
