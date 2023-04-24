package org.nyu.nyused.controller;

import lombok.extern.slf4j.Slf4j;
import org.nyu.nyused.entity.Product;
import org.nyu.nyused.entity.Transaction;
import org.nyu.nyused.entity.User;
import org.nyu.nyused.service.ProductService;
import org.nyu.nyused.service.TransactionService;
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
@RequestMapping("/manager")
public class ManageController {
    @Autowired
    private UserService userService;
    @Autowired
    private TransactionService transactionService;
    @GetMapping("/transactions")
    public ResponseEntity getTransactions(){
        return ResponseEntity.ok(transactionService.getTransaction());
    }
    @GetMapping("/users")
    public ResponseEntity getUsers(){
        return ResponseEntity.ok(userService.findUsers());
    }
}
