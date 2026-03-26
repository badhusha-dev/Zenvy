package com.zenvy.review.service;

import com.zenvy.review.entity.Review;
import com.zenvy.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;

    public List<Review> getReviewsByProduct(Long productId) {
        return repository.findByProductId(productId);
    }

    public Review saveReview(Review review) {
        return repository.save(review);
    }

    public void deleteReview(Long id) {
        repository.deleteById(id);
    }
}
