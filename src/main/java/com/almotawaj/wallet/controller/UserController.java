package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.model.request.LoginRequest;
import com.almotawaj.wallet.model.request.RegisterRequest;
import com.almotawaj.wallet.model.response.LoginResponse;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPaths.AUTH_USERS)
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(ApiPaths.REGISTER)
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping(ApiPaths.LOGIN)
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
