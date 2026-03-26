package com.zenvy.custom.service;

import com.zenvy.custom.entity.CustomOrder;
import com.zenvy.custom.repository.CustomOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomOrderService {

    private final CustomOrderRepository repository;

    public CustomOrder createOrder(CustomOrder order) {
        return repository.save(order);
    }

    public List<CustomOrder> getOrdersByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public CustomOrder getOrderById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tailoring order not found"));
    }
}
