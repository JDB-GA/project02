package com.almotawaj.wallet.controller;

import com.almotawaj.wallet.config.constants.ApiPaths;
import com.almotawaj.wallet.config.constants.SecurityConstants;
import com.almotawaj.wallet.config.security.MyUserDetails;
import com.almotawaj.wallet.model.DocumentContent;
import com.almotawaj.wallet.model.request.KycSubmitRequest;
import com.almotawaj.wallet.model.response.KycApplicationResponse;
import com.almotawaj.wallet.service.KycService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPaths.KYC)
@PreAuthorize(SecurityConstants.HAS_ROLE_CLIENT)
@RequiredArgsConstructor
public class KycController {
    private final KycService kycService;

    @GetMapping(ApiPaths.ME)
    public KycApplicationResponse getMyApplication(@AuthenticationPrincipal MyUserDetails userDetails) {
        return kycService.getLatest(userDetails.user().getId());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public KycApplicationResponse submit(@AuthenticationPrincipal MyUserDetails userDetails,
                                         @Valid @ModelAttribute KycSubmitRequest request) {
        return kycService.submit(userDetails.user().getId(), request);
    }

    @GetMapping(ApiPaths.MY_KYC_DOCUMENT)
    public ResponseEntity<Resource> downloadMyDocument(@AuthenticationPrincipal MyUserDetails userDetails,
                                                       @PathVariable UUID documentId) {
        DocumentContent content = kycService.loadDocument(userDetails.user().getId(), documentId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(content.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.inline().build().toString())
                .body(content.resource());
    }
}
