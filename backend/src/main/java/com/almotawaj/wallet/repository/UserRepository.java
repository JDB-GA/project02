package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmailAddress(String emailAddress);

    boolean existsByMobileNumber(String mobileNumber);

    Optional<User> findByEmailAddress(String emailAddress);

    Optional<User> findByMobileNumber(String mobileNumber);
}
