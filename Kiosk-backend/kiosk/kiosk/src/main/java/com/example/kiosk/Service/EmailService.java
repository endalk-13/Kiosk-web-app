package com.example.kiosk.Service;

import com.example.kiosk.Models.Order;
import com.example.kiosk.Models.OrderItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${kiosk.mail.from}")
    private String fromAddress;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmationEmail(Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(order.getCustomerEmail());
        message.setSubject("Burger House - Order #" + order.getId() + " Confirmed");
        message.setText(buildBody(order));
        mailSender.send(message);
    }

    private String buildBody(Order order) {
        StringBuilder body = new StringBuilder();
        body.append("Hi ").append(order.getCustomerName()).append(",\n\n");
        body.append("Thanks for your order! Here's what we're firing up for you:\n\n");

        for (OrderItem item : order.getItems()) {
            body.append(item.getQuantity()).append("x ").append(item.getItemName());
            if (item.getCustomizationSummary() != null && !item.getCustomizationSummary().isBlank()) {
                body.append(" (").append(item.getCustomizationSummary()).append(")");
            }
            body.append(" - $").append(String.format("%.2f", item.getLineTotal())).append("\n");
        }

        body.append("\nTotal: $").append(String.format("%.2f", order.getTotalAmount())).append("\n\n");
        body.append("Order #").append(order.getId()).append(" - we'll have it ready shortly.\n");
        body.append("- Burger House");
        return body.toString();
    }
}