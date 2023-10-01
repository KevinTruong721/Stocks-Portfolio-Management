package com.stock.portfolios.repository;

import com.stock.portfolios.model.user_report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface ReportRepository extends JpaRepository<user_report, Long> {
    @Procedure("get_weekly_report_proc")
    public List<user_report> fetchWeeklyReportProcedure(Integer user_id);

    @Procedure("get_monthly_report_proc")
    public List<user_report> fetchMonthlyReportProcedure(Integer user_id);

    @Procedure("change_report_proc")
    public void changeReportProcedure(Integer user_id, float user_money);

}
