package com.almotawaj.wallet.service;

import com.almotawaj.wallet.config.constants.KycConstants;
import com.almotawaj.wallet.model.FileType;
import com.almotawaj.wallet.model.KycApplication;
import com.almotawaj.wallet.model.KycDocument;
import com.almotawaj.wallet.model.KycDocumentType;
import com.almotawaj.wallet.model.User;
import com.almotawaj.wallet.model.request.KycSubmitRequest;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class KycApplicationFactory {
    private final FileTypeDetector fileTypeDetector;
    private final FileStorageService fileStorageService;

    public KycApplication create(User user, KycSubmitRequest request) {
        FileType cprType = fileTypeDetector.detect(request.cprFile(), KycConstants.IDENTITY_FILE_TYPES);
        FileType passportType = fileTypeDetector.detect(request.passportFile(), KycConstants.IDENTITY_FILE_TYPES);
        FileType photoType = fileTypeDetector.detect(request.photo(), KycConstants.PHOTO_FILE_TYPES);

        KycApplication application = createApplication(user, request);

        application.addDocument(document(KycDocumentType.CPR, request.cprFile(), cprType, request.cprExpiryDate()));
        application.addDocument(document(KycDocumentType.PASSPORT, request.passportFile(), passportType, request.passportExpiryDate()));
        application.addDocument(document(KycDocumentType.PHOTO, request.photo(), photoType, null));
        return application;
    }

    private static @NonNull KycApplication createApplication(User user, KycSubmitRequest request) {
        KycApplication application = new KycApplication();
        application.setUser(user);
        application.setFullName(request.fullName().strip());
        application.setCprNumber(request.cprNumber());
        application.setDateOfBirth(request.dateOfBirth());
        application.setNationality(request.nationality());
        application.setBlock(request.block());
        application.setRoad(request.road());
        application.setBuilding(request.building());
        application.setFlat(request.flat() == null || request.flat().isBlank() ? null : request.flat());
        application.setArea(request.area().strip());
        return application;
    }

    private KycDocument document(KycDocumentType type, MultipartFile file, FileType fileType, LocalDate expiryDate) {
        KycDocument document = new KycDocument();
        document.setType(type);
        document.setExpiryDate(expiryDate);
        document.setStorageKey(fileStorageService.store(file, fileType));
        document.setContentType(fileType.getContentType());
        document.setSizeBytes(file.getSize());
        return document;
    }
}
