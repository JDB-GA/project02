package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.LocaleConstants;
import com.almotawaj.wallet.config.constants.LogMessages;
import com.almotawaj.wallet.config.constants.MailConstants;
import com.almotawaj.wallet.config.constants.OtpConstants;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.ITemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Locale;
import java.util.UUID;

@Slf4j
@Service
public class EmailService {
    private final Resend resend;
    private final MessageSource messageSource;
    private final ITemplateEngine templateEngine;
    private final String fromAddress;
    private final String logoUrl;

    public EmailService(Resend resend, MessageSource messageSource, ITemplateEngine templateEngine,
                        @Value(MailConstants.FROM_PROPERTY) String fromAddress,
                        @Value(MailConstants.LOGO_URL_PROPERTY) String logoUrl) {
        this.resend = resend;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
        this.fromAddress = fromAddress;
        this.logoUrl = logoUrl;
    }

    @Async
    public void sendVerificationCode(UUID userId, String to, String code, Locale locale) {
        try {
            resend.emails().send(CreateEmailOptions.builder()
                    .from(fromAddress)
                    .to(to)
                    .subject(messageSource.getMessage(MailConstants.VERIFICATION_SUBJECT_KEY, null, locale))
                    .text(renderPlainText(code, locale))
                    .html(renderHtml(code, locale))
                    .build());
        } catch (ResendException e) {
            log.error(LogMessages.EMAIL_SEND_FAILED, userId, e);
        }
    }

    private String renderPlainText(String code, Locale locale) {
        return messageSource.getMessage(MailConstants.VERIFICATION_BODY_KEY,
                new Object[]{code, OtpConstants.EXPIRY.toMinutes()}, locale);
    }

    private String renderHtml(String code, Locale locale) {
        Context context = new Context(locale);
        context.setVariable(MailConstants.CODE_VARIABLE, code);
        context.setVariable(MailConstants.EXPIRY_MINUTES_VARIABLE, OtpConstants.EXPIRY.toMinutes());
        context.setVariable(MailConstants.LOGO_URL_VARIABLE, logoUrl);
        context.setVariable(MailConstants.DIRECTION_VARIABLE, isRightToLeft(locale)
                ? MailConstants.DIRECTION_RTL : MailConstants.DIRECTION_LTR);
        return templateEngine.process(MailConstants.VERIFICATION_TEMPLATE, context);
    }

    private static boolean isRightToLeft(Locale locale) {
        return LocaleConstants.ARABIC.getLanguage().equals(locale.getLanguage());
    }
}
