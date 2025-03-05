package com.saystreet.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @Autowired
    private ProdutoRepository produtoRepository;

    public String create(ProdutoModel produto, MultipartFile arquivo) {
        try {
            if (arquivo.isEmpty()) {
                return "Arquivo não pode estar vazio.";
            }

            // Criar diretório se não existir
            File diretorio = new File(UPLOAD_DIR);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }

            // Criar um nome único para o arquivo
            String nomeArquivo = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();
            Path caminhoArquivo = Paths.get(UPLOAD_DIR, nomeArquivo);
            Files.write(caminhoArquivo, arquivo.getBytes());

            // Atualizar o nome da imagem no produto
            produto.setNome_imagem(nomeArquivo);

            produtoRepository.save(produto);

            return "Produto salvo com sucesso!";

        } catch (IOException e) {
            return "Erro ao salvar arquivo: " + e.getMessage();
        }
    }
}
