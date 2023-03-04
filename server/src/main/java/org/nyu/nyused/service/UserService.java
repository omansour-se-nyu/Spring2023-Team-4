package org.nyu.nyused.service;

import org.nyu.nyused.entity.User;
import org.nyu.nyused.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // public User findUserByUsername(String username) {
    //     return userRepository.findById(username).orElse(null);
    // }

}
