package com.almotawaj.wallet.model.response;

import com.almotawaj.wallet.model.UserRole;

import java.util.Map;

public record UserStatisticsResponse(long totalUsers, Map<UserRole, Long> usersByRole) {
}
