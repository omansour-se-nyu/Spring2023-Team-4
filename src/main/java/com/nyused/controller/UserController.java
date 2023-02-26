package com.nyused.controller;

import com.nyused.Entity.User;
import com.nyused.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        User userfinal = userService.createUser(username, password);
        return ResponseEntity.ok(userfinal);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        User user = userService.loginUser(username, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

