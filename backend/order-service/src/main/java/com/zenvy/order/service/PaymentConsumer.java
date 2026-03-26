package com.zenvy.order.service;

import com.zenvy.order.dto.OrderEvent;
import com.zenvy.order.entity.OrderStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentConsumer {

    private final OrderService orderService;

    @KafkaListener(topics = "payment-success", groupId = "order-group")
    public void handlePaymentSuccess(OrderEvent event) {
        log.info("Reacting to payment-success for Order: {}", event.getOrderId());
        orderService.updateOrderStatus(event.getOrderId(), OrderStatus.PAID);
    }

    @KafkaListener(topics = "payment-failed", groupId = "order-group")
    public void handlePaymentFailed(OrderEvent event) {
        log.info("Reacting to payment-failed for Order: {}", event.getOrderId());
        orderService.updateOrderStatus(event.getOrderId(), OrderStatus.FAILED);
    }
}
