package com.zenvy.cart.service;

import com.zenvy.cart.entity.CartItem;
import com.zenvy.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository repository;

    public List<CartItem> getUserCart(Long userId) {
        return repository.findByUserId(userId);
    }

    public CartItem addToCart(Long userId, Long productId, Integer quantity) {
        var existing = repository.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return repository.save(item);
        }
        CartItem item = CartItem.builder()
                .userId(userId)
                .productId(productId)
                .quantity(quantity)
                .build();
        return repository.save(item);
    }

    public void removeProduct(Long userId, Long productId) {
        var existing = repository.findByUserIdAndProductId(userId, productId);
        existing.ifPresent(repository::delete);
    }

    @Transactional
    public void clearCart(Long userId) {
        repository.deleteByUserId(userId);
    }
}
