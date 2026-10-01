package com.almotawaj.wallet.repository;

import com.almotawaj.wallet.model.OtpChallenge;
import com.almotawaj.wallet.model.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OtpChallengeRepository extends JpaRepository<OtpChallenge, UUID> {
    Optional<OtpChallenge> findFirstByUser_IdAndPurposeOrderByCreatedAtDesc(UUID userId, OtpPurpose purpose);

    void deleteByUser_IdAndPurpose(UUID userId, OtpPurpose purpose);
}
