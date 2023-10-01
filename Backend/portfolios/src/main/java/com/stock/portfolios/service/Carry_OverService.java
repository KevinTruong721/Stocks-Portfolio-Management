package com.stock.portfolios.service;

import com.stock.portfolios.repository.Carry_OverRepository;
import com.stock.portfolios.repository.Transaction_historyRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;

@Service
public class Carry_OverService {

    @Autowired
    Carry_OverRepository carryOverRepository;

    @Autowired
    Transaction_historyRepository transactionHistoryRepository;

    public void addCarryOverProcedure(Integer portfolio_id, Integer quantity, String start_date, String end_date, String ticker_symbol) {
        carryOverRepository.addCarryOverProcedure(portfolio_id, quantity, start_date, end_date, ticker_symbol);
    }

    public void deletePortfolioCarryOverProcedure(Integer portfolio_id) {
        carryOverRepository.deletePortfolioCarryOverProcedure(portfolio_id);
    }

    @Scheduled(cron = "0 0 16 * * ?")
    @Transactional
    public void scheduler() throws InterruptedException, SQLException, IOException {

        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        String dburl = "jdbc:mysql://localhost:3306/stock_portfolio";
        String user = "root";
        String password = "comp4990dbproject!";

        java.sql.Connection con = DriverManager.getConnection(dburl, user, password);

        java.sql.Statement stat = con.createStatement();

        String searchQuery = "SELECT c.portfolio_id, c.carry_id, c.quantity, c.ticker_symbol, c.start_date, p.portfolio_money, p.currency_type FROM user_portfolio p, carry_over c WHERE p.portfolio_id = c.portfolio_id AND curdate() = c.start_date";
        java.sql.ResultSet rs = stat.executeQuery(searchQuery);

        while(rs.next()) {
            Integer quantity = rs.getInt("quantity");
            Integer portfolioId = rs.getInt("portfolio_id");
            Integer carryId = rs.getInt("carry_id");
            String symbol = rs.getString("ticker_symbol");
            String currencyType = rs.getString("currency_type");
            String startDate = rs.getString("start_date");
            String key = "b032000ef0mshd7a8d8f9d3cead0p1ba251jsncfbdc7446d68";

            double portfolioMoney = rs.getDouble("portfolio_money");

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US%7CNA&symbols=" + symbol))
                    .header("X-RapidAPI-Key", key)
                    .header("X-RapidAPI-Host", "yh-finance.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray result = json.getJSONObject("quoteResponse").getJSONArray("result");
            JSONObject result1 = result.getJSONObject(0);
            String stockCurrency = result1.getString("currency");
            double stockPrice = result1.getDouble("regularMarketPrice");

            if ((currencyType.equals("CAD")) && (stockCurrency.equals("USD"))) {
                HttpRequest request1 = HttpRequest.newBuilder()
                        .uri(URI.create("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=CAD&amount=1"))
                        .header("X-RapidAPI-Key", key)
                        .header("X-RapidAPI-Host", "currency-conversion-and-exchange-rates.p.rapidapi.com")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();
                HttpResponse<String> response1 = HttpClient.newHttpClient().send(request1, HttpResponse.BodyHandlers.ofString());

                JSONObject json1 = new JSONObject(response1.body());
                JSONObject info1 = json1.getJSONObject("info");
                double rate1 = info1.getDouble("rate");
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice*rate1) + commission) * 100) / 100D;

                if (portfolioMoney >= totalPrice) {
                    double newPortfolioAmount = Math.round((portfolioMoney - totalPrice) * 100) / 100D;
                    carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                    String type1 = "CARRY OVER (BUY)";
                    Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                    Integer nextVal = currentVal + 1;

                    transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                    transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);
                }

