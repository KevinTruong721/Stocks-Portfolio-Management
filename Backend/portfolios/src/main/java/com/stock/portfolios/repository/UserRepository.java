package com.stock.portfolios.repository;

import com.stock.portfolios.model.user_profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<user_profile, Long> {
}
