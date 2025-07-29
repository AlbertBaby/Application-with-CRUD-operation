package com.automation.tests;

import com.automation.config.TestConfig;
import com.automation.models.User;
import com.automation.models.ApiResponse;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;

@Feature("User API Tests")
public class UserApiTest extends TestConfig {

    @Test
    @Description("Test user registration with new username")
    public void testUserRegistration() {
        User user = new User();
        user.setUsername("testuser" + System.currentTimeMillis());
        user.setPassword("password123");

        Response response = given()
                .contentType(ContentType.JSON)
                .body(user)
                .when()
                .post("/register")
                .then()
                .statusCode(200)
                .extract().response();

        ApiResponse apiResponse = response.as(ApiResponse.class);
        assertTrue(apiResponse.getStatus(), "Registration should be successful");
        assertEquals(apiResponse.getTitle(), "Registered Successfully.");
    }

    @Test
    @Description("Test successful user login")
    public void testUserLogin() {
        // First register a user
        String username = "testuser" + System.currentTimeMillis();
        String password = "password123";
        
        User registerUser = new User();
        registerUser.setUsername(username);
        registerUser.setPassword(password);

        // Register first
        given()
                .contentType(ContentType.JSON)
                .body(registerUser)
                .when()
                .post("/register")
                .then()
                .statusCode(200);

        // Try to login with the same credentials
        Response response = given()
                .contentType(ContentType.JSON)
                .body(registerUser)
                .when()
                .post("/login")
                .then()
                .statusCode(200)
                .extract().response();

        ApiResponse apiResponse = response.as(ApiResponse.class);
        assertTrue(apiResponse.getStatus(), "Login should be successful");
        assertNotNull(apiResponse.getToken(), "Token should be present in response");
        assertEquals(apiResponse.getMessage(), "Login Successfully.");
    }
    
    @Test
    @Description("Test login with invalid credentials")
    public void testLoginWithInvalidCredentials() {
        User user = new User();
        user.setUsername("nonexistent");
        user.setPassword("wrongpassword");

        Response response = given()
                .contentType(ContentType.JSON)
                .body(user)
                .when()
                .post("/login")
                .then()
                .statusCode(400)
                .extract().response();

        ApiResponse errorResponse = response.as(ApiResponse.class);
        assertEquals(errorResponse.getErrorMessage(), "Username or password is incorrect!");
        assertEquals(errorResponse.getStatus(), false);
    }
}