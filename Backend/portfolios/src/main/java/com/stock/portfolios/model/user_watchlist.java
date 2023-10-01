package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_watchlist")
public class user_watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="watchlist_id")
    private Long watchlist_id;

    @Column(name="user_id")
    private Long user_id;

    @Column(name="ticker_symbol")
    private String ticker_symbol;


    public user_watchlist() {}

    public user_watchlist(Long watchlist_id, Long user_id, String ticker_symbol) {
        this.watchlist_id = watchlist_id;
        this.user_id = user_id;
        this.ticker_symbol = ticker_symbol;
    }

    public Long getWatchlist_id() {
        return watchlist_id;
    }

    public void setWatchlist_id(Long watchlist_id) {
        this.watchlist_id = watchlist_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getTicker_symbol() {
        return ticker_symbol;
    }

    public void setTicker_symbol(String ticker_symbol) {
        this.ticker_symbol = ticker_symbol;
    }
}
