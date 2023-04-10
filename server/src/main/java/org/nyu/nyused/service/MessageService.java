package org.nyu.nyused.service;

import org.nyu.nyused.entity.Message;
import org.nyu.nyused.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Comparator;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    public Message saveMessage(Long senderId, Long receiverId, Long productId, String content) {
        Message message = new Message(senderId, Calendar.getInstance().getTime(), receiverId, productId, content);
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByProductId(Long productId) {
        List<Message> messages = messageRepository.findByProductId(productId);
        messages.sort(Comparator.comparing(Message::getSendTime));
        return messages;
    }

}
