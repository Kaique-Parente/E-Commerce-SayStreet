package com.saystreet.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customSwagger(){
        return new OpenAPI().info(new Info().title("Say Street Api").version("1.0")
        .license(new License().name("Senac SP")));
    }
}
