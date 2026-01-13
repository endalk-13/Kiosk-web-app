package com.example.kiosk.Controller;

import com.example.kiosk.Models.Cart;
import com.example.kiosk.Service.cartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class cartController {

    private final cartService cartService;

    public cartController(cartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCart();
    }

    @PostMapping("/add")
    public void addItem(@RequestParam String item,
                        @RequestParam double price) {
        cartService.addItem(item, price);
    }

    @PostMapping("/remove")
    public void removeItem(@RequestParam String item,
                           @RequestParam double price) {
        cartService.removeItem(item, price);
    }

    @PostMapping("/clear")
    public void clearCart() {
        cartService.clearCart();
    }
}