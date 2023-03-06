package org.nyu.nyused.repository;

import org.nyu.nyused.entity.Product;
import org.nyu.nyused.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}