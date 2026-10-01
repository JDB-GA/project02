package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.security.AuthCookieFactory;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.LoginResult;
import com.almotawaj.wallet.model.request.LoginRequest;
import com.almotawaj.wallet.model.request.RegisterRequest;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.service.UserService;
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
public class UserController {
    private final UserService userService;
    private final AuthCookieFactory authCookieFactory;

    @PostMapping(ApiPaths.REGISTER)
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request, Locale locale) {
        return withAuthCookie(ResponseEntity.status(HttpStatus.CREATED), userService.register(request, locale));
    }

    @PostMapping(ApiPaths.LOGIN)
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request, Locale locale) {
        return withAuthCookie(ResponseEntity.ok(), userService.login(request, locale));
    }

    @PostMapping(ApiPaths.LOGOUT)
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, authCookieFactory.clear().toString())
                .build();
    }

    @GetMapping(ApiPaths.ME)
    public UserResponse me(@AuthenticationPrincipal MyUserDetails userDetails) {
        return UserResponse.from(userDetails.user());
    }

    private ResponseEntity<UserResponse> withAuthCookie(ResponseEntity.BodyBuilder builder, LoginResult result) {
        return builder
                .header(HttpHeaders.SET_COOKIE, authCookieFactory.create(result.token()).toString())
                .body(result.user());
    }
}
