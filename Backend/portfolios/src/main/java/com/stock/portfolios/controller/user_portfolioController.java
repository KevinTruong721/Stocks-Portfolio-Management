package com.stock.portfolios.controller;

import com.stock.portfolios.model.*;
import com.stock.portfolios.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class user_portfolioController {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private DividendRepository dividendRepository;

    @Autowired
    private Carry_OverRepository carryOverRepository;

    @Autowired
    PortfolioReportRepository portfolioReportRepository;

    @Autowired
    Current_holdingsRepository currentHoldingsRepository;

    @Autowired
    Transaction_historyRepository transactionHistoryRepository;



    @PostMapping("/addDividend")
    dividends newDividend(@RequestBody dividends newDividend) {
        return dividendRepository.save(newDividend);
    }

    @RequestMapping("/deleteDividend")
    public void deleteDividendProcedure(@RequestParam Integer portfolio_id, @RequestParam String ticker_symbol) {
        dividendRepository.deleteDividendProcedure(portfolio_id, ticker_symbol);
    }

    @RequestMapping("/updateDividendQuantity")
    public void deleteDividendQuantityProcedure(@RequestParam Integer portfolio_id, @RequestParam Integer quantity, @RequestParam String ticker_symbol) {
        dividendRepository.updateDividendQuantityProcedure(portfolio_id, quantity, ticker_symbol);
    }

    @PostMapping("/createPortfolio")
    user_portfolio newUser_portfolio(@RequestBody user_portfolio newUser_portfolio) {
        return portfolioRepository.save(newUser_portfolio);
    }


    @RequestMapping("/updatePortfolio")
    public void updatePortfolioProcedure(@RequestParam Integer portfolio_id, @RequestParam float portfolio_money) {
        portfolioRepository.updatePortfolioProcedure(portfolio_id, portfolio_money);
    }

    @GetMapping("/portfolioListProcedure/{user_id}")
    @Transactional
    public List<user_portfolio> fetchPortfolioListProcedure(@PathVariable Integer user_id) {
        return portfolioRepository.fetchPortfolioListProcedure(user_id);
    }

    @GetMapping("/portfolioInfoProcedure/{portfolio_id}")
    @Transactional
    public List<user_portfolio> fetchPortfolioInfoProcedure(@PathVariable Integer portfolio_id) {
        return portfolioRepository.fetchPortfolioInfoProcedure(portfolio_id);
    }

    @GetMapping("/portfolioAmount/{portfolio_id}")
    @Transactional
    public float fetchPortfolioAmountProcedure(@PathVariable Integer portfolio_id) {
        return portfolioRepository.fetchPortfolioAmountProcedure(portfolio_id);
    }

    @RequestMapping("/addCarryOver")
    public void addCarryOverProcedure(@RequestParam Integer portfolio_id, @RequestParam Integer quantity, @RequestParam String start_date, @RequestParam String end_date, @RequestParam String ticker_symbol) {
        carryOverRepository.addCarryOverProcedure(portfolio_id, quantity, start_date, end_date, ticker_symbol);
    }

    @RequestMapping("/checkPortfolioValidity")
    @Transactional
    public Integer checkPortfolioValidityProcedure(@RequestParam Integer user_id, @RequestParam String portfolio_name) {
        return portfolioRepository.checkPortfolioValidityProcedure(user_id, portfolio_name);
    }

    @GetMapping("/weeklyPortfolioReport/{portfolio_id}")
    @Transactional
    public List<portfolio_report> fetchPortfolioWeeklyReportProcedure(@PathVariable Integer portfolio_id) {
       return portfolioReportRepository.fetchPortfolioWeeklyReportProcedure(portfolio_id);
    }

    @GetMapping("/monthlyPortfolioReport/{portfolio_id}")
    @Transactional
    public List<portfolio_report> fetchPortfolioMonthlyReportProcedure(@PathVariable Integer portfolio_id) {
        return portfolioReportRepository.fetchPortfolioMonthlyReportProcedure(portfolio_id);
    }

    @RequestMapping("/deletePortfolioRow")
    @Transactional
    public void deleteDifferentPortfolioRows(@RequestParam Integer portfolio_id) {
        portfolioRepository.deletePortfolioRowProcedure(portfolio_id);
        carryOverRepository.deletePortfolioCarryOverProcedure(portfolio_id);
        currentHoldingsRepository.deletePortfolioHoldingsProcedure(portfolio_id);
        dividendRepository.deletePortfolioDividendsProcedure(portfolio_id);
        portfolioReportRepository.deletePortfolioReportProcedure(portfolio_id);
        transactionHistoryRepository.deletePortfolioTransactionProcedure(portfolio_id);
    }


    @RequestMapping("/checkHoldingsExist")
    @Transactional
    public Integer checkHoldingsExistProcedure(Integer portfolio_id) {
        return portfolioRepository.checkHoldingsExistProcedure(portfolio_id);
    }
}
