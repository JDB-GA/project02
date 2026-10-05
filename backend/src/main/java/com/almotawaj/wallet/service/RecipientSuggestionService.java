package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.ErrorMessages;
import com.almotawaj.wallet.config.constants.ValidationPatterns;
import com.almotawaj.wallet.config.constants.WalletConstants;
import com.almotawaj.wallet.exception.InformationNotFoundException;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.Wallet;
import com.almotawaj.wallet.model.response.RecipientSuggestionResponse;
import com.almotawaj.wallet.repository.UserRepository;
import com.almotawaj.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecipientSuggestionService {
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final WalletAccessPolicy accessPolicy;
    private final WalletHolderNames holderNames;

    @Transactional(readOnly = true)
    public List<RecipientSuggestionResponse> suggest(UUID senderId, String query) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new InformationNotFoundException(ErrorMessages.USER_NOT_FOUND));
        accessPolicy.ensureCanUseWallet(sender);
        String prefix = query.trim().toLowerCase(Locale.ROOT);
        if (prefix.length() < WalletConstants.SUGGESTION_MIN_QUERY) {
            return List.of();
        }
        String likePrefix = escapeLike(prefix) + WalletConstants.LIKE_SUFFIX;
        String mobilePrefix = escapeLike(ValidationPatterns.MOBILE_COUNTRY_CODE + prefix) + WalletConstants.LIKE_SUFFIX;
        return walletRepository.findRecipientSuggestions(senderId, likePrefix, mobilePrefix,
                        PageRequest.of(0, WalletConstants.SUGGESTION_LIMIT))
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private RecipientSuggestionResponse toResponse(Wallet wallet) {
        User user = wallet.getUser();
        return new RecipientSuggestionResponse(wallet.getIban(), holderNames.maskedName(user), holderNames.maskedEmail(user),
                maskMobile(user.getMobileNumber()), user.getRole());
    }

    private static String maskMobile(String mobile) {
        int visible = Math.min(WalletConstants.MOBILE_VISIBLE_DIGITS, mobile.length());
        return "*".repeat(mobile.length() - visible) + mobile.substring(mobile.length() - visible);
    }

    private static String escapeLike(String value) {
        return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }
}
