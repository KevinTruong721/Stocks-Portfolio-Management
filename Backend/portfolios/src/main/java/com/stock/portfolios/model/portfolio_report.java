package com.stock.portfolios.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "portfolio_report")
public class portfolio_report {

    @Column(name = "portfolio_id")
    private Long portfolio_id;

    @Column(name = "portfolio_amount")
    private float portfolio_amount;

    @Id
    @Column(name = "report_date")
    private String report_date;

    public portfolio_report() {};

    public portfolio_report(Long portfolio_id, float portfolio_amount, String report_date) {
        this.portfolio_id = portfolio_id;
        this.portfolio_amount = portfolio_amount;
        this.report_date = report_date;
    }

    public Long getPortfolio_id() {
        return portfolio_id;
    }

    public void setPortfolio_id(Long portfolio_id) {
        this.portfolio_id = portfolio_id;
    }

    public float getPortfolio_amount() {
        return portfolio_amount;
    }

    public void setPortfolio_amount(float portfolio_amount) {
        this.portfolio_amount = portfolio_amount;
    }

    public String getReport_date() {
        return report_date;
    }

    public void setReport_date(String report_date) {
        this.report_date = report_date;
    }
}
