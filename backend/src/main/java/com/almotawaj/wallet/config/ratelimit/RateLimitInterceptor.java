package com.almotawaj.wallet.config.ratelimit;

import com.almotawaj.wallet.config.constants.RateLimitConstants;
import com.almotawaj.wallet.exception.RateLimitExceededException;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    private final Cache<String, Bucket> buckets = Caffeine.newBuilder()
            .expireAfterAccess(RateLimitConstants.BUCKET_EXPIRY)
            .maximumSize(RateLimitConstants.MAX_TRACKED_CLIENTS)
            .build();

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        String key = request.getRequestURI() + RateLimitConstants.KEY_SEPARATOR + request.getRemoteAddr();
        ConsumptionProbe probe = buckets.get(key, ignored -> newBucket()).tryConsumeAndReturnRemaining(1);

        if (!probe.isConsumed()) {
            throw new RateLimitExceededException(Duration.ofNanos(probe.getNanosToWaitForRefill()));
        }
        return true;
    }

    private Bucket newBucket() {
        return Bucket.builder()
                .addLimit(limit -> limit
                        .capacity(RateLimitConstants.CAPACITY)
                        .refillIntervally(RateLimitConstants.CAPACITY, RateLimitConstants.WINDOW))
                .build();
    }
}
