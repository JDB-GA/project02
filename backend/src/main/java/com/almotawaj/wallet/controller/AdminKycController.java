package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.DocumentContent;
import com.almotawaj.wallet.model.KycApplicationStatus;
import com.almotawaj.wallet.model.request.KycRejectRequest;
import com.almotawaj.wallet.model.response.KycApplicationSummaryResponse;
import com.almotawaj.wallet.model.response.KycReviewResponse;
import com.almotawaj.wallet.model.response.PageResponse;
import com.almotawaj.wallet.service.KycReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.ADMIN_KYC)
@PreAuthorize(SecurityConstants.HAS_KYC_REVIEW)
@RequiredArgsConstructor
public class AdminKycController {
    private final KycReviewService kycReviewService;

    @GetMapping
    public PageResponse<KycApplicationSummaryResponse> list(
            @RequestParam(required = false) KycApplicationStatus status,
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return kycReviewService.list(status, pageable);
    }

    @GetMapping(ApiPaths.KYC_APPLICATION)
    public KycReviewResponse get(@PathVariable UUID applicationId) {
        return kycReviewService.get(applicationId);
    }

    @GetMapping(ApiPaths.KYC_APPLICATION_DOCUMENT)
    public ResponseEntity<Resource> downloadDocument(@PathVariable UUID applicationId, @PathVariable UUID documentId) {
        DocumentContent content = kycReviewService.loadDocument(applicationId, documentId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(content.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.inline().build().toString())
                .body(content.resource());
    }

    @PostMapping(ApiPaths.KYC_APPROVE)
    public KycReviewResponse approve(@AuthenticationPrincipal MyUserDetails reviewer, @PathVariable UUID applicationId) {
        return kycReviewService.approve(applicationId, reviewer.user().getId());
    }

    @PostMapping(ApiPaths.KYC_REJECT)
    public KycReviewResponse reject(@AuthenticationPrincipal MyUserDetails reviewer, @PathVariable UUID applicationId,
                                    @Valid @RequestBody KycRejectRequest request) {
        return kycReviewService.reject(applicationId, reviewer.user().getId(), request.reason());
    }
}
