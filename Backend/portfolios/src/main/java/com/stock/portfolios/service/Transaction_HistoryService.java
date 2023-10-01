package com.stock.portfolios.service;

import com.stock.portfolios.model.transaction_history;
import com.stock.portfolios.repository.Transaction_historyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Transaction_HistoryService {

    @Autowired
    Transaction_historyRepository transactionHistoryRepository;

    public List<transaction_history> fetchTransactionHistoryProcedure(Integer portfolio_id, String ticker_symbol) {
        return transactionHistoryRepository.fetchTransactionHistoryProcedure(portfolio_id, ticker_symbol);
    }

    public List<transaction_history> fetchPortfolioTransactionProcedure(Integer portfolio_id) {
        return transactionHistoryRepository.fetchPortfolioTransactionProcedure(portfolio_id);
    }

    public void deletePortfolioTransactionProcedure(Integer portfolio_id) {
        transactionHistoryRepository.deletePortfolioTransactionProcedure(portfolio_id);
    }

}
