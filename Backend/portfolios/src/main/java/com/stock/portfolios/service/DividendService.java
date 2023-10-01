package com.stock.portfolios.service;

import com.stock.portfolios.repository.DividendRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;
import java.text.SimpleDateFormat;

@Service
public class DividendService {

    @Autowired
    DividendRepository dividendRepository;

    public void deleteDividendProcedure(Integer portfolio_id, String ticker_symbol) {
        dividendRepository.deleteDividendProcedure(portfolio_id, ticker_symbol);
    }

    public void updateDividendQuantityProcedure(Integer portfolio_id, Integer quantity, String ticker_symbol) {
        dividendRepository.updateDividendQuantityProcedure(portfolio_id, quantity, ticker_symbol);
    }

    public void deletePortfolioDividendsProcedure(Integer portfolio_id) {
        dividendRepository.deletePortfolioDividendsProcedure(portfolio_id);
    }

    @Scheduled(cron = "10 0 16 * * ?")
    public void scheduler() throws InterruptedException, SQLException, IOException {

        dividendRepository.updatePortfolioDividendsProcedure();

        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        String dburl = "jdbc:mysql://localhost:3306/stock_portfolio";
        String user = "root";
        String password = "comp4990dbproject!";

        java.sql.Connection con = DriverManager.getConnection(dburl, user, password);

        java.sql.Statement stat = con.createStatement();

        String searchQuery = "SELECT d.portfolio_id, d.ticker_symbol, p.currency_type FROM user_portfolio p, dividends d WHERE p.portfolio_id = d.portfolio_id";
        java.sql.ResultSet rs = stat.executeQuery(searchQuery);

        while(rs.next()) {
            String divSymbol = rs.getString("ticker_symbol");
            String currencyType = rs.getString("currency_type");
            Integer portfolio_id = rs.getInt("portfolio_id");
            String key = "b032000ef0mshd7a8d8f9d3cead0p1ba251jsncfbdc7446d68";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US%7CNA&symbols=" + divSymbol))
                    .header("X-RapidAPI-Key", key)
                    .header("X-RapidAPI-Host", "yh-finance.p.rapidapi.com")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());


            JSONObject json = new JSONObject(response.body());
            JSONArray result = json.getJSONObject("quoteResponse").getJSONArray("result");
            JSONObject result1 = result.getJSONObject(0);
            String stockCurrency = result1.getString("currency");


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


                String stockSymbol = result1.getString("symbol");
                Long dividendSeconds = result1.getLong("dividendDate");

                java.util.Date dividendDate = new java.util.Date((long)dividendSeconds*1000);
                SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
                String formattedDate = sdf.format(dividendDate);

                double stockDividends = result1.getDouble("dividendsPerShare");
                double divPerShare = Math.round(((stockDividends / 4) * rate1) * 100) / 100D;


                dividendRepository.updateDividendInfoProcedure(portfolio_id, stockSymbol, formattedDate, divPerShare);
            }

            else if ((currencyType.equals("USD")) && (stockCurrency.equals("CAD"))) {

                HttpRequest request2 = HttpRequest.newBuilder()
                        .uri(URI.create("https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=CAD&to=USD&amount=1"))
                        .header("X-RapidAPI-Key", key)
                        .header("X-RapidAPI-Host", "currency-conversion-and-exchange-rates.p.rapidapi.com")
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();
                HttpResponse<String> response2 = HttpClient.newHttpClient().send(request2, HttpResponse.BodyHandlers.ofString());


                JSONObject json2 = new JSONObject(response2.body());
                JSONObject info2 = json2.getJSONObject("info");
                double rate2 = info2.getDouble("rate");

                String stockSymbol = result1.getString("symbol");
                Long dividendSeconds = result1.getLong("dividendDate");

                java.util.Date dividendDate = new java.util.Date((long)dividendSeconds*1000);
                SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
                String formattedDate = sdf.format(dividendDate);

                double stockDividends = result1.getDouble("dividendsPerShare");
                double divPerShare = Math.round(((stockDividends / 4) * rate2) * 100) / 100D;

                dividendRepository.updateDividendInfoProcedure(portfolio_id, stockSymbol, formattedDate, divPerShare);
            }

            else {
                String stockSymbol = result1.getString("symbol");
                Long dividendSeconds = result1.getLong("dividendDate");

                java.util.Date dividendDate = new java.util.Date((long)dividendSeconds*1000);
                SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
                String formattedDate = sdf.format(dividendDate);

                double stockDividends = result1.getDouble("dividendsPerShare");
                double divPerShare = Math.round((stockDividends / 4) * 100) / 100D;

                dividendRepository.updateDividendInfoProcedure(portfolio_id, stockSymbol, formattedDate, divPerShare);
            }


        }

    }
}
