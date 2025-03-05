package com.saystreet.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.saystreet.backend.dto.ProdutoDto;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @Autowired
    private ProdutoRepository produtoRepository;

    public String create(ProdutoDto produtoDto, MultipartFile arquivo) {
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


            ProdutoModel produtoSalvo = new ProdutoModel(produtoDto.getProduto_name(), 
            produtoDto.getProduto_avaliacao(), produtoDto.getProduto_qtd(), nomeArquivo);
            produtoRepository.save(produtoSalvo);

            return "Produto salvo com sucesso!";

        } catch (IOException e) {
            return "Erro ao salvar arquivo: " + e.getMessage();
        }
    }

    public ProdutoModel buscarProdutoPorId(Long id) {
        Optional<ProdutoModel> produtoOpt = produtoRepository.findById(id);
        
        if (produtoOpt.isPresent()) {
            ProdutoModel produto = produtoOpt.get();
    
            // Definir o caminho completo da imagem
            String caminhoImagem = UPLOAD_DIR + "/" + produto.getNome_imagem();
            produto.setNome_imagem(caminhoImagem);
    
            return produto;
        } else {
            throw new NoSuchElementException("Produto não encontrado!");
        }
    }

    public String editarProduto(Long id, ProdutoDto produtoDto, MultipartFile arquivo) {
        try {
            Optional<ProdutoModel> produtoExistenteOpt = produtoRepository.findById(id);
            
            if (!produtoExistenteOpt.isPresent()) {
                return "Produto não encontrado.";
            }
    
            ProdutoModel produtoExistente = produtoExistenteOpt.get();
            
            produtoExistente.setProduto_name(produtoDto.getProduto_name());
            produtoExistente.setProduto_avaliacao(produtoDto.getProduto_avaliacao());
            produtoExistente.setProduto_qtd(produtoDto.getProduto_qtd());
            produtoExistente.setProduto_status(produtoDto.isStatus());
    
            // Verifica se tem uma imagem para att
            if (!arquivo.isEmpty()) {

                File diretorio = new File(UPLOAD_DIR);
                if (!diretorio.exists()) {
                    diretorio.mkdirs();
                }
    
                String nomeArquivo = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();
                Path caminhoArquivo = Paths.get(UPLOAD_DIR, nomeArquivo);
                Files.write(caminhoArquivo, arquivo.getBytes());

                produtoExistente.setNome_imagem(nomeArquivo);
            }
            produtoRepository.save(produtoExistente);
    
            return "Produto atualizado com sucesso!";
    
        } catch (IOException e) {
            return "Erro ao atualizar o produto: " + e.getMessage();
        }
    }
}
