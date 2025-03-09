import { atualizarProduto, encontrarProdutoId } from "@/services/ProdutoService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useAlterarProduto() {

  const [hostedUrl, setHostedUrl] = useState([]);

  const [idProduto, setIdProduto] = useState(0);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [qtd, setQtd] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [avaliacao, setAvaliacao] = useState(0.5);

  const [erro, setErro] = useState(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pega os parâmetros da URL
    const id = searchParams.get('id'); // Pega o valor de id
    setIdProduto(id);
  }, []);

  useEffect(() => {

    const carregarProduto = async () => {
      if (idProduto) {
        const produto = await encontrarProdutoId(idProduto); // Chama o serviço para pegar os dados do usuário
        console.log(produto);
        if (produto) {
          setIdProduto(produto.produtoId);
          setNome(produto.produtoNome || '');
          setQtd(produto.produtoQtd || 0);
          setPreco(produto.produtoPreco || 0.0);
          setDescricao(produto.produtoDesc || '');
          setAvaliacao(produto.produtoAvaliacao || 0.5);

          setHostedUrl(produto.imagens)
        }else {
          setErro('Produto não encontrado');
        }
      }
    };

    carregarProduto();

  }, [idProduto]);


  const handleNomeChange = (event) => setNome(event.target.value);
  const handleQtdChange = (event) => setQtd(parseInt(event.target.value) || 0);
  const handlePrecoChange = (event) => setPreco(parseFloat(event.target.value) || 0);
  const handleDescricaoChange = (event) => setDescricao(event.target.value);
  const handleAvaliacaoChange = (event) => setAvaliacao(parseFloat(event.target.value) || 0);

  const handleSuccessFile = (results) => {
    setHostedUrl((prevHostedUrl) => [
      ...prevHostedUrl,
      { url: results?.info?.url, principal: prevHostedUrl.length === 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = {
      produtoNome: nome,
      produtoPreco: preco,
      produtoQtd: qtd,
      produtoDesc: descricao,
      produtoAvaliacao: avaliacao,
      produtoImagens: hostedUrl,
    };

    try {
          const response = await atualizarProduto(idProduto, produto);
    
          if (response !== null) {
            alert(response);
    
            router.push('./produtos');
          } else {
            setErro(response);
          }
    
    
        } catch (error) {
          console.log(error);
          setErro("Erro de comunicação com o servidor!");
        }
  };

  return {
    hostedUrl,
    nome,
    preco,
    qtd,
    descricao,
    avaliacao,
    erro,
    setHostedUrl,
    setNome,
    setPreco,
    setQtd,
    setDescricao,
    setAvaliacao,
    handleNomeChange,
    handlePrecoChange,
    handleQtdChange,
    handleDescricaoChange,
    handleAvaliacaoChange,
    handleSuccessFile,
    handleSubmit,
  }
}

