package com.stock.portfolios.service;

import com.stock.portfolios.model.user_watchlist;
import com.stock.portfolios.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    @Autowired
    WatchlistRepository watchlistRepository;

    public List<user_watchlist> fetchTickerSymbolProcedure(Integer user_id) {
        return watchlistRepository.fetchTickerSymbolProcedure(user_id);
    }

    public void deleteWatchlistRowProcedure(Integer watchlist_id, String ticker_symbol) {
        watchlistRepository.deleteWatchlistRowProcedure(watchlist_id, ticker_symbol);
    }
}
