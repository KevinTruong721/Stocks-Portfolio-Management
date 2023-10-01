package com.stock.portfolios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
@EnableScheduling
public class PortfoliosApplication {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(PortfoliosApplication.class, args);

	}

}
