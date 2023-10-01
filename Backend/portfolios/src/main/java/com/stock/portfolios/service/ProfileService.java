package com.stock.portfolios.service;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.stock.portfolios.model.user_profile;
import com.stock.portfolios.repository.DividendRepository;
import com.stock.portfolios.repository.ProfileRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.web.JsonPath;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
public class ProfileService {


    @Autowired
    ProfileRepository profileRepository;


    public List<user_profile> fetchProfileListProcedure() {
        return profileRepository.fetchProfileListProcedure();
    }

    public Integer checkValidityProcedure(String user_email, String user_password) {
        return profileRepository.checkValidityProcedure(user_email, user_password);
    }

    public Integer checkSignupValidityProcedure(String user_email) {
        return profileRepository.checkSignupValidityProcedure(user_email);
    }

    public List<user_profile> fetchIdNameProcedure(String user_email) {
        return profileRepository.fetchIdNameProcedure(user_email);
    }

    @Scheduled(cron = "30 0 16 * * ?")
    public void updateUserReportProcedure() {
        profileRepository.updateUserReportProcedure();
    }
}
