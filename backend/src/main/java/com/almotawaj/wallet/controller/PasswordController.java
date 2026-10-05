package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.security.AuthCookieFactory;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.LoginResult;
import com.almotawaj.wallet.model.request.ChangePasswordRequest;
import com.almotawaj.wallet.model.request.ForgotPasswordRequest;
import com.almotawaj.wallet.model.request.ResetPasswordRequest;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.service.AccountPasswordService;
import com.almotawaj.wallet.service.PasswordResetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping(ApiPaths.AUTH_USERS)
@RequiredArgsConstructor
public class PasswordController {
    private final PasswordResetService passwordResetService;
    private final AccountPasswordService accountPasswordService;
    private final AuthCookieFactory authCookieFactory;

    @PostMapping(ApiPaths.FORGOT_PASSWORD)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void forgotPassword(@Valid @RequestBody ForgotPasswordRequest request, Locale locale) {
        passwordResetService.requestReset(request.email(), locale);
    }

    @PostMapping(ApiPaths.RESET_PASSWORD)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        passwordResetService.reset(request);
    }

    @PostMapping(ApiPaths.CHANGE_PASSWORD)
    public ResponseEntity<UserResponse> changePassword(@AuthenticationPrincipal MyUserDetails userDetails,
                                                       @Valid @RequestBody ChangePasswordRequest request) {
        LoginResult result = accountPasswordService.changePassword(userDetails.user().getId(), request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authCookieFactory.create(result.token()).toString())
                .body(result.user());
    }
}
