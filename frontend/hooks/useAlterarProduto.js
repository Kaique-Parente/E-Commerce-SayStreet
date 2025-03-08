import { encontrarProdutoId } from "@/services/ProdutoService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useAlterarProduto() {

  const [hostedUrl, setHostedUrl] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [estoque, setEstoque] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [avaliacao, setAvaliacao] = useState(0.5);


  const [produto, setProduto] = useState({});
  const [idProduto, setIdProduto] = useState(0);
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
      
          setProduto(produto);
          
      }
    };

    carregarProduto();

  }, [idProduto]);

  useEffect(() => {
    // Pega os parâmetros da URL
    console.log(produto);
  }, [produto]);


  const handleNomeChange = (event) => setNome(event.target.value);
  const handlePrecoChange = (event) => setPreco(parseFloat(event.target.value) || 0);
  const handleEstoqueChange = (event) => setEstoque(parseInt(event.target.value) || 0);
  const handleDescricaoChange = (event) => setDescricao(event.target.value);
  const handleAvaliacaoChange = (event) => setAvaliacao(parseFloat(event.target.value) || 0);

  const handleSuccessFile = (results) => {
    setHostedUrl((prevHostedUrl) => [
      ...prevHostedUrl,
      { url: results?.info?.url, principal: prevHostedUrl.length === 0 },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const produto = {
      produto_nome: nome,
      produto_preco: preco,
      produto_estoque: estoque,
      produto_descricao: descricao,
      produto_avaliacao: avaliacao,
      produto_imagens: hostedUrl,
    };

    console.log(produto);
  };

  return {
    hostedUrl,
    nome,
    preco,
    estoque,
    descricao,
    avaliacao,
    setHostedUrl,
    setNome,
    setPreco,
    setEstoque,
    setDescricao,
    setAvaliacao,
    handleNomeChange,
    handlePrecoChange,
    handleEstoqueChange,
    handleDescricaoChange,
    handleAvaliacaoChange,
    handleSuccessFile,
    handleSubmit,
  }
}