                else {
                    carryOverRepository.deleteCarryOverProcedure(carryId);
                }

            }

            else if ((currencyType.equals("USD")) && (stockCurrency.equals("CAD"))) {
                HttpRequest request1 = HttpRequest.newBuilder()
                        .uri(URI.create("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=CAD&amount=1"))
                        .header("X-RapidAPI-Key", key)
                        .header("X-RapidAPI-Host", "currency-conversion-and-exchange-rates.p.rapidapi.com")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();
                HttpResponse<String> response1 = HttpClient.newHttpClient().send(request1, HttpResponse.BodyHandlers.ofString());

                JSONObject json1 = new JSONObject(response1.body());
                JSONObject info1 = json1.getJSONObject("info");
                double rate1 = info1.getDouble("rate");
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice*rate1) + commission) * 100) / 100D;

                if (portfolioMoney >= totalPrice) {
                    double newPortfolioAmount = Math.round((portfolioMoney - totalPrice) * 100) / 100D;
                    carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                    String type1 = "CARRY OVER (BUY)";
                    Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                    Integer nextVal = currentVal + 1;

                    transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                    transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);
                }

                else {
                    carryOverRepository.deleteCarryOverProcedure(carryId);
                }
            }

            else {
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice)+commission) * 100) / 100D;

                if (portfolioMoney >= totalPrice) {
                    double newPortfolioAmount = Math.round((portfolioMoney - totalPrice) * 100) / 100D;
                    carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                    String type1 = "CARRY OVER (BUY)";
                    Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                    Integer nextVal = currentVal + 1;

                    transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                    transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);
                }

                else {
                    carryOverRepository.deleteCarryOverProcedure(carryId);
                }
            }

        }



        String searchQuery1 = "SELECT c.portfolio_id, c.carry_id, c.quantity, c.ticker_symbol, c.start_date, p.portfolio_money, p.currency_type FROM user_portfolio p, carry_over c WHERE p.portfolio_id = c.portfolio_id AND curdate() = c.end_date";
        java.sql.ResultSet rs1 = stat.executeQuery(searchQuery1);

        while(rs1.next()) {
            Integer quantity = rs1.getInt("quantity");
            Integer portfolioId = rs1.getInt("portfolio_id");
            Integer carryId = rs1.getInt("carry_id");
            String symbol = rs1.getString("ticker_symbol");
            String currencyType = rs1.getString("currency_type");
            String startDate = rs1.getString("start_date");
            String key = "b032000ef0mshd7a8d8f9d3cead0p1ba251jsncfbdc7446d68";

            double portfolioMoney = rs1.getDouble("portfolio_money");

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US%7CNA&symbols=" + symbol))
                    .header("X-RapidAPI-Key", key)
                    .header("X-RapidAPI-Host", "yh-finance.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray result = json.getJSONObject("quoteResponse").getJSONArray("result");
            JSONObject result1 = result.getJSONObject(0);
            String stockCurrency = result1.getString("currency");
            double stockPrice = result1.getDouble("regularMarketPrice");

            if ((currencyType.equals("CAD")) && (stockCurrency.equals("USD"))) {
                HttpRequest request1 = HttpRequest.newBuilder()
                        .uri(URI.create("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=CAD&amount=1"))
                        .header("X-RapidAPI-Key", key)
                        .header("X-RapidAPI-Host", "currency-conversion-and-exchange-rates.p.rapidapi.com")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();
                HttpResponse<String> response1 = HttpClient.newHttpClient().send(request1, HttpResponse.BodyHandlers.ofString());

                JSONObject json1 = new JSONObject(response1.body());
                JSONObject info1 = json1.getJSONObject("info");
                double rate1 = info1.getDouble("rate");
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice*rate1)-commission) * 100) / 100D;

                double newPortfolioAmount = Math.round((portfolioMoney + totalPrice) * 100) / 100D;
                carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                String type1 = "CARRY OVER (SELL)";
                Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                Integer nextVal = currentVal + 1;

                transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);

                carryOverRepository.deleteCarryOverProcedure(carryId);
            }

            else if ((currencyType.equals("USD")) && (stockCurrency.equals("CAD"))) {
                HttpRequest request1 = HttpRequest.newBuilder()
                        .uri(URI.create("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=CAD&amount=1"))
                        .header("X-RapidAPI-Key", key)
                        .header("X-RapidAPI-Host", "currency-conversion-and-exchange-rates.p.rapidapi.com")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();
                HttpResponse<String> response1 = HttpClient.newHttpClient().send(request1, HttpResponse.BodyHandlers.ofString());

                JSONObject json1 = new JSONObject(response1.body());
                JSONObject info1 = json1.getJSONObject("info");
                double rate1 = info1.getDouble("rate");
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice*rate1)-commission) * 100) / 100D;

                double newPortfolioAmount = Math.round((portfolioMoney + totalPrice) * 100) / 100D;
                carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                String type1 = "CARRY OVER (SELL)";
                Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                Integer nextVal = currentVal + 1;

                transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);

                carryOverRepository.deleteCarryOverProcedure(carryId);

            }

            else {
                double commission = 9.99;
                double totalPrice = Math.round(((quantity*stockPrice) - commission) * 100) / 100D;
                double newPortfolioAmount = Math.round((portfolioMoney + totalPrice) * 100) / 100D;
                carryOverRepository.updatePortfolioCarryProcedure(portfolioId, newPortfolioAmount);

                String type1 = "CARRY OVER (SELL)";
                Integer currentVal = transactionHistoryRepository.getTransactionSeqProcedure();
                Integer nextVal = currentVal + 1;

                transactionHistoryRepository.addTransactionHistoryProcedure(portfolioId, currentVal, type1, quantity, stockPrice, startDate, symbol);
                transactionHistoryRepository.updateTransactionSeqProcedure(nextVal);

                carryOverRepository.deleteCarryOverProcedure(carryId);
            }

        }



    }
}
