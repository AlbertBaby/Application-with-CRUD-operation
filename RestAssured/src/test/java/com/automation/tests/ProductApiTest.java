package com.automation.tests;

import com.automation.config.TestConfig;
import com.automation.models.Product;
import com.automation.models.User;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.File;
import static io.restassured.RestAssured.given;
import static org.testng.Assert.*;

@Feature("Product API Tests")
public class ProductApiTest extends TestConfig {

    private String authToken;

    @BeforeClass
    public void loginUser() {
        User user = new User();
        user.setUsername("test2");
        user.setPassword("test2");

        Response response = given()
                .contentType("application/json")
                .body(user)
                .when()
                .post("/login")
                .then()
                .statusCode(200)
                .extract().response();

        this.authToken = response.jsonPath().getString("token");
    }

    @Test
    @Description("Test create new product")
    public void testCreateProduct() {
        Product product = new Product();
        product.setName("Test Product " + System.currentTimeMillis());
        product.setDesc("Test Description"); 
        product.setPrice(99.99);
        product.setDiscount("10");

        Response response = given()
                .header("token", authToken)
                .contentType("multipart/form-data")
                .multiPart("name", product.getName())
                .multiPart("desc", product.getDesc())
                .multiPart("price", String.valueOf(product.getPrice()))
                .multiPart("discount", product.getDiscount())
                .multiPart("image", new File("src/test/resources/test-image.jpg"), "image/jpeg")
                .when()
                .post("/add-product")
                .then()
                .statusCode(200)
                .extract().response();

        assertTrue(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("title"), "Product Added successfully.");
    }

    @Test(dependsOnMethods = "testCreateProduct")
    @Description("Test get all products")
    public void testGetAllProducts() {
        Response response = given()
                .header("token", authToken)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        assertNotNull(response.jsonPath().getList("products"));
        assertTrue(response.jsonPath().getList("products").size() > 0);
    }

    @Test(dependsOnMethods = {"testCreateProduct", "testGetAllProducts"})
    @Description("Test update product")
    public void testUpdateProduct() {
        // First get products to get an ID
        Response getResponse = given()
                .header("token", authToken)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        // First verify we have products
        assertNotNull(getResponse.jsonPath().getList("products"), "Products list should not be null");
        assertTrue(getResponse.jsonPath().getList("products").size() > 0, "Products list should not be empty");
        
        // Get the first product's _id field
        String productId = getResponse.jsonPath().getString("products[0]._id");

        Product updateProduct = new Product();
        updateProduct.setName("Updated Product " + System.currentTimeMillis());
        updateProduct.setDesc("Updated Description");
        updateProduct.setPrice(149.99);
        updateProduct.setDiscount("15");

        Response updateResponse = given()
                .header("token", authToken)
                .contentType("multipart/form-data")
                .multiPart("name", updateProduct.getName())
                .multiPart("desc", updateProduct.getDesc())
                .multiPart("price", String.valueOf(updateProduct.getPrice()))
                .multiPart("discount", updateProduct.getDiscount())
                .multiPart("image", new File("src/test/resources/test-image.jpg"), "image/jpeg")
                .when()
                .put("/products/" + productId)
                .then()
                .statusCode(200)
                .extract().response();

        assertTrue(updateResponse.jsonPath().getBoolean("status"));
        assertEquals(updateResponse.jsonPath().getString("title"), "Product updated.");
    }

    @Test(dependsOnMethods = "testUpdateProduct")
    @Description("Test delete product")
    public void testDeleteProduct() {
        // First get products to get an ID
        Response getResponse = given()
                .header("token", authToken)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        // First verify we have products
        assertNotNull(getResponse.jsonPath().getList("products"), "Products list should not be null");
        assertTrue(getResponse.jsonPath().getList("products").size() > 0, "Products list should not be empty");
        
        // Get the first product's _id field
        String productId = getResponse.jsonPath().getString("products[0]._id");

        Response deleteResponse = given()
                .header("token", authToken)
                .when()
                .delete("/products/" + productId)
                .then()
                .statusCode(200)
                .extract().response();

        assertTrue(deleteResponse.jsonPath().getBoolean("status"));
        assertEquals(deleteResponse.jsonPath().getString("title"), "Product deleted.");
    }

