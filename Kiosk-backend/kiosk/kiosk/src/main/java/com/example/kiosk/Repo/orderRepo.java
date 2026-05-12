package com.example.kiosk.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kiosk.Models.Order;

public interface orderRepo extends JpaRepository<Order, Long>{
    
}
