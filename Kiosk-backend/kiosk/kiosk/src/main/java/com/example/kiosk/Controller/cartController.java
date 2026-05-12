package com.example.kiosk.Controller;

import com.example.kiosk.Models.Cart;
import com.example.kiosk.Service.cartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class cartController {

    private final cartService CartService;

    public cartController(cartService cartService) {
        this.CartService = cartService;
    }

    @GetMapping("/getcart")
    public Cart getCart() {
        return CartService.getCartById();
    }

    @PostMapping("/add")
    public void addItem(@RequestParam String item,
                        @RequestParam double price) {
        CartService.addItem(item, price);
    }

    @PostMapping("/remove")
    public void removeItem(@RequestParam String item,
                           @RequestParam double price) {
        CartService.removeItem(item, price);
    }

    @PostMapping("/clear")
    public void clearCart() {
        cartService.clearCart();
    }
}
