package org.nyu.nyused.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long pid;
    private String name;
    private Double price;
    private Long buyerId;
    private Long sellerId;
    private Boolean sold;
    private Timestamp time;

    public Transaction(Long id, Long pid, String name,
                       Double price, Long buyerId,
                       Long sellerId, Boolean sold,
                       Timestamp time) {
        this.id = id;
        this.pid = pid;
        this.name = name;
        this.price = price;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.sold = sold;
        this.time = time;
    }
    public Transaction(){}

}
