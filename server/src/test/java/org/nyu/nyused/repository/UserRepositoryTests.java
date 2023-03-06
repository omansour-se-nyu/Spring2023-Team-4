package org.nyu.nyused.repository;

import org.junit.jupiter.api.Test;
import org.nyu.nyused.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserRepositoryTests {

    @Autowired
    private UserRepository userRepository;
    @Test
    public void testSaveUser() {
        User user = new User();
        user.setUsername("TestedUser1");
        user.setPassword("12345test");
        userRepository.save(user);
    }

    @Test
    public void testFindUserByUsername() {
        User user = userRepository.findByUsername("TestedUser1");
        System.out.println(user);
    }

}
