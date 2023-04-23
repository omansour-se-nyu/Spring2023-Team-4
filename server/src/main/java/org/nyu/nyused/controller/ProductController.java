package org.nyu.nyused.controller;

import lombok.extern.slf4j.Slf4j;
import org.nyu.nyused.entity.Product;
import org.nyu.nyused.entity.Transaction;
import org.nyu.nyused.entity.User;
import org.nyu.nyused.service.ProductService;
import org.nyu.nyused.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
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

    @PutMapping("/buyer")
    public ResponseEntity purchaseProduct(@RequestParam("user-id")Long userId, @RequestParam("product-id") Long productId){
        Product product = productService.findProductById(productId);
        User user = userService.findUserByUserID(userId);
        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The User does not exist");}
        if(product == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The item does not sold.");}
        User seller = userService.findUserByUserID(product.getSellerId());
        // Determine if the product has been purchased
        if(product.getSold()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The item has already been sold.");}
        // Determine if the buyer is the seller
        if(user.getId().equals(product.getSellerId())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can not purchase your own item.");}
        // Determine if the user have enough balance to buy
        if(user.getBalance() < product.getPrice()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your balance is not enough.");}

        // Successful trade
        user.setBalance(user.getBalance() - product.getPrice());
        seller.setBalance(seller.getBalance()+product.getPrice());
        product.setSold(true);
        product.setBuyerId(user.getId());
        User user1 = userService.saveUser(user);
        User seller1 = userService.saveUser(seller);
        Product product1 = productService.saveProduct(product);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Transaction transaction = new Transaction();
        transaction.setPid(product1.getId());
        transaction.setTime(timestamp);
        transaction.setName(product1.getName());
        transaction.setPrice(product1.getPrice());
        transaction.setSold(true);
        transaction.setBuyerId(product1.getBuyerId());
        transaction.setSellerId(product1.getSellerId());
        productService.saveTransaction(transaction);
        log.info(product1.toString());
        log.info(user1.toString());
        log.info(seller1.toString());
        return ResponseEntity.ok("The purchase is complete");
    }

    @GetMapping("/manage/transacitons")
    public ResponseEntity getTransactions(){
        return ResponseEntity.ok(productService.getTransaction());
    }

    @GetMapping("/list/search")
    public ResponseEntity searchProduct(@RequestParam("product-name") String productName){
        if(productName.length() == 0 || productName == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter the product name");
        }
        List<Product> list= productService.findProductsByName(productName);
        return ResponseEntity.ok(list);
    }


    /*@PutMapping("/buyer")
    public ResponseEntity refundProduct(@RequestParam("user-id")Long userId, @RequestParam("product-id") Long productID){
        User buyer = userService.findUserByUserID(userId);
        Product product = productService.findProductById(productID);
        if(buyer == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The User does not exist");}
        if(product == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The item does not sold.");}
        User seller = userService.findUserByUserID(product.getSellerId());
        // Determine if the item has not yet been purchased
        if(!product.getSold()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The item has not been sold yet.");
        }
        // If the item meets all circumstances of refunding
        if(confirmingRefund()){}
        product.setBuyerId(null);
        product.setSold(false);
        return ResponseEntity.ok("The item has been returned");
    }

    @PostMapping("/seller")
    public Boolean confirmingRefund(@RequestParam("product-id") Long productId, @RequestParam("decline") Boolean decline){
        return decline;
    }*/

}