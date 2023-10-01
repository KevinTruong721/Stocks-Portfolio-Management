package com.stock.portfolios.service;

import com.stock.portfolios.model.current_holdings;
import com.stock.portfolios.repository.Current_holdingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Current_HoldingsService {

    @Autowired
    Current_holdingsRepository currentHoldingsRepository;

    public List<current_holdings> fetchCurrentHoldingsProcedure(Integer portfolio_id) {
        return currentHoldingsRepository.fetchCurrentHoldingsProcedure(portfolio_id);
    }

    public List<current_holdings> fetchCurrentStockProcedure(Integer portfolio_id, String ticker_symbol) {
        return currentHoldingsRepository.fetchCurrentStockProcedure(portfolio_id, ticker_symbol);
    }

    public void updateCurrentHoldingsProcedure(Integer portfolio_id, float total_book_value, float total_current_value, Integer quantity, String ticker_symbol) {
        currentHoldingsRepository.updateCurrentHoldingsProcedure(portfolio_id, total_book_value, total_current_value, quantity, ticker_symbol);
    }

    public void deleteCurrentHoldingsRowProcedure(Integer portfolio_id, String ticker_symbol) {
        currentHoldingsRepository.deleteCurrentHoldingsRowProcedure(portfolio_id, ticker_symbol);
    }

    public void deletePortfolioHoldingsProcedure(Integer portfolio_id) {
        currentHoldingsRepository.deletePortfolioHoldingsProcedure(portfolio_id);
    }
}
