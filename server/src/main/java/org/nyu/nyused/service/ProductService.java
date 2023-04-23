package org.nyu.nyused.service;

import org.nyu.nyused.entity.Product;
import org.nyu.nyused.entity.Transaction;
import org.nyu.nyused.repository.ProductRepository;
import org.nyu.nyused.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    private TransactionRepository transactionRepository;
    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product findProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> findProductsByName(String name) {
        String searchName = "%" +name+"%";
        return productRepository.findByProductName(searchName);
    }

    public List<Product> findSellerProducts(Long sid) {
        return productRepository.findBySellerID(sid);

    }

}