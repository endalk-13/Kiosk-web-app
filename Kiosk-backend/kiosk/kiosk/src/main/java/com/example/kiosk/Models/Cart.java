package com.example.kiosk.Models;

import java.util.ArrayList;
import java.util.List;
<<<<<<< HEAD

import jakarta.persistence.Column;
public class Cart {
    
	@Column(name="cart_Id")
	private long Id;
	
=======
public class Cart {
    
>>>>>>> development
private List<String> itemsList = new ArrayList<>();
    private double totalPrice;

    public void addItem(String item, double price) {
        itemsList.add(item);
        totalPrice += price;
    }

    public void removeItem(String item, double price) {
        if (itemsList.remove(item)) {
            totalPrice -= price;
        }
    }

    public double calculateTotal() {
        return totalPrice;
    }

    public void clearCart() {
        itemsList.clear();
        totalPrice = 0;
    }

    public List<String> getItemsList() {
        return itemsList;
    }

    public double getTotalPrice() {
        return totalPrice;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> development
