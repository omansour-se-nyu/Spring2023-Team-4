package org.nyu.nyused.repository;

import org.nyu.nyused.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from user where username = ?1", nativeQuery = true)
    User findByUsername(String username);
}