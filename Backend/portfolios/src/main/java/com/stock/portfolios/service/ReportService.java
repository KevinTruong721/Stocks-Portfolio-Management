package com.stock.portfolios.service;

import com.stock.portfolios.model.portfolio_report;
import com.stock.portfolios.model.user_report;
import com.stock.portfolios.repository.PortfolioReportRepository;
import com.stock.portfolios.repository.ReportRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    PortfolioReportRepository portfolioReportRepository;

    public List<user_report> fetchWeeklyReportProcedure(Integer user_id) {
        return reportRepository.fetchWeeklyReportProcedure(user_id);
    }

    public List<user_report> fetchMonthlyReportProcedure(Integer user_id) {
        return reportRepository.fetchMonthlyReportProcedure(user_id);
    }

    public void changeReportProcedure(Integer user_id, float user_money) {
        reportRepository.changeReportProcedure(user_id, user_money);
    }

    public List<portfolio_report> fetchPortfolioWeeklyReportProcedure(Integer portfolio_id) {
        return portfolioReportRepository.fetchPortfolioWeeklyReportProcedure(portfolio_id);
    }

    public List<portfolio_report> fetchPortfolioMonthlyReportProcedure(Integer portfolio_id) {
        return portfolioReportRepository.fetchPortfolioMonthlyReportProcedure(portfolio_id);
    }

    public void deletePortfolioReportProcedure(Integer portfolio_id) {
        portfolioReportRepository.deletePortfolioReportProcedure(portfolio_id);
    }
}
