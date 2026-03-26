package com.zenvy.payment.service;

import com.zenvy.payment.dto.OrderEvent;
import com.zenvy.payment.entity.Payment;
import com.zenvy.payment.entity.PaymentStatus;
import com.zenvy.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentConsumer {

    private final PaymentRepository repository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "order-topic", groupId = "payment-group")
    public void processPayment(OrderEvent event) {
        log.info("Processing mock payment for Order ID: {} - Total: {}", event.getOrderId(), event.getAmount());
        
        try {
            // Simulate processing delay
            Thread.sleep(1500);
            
            // Mocking success logic
            Payment payment = Payment.builder()
                .orderId(event.getOrderId())
                .status(PaymentStatus.SUCCESS)
                .transactionId(UUID.randomUUID().toString())
                .build();
            
            repository.save(payment);
            
            // Re-emit specialized event for status update
            event.setStatus("PAID");
            kafkaTemplate.send("payment-success", event);
            log.info("Payment SUCCESS for order: {}. Published back.", event.getOrderId());
            
        } catch (Exception e) {
            log.error("Payment processing failed", e);
            event.setStatus("FAILED");
            kafkaTemplate.send("payment-failed", event);
        }
    }
}
