package com.stock.portfolios.service;

import com.stock.portfolios.model.user_portfolio;
import com.stock.portfolios.model.user_watchlist;
import com.stock.portfolios.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioListService {

    @Autowired
    PortfolioRepository portfolioRepository;

    @Autowired
    PortfolioReportRepository portfolioReportRepository;



    public List<user_portfolio> fetchPortfolioListProcedure(Integer user_id) {
        return portfolioRepository.fetchPortfolioListProcedure(user_id);
    }

    public void updatePortfolioProcedure(Integer portfolio_id, float portfolio_money) {
        portfolioRepository.updatePortfolioProcedure(portfolio_id, portfolio_money);
    }

    public Integer checkPortfolioValidityProcedure(Integer user_id, String portfolio_name) {
        return portfolioRepository.checkPortfolioValidityProcedure(user_id, portfolio_name);
    }

    public List<user_portfolio> fetchPortfolioInfoProcedure(Integer portfolio_id) {
        return portfolioRepository.fetchPortfolioInfoProcedure(portfolio_id);
    }

    public float fetchPortfolioAmountProcedure(Integer portfolio_id) {
        return portfolioRepository.fetchPortfolioAmountProcedure(portfolio_id);
    }

    public void deletePortfolioRowProcedure(Integer portfolio_id) {
        portfolioRepository.deletePortfolioRowProcedure(portfolio_id);
    }

    public Integer checkHoldingsExistProcedure(Integer portfolio_id) {
        return portfolioRepository.checkHoldingsExistProcedure(portfolio_id);
    }

    @Scheduled(cron = "30 0 16 * * ?")
    public void updatePortfolioReportProcedure() {
        portfolioReportRepository.updatePortfolioReportProcedure();
    }
}
