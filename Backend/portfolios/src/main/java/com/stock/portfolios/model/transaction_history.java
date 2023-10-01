package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "transaction_history")
public class transaction_history {

    @TableGenerator(name = "transactionSeq", allocationSize = 1, initialValue = 0)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "transactionSeq")
    @Column(name = "transaction_id")
    private Long transaction_id;

    @Column(name= "portfolio_id")
    private Long portfolio_id;

    @Column(name= "transaction_type")
    private String transaction_type;

    @Column(name= "quantity")
    private Long quantity;

    @Column(name= "cost_per_unit")
    private float cost_per_unit;

    @Column(name= "transaction_date")
    private String transaction_date;

    @Column(name= "ticker_symbol")
    private String ticker_symbol;

    public transaction_history() {}

    public transaction_history(Long transaction_id, Long portfolio_id, String transaction_type, Long quantity, float cost_per_unit, String transaction_date, String ticker_symbol) {
        this.transaction_id = transaction_id;
        this.portfolio_id = portfolio_id;
        this.transaction_type = transaction_type;
        this.quantity = quantity;
        this.cost_per_unit = cost_per_unit;
        this.transaction_date = transaction_date;
        this.ticker_symbol = ticker_symbol;
    }

    public Long getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(Long transaction_id) {
        this.transaction_id = transaction_id;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }

    public String getTransaction_type() {
        return transaction_type;
    }

    public void setTransaction_type(String transaction_type) {
        this.transaction_type = transaction_type;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public float getCost_per_unit() {
        return cost_per_unit;
    }

    public void setCost_per_unit(float cost_per_unit) {
        this.cost_per_unit = cost_per_unit;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getTicker_symbol() {
        return ticker_symbol;
    }

    public void setTicker_symbol(String ticker_symbol) {
        this.ticker_symbol = ticker_symbol;
    }
}
