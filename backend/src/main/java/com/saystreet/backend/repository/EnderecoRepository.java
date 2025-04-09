package com.saystreet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saystreet.backend.models.EnderecoModel;

public interface EnderecoRepository extends JpaRepository <EnderecoModel, Long> {
    
}
