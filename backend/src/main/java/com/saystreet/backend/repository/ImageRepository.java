package com.saystreet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.models.ImageModel;

@Repository
public interface ImageRepository extends JpaRepository <ImageModel, Long> {
    
}
