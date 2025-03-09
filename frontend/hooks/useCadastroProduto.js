import { cadastrarProduto } from "@/services/ProdutoService";
import { useState } from "react";

export function useCadastroProduto() {
  const [hostedUrl, setHostedUrl] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0.0);
  const [estoque, setEstoque] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [avaliacao, setAvaliacao] = useState(0.5);
  const [erro, setErro] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hostedUrl.length > 0) {
      const produto = {
        produtoNome: nome,
        produtoPreco: preco,
        produtoQtd: estoque,
        produtoDesc: descricao,
        produtoAvaliacao: avaliacao,
        produtoImagens: hostedUrl,
      };

      try {
        const response = await cadastrarProduto(produto);

        if (response !== null) {
          alert(response);

          //router.push('./users');
        } else {
          setErro(response);
        }


      } catch (error) {
        console.log(error);
        setErro("Erro de comunicação com o servidor!");
      }

    } else {
      alert('Adicione no mínimo uma imagem para o produto!');
    }
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

