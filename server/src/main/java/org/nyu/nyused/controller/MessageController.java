package org.nyu.nyused.controller;

import org.nyu.nyused.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping
    public ResponseEntity sendMessage(@RequestParam("sender-id") Long senderId, @RequestParam("receiver-id") Long receiverId, @RequestParam("product-id") Long productId, @RequestParam("content") String content) {
        return ResponseEntity.ok(messageService.saveMessage(senderId, receiverId, productId, content));
    }

    @GetMapping("/{id}")
    public ResponseEntity getMessagesByProductId(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getMessagesByProductId(id));
    }

}
