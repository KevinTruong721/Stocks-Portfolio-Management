package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carry_over")
public class carry_over {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carry_id")
    private Long carry_id;

    @Column(name = "portfolio_id")
    private Long portfolio_id;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "start_date")
    private String start_date;

    @Column(name = "end_date")
    private String end_date;

    @Column(name = "ticker_symbol")
    private String ticker_symbol;

    public carry_over() {}

    public carry_over(Long carry_id, Long portfolio_id, Long quantity, String start_date, String end_date, String ticker_symbol) {
        this.carry_id = carry_id;
        this.portfolio_id = portfolio_id;
        this.quantity = quantity;
        this.start_date = start_date;
        this.end_date = end_date;
        this.ticker_symbol = ticker_symbol;
    }

    public Long getCarry_id() {
        return carry_id;
    }

    public void setCarry_id(Long carry_id) {
        this.carry_id = carry_id;
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

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getTicker_symbol() {
        return ticker_symbol;
    }

    public void setTicker_symbol(String ticker_symbol) {
        this.ticker_symbol = ticker_symbol;
    }
}
