package com.stock.portfolios.repository;

import com.stock.portfolios.model.transaction_history;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface Transaction_historyRepository extends JpaRepository<transaction_history, Long> {

    @Procedure("get_transaction_history_proc")
    public List<transaction_history> fetchTransactionHistoryProcedure(Integer portfolio_id, String ticker_symbol);

    @Procedure("add_transaction_history_proc")
    public void addTransactionHistoryProcedure(Integer portfolio_id, Integer transaction_id, String transaction_type, Integer quantity, double cost_per_unit, String transaction_date, String ticker_symbol);

    @Procedure("update_transactionSeq_proc")
    public void updateTransactionSeqProcedure(Integer next_value);

    @Procedure("get_transactionSeq_proc")
    public Integer getTransactionSeqProcedure();

    @Procedure("get_portfolio_transaction_proc")
    public List<transaction_history> fetchPortfolioTransactionProcedure(Integer portfolio_id);

    @Procedure("delete_portfolio_transaction_proc")
    public void deletePortfolioTransactionProcedure(Integer portfolio_id);
}
