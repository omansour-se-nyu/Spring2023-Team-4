package org.nyu.nyused.controller;

import org.nyu.nyused.entity.Product;
import org.nyu.nyused.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/post")
    public ResponseEntity postProduct(@RequestBody Product productDto) {
        Product product = productService.saveProduct(productDto);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/list")
    public ResponseEntity listProduct() {
        return ResponseEntity.ok(productService.findAllProducts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }

}