package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "current_holdings")
public class current_holdings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="holdings_id")
    private Long holdings_id;

    @Column(name="user_id")
    private Long user_id;

    @Column(name="portfolio_id")
    private Long portfolio_id;

    @Column(name="total_book_value")
    private float total_book_value;

    @Column(name = "total_current_value")
    private float total_current_value;

    @Column(name="quantity")
    private Long quantity;

    @Column(name="ticker_symbol")
    private String ticker_symbol;

    public current_holdings() {}

    public current_holdings(Long holdings_id, Long user_id, Long portfolio_id, float total_book_value, float total_current_value, Long quantity, String ticker_symbol) {
        this.holdings_id = holdings_id;
        this.user_id = user_id;
        this. portfolio_id = portfolio_id;
        this.total_book_value = total_book_value;
        this.total_current_value = total_current_value;
        this.quantity = quantity;
        this.ticker_symbol = ticker_symbol;
    }

    public Long getHoldings_id() {
        return holdings_id;
    }

    public void setHoldings_id(Long holdings_id) {
        this.holdings_id = holdings_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }

    public float getTotal_book_value() {
        return total_book_value;
    }

    public void setTotal_book_value(float total_book_value) {
        this.total_book_value = total_book_value;
    }

    public float getTotal_current_value() {
        return total_current_value;
    }

    public void setTotal_current_value(float total_current_value) {
        this.total_current_value = total_current_value;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getTicker_symbol() {
        return ticker_symbol;
    }

    public void setTicker_symbol(String ticker_symbol) {
        this.ticker_symbol = ticker_symbol;
    }
}
