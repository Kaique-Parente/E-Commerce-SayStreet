package com.saystreet.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saystreet.backend.dto.ImageDto;
import com.saystreet.backend.dto.ProdutoDto;
import com.saystreet.backend.models.ImageModel;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {

    // private static final String UPLOAD_DIR = System.getProperty("user.dir") +
    // "/uploads";

    @Autowired
    private ProdutoRepository produtoRepository;

    // Método para criar um produto
    public String create(ProdutoDto produtoDto) {
        try {
            ProdutoModel produto = ProdutoModel.builder()
                    .produtoName(produtoDto.getProduto_name())
                    .produtoAvaliacao(produtoDto.getProduto_avaliacao())
                    .produtoQtd(produtoDto.getProduto_qtd())
                    .produtoStatus(true)
                    .build();

            List<ImageModel> imagens = new ArrayList<>();
            boolean temPrincipal = false;

            if (produtoDto.getUrlImagens() != null && !produtoDto.getUrlImagens().isEmpty()) {
                for (ImageDto imgDTO : produtoDto.getUrlImagens()) {
                    boolean isPrincipal = imgDTO.isPrincipal();

                    if (isPrincipal) {
                        if (temPrincipal) {
                            throw new IllegalArgumentException("Só pode haver uma imagem principal.");
                        }
                        temPrincipal = true;
                    }

                    imagens.add(ImageModel.builder()
                            .url(imgDTO.getUrl())
                            .produto(produto)
                            .principal(isPrincipal)
                            .build());
                }
            }

            // Caso nenhuma imagem tenha sido marcada como principal, a primeira será
            // definida como true
            if (!temPrincipal && !imagens.isEmpty()) {
                imagens.get(0).setPrincipal(true);
            }

            produto.setImagens(imagens);
            produtoRepository.save(produto);

            return "Produto criado com sucesso";
        } catch (Exception e) {
            return "Erro ao salvar produto: " + e.getMessage();
        }
    }

    // Método para buscar um produto pelo ID
    public ProdutoModel buscarProdutoPorId(Long id) {
        Optional<ProdutoModel> produtoOpt = produtoRepository.findById(id);

        if (produtoOpt.isPresent()) {
            ProdutoModel produto = produtoOpt.get();
            return produto;
        }
        throw new NoSuchElementException("Produto não encontrado!");
    }

    // Méotodo para editar um produto, verificando se existe um produto com o ID
    // informado
    public String editarProduto(Long id, ProdutoDto produtoDto) {
        try {
            ProdutoModel produtoExistente = buscarProdutoPorId(id);

            produtoExistente.setProdutoName(produtoDto.getProduto_name());
            produtoExistente.setProdutoAvaliacao(produtoDto.getProduto_avaliacao());
            produtoExistente.setProdutoQtd(produtoDto.getProduto_qtd());
            produtoExistente.setProdutoStatus(produtoDto.isStatus());

            List<ImageModel> imagens = new ArrayList<>();
            boolean temPrincipal = false;

            // Atualiza as imagens do produto
            if (produtoDto.getUrlImagens() != null && !produtoDto.getUrlImagens().isEmpty()) {
                for (ImageDto imgDTO : produtoDto.getUrlImagens()) {
                    boolean isPrincipal = imgDTO.isPrincipal();

                    if (isPrincipal) {
                        if (temPrincipal) {
                            throw new IllegalArgumentException("Só pode haver uma imagem principal.");
                        }
                        temPrincipal = true;
                    }

                    imagens.add(ImageModel.builder()
                            .url(imgDTO.getUrl())
                            .produto(produtoExistente)
                            .principal(isPrincipal)
                            .build());
                }
            }
            produtoRepository.save(produtoExistente);

            return "Produto atualizado com sucesso!";

        } catch (Exception e) {
            return "Erro ao atualizar o produto: " + e.getMessage();
        }
    }

    // Método para alterar o status do produto, verificando se existe um produto com
    // o ID informado
    public String alterarStatus(Long id, boolean status) {

        ProdutoModel produtoExistente = buscarProdutoPorId(id);

        produtoExistente.setProdutoStatus(status);
        produtoRepository.save(produtoExistente);

        return "Status do produto alterado com sucesso!";
    }

    // Método para editar a quantidade do produto, verificando se existe um produto
    // com ID informado
    public String editarQTD(Long id, ProdutoDto produtoDto) {

        ProdutoModel produtoExistente = buscarProdutoPorId(id);
        produtoExistente.setProdutoQtd(produtoDto.getProduto_qtd());
        produtoRepository.save(produtoExistente);

        return "Quantidade do produto atualizada com sucesso!";
    }

    // Método para listar todos os produtos
    public List<ProdutoModel> listAll() {
        return produtoRepository.findAll();
    }
}
