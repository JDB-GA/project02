package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmailAddress(String emailAddress);

    boolean existsByMobileNumber(String mobileNumber);

    Optional<User> findByEmailAddress(String emailAddress);

    Optional<User> findByMobileNumber(String mobileNumber);

    Page<User> findByRoleIn(Collection<UserRole> roles, Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select u from User u where u.id = :id")
    Optional<User> findByIdForUpdate(UUID id);
}
