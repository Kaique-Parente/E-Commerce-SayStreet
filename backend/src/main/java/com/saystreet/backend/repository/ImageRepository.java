package com.saystreet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saystreet.backend.models.ImageModel;

public interface ImageRepository extends JpaRepository <ImageModel, Long> {
    
}
