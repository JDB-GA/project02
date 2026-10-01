package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.request.VerifyEmailRequest;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.service.EmailVerificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping(ApiPaths.AUTH_USERS)
@RequiredArgsConstructor
public class EmailVerificationController {
    private final EmailVerificationService emailVerificationService;

    @PostMapping(ApiPaths.VERIFY_EMAIL)
    public UserResponse verifyEmail(@AuthenticationPrincipal MyUserDetails userDetails,
                                    @Valid @RequestBody VerifyEmailRequest request) {
        return emailVerificationService.verify(userDetails.user().getId(), request.code());
    }

    @PostMapping(ApiPaths.RESEND_VERIFICATION)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resendVerification(@AuthenticationPrincipal MyUserDetails userDetails, Locale locale) {
        emailVerificationService.resend(userDetails.user().getId(), locale);
    }
}
