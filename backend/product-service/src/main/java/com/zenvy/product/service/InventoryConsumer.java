package com.zenvy.product.service;

import com.zenvy.product.entity.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryConsumer {

    private final ProductService productService;

    @KafkaListener(topics = "payment-success", groupId = "inventory-group")
    public void consumeOrder(com.zenvy.product.dto.OrderEvent event) {
        log.info("Consumed payment-success for inventory update: {}", event.getOrderId());
        if (event.getItems() != null) {
            event.getItems().forEach((productId, quantity) -> {
                log.info("Decrementing stock for product: {} by {}", productId, quantity);
                productService.updateStock(productId, quantity);
            });
        }
    }
}
