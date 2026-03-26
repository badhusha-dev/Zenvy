package com.zenvy.custom.repository;

import com.zenvy.custom.entity.CustomOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {
    List<CustomOrder> findByUserId(Long userId);
}
