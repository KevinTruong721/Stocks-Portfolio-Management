package com.stock.portfolios.repository;

import com.stock.portfolios.model.current_holdings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface Current_holdingsRepository extends JpaRepository<current_holdings, Long> {

    @Procedure("get_current_stock_proc")
    public List<current_holdings> fetchCurrentStockProcedure(Integer portfolio_id, String ticker_symbol);

    @Procedure("get_current_holdings_proc")
    public List<current_holdings> fetchCurrentHoldingsProcedure(Integer portfolio_id);

    @Procedure("update_current_holdings_proc")
    public void updateCurrentHoldingsProcedure(Integer portfolio_id, float total_book_value, float total_current_value, Integer quantity, String ticker_symbol);

    @Procedure("delete_current_holdings_row_proc")
    public void deleteCurrentHoldingsRowProcedure(Integer portfolio_id, String ticker_symbol);

    @Procedure("delete_portfolio_holdings_proc")
    public void deletePortfolioHoldingsProcedure(Integer portfolio_id);
}
