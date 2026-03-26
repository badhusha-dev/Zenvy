package com.zenvy.product.repository;

import com.zenvy.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(String category, Pageable pageable);
    List<Product> findByFeaturedTrue();
    List<Product> findByTrendingTrue();
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
