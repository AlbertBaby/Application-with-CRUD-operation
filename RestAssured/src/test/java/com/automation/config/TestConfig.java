package com.automation.config;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;
import org.testng.annotations.BeforeSuite;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class TestConfig {
    protected static RequestSpecification requestSpec;
    protected static ResponseSpecification responseSpec;
    protected static Properties props;

    @BeforeSuite
    public void setup() {
        props = loadProperties();
        configureRestAssured();
    }

    private Properties loadProperties() {
        Properties properties = new Properties();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("config.properties")) {
            if (inputStream == null) {
                throw new RuntimeException("config.properties not found in classpath");
            }
            properties.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config.properties: " + e.getMessage(), e);
        }
        return properties;
    }

    private void configureRestAssured() {
        String baseUrl = props.getProperty("base.url");
        String apiVersion = props.getProperty("api.version", "");  // default to empty string if not found
        
        if (baseUrl == null) {
            throw new RuntimeException("base.url not found in config.properties");
        }
        
        RequestSpecBuilder requestBuilder = new RequestSpecBuilder()
                .setBaseUri(baseUrl + apiVersion)
                .addHeader("Content-Type", "application/json")
                .addFilter(new RequestLoggingFilter())
                .addFilter(new ResponseLoggingFilter());

        ResponseSpecBuilder responseBuilder = new ResponseSpecBuilder();

        requestSpec = requestBuilder.build();
        responseSpec = responseBuilder.build();

        RestAssured.requestSpecification = requestSpec;
        RestAssured.responseSpecification = responseSpec;
    }
}
