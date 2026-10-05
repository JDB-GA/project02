package com.almotawaj.wallet.model;

public record CodeEmailSection(
        String language,
        String direction,
        String heading,
        String intro,
        String expiry,
        String ignore,
        String action
) {
}
