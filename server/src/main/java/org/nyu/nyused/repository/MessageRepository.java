package org.nyu.nyused.repository;

import org.nyu.nyused.entity.Message;
import org.nyu.nyused.entity.key.MessageKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, MessageKey> {

    @Query(value = "select * from message where product_id = ?1", nativeQuery = true)
    List<Message> findByProductId(Long productId);

}
