package com.almotawaj.wallet.config.security;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailAddress(email)
                .map(MyUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorMessages.USER_NOT_FOUND));
    }
}
