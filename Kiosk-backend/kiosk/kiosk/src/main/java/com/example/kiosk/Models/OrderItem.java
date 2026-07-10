package com.example.kiosk.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long id;

    // Back-reference to the parent order. Excluded from JSON so we don't
    // recurse forever (Order -> items -> OrderItem -> order -> items -> ...).
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    // "BURGER" / "SIDE" / "DRINK" - plain string, kept simple on purpose
    @Column(name = "category")
    private String category;

    // Base price + any customization add-ons, computed on the frontend
    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // Human-readable, e.g. "Grilled Chicken Patty, Brioche Bun, +Bacon, No Onion"
    @Column(name = "customization_summary", length = 1000)
    private String customizationSummary;

    @Column(name = "line_total", nullable = false)
    private Double lineTotal;
}