package com.example.kiosk.Service;

import com.example.kiosk.Models.Order;
import com.example.kiosk.Models.OrderItem;
import com.example.kiosk.Models.OrderStatus;
import com.example.kiosk.Repo.orderRepo;
import com.example.kiosk.dto.OrderItemRequest;
import com.example.kiosk.dto.OrderRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class orderService {

    private final orderRepo orderRepo;
    private final EmailService emailService;

    public orderService(orderRepo orderRepo, EmailService emailService) {
        this.orderRepo = orderRepo;
        this.emailService = emailService;
    }

    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setStatus(OrderStatus.PENDING);

        double total = 0.0;
        for (OrderItemRequest itemReq : request.getItems()) {
            double unitPrice = itemReq.getUnitPrice() != null ? itemReq.getUnitPrice() : 0.0;
            int quantity = itemReq.getQuantity() != null ? itemReq.getQuantity() : 1;
            double lineTotal = unitPrice * quantity;

            OrderItem item = new OrderItem();
            item.setItemName(itemReq.getItemName());
            item.setCategory(itemReq.getCategory());
            item.setUnitPrice(unitPrice);
            item.setQuantity(quantity);
            item.setCustomizationSummary(itemReq.getCustomizationSummary());
            item.setLineTotal(lineTotal);

            order.addItem(item);
            total += lineTotal;
        }
        order.setTotalAmount(total);

        Order saved = orderRepo.save(order);

        // Email failure should never block the order itself from going through
        try {
            emailService.sendOrderConfirmationEmail(saved);
        } catch (Exception e) {
            System.err.println("Failed to send confirmation email for order " + saved.getId() + ": " + e.getMessage());
        }

        return saved;
    }

    public List<Order> getActiveOrders() {
        return orderRepo.findByStatusInOrderByCreatedAtAsc(Arrays.asList(OrderStatus.PENDING, OrderStatus.CONFIRMED));
    }

    public List<Order> getCompletedOrders() {
        return orderRepo.findByStatusOrderByCreatedAtDesc(OrderStatus.DONE);
    }

    public Order confirmOrder(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Order not found: " + id));
        order.setStatus(OrderStatus.CONFIRMED);
        return orderRepo.save(order);
    }

    public Order completeOrder(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Order not found: " + id));
        order.setStatus(OrderStatus.DONE);
        return orderRepo.save(order);
    }
}
