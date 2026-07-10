package com.example.kiosk.Controller;

import com.example.kiosk.Models.Order;
import com.example.kiosk.Service.orderService;
import com.example.kiosk.dto.OrderRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class orderController {

    private final orderService orderService;

    public orderController(orderService orderService) {
        this.orderService = orderService;
    }

    // Orders still on the kitchen board: PENDING + CONFIRMED
    @GetMapping("/active")
    public ResponseEntity<List<Order>> getActiveOrders() {
        return ResponseEntity.ok(orderService.getActiveOrders());
    }

    // Orders the kitchen has already finished
    @GetMapping("/completed")
    public ResponseEntity<List<Order>> getCompletedOrders() {
        return ResponseEntity.ok(orderService.getCompletedOrders());
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        if (request.getCustomerName() == null || request.getCustomerName().isBlank()
                || request.getCustomerPhone() == null || request.getCustomerPhone().isBlank()
                || request.getCustomerEmail() == null || request.getCustomerEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Customer name, phone, and email are required.");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Order must contain at least one item.");
        }
        Order created = orderService.createOrder(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(orderService.confirmOrder(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Order> completeOrder(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(orderService.completeOrder(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}