package org.nyu.nyused.service;

import org.nyu.nyused.entity.User;
import org.nyu.nyused.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public User findUserByUserID(Long id){
        return userRepository.findByUserId(id);
    }
    public List<User> findUsers(){
        return userRepository.findUsers();
    }

}