    @Test
    @Description("Test create product without authentication")
    public void testCreateProductWithoutAuth() {
        Product product = new Product();
        product.setName("Test Product");
        product.setDesc("Test Description");
        product.setPrice(99.99);
        product.setDiscount("10");

        Response response = given()
                .contentType("multipart/form-data")
                .multiPart("name", product.getName())
                .multiPart("desc", product.getDesc())
                .multiPart("price", String.valueOf(product.getPrice()))
                .multiPart("discount", product.getDiscount())
                .multiPart("image", new File("src/test/resources/test-image.jpg"), "image/jpeg")
                .when()
                .post("/add-product")
                .then()
                .statusCode(401)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "User unauthorized!");
    }

    @Test
    @Description("Test create product with missing fields")
    public void testCreateProductWithMissingFields() {
        Response response = given()
                .header("token", authToken)
                .contentType("multipart/form-data")
                .multiPart("name", "Test Product")
                // Missing other required fields
                .when()
                .post("/add-product")
                .then()
                .statusCode(400)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "Add proper parameter first!");
    }

    @Test(dependsOnMethods = "testCreateProduct")
    @Description("Test search products by name")
    public void testSearchProductsByName() {
        String searchQuery = "Test";
        Response response = given()
                .header("token", authToken)
                .queryParam("search", searchQuery)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        assertNotNull(response.jsonPath().getList("products"));
        assertTrue(response.jsonPath().getList("products").size() > 0);
    }

    @Test(dependsOnMethods = "testCreateProduct")
    @Description("Test get products with pagination")
    public void testGetProductsWithPagination() {
        Response response = given()
                .header("token", authToken)
                .queryParam("page", 1)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        assertNotNull(response.jsonPath().getList("products"));
        assertNotNull(response.jsonPath().getInt("current_page"));
        assertNotNull(response.jsonPath().getInt("total"));
        assertNotNull(response.jsonPath().getInt("pages"));
    }

    @Test(dependsOnMethods = "testUpdateProduct")
    @Description("Test update product with missing fields")
    public void testUpdateProductWithMissingFields() {
        Response getResponse = given()
                .header("token", authToken)
                .when()
                .get("/get-product")
                .then()
                .statusCode(200)
                .extract().response();

        String productId = getResponse.jsonPath().getString("products[0]._id");

        Response response = given()
                .header("token", authToken)
                .contentType("multipart/form-data")
                .multiPart("dummy", "")
                .when()
                .put("/products/" + productId)
                .then()
                .statusCode(400)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "Add proper parameter first!");
    }

    @Test(dependsOnMethods = "testCreateProduct")
    @Description("Test get products with invalid page number")
    public void testGetProductsWithInvalidPage() {
        Response response = given()
                .header("token", authToken)
                .queryParam("page", 999999) // Invalid page number
                .when()
                .get("/get-product")
                .then()
                .statusCode(400)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "There is no product!");
    }

    @Test
    @Description("Test update product without authentication")
    public void testUpdateProductWithoutAuth() {
        Response response = given()
                .contentType("multipart/form-data")
                .multiPart("name", "Updated Product")
                .when()
                .put("/products/some_id")
                .then()
                .statusCode(401)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "User unauthorized!");
    }

    @Test
    @Description("Test delete product without authentication")
    public void testDeleteProductWithoutAuth() {
        Response response = given()
                .when()
                .delete("/products/some_id")
                .then()
                .statusCode(401)
                .extract().response();

        assertFalse(response.jsonPath().getBoolean("status"));
        assertEquals(response.jsonPath().getString("errorMessage"), "User unauthorized!");
    }
}