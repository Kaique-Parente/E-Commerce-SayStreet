package com.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;

public class BaseTestDriver {
    private WebDriver driver;

    private static BaseTestDriver instance;

    private BaseTestDriver(){
        WebDriverManager.edgedriver().setup();

        EdgeOptions options = new EdgeOptions();
        options.setExperimentalOption("debuggerAddress", "127.0.0.1:9222");

        this.driver = new EdgeDriver(options);
    }

    public static BaseTestDriver getInstance(){
        if(instance == null){
            instance = new BaseTestDriver();
        }
        return instance;
    }

    public WebDriver getDriver(){
        return this.driver;
    }
}
