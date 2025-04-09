package com.saystreet.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.saystreet.backend.dto.CepDTO;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EnderecoController {
    

    @GetMapping("{cep}")
    public CepDTO consultaCep(@PathVariable("cep") String cep) {
        //RestTemplate é utilizada para realizar requisições externas
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://viacep.com.br/ws/" + cep + "/json/"; // Construção da URL correta
        ResponseEntity<CepDTO> resp = restTemplate.getForEntity(url, CepDTO.class);

        return resp.getBody();
    }
}
