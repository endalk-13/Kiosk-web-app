package com.example.kiosk.Controller;

import com.example.kiosk.Models.menuItems;
import com.example.kiosk.Service.menuItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*") // Allows your React app to make requests to this API
public class MenuItemController {

    private final menuItemService menuItemService;

    // Constructor injection (Best practice)
    public MenuItemController(menuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    // GET: Retrieve all menu items
    // Endpoint: GET http://localhost:8080/api/menu
    @GetMapping
    public ResponseEntity<List<menuItems>> getAllItems() {
        List<menuItems> items = menuItemService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // GET: Retrieve a single menu item by its ID
    // Endpoint: GET http://localhost:8080/api/menu/{id}
    @GetMapping("/{id}")
    public ResponseEntity<menuItems> getItemById(@PathVariable Long id) {
        menuItems item = menuItemService.getItemById(id);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // POST: Add a new menu item
    // Endpoint: POST http://localhost:8080/api/menu
    @PostMapping
    public ResponseEntity<menuItems> addItem(@RequestBody menuItems item) {
        menuItems newItem = menuItemService.addItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    // DELETE: Remove a menu item by its ID
    // Endpoint: DELETE http://localhost:8080/api/menu/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        // Note: You might want to check if the item exists first in a production app
        menuItemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}