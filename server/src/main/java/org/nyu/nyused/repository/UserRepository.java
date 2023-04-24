package org.nyu.nyused.repository;

import org.nyu.nyused.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from user where username = ?1", nativeQuery = true)
    User findByUsername(String username);

    @Query(value = "select * from user where id = ?1", nativeQuery = true)
    User findByUserId(Long id);


}