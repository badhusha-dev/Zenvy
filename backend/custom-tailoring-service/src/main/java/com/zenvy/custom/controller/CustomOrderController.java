package com.zenvy.custom.controller;

import com.zenvy.custom.entity.CustomOrder;
import com.zenvy.custom.service.CustomOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/custom-orders")
@RequiredArgsConstructor
public class CustomOrderController {

    private final CustomOrderService service;

    @PostMapping
    public ResponseEntity<CustomOrder> createOrder(@RequestBody CustomOrder order) {
        return ResponseEntity.ok(service.createOrder(order));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CustomOrder>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getOrdersByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomOrder> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getOrderById(id));
    }
}
