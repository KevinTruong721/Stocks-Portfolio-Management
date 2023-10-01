package com.stock.portfolios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_report")
public class user_report {


    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "user_money")
    private float user_money;

    @Id
    @Column(name = "report_date")
    private String report_date;

    public user_report() {};

    public user_report(Long user_id, float user_money, String report_date) {
        this.user_id = user_id;
        this.user_money = user_money;
        this.report_date = report_date;
    }



    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public float getUser_money() {
        return user_money;
    }

    public void setUser_money(float user_money) {
        this.user_money = user_money;
    }

    public String getReport_date() {
        return report_date;
    }

    public void setReport_date(String report_date) {
        this.report_date = report_date;
    }

}
