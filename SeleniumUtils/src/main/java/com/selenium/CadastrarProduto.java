package com.selenium;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CadastrarProduto {
    public static void main(String[] args) {
        WebDriver driver = BaseTestDriver.getInstance().getDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        String caminhoSite = "http://localhost:3000/backoffice/produtos?setor=estoquista";

        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            if (driver.getCurrentUrl().contains(caminhoSite)) {
                break;
            }
        }

        WebElement buttonCadastrar = wait
                .until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='cadastrar-produto']")));
        buttonCadastrar.click();

        // PRODUTO
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/backoffice/cadastrar-produto?setor=estoquista"));

        WebElement form = driver.findElement(By.cssSelector("form"));
        List<WebElement> inputsForm = form.findElements(By.cssSelector("input"));
        WebElement nomeProduto = inputsForm.get(0);
        WebElement precoProduto = inputsForm.get(1);
        WebElement emEstoqueProduto = inputsForm.get(2);
        WebElement descricaoProduto = inputsForm.get(3);
        List<WebElement> avalicaoesElement = driver.findElements(By.className("MuiRating-decimal"));
        WebElement avaliacaoProduto = avalicaoesElement.get(avalicaoesElement.size()-1);

        nomeProduto.click();
        nomeProduto.sendKeys("Tênis Nike Revolution 7 Feminino");

        precoProduto.click();
        precoProduto.sendKeys(Keys.CONTROL + "a");
        precoProduto.sendKeys("309,99");

        emEstoqueProduto.click();
        emEstoqueProduto.sendKeys(Keys.CONTROL + "a");
        emEstoqueProduto.sendKeys("100");

        descricaoProduto.sendKeys("Colocamos no Revolution 7 o tipo de amortecimento macio e suporte que pode mudar seu mundo da corrida. Mantendo o estilo de sempre e garantindo conforto na estrada, esta evolução de um clássico oferece uma pisada macia e fluida.\r\n" + //
                        "\r\n" + //
                        "\r\n" + //
                        "Passada suave\r\n" + //
                        "\r\n" + //
                        "A espuma na entressola garante uma passada macia e suave.\r\n" + //
                        "\r\n" + //
                        "\r\n" + //
                        "Pontos de toque\r\n" + //
                        "\r\n" + //
                        "Os pontos de toque no calcanhar criam uma sensação natural ao projetar o pé.");
        
        avaliacaoProduto.click();

        //IMAGENS
        WebElement buttonAddImagem = driver.findElements(By.cssSelector(".fWkoHD button")).get(0);
        buttonAddImagem.click();

        WebElement iframe = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("iframe")));
        
        //Mudar para o model
        driver.switchTo().frame(iframe);

        List<WebElement> buttonsCloud = wait
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(By.className("sc-cDvQBt"), 0));

        WebElement buttonCloudUrl = buttonsCloud.get(1);
        buttonCloudUrl.click();

        // WEB ADDRESS
        WebElement divCloudInput = driver.findElement(By.className("sc-hqpNSm"));
        WebElement inputCloudUrl = divCloudInput.findElement(By.cssSelector("input"));
        WebElement buttonCloudSendUrl = divCloudInput.findElement(By.cssSelector("button"));

        inputCloudUrl.sendKeys("https://imgnike-a.akamaihd.net/360x360/027284IMA8.jpg");
        buttonCloudSendUrl.click();

        // SVG de pronto no upload
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-test='completed-status-icon']")));

        WebElement buttonUploadMoreImage = driver.findElement(By.cssSelector("[data-test='upload-btn']"));
        buttonUploadMoreImage.click();

        // add img2
        WebElement divCloudInput2 = wait
                .until(ExpectedConditions.visibilityOfElementLocated(By.className("sc-hqpNSm")));
        WebElement inputCloudUrl2 = divCloudInput2.findElement(By.cssSelector("input"));
        WebElement buttonCloudSendUrl2 = divCloudInput2.findElement(By.cssSelector("button"));

        inputCloudUrl2.sendKeys("https://imgnike-a.akamaihd.net/360x360/027284IMA4.jpg");
        buttonCloudSendUrl2.click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("[data-test='completed-status-icon']")));

        WebElement buttonUploadMoreImage2 = driver.findElement(By.cssSelector("[data-test='upload-btn']"));
        buttonUploadMoreImage2.click();

        // add img 3
        WebElement divCloudInput3 = wait
                .until(ExpectedConditions.visibilityOfElementLocated(By.className("sc-hqpNSm")));
        WebElement inputCloudUrl3 = divCloudInput3.findElement(By.cssSelector("input"));
        WebElement buttonCloudSendUrl3 = divCloudInput3.findElement(By.cssSelector("button"));

        inputCloudUrl3.sendKeys("https://imgnike-a.akamaihd.net/360x360/027284IMA5.jpg");
        buttonCloudSendUrl3.click();

        wait.until(ExpectedConditions.numberOfElementsToBe(
                By.cssSelector("[data-test='completed-status-icon']"),
                3));

        WebElement buttonCloudDone = driver.findElement(By.cssSelector("[data-test='queue-done']"));
        buttonCloudDone.click();

        //Voltar para a tela padrão
        driver.switchTo().defaultContent();

        //CONFIRMAR
        WebElement buttonConfirmar = form.findElements(By.cssSelector(".page__ButtonsContainer-sc-ae4fecf2-3 button"))
            .get(1);
        
        buttonConfirmar.click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        alert.accept();
    }
}
