package com.example.kiosk.Service;



import com.example.kiosk.Models.menuItems;
import com.example.kiosk.Repo.menuItemRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class menuItemService {

    private final menuItemRepo menuItemRepo;

    public menuItemService(menuItemRepo menuItemRepo) {
        this.menuItemRepo = menuItemRepo;
    }

    public List<menuItems> getAllItems() {
        return menuItemRepo.findAll();
    }

    public menuItems getItemById(Long id) {
        return menuItemRepo.findById(id).orElse(null);
    }

    public menuItems addItem(menuItems item) {
        return menuItemRepo.save(item);
    }

    public void deleteItem(Long id) {
        menuItemRepo.deleteById(id);
    }
}

