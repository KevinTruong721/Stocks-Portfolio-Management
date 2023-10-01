package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_portfolio")
public class user_portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="portfolio_id")
    private Long portfolio_id;

    @Column(name="user_id")
    private Long user_id;

    @Column(name="portfolio_name")
    private String portfolio_name;

    @Column(name="portfolio_money")
    private float portfolio_money;

    @Column(name="currency_type")
    private String currency_type;

    public user_portfolio() {}

    public user_portfolio(Long portfolio_id, Long user_id, String portfolio_name, float portfolio_money, String currency_type) {
        this.portfolio_id = portfolio_id;
        this.user_id = user_id;
        this.portfolio_name = portfolio_name;
        this.portfolio_money = portfolio_money;
        this.currency_type = currency_type;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }


    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getPortfolio_name() {
        return portfolio_name;
    }

    public void setPortfolio_name(String portfolio_name) {
        this.portfolio_name = portfolio_name;
    }

    public float getPortfolio_money() {
        return portfolio_money;
    }

    public void setPortfolio_money(float portfolio_money) {
        this.portfolio_money = portfolio_money;
    }

    public String getCurrency_type() {
        return currency_type;
    }

    public void setCurrency_type(String currency_type) {
        this.currency_type = currency_type;
    }
}
