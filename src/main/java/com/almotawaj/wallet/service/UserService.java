package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.security.JwtUtils;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.exception.InformationExistException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.request.LoginRequest;
import com.almotawaj.wallet.model.request.RegisterRequest;
import com.almotawaj.wallet.model.response.LoginResponse;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String email = normalize(request.email());
        String username = normalize(request.username());

        if (userRepository.existsByEmailAddress(email)) {
            throw new InformationExistException(ErrorMessages.EMAIL_ALREADY_REGISTERED);
        }
        if (userRepository.existsByUsername(username)) {
            throw new InformationExistException(ErrorMessages.USERNAME_ALREADY_TAKEN);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmailAddress(email);
        user.setPassword(passwordEncoder.encode(request.password()));

        return UserResponse.from(userRepository.save(user));
    }

    public LoginResponse login(LoginRequest request) {
        String email = normalize(request.email());
        Authentication authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(email, request.password()));

        if (!(authentication.getPrincipal() instanceof MyUserDetails userDetails)) {
            throw new IllegalStateException(ErrorMessages.UNEXPECTED_PRINCIPAL);
        }

        return new LoginResponse(jwtUtils.generateToken(userDetails));
    }

    private static String normalize(String value) {
        return value.trim().toLowerCase(Locale.ROOT);
    }
}
