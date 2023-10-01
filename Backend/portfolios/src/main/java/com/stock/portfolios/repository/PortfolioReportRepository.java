package com.stock.portfolios.repository;

import com.stock.portfolios.model.portfolio_report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface PortfolioReportRepository extends JpaRepository<portfolio_report, Long> {

    @Procedure("get_weekly_portfolio_report")
    public List<portfolio_report> fetchPortfolioWeeklyReportProcedure(Integer portfolio_id);

    @Procedure("get_monthly_portfolio_report")
    public List<portfolio_report> fetchPortfolioMonthlyReportProcedure(Integer portfolio_id);

    @Procedure("update_portfolio_report_proc")
    public void updatePortfolioReportProcedure();

    @Procedure("delete_portfolio_report_proc")
    public void deletePortfolioReportProcedure(Integer portfolio_id);
}
