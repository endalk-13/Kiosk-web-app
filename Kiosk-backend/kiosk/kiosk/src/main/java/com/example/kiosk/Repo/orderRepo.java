package com.example.kiosk.Repo;

<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kiosk.Models.Order;

public interface orderRepo extends JpaRepository<Order, Long>{
    
}
=======
import com.example.kiosk.Models.Order;
import com.example.kiosk.Models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface orderRepo extends JpaRepository<Order, Long> {

    List<Order> findByStatusInOrderByCreatedAtAsc(List<OrderStatus> statuses);

    List<Order> findByStatusOrderByCreatedAtDesc(OrderStatus status);
}
>>>>>>> development
