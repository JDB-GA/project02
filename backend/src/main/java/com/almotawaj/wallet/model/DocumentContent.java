package com.almotawaj.wallet.model;

import org.springframework.core.io.Resource;

public record DocumentContent(Resource resource, String contentType) {
}
