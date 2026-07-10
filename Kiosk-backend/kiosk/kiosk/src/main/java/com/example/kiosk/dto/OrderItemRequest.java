package com.example.kiosk.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private String itemName;
    private String category;
    private Double unitPrice;
    private Integer quantity;
    private String customizationSummary;
    
}
