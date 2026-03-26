package com.zenvy.product.service;

import com.zenvy.product.entity.Product;
import com.zenvy.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    @Cacheable(value = "products", key = "#category + #search + #pageable.pageNumber")
    public Page<Product> getProducts(String category, String search, Pageable pageable) {
        if (category != null) {
            return repository.findByCategory(category, pageable);
        }
        if (search != null) {
            return repository.findByNameContainingIgnoreCase(search, pageable);
        }
        return repository.findAll(pageable);
    }

    @Cacheable(value = "product", key = "#id")
    public Product getProductById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getFeaturedProducts() {
        return repository.findByFeaturedTrue();
    }

    public List<Product> getTrendingProducts() {
        return repository.findByTrendingTrue();
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public Product updateProduct(Long id, Product product) {
        var existing = getProductById(id);
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setImages(product.getImages());
        existing.setCategory(product.getCategory());
        existing.setStock(product.getStock());
        return repository.save(existing);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void updateStock(Long productId, Integer quantity) {
        var product = getProductById(productId);
        product.setStock(product.getStock() - quantity);
        repository.save(product);
    }

    @CacheEvict(value = {"products", "product"}, allEntries = true)
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
