package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.GatewayConstants;
import com.almotawaj.wallet.config.constants.MailConstants;
import com.almotawaj.wallet.model.CheckoutSession;
import com.almotawaj.wallet.model.response.CheckoutSessionResponse;
import com.almotawaj.wallet.model.response.CheckoutViewResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Clock;

@Component
public class CheckoutSessionMapper {
    private final WalletHolderNames names;
    private final Clock clock;
    private final String appUrl;

    public CheckoutSessionMapper(WalletHolderNames names, Clock clock, @Value(MailConstants.APP_URL_PROPERTY) String appUrl) {
        this.names = names;
        this.clock = clock;
        this.appUrl = appUrl;
    }

    public CheckoutSessionResponse toResponse(CheckoutSession session) {
        return new CheckoutSessionResponse(
                session.getId(),
                session.getOrderReference(),
                session.getAmount(),
                session.getDescription(),
                session.statusAt(clock.instant()),
                session.getPayer() == null ? null : names.maskedName(session.getPayer()),
                appUrl + GatewayConstants.CHECKOUT_PAGE_PATH + session.getId(),
                session.getExpiresAt(),
                session.getPaidAt(),
                session.getRefundedAt(),
                session.getCreatedAt());
    }

    public CheckoutViewResponse toView(CheckoutSession session) {
        return new CheckoutViewResponse(
                session.getId(),
                names.fullName(session.getMerchant()),
                session.getOrderReference(),
                session.getAmount(),
                session.getDescription(),
                session.statusAt(clock.instant()),
                session.getExpiresAt());
    }
}
