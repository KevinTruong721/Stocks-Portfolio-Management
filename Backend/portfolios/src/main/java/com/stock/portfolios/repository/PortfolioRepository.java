package com.stock.portfolios.repository;

import com.stock.portfolios.model.user_portfolio;
import com.stock.portfolios.model.user_watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<user_portfolio, Long> {

    @Procedure("get_portfolio_list_proc")
    public List<user_portfolio> fetchPortfolioListProcedure(Integer user_id);

    @Procedure("get_portfolio_info_proc")
    public List<user_portfolio> fetchPortfolioInfoProcedure(Integer portfolio_id);

    @Procedure("update_portfolio_proc")
    public void updatePortfolioProcedure(Integer portfolio_id, float portfolio_money);

    @Procedure("portfolio_validity_proc")
    public Integer checkPortfolioValidityProcedure(Integer user_id, String portfolio_name);

    @Procedure("get_portfolio_amount_proc")
    public float fetchPortfolioAmountProcedure(Integer portfolio_id);

    @Procedure("delete_portfolio_row_proc")
    public void deletePortfolioRowProcedure(Integer portfolio_id);

    @Procedure("check_portfolio_holdings_exist_proc")
    public Integer checkHoldingsExistProcedure(Integer portfolio_id);

}
