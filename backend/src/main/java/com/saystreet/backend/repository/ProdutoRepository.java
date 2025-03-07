package com.saystreet.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.saystreet.backend.models.ProdutoModel;

public interface ProdutoRepository extends JpaRepository <ProdutoModel, Long> {

}
