package com.example.kiosk.Service;

import com.example.kiosk.Models.Cart;
import org.springframework.stereotype.Service;

@Service
public class cartService {

    private final Cart cart = new Cart();

    public Cart getCart() {
        return cart;
    }

    public void addItem(String item, double price) {
        cart.addItem(item, price);
    }

    public void removeItem(String item, double price) {
        cart.removeItem(item, price);
    }

    public void clearCart() {
        cart.clearCart();
    }
}