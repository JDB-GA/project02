package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.security.JwtUtils;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.exception.InformationExistException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserStatus;
import com.almotawaj.wallet.model.request.LoginRequest;
import com.almotawaj.wallet.model.request.RegisterRequest;
import com.almotawaj.wallet.model.response.LoginResponse;
import com.almotawaj.wallet.model.response.UserResponse;
import com.almotawaj.wallet.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtUtils jwtUtils;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;

    @Test
    void register_savesNormalizedEmailAndHashedPassword() {
        when(userRepository.existsByEmailAddress("test@mail.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User saved = invocation.getArgument(0);
            saved.setId(UUID.randomUUID());
            return saved;
        });

        RegisterRequest request = new RegisterRequest(" Muntadher ", "  Test@Mail.COM ", "password123");
        UserResponse response = userService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        User saved = captor.getValue();

        assertThat(saved.getEmailAddress()).isEqualTo("test@mail.com");
        assertThat(saved.getUsername()).isEqualTo("muntadher");
        assertThat(saved.getPassword()).isEqualTo("hashed");
        assertThat(saved.getStatus()).isEqualTo(UserStatus.ACTIVE);

        assertThat(response.id()).isNotNull();
        assertThat(response.email()).isEqualTo("test@mail.com");
    }

    @Test
    void register_rejectsDuplicateEmail() {
        when(userRepository.existsByEmailAddress("test@mail.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.register(new RegisterRequest("user", "test@mail.com", "password123")))
                .isInstanceOf(InformationExistException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_rejectsDuplicateUsernameIgnoringCase() {
        when(userRepository.existsByEmailAddress("new@mail.com")).thenReturn(false);
        when(userRepository.existsByUsername("muntadher")).thenReturn(true);

        assertThatThrownBy(() -> userService.register(new RegisterRequest("MUNTADHER", "new@mail.com", "password123")))
                .isInstanceOf(InformationExistException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void login_returnsTokenForValidCredentials() {
        MyUserDetails userDetails = new MyUserDetails(new User());
        Authentication authenticated =
                UsernamePasswordAuthenticationToken.authenticated(userDetails, null, userDetails.getAuthorities());
        when(authenticationManager.authenticate(any())).thenReturn(authenticated);
        when(jwtUtils.generateToken(userDetails)).thenReturn("jwt-token");

        LoginResponse response = userService.login(new LoginRequest(" Test@Mail.com", "password123"));

        assertThat(response.token()).isEqualTo("jwt-token");

        ArgumentCaptor<Authentication> captor = ArgumentCaptor.forClass(Authentication.class);
        verify(authenticationManager).authenticate(captor.capture());
        assertThat(captor.getValue().getName()).isEqualTo("test@mail.com");
    }

    @Test
    void login_propagatesBadCredentials() {
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("bad"));

        assertThatThrownBy(() -> userService.login(new LoginRequest("test@mail.com", "wrong")))
                .isInstanceOf(BadCredentialsException.class);

        verifyNoInteractions(jwtUtils);
    }
}
