package com.stock.portfolios.repository;

import com.stock.portfolios.model.dividends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface DividendRepository extends JpaRepository<dividends, Long> {
    @Procedure("update_portfolio_dividends_proc")
    public void updatePortfolioDividendsProcedure();

    @Procedure("update_dividends_date_proc")
    public void updateDividendsDateProcedure();

    @Procedure("delete_dividend_proc")
    public void deleteDividendProcedure(Integer portfolio_id, String ticker_symbol);

    @Procedure("update_dividend_quantity_proc")
    public void updateDividendQuantityProcedure(Integer portfolio_id, Integer quantity, String ticker_symbol);

    @Procedure("update_dividends_info_proc")
    public void updateDividendInfoProcedure(Integer portfolio_id, String ticker_symbol, String dividend_date, double dividend_amount);

    @Procedure("delete_portfolio_dividends_proc")
    public void deletePortfolioDividendsProcedure(Integer portfolio_id);
}
