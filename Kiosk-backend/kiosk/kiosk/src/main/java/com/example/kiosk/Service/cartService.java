package com.example.kiosk.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.kiosk.Models.Cart;
import com.example.kiosk.Repo.cartRepo;

@Service
public class cartService {

	private final cartRepo repo;
    
	public cartService(cartRepo repo) {
		this.repo=repo;
	}
	
	public List<Cart> getCart(){
		return repo.findAll();
		
	}
	
	public Cart getCartById (long Id) {
		return repo.findAllById(Id).orElse(null);
	}
}
