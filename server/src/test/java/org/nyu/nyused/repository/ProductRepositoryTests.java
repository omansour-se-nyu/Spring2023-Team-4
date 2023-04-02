package org.nyu.nyused.repository;

import org.junit.jupiter.api.Test;
import org.nyu.nyused.entity.Product;
import org.nyu.nyused.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ProductRepositoryTests {

    @Autowired
    private ProductRepository productRepository;
    @Test
    public void testSaveProduct() {
        Product product = new Product();
        product.setName("testedProduct1");
        product.setDescription("For testing use");
        product.setPrice(999.99);
        product.setSellerId(1l);
        productRepository.save(product);
    }

    @Test
    public void testFindProductById() {
        System.out.println(productRepository.findById(10l).orElse(null));
        System.out.println(productRepository.findById(1000000000l).orElse(null));
    }

    @Test
    public void testFindAllProducts() {
        List<Product> list = productRepository.findAll();
        for (Product product : list) {
            System.out.println(product);
        }
    }

}
