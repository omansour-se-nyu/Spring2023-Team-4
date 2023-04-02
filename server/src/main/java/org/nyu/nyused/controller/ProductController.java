package org.nyu.nyused.controller;

import org.nyu.nyused.entity.Product;
import org.nyu.nyused.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/post")
    public ResponseEntity postProduct(@RequestBody Product productDto) {
        switch(productDto.isValid()){
            case -1:
                break;
            case 1:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product name should be less than 255 characters.");
            case 2:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product price should be between 0.00 and 100000.00.");
            case 3:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product description should be less than 255 characters.");
            case 4:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You must upload at least one image.");
        }
        Product product = productService.saveProduct(productDto);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/list")
    public ResponseEntity listProduct() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity listSellerProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findSellerProducts(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.findProductById(id);
        if (product != null) {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setDescription(updatedProduct.getDescription());
            product.setMainImageUrl(updatedProduct.getMainImageUrl());
            Product savedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        // productService.deleteProductById(id);
        // return ResponseEntity.ok(200);
        try {
            productService.deleteProductById(id);
            return ResponseEntity.ok("Product with ID " + id + " has been deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete product with ID " + id + ".");
        }
    }
}