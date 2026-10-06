package com.almotawaj.wallet.config.ratelimit;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

@Component
public class WriteRateLimitInterceptor extends RateLimitInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        return HttpMethod.GET.matches(request.getMethod()) || super.preHandle(request, response, handler);
    }
}
