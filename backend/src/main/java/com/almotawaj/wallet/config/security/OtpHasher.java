package com.almotawaj.wallet.config.security;

import com.almotawaj.wallet.config.constants.OtpConstants;
import com.almotawaj.wallet.model.OtpPurpose;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.UUID;

@Component
public class OtpHasher {
    private final SecretKeySpec key;

    public OtpHasher(@Value(OtpConstants.SECRET_PROPERTY) String secret) {
        this.key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), OtpConstants.HMAC_ALGORITHM);
    }

    public String hash(UUID userId, OtpPurpose purpose, String code) {
        return HexFormat.of().formatHex(digest(userId, purpose, code));
    }

    public boolean matches(UUID userId, OtpPurpose purpose, String code, String expectedHash) {
        byte[] expected = HexFormat.of().parseHex(expectedHash);
        return MessageDigest.isEqual(digest(userId, purpose, code), expected);
    }

    private byte[] digest(UUID userId, OtpPurpose purpose, String code) {
        String input = String.join(OtpConstants.HASH_INPUT_SEPARATOR, userId.toString(), purpose.name(), code);
        try {
            Mac mac = Mac.getInstance(OtpConstants.HMAC_ALGORITHM);
            mac.init(key);
            return mac.doFinal(input.getBytes(StandardCharsets.UTF_8));
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException(e);
        }
    }
}
