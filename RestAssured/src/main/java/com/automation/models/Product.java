package com.automation.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
    private String id;
    private String name;
    private String desc;
    private double price;
    private String discount;
    private String image;
    private String user_id;
    private boolean is_delete;
}
