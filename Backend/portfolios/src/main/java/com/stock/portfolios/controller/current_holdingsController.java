package com.stock.portfolios.controller;

import com.stock.portfolios.model.current_holdings;
import com.stock.portfolios.model.user_report;
import com.stock.portfolios.repository.Current_holdingsRepository;
import com.stock.portfolios.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class current_holdingsController {

    @Autowired
    Current_holdingsRepository currentHoldingsRepository;

    @Autowired
    ReportRepository reportRepository;

    @PostMapping("/createCurrentHoldings")
    current_holdings newCurrent_holdings(@RequestBody current_holdings newCurrent_holdings) {
        return currentHoldingsRepository.save(newCurrent_holdings);
    }

    @GetMapping("/getCurrentHoldings/{portfolio_id}")
    @Transactional
    public List<current_holdings> fetchCurrentHoldingsProcedure(@PathVariable Integer portfolio_id) {
        return currentHoldingsRepository.fetchCurrentHoldingsProcedure(portfolio_id);
    }


    @RequestMapping("/getCurrentStock")
    @Transactional
    public List<current_holdings> fetchCurrentStockProcedure(@RequestParam Integer portfolio_id, @RequestParam String ticker_symbol) {
        return currentHoldingsRepository.fetchCurrentStockProcedure(portfolio_id, ticker_symbol);
    }

    @RequestMapping("/updateCurrentHoldings")
    public void updateCurrentHoldingsProcedure(@RequestParam Integer portfolio_id, @RequestParam float total_book_value, @RequestParam float total_current_value, @RequestParam Integer quantity, @RequestParam String ticker_symbol) {
        currentHoldingsRepository.updateCurrentHoldingsProcedure(portfolio_id, total_book_value, total_current_value, quantity, ticker_symbol);
    }

    @RequestMapping("/deleteCurrentHoldingsRow")
    public void deleteCurrentHoldingsRowProcedure(@RequestParam Integer portfolio_id, @RequestParam String ticker_symbol) {
        currentHoldingsRepository.deleteCurrentHoldingsRowProcedure(portfolio_id, ticker_symbol);
    }


    @RequestMapping("/changeReport")
    public void changeReportProcedure(@RequestParam Integer user_id, @RequestParam float user_money) {
        reportRepository.changeReportProcedure(user_id, user_money);
    }
}
