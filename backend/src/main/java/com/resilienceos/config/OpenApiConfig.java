package com.resilienceos.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI resilienceOsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ResilienceOS REST API")
                        .description("Autonomous Digital Twin for Global Critical Infrastructure — Core Engine Specification")
                        .version("1.0.0")
                        .contact(new Contact().name("Resilience Engineering Team").email("ops@resilienceos.internal"))
                        .license(new License().name("Enterprise Resilience License").url("https://resilienceos.internal/license")));
    }
}
