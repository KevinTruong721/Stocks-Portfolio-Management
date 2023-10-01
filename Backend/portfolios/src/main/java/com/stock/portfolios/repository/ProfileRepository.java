package com.stock.portfolios.repository;


import com.stock.portfolios.model.user_profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface ProfileRepository extends JpaRepository<user_profile, Long> {

    @Procedure("get_profile_list_proc")
    public List<user_profile> fetchProfileListProcedure();

    @Procedure("login_validity_proc")
    public Integer checkValidityProcedure(String user_email, String user_password);

    @Procedure("signup_validity_proc")
    public Integer checkSignupValidityProcedure(String user_email);

    @Procedure("update_user_report_proc")
    public void updateUserReportProcedure();

    @Procedure("get_id_name_proc")
    public List<user_profile> fetchIdNameProcedure(String user_email);

}
