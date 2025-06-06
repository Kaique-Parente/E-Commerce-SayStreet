package com.saystreet.backend.service;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import com.saystreet.backend.dto.ImageDto;
import com.saystreet.backend.dto.ProdutoDto;
import com.saystreet.backend.models.ProdutoModel;
import com.saystreet.backend.repository.ProdutoRepository;

@ActiveProfiles("test")
public class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @InjectMocks
    private ProdutoService produtoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testCriarProduto_ComSucesso() {

        ProdutoDto produtoDto = new ProdutoDto();
        produtoDto.setProdutoNome("Produto Teste");
        produtoDto.setProdutoDesc("Teste");
        produtoDto.setProdutoAvaliacao(4.5);
        produtoDto.setProdutoQtd(5);
        produtoDto.setProdutoPreco(99.90);

        ImageDto imagemDto = new ImageDto();
        imagemDto.setUrl("imagemteste");
        imagemDto.setPrincipal(true);
        produtoDto.setProdutoImagens(List.of(imagemDto));

        // Configura o mock do produtoRepository pra quando o método for chamado com
        // qualquer ProdutoModel
        // Isso simula o método save
        when(produtoRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        String resultado = produtoService.create(produtoDto);

        // Verifica se o método de criar retornou essa string
        assertThat(resultado, is("Produto criado com sucesso"));
        // verifica se o método foi chamado ao menos 1 vez
        verify(produtoRepository, times(1)).save(any());
    }

    @Test
    void testEditProduto_ComSucesso() {
        
        Long produtoId = 1L;

        ProdutoModel produtoExistente = new ProdutoModel();
        produtoExistente.setProdutoNome("Produto teste1");
        produtoExistente.setProdutoPreco(50.0);
        produtoExistente.setProdutoQtd(2);
        produtoExistente.setProdutoDesc("Produto teste1");
        produtoExistente.setProdutoAvaliacao(3.0);
        produtoExistente.setImagens(new ArrayList<>());

        ProdutoDto produtoDto = new ProdutoDto();
        produtoDto.setProdutoNome("Produto teste2");
        produtoDto.setProdutoPreco(100.0);
        produtoDto.setProdutoQtd(10);
        produtoDto.setProdutoDesc("Produto teste2");
        produtoDto.setProdutoAvaliacao(4.5);

        ImageDto imagemDto = new ImageDto();
        imagemDto.setUrl("novaimagem testando");
        imagemDto.setPrincipal(true);
        produtoDto.setProdutoImagens(List.of(imagemDto));

        // Mock para buscar o produto existente pelo id
        when(produtoRepository.findById(produtoId)).thenReturn(Optional.of(produtoExistente));

        // Mock para salvar o produto atualizado
        when(produtoRepository.save(any(ProdutoModel.class))).thenAnswer(i -> i.getArgument(0));

        String resultado = produtoService.editarProduto(produtoId, produtoDto);

        // Verifica o retorno do metodo de ditar Produto
        assertThat(resultado, is("Produto atualizado com sucesso!"));

        // Verifica se o save foi chamado com o produto atualizado
        verify(produtoRepository, times(1)).save(any());

        // Verifica se o produto foi atualizado Com sucesso <><><><><><>
        assertEquals("Produto teste2", produtoExistente.getProdutoNome());
        assertEquals(100.0, produtoExistente.getProdutoPreco());
        assertEquals(10, produtoExistente.getProdutoQtd());
        assertEquals("Produto teste2", produtoExistente.getProdutoDesc());
        assertEquals(4.5, produtoExistente.getProdutoAvaliacao());
    }
}
