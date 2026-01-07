package com.saystreet.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saystreet.backend.models.PedidoModel;

@Repository
public interface PedidoRepository extends JpaRepository<PedidoModel, Long>{
    List<PedidoModel> findByClienteId(Long clienteId);
}
