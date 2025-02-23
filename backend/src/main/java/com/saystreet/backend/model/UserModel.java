package com.saystreet.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserModel {
    
    @Id
    private Integer id;

    private String email;

    private String password;

    private boolean status;
    
    public UserModel(Integer id, String email, String password){
        this.email = email;
        this.password = password;
    }
}
