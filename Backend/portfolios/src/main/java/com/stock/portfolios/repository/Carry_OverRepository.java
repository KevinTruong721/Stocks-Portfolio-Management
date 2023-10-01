package com.stock.portfolios.repository;

import com.stock.portfolios.model.carry_over;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface Carry_OverRepository extends JpaRepository<carry_over, Long> {

    @Procedure("add_carry_over_proc")
    public void addCarryOverProcedure(Integer portfolio_id, Integer quantity, String start_date, String end_date, String ticker_symbol);

    @Procedure("update_portfolio_carry_proc")
    public void updatePortfolioCarryProcedure(Integer portfolio_id, double portfolio_money);

    @Procedure("delete_carry_over_proc")
    public void deleteCarryOverProcedure(Integer carry_id);

    @Procedure("delete_portfolio_carryover_proc")
    public void deletePortfolioCarryOverProcedure(Integer portfolio_id);

}
