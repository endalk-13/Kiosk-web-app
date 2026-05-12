package com.example.kiosk.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kiosk.Models.menuItems;

public interface menuItemRepo extends JpaRepository<menuItems, Long>{

	void deleteById(Long id);

	

	List<menuItems> findAll();
    
}
