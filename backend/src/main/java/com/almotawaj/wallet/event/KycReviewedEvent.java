package com.almotawaj.wallet.event;

import com.almotawaj.wallet.model.KycApplicationStatus;

import java.util.UUID;

public record KycReviewedEvent(UUID userId, String email, KycApplicationStatus status, String reason) {
}
