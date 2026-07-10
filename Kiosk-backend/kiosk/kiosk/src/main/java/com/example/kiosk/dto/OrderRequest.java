package com.example.kiosk.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private List<OrderItemRequest> items;
}