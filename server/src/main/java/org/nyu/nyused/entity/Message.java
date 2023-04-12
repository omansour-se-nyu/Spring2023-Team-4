package org.nyu.nyused.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.nyu.nyused.entity.key.MessageKey;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "message")
@Data
@IdClass(MessageKey.class)
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    private Long senderId;

    @Id
    private Date sendTime;

    private Long receiverId;

    private Long productId;

    private String content;

}
