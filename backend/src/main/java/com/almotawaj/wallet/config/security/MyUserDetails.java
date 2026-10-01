package com.almotawaj.wallet.config.security;

import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.UserStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public record MyUserDetails(User user) implements UserDetails {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority role = new SimpleGrantedAuthority(SecurityConstants.ROLE_PREFIX + user.getRole().name());
        return user.isEmailVerified()
                ? List.of(role, new SimpleGrantedAuthority(SecurityConstants.EMAIL_VERIFIED_AUTHORITY))
                : List.of(role);
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmailAddress();
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.getStatus() != UserStatus.LOCKED;
    }

    @Override
    public boolean isEnabled() {
        return user.getStatus() != UserStatus.SUSPENDED && user.getStatus() != UserStatus.CLOSED;
    }
}
