package com.stock.portfolios.controller;


import com.stock.portfolios.model.transaction_history;
import com.stock.portfolios.repository.Transaction_historyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class transaction_historyController {

    @Autowired
    Transaction_historyRepository transactionHistoryRepository;

    @PostMapping("/createTransactionHistory")
    transaction_history newTransaction_history(@RequestBody transaction_history newTransaction_history) {
        return transactionHistoryRepository.save(newTransaction_history);
    }

    @RequestMapping("/getTransactionHistory")
    @Transactional
    public List<transaction_history> fetchTransactionHistoryProcedure(@RequestParam Integer portfolio_id, @RequestParam String ticker_symbol) {
        return transactionHistoryRepository.fetchTransactionHistoryProcedure(portfolio_id, ticker_symbol);
    }

    @GetMapping("/getPortfolioTransaction/{portfolio_id}")
    @Transactional
    public List<transaction_history> fetchPortfolioTransactionProcedure(@PathVariable Integer portfolio_id) {
        return transactionHistoryRepository.fetchPortfolioTransactionProcedure(portfolio_id);
    }


}
