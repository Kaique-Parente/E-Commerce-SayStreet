package com.selenium;

import java.time.Duration;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class Login {
    public static void main(String[] args) {

        WebDriver driver = BaseTestDriver.getInstance().getDriver();

        String caminhoSite = "http://localhost:3000/login";

        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            if (driver.getCurrentUrl().contains(caminhoSite)) {
                break;
            }
        }

        WebElement inputEmail = driver.findElement(By.id("email"));
        WebElement inputPassword = driver.findElement(By.id("password"));
        WebElement botao = driver.findElement(By.className("BotaoPersonalizado__Botao-sc-4605ec75-0"));

        inputEmail.click();
        inputEmail.sendKeys(Keys.CONTROL + "a", Keys.DELETE);
        inputEmail.sendKeys("kaiquepateste@teste.com");

        inputPassword.click();
        inputPassword.sendKeys(Keys.CONTROL + "a", Keys.DELETE);
        inputPassword.sendKeys("123");

        botao.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        alert.accept();

        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));

        WebElement profile = wait.until(ExpectedConditions.elementToBeClickable(By.id("icone-pessoa")));
        profile.click();

    }
}