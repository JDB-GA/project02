package com.almotawaj.wallet.model;

import com.almotawaj.wallet.model.response.UserResponse;

public record LoginResult(String token, UserResponse user) {
}
