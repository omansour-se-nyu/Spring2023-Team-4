package org.nyu.nyused.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    private String username;

    private String password;
}
