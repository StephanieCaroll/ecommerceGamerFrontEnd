import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AreaAdministrativa() {
  const { usuarioLogado } = useCart();
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({ 
    nome_produto: '', 
    descricao_produto: '', 
    preco_produto: '', 
    estoque_produto: '',
    url_imagem: '' 
  });

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get('http://localhost:3001/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/produtos', produto);
      alert('Produto adicionado com sucesso!');
      setProduto({ 
        nome_produto: '', 
        descricao_produto: '', 
        preco_produto: '', 
        estoque_produto: '', 
        url_imagem: '' 
      });
      setProdutos([...produtos, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Por favor, tente novamente.');
    }
  };

  const handleDelete = async (id_produto) => {
    try {
      await axios.delete(`http://localhost:3001/produtos/${id_produto}`);
      alert('Produto removido com sucesso!');
      setProdutos(produtos.filter((produto) => produto.id_produto !== id_produto));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      alert('Erro ao remover produto. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5" role="main" aria-label="Área administrativa"> 
      <h1 className="text-black" tabIndex={0} role="heading" aria-level="1">Área Admnistrativa (CRUD)</h1> 
      {usuarioLogado ? (
        <p className="text-black" tabIndex={0} role="status">Bem-vindo, {usuarioLogado.nome_usuario}!</p>
      ) : (
        <p className="text-black" tabIndex={0} role="status">Você não está logado.</p>
      )}
      <form onSubmit={handleSubmit} className="mb-4 text-black" role="form" aria-label="Formulário de cadastro de produto"> 
        <div className="row text-black">
          <div className="col-md-6 mb-3">
            <label className="form-label text-black" htmlFor="nome_produto">Nome do Produto:</label>
            <input type="text" name="nome_produto" id="nome_produto" value={produto.nome_produto} onChange={handleInputChange} className="form-control" required aria-required="true" aria-label="Nome do produto" tabIndex={0} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="descricao_produto">Descrição do Produto:</label>
            <input  type="text" name="descricao_produto" id="descricao_produto" value={produto.descricao_produto} onChange={handleInputChange} className="form-control text-black" required aria-required="true" aria-label="Descrição do produto" tabIndex={0} /> 
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="preco_produto">Preço do Produto:</label>
            <input type="number" name="preco_produto" id="preco_produto" value={produto.preco_produto} onChange={handleInputChange} className="form-control" required aria-required="true" aria-label="Preço do produto" tabIndex={0} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="estoque_produto">Estoque do Produto:</label>
            <input type="number" name="estoque_produto" id="estoque_produto" value={produto.estoque_produto} onChange={handleInputChange} className="form-control" required aria-required="true" aria-label="Estoque do produto" tabIndex={0} />
          </div>
        </div>
        {/* NOVO CAMPO: URL da Imagem */}
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label" htmlFor="url_imagem">URL da Imagem:</label>
            <input 
              type="text" 
              name="url_imagem" 
              id="url_imagem" 
              value={produto.url_imagem} 
              onChange={handleInputChange} 
              className="form-control" 
              aria-label="URL da imagem do produto" 
              tabIndex={0} 
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" aria-label="Adicionar produto" tabIndex={0}>Adicionar Produto</button> 
      </form>
      <h2 className="text-black" tabIndex={0} role="heading" aria-level="2">Produtos</h2>
      <ul className="list-group" role="list" aria-label="Lista de produtos cadastrados">
        {produtos.map((produto) => (
          <li key={produto.id_produto} className="list-group-item d-flex justify-content-between align-items-center" role="listitem" tabIndex={0}> 
            <span>
              {/* EXIBIÇÃO DA IMAGEM NA LISTA */}
              {produto.url_imagem && ( 
                <img 
                  src={produto.url_imagem} 
                  alt={`Imagem de ${produto.nome_produto}`} 
                  style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover', borderRadius: '5px' }} 
                  onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png" }} 
                />
              )}
              {produto.nome_produto} - {produto.descricao_produto} - R$ {produto.preco_produto} - Estoque: {produto.estoque_produto}
            </span>
            <button onClick={() => handleDelete(produto.id_produto)} className="btn btn-danger" aria-label={`Remover ${produto.nome_produto}`} tabIndex={0}>Remover</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}