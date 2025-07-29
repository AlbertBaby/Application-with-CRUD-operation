package com.automation.models;

import lombok.Data;

@Data
public class ApiResponse {
    private String message;
    private String token;
    private String errorMessage;
    private Boolean status;
    private String title;
}
