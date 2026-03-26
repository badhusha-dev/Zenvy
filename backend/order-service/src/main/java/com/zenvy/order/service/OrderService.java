package com.zenvy.order.service;

import com.zenvy.order.dto.OrderEvent;
import com.zenvy.order.entity.Order;
import com.zenvy.order.entity.OrderItem;
import com.zenvy.order.entity.OrderStatus;
import com.zenvy.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public Order placeOrder(Long userId, List<OrderItem> items) {
        BigDecimal total = items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .userId(userId)
                .items(items)
                .totalAmount(total)
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = repository.save(order);
        
        OrderEvent event = OrderEvent.builder()
                .orderId(savedOrder.getId())
                .userId(savedOrder.getUserId())
                .amount(savedOrder.getTotalAmount())
                .status(savedOrder.getStatus().name())
                .items(items.stream().collect(java.util.stream.Collectors.toMap(
                        OrderItem::getProductId,
                        OrderItem::getQuantity
                )))
                .build();
                
        kafkaTemplate.send("order-topic", event);
        return savedOrder;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return repository.save(order);
    }
}
