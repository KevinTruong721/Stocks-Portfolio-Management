package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profile")
public class user_profile{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long user_id;

    @Column(name="user_first_Name")
    private String user_firstName;

    @Column(name="user_last_name")
    private String user_lastName;

    @Column(name="user_email")
    private String user_email;

    @Column(name="user_password")
    private String user_password;

    public user_profile() {}

    public user_profile(Long user_id, String user_firstName, String user_lastName, String user_email, String user_password) {
        this.user_id = user_id;
        this.user_firstName = user_firstName;
        this.user_lastName = user_lastName;
        this.user_email = user_email;
        this.user_password = user_password;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_firstName() {
        return user_firstName;
    }

    public void setUser_firstName(String user_firstName) {
        this.user_firstName = user_firstName;
    }

    public String getUser_lastName() {
        return user_lastName;
    }

    public void setUser_lastName(String user_lastName) {
        this.user_lastName = user_lastName;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }


}