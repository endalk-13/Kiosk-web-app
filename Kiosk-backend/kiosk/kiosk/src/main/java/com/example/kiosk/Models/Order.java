package com.example.kiosk.Models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Order{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "item_id_generator")
	
	@Column(name="Order_Id")
	private Long Id;
	
	@Column(name="Order_Name")
	private String name;
	
	
	
	
	
	
}