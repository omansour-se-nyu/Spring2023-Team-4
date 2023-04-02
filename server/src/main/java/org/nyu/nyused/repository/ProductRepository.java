package org.nyu.nyused.repository;

import org.nyu.nyused.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select * from product where user_id = ?1", nativeQuery = true)
    List<Product> findBySellerID(Long sid);

    // @Query(value = "select * from product", nativeQuery = true)
    // List<Product> findBySellerID(Long sid);
}