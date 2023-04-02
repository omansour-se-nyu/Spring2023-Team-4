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
    private Long buyerId;
    private Long sellerId;
    private Boolean sold;
    private String mainImageUrl;

    public Product(Long id, String name, String description, Double price,
                   Long sellerId, String mainImageUrl,
                   Long buyerId, Boolean sold) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
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
                ", buyerId=" + buyerId +
                ", sellerId=" + sellerId +
                ", sold=" + sold +
                ", mainImageUrl='" + mainImageUrl + '\'' +
                '}';
    }

    public int isValid(){
        if(name.length() > 255){
            return 1;
        }
        if(price < 0 || price > 1000000){
            return 2;
        }
        if(description.length() > 255){
            return 3;
        }
        if(mainImageUrl == null){
            return 4;
        }
        return -1;
    }
}