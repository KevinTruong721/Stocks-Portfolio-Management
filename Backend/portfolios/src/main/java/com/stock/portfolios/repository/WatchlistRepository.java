package com.stock.portfolios.repository;

import com.stock.portfolios.model.user_watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface WatchlistRepository extends JpaRepository<user_watchlist, Long> {
    @Procedure("get_ticker_symbol_proc")
    public List<user_watchlist> fetchTickerSymbolProcedure(Integer user_id);

    @Procedure("delete_watchlist_row_proc")
    public void deleteWatchlistRowProcedure(Integer watchlist_id, String ticker_symbol);
}
