package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dividends")
public class dividends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dividend_id")
    private Long dividend_id;

    @Column(name = "portfolio_id")
    private Long portfolio_id;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "dividend_amount")
    private float dividend_amount;

    @Column(name = "dividend_date")
    private String dividend_date;

    @Column(name = "ticker_symbol")
    private String ticker_symbol;

    public dividends() {}

    public dividends(Long dividend_id, Long portfolio_id, Long quantity, float dividend_amount, String dividend_date, String ticker_symbol) {
        this.dividend_id = dividend_id;
        this.portfolio_id = portfolio_id;
        this.quantity = quantity;
        this.dividend_amount = dividend_amount;
        this.dividend_date = dividend_date;
        this.ticker_symbol = ticker_symbol;
    }

    public Long getDividend_id() {
        return dividend_id;
    }

    public void setDividend_id(Long dividend_id) {
        this.dividend_id = dividend_id;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public float getDividend_amount() {
        return dividend_amount;
    }

    public void setDividend_amount(float dividend_amount) {
        this.dividend_amount = dividend_amount;
    }

    public String getDividend_date() {
        return dividend_date;
    }

    public void setDividend_date(String dividend_date) {
        this.dividend_date = dividend_date;
    }

    public String getTicker_symbol() {
        return ticker_symbol;
    }

    public void setTicker_symbol(String ticker_symbol) {
        this.ticker_symbol = ticker_symbol;
    }
}
