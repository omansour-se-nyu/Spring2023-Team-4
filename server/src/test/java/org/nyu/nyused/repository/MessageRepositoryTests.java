package org.nyu.nyused.repository;

import org.junit.jupiter.api.Test;
import org.nyu.nyused.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional(readOnly = true)
@Rollback
public class MessageRepositoryTests {

    @Autowired
    private MessageRepository messageRepository;

    @Test
    public void testFindByProductId() {
        Message message = new Message(1L, Calendar.getInstance().getTime(), 2L, 3L, "hi");
        messageRepository.save(message);
        List<Message> messages = messageRepository.findByProductId(3L);
        assertEquals(messages.get(0).getContent(), message.getContent());
    }

}
