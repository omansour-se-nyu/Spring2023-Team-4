package org.nyu.nyused.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Long userId;

    private String mainImageUrl;

    public Product(Long id, String name, String description, Double price, Long userId, String mainImageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.userId = userId;
        this.mainImageUrl = mainImageUrl;
    }

    public Product() {
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", userId=" + userId +
                ", mainImageUrl='" + mainImageUrl + '\'' +
                '}';
    }
}