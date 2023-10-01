package com.stock.portfolios.controller;

import com.stock.portfolios.model.user_profile;
import com.stock.portfolios.model.user_report;
import com.stock.portfolios.model.user_watchlist;
import com.stock.portfolios.repository.ProfileRepository;
import com.stock.portfolios.repository.ReportRepository;
import com.stock.portfolios.repository.UserRepository;
import com.stock.portfolios.repository.WatchlistRepository;
import com.stock.portfolios.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class User_profileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    WatchlistService watchlistService;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    ProfileRepository profileRepository;


    @PostMapping("/user")
    user_profile newUser_profile(@RequestBody user_profile newUser_profile) {
        return userRepository.save(newUser_profile);
    }


    @PostMapping("/addTicker")
    user_watchlist newTicker_symbol(@RequestBody user_watchlist newTicker_symbol) {
        return watchlistRepository.save(newTicker_symbol);
    }

    @GetMapping("/symbolprocedure/{user_id}")
    @Transactional
    public List<user_watchlist> fetchTickerSymbolProcedure(@PathVariable Integer user_id) {
        return watchlistService.fetchTickerSymbolProcedure(user_id);
    }


    @GetMapping("/fetchIdAndName/{user_email}")
    @Transactional
    public List<user_profile> fetchIdNameProcedure(@PathVariable String user_email) {
        return profileRepository.fetchIdNameProcedure(user_email);
    }


    @GetMapping("/weeklyReport/{user_id}")
    @Transactional
    public List<user_report> fetchWeeklyReportProcedure(@PathVariable Integer user_id) {
        return reportRepository.fetchWeeklyReportProcedure(user_id);
    }

    @GetMapping("/monthlyReport/{user_id}")
    @Transactional
    public List<user_report> fetchMonthlyReportProcedure(@PathVariable Integer user_id) {
        return reportRepository.fetchMonthlyReportProcedure(user_id);
    }

    @GetMapping("/profileList")
    @Transactional
    public List<user_profile> fetchProfileListProcedure() {
        return profileRepository.fetchProfileListProcedure();
    }


    @RequestMapping("/checkValidity")
    @Transactional
    public Integer checkValidityProcedure(@RequestParam String user_email, @RequestParam String user_password) {
        return profileRepository.checkValidityProcedure(user_email, user_password);
    }

    @RequestMapping("/checkSignupValidity")
    @Transactional
    public Integer checkSignupValidityProcedure(@RequestParam String user_email) {
        return profileRepository.checkSignupValidityProcedure(user_email);
    }


    @RequestMapping("/deleteWatchlistRow")
    @Transactional
    public void deleteWatchlistRowProcedure(@RequestParam Integer watchlist_id, @RequestParam String ticker_symbol) {
        watchlistRepository.deleteWatchlistRowProcedure(watchlist_id, ticker_symbol);
    }



}
