package com.selenium;

import java.time.Duration;
import java.util.List;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class RealizarPedido {
    public static void main(String[] args) {

        WebDriver driver = BaseTestDriver.getInstance().getDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        Random random = new Random();

        String caminhoSite = "http://localhost:3000";

        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            if (driver.getCurrentUrl().contains(caminhoSite)) {
                break;
            }
        }

        List<WebElement> imagensProduto = driver.findElements(By.cssSelector(".CarrosselItens__CartaoDestaque-sc-c2bc90df-4 img"));
        
        WebElement imagemProduto = wait.until(ExpectedConditions.elementToBeClickable(imagensProduto.get(random.nextInt(3))));

        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", imagemProduto);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        imagemProduto.click();

        // PRODUTO
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/tenis-nike-air-force-1-07-lv8-masculino-2"));

        WebElement tamanhoProduto = driver.findElements(By.cssSelector(".EscolherTamanho__TamanhosContainer-sc-419c6a7e-0 button")).get(random.nextInt(7));
        tamanhoProduto.click();

        WebElement botaoPersonalizado = driver.findElement(By.className("BotaoPersonalizado__Botao-sc-4605ec75-0"));
        botaoPersonalizado.click();

        // CARRINHO
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/carrinho"));

        WebElement selectEnderecos = driver.findElement(By.id("demo-simple-select"));
        selectEnderecos.click();

        WebElement enderecos = driver.findElements(By.className("MuiMenuItem-root")).get(2);
        enderecos.click();

        WebElement radioButton = driver.findElements(By.className("MuiRadio-root")).get(0);
        radioButton.click();
        driver.findElement(By.className("BotaoPersonalizado__Botao-sc-4605ec75-0")).click();

        // MÉTODO PAGAMENTO
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/checkout"));

        WebElement metodoPagamento = driver.findElement(By.className("page__RadioContainer-sc-f528c680-3"));
        metodoPagamento.click();

        List<WebElement> inputs = driver.findElements(By.cssSelector(".page__CampoCartaoInputs-sc-f528c680-7 input"));
        if (inputs.size() == 4) {
            inputs.get(0).sendKeys("5111 1111 1111 1111");
            inputs.get(1).sendKeys("CASASAS");
            inputs.get(2).sendKeys("03/28");
            inputs.get(3).sendKeys("299");
        }
        driver.findElement(By.className("BotaoPersonalizado__Botao-sc-4605ec75-0")).click();

        // CONFIRMAR
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/confirmacao"));
        driver.findElement(By.className("bHeiOL")).click();
    }
}
