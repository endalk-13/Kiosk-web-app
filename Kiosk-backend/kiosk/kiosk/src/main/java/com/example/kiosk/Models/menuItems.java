package com.example.kiosk.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "menu_items")
@Data
public class menuItems {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "item_id_generator"  )
    @SequenceGenerator(
        name = "item_id_generator", 
        sequenceName = "item_id_seq", 
        allocationSize = 1)
    
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_price")
    private Double itemPrice;

    @Column(name = "item_description")
    private String itemDescription;
    

}
