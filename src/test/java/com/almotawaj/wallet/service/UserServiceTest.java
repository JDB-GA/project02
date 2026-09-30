package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.security.JwtUtils;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.exception.InformationExistException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserRole;
import com.almotawaj.wallet.model.UserStatus;
import com.almotawaj.wallet.model.request.LoginRequest;
import com.almotawaj.wallet.model.request.RegisterRequest;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private static final String LOCAL_MOBILE = "33123456";
    private static final String MOBILE = "+97333123456";

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
    void register_savesNormalizedUserWithDefaults() {
        when(passwordEncoder.encode("password123")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserResponse response = userService.register(new RegisterRequest("  Test@Mail.COM ", " " + LOCAL_MOBILE + " ", "password123"));

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        User saved = captor.getValue();

        assertThat(saved.getEmailAddress()).isEqualTo("test@mail.com");
        assertThat(saved.getMobileNumber()).isEqualTo(MOBILE);
        assertThat(saved.getPassword()).isEqualTo("hashed");
        assertThat(saved.getRole()).isEqualTo(UserRole.CLIENT);
        assertThat(saved.getStatus()).isEqualTo(UserStatus.ACTIVE);
        assertThat(saved.isEmailVerified()).isFalse();
        assertThat(saved.isMobileVerified()).isFalse();
        assertThat(response.email()).isEqualTo("test@mail.com");
    }

    @Test
    void register_rejectsDuplicateEmail() {
        when(userRepository.existsByEmailAddress("test@mail.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.register(new RegisterRequest("test@mail.com", LOCAL_MOBILE, "password123")))
                .isInstanceOf(InformationExistException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_rejectsDuplicateMobile() {
        when(userRepository.existsByMobileNumber(MOBILE)).thenReturn(true);

        assertThatThrownBy(() -> userService.register(new RegisterRequest("new@mail.com", LOCAL_MOBILE, "password123")))
                .isInstanceOf(InformationExistException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    void login_withEmail_normalizesAndReturnsToken() {
        MyUserDetails userDetails = new MyUserDetails(new User());
        Authentication authenticated = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, userDetails.getAuthorities());
        when(authenticationManager.authenticate(any())).thenReturn(authenticated);
        when(jwtUtils.generateToken(userDetails)).thenReturn("jwt-token");

        assertThat(userService.login(new LoginRequest(" Test@Mail.com", "password123")).token()).isEqualTo("jwt-token");

        ArgumentCaptor<Authentication> captor = ArgumentCaptor.forClass(Authentication.class);
        verify(authenticationManager).authenticate(captor.capture());
        assertThat(captor.getValue().getName()).isEqualTo("test@mail.com");
    }

    @Test
    void login_withMobile_addsCountryCode() {
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("bad"));

        assertThatThrownBy(() -> userService.login(new LoginRequest(" " + LOCAL_MOBILE + " ", "wrong")))
                .isInstanceOf(BadCredentialsException.class);

        ArgumentCaptor<Authentication> captor = ArgumentCaptor.forClass(Authentication.class);
        verify(authenticationManager).authenticate(captor.capture());
        assertThat(captor.getValue().getName()).isEqualTo(MOBILE);
        verifyNoInteractions(jwtUtils);
    }
}
