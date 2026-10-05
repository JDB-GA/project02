package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.NotificationConstants;
import com.almotawaj.wallet.event.MoneyReceivedEvent;
import com.almotawaj.wallet.model.response.MoneyReceivedNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class NotificationListener {
    private final NotificationHub hub;

    @TransactionalEventListener
    public void onMoneyReceived(MoneyReceivedEvent event) {
        hub.send(event.recipientUserId(), NotificationConstants.MONEY_RECEIVED,
                new MoneyReceivedNotification(event.amount(), event.senderName(), event.reference()));
    }
}
