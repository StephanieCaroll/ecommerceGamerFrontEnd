import axios from 'axios';
import { useEffect, useState } from 'react';
import Produto from './Produto';

export default function ListaDeProdutos({ adicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [quantidadeMostrar, setQuantidadeMostrar] = useState(6);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const response = await axios.get('http://localhost:3001/produtos');
        console.log(response.data);
        if (response.status === 200) {
          setProdutos(response.data);
        } else {
          console.error('Erro no servidor:', response.status);
          setErro(true);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }
    buscarProdutos();
  }, []);

  const handleProductClick = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidade(1);
  };

  const handleQuantidadeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) > 0 && !isNaN(value))) {
      setQuantidade(parseInt(value));
    }
  };

  const handleVerMais = () => {
    setQuantidadeMostrar(quantidadeMostrar + 6);
  };

  const handleVerMenos = () => {
    setQuantidadeMostrar(Math.max(6, quantidadeMostrar - 6));
  };

  if (carregando) return <p>Carregando produtos...</p>;

  if (erro) return <p>Erro ao carregar produtos. Por favor, tente novamente!</p>;

  return (
    <div className="container" aria-label="Lista de produtos" role="main">
      {produtoSelecionado ? (
        <div className="produto-detalhado p-4 border rounded" role="region" aria-label="Detalhes do produto selecionado">
          <h2 tabIndex={0} role="heading" aria-level="2">{produtoSelecionado.nome_produto}</h2>
          <p tabIndex={0}>{produtoSelecionado.descricao_produto}</p>
          <p tabIndex={0} aria-label="Preço do produto">
            Preço: R$ {produtoSelecionado.preco_produto ? parseFloat(produtoSelecionado.preco_produto).toFixed(2) : 'N/A'}
          </p>
          <p tabIndex={0} aria-label="Estoque do produto">
            Estoque: {produtoSelecionado?.estoque_produto || 'N/A'}
          </p>
          <div className="input-group mb-2" style={{ maxWidth: '150px' }} role="group" aria-label="Alterar quantidade">
            <button className="btn btn-outline-secondary" onClick={() => setQuantidade(quantidade - 1)} aria-label="Diminuir quantidade" tabIndex={0}>
              -
            </button>
            <input type="number" className="form-control bg-dark text-white" value={quantidade} onChange={handleQuantidadeChange} min="1" aria-label="Quantidade do produto" tabIndex={0} />
            <button className="btn btn-outline-secondary" onClick={() => setQuantidade(quantidade + 1)} aria-label="Aumentar quantidade" tabIndex={0}>
              +
            </button>
          </div>
          <button className="btn btn-primary mt-2" onClick={() => adicionarAoCarrinho(produtoSelecionado, quantidade)} aria-label={`Adicionar ${produtoSelecionado.nome_produto} ao carrinho`} tabIndex={0}>Adicionar ao Carrinho</button>
          <button className="btn btn-secondary mt-2 ms-2" onClick={() => setProdutoSelecionado(null)} aria-label="Voltar para a lista de produtos" tabIndex={0}>← Voltar</button>
        </div>
      ) : (
        <div>
          <div className="row" role="list" aria-label="Lista de produtos">
            {produtos.slice(0, quantidadeMostrar).map((produto) => (
              <div className="col-md-4 mb-4" key={produto.id_produto} aria-label={`Produto: ${produto.nome_produto}`} tabIndex="0" role="listitem">
                <Produto
                  produto={produto}
                  adicionarAoCarrinho={adicionarAoCarrinho}
                  onClick={() => handleProductClick(produto)}
                />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-3" role="group" aria-label="Paginação de produtos">
            {quantidadeMostrar < produtos.length && <button className="btn btn-primary" onClick={handleVerMais} aria-label="Ver mais produtos" tabIndex={0}>Ver Mais</button>}
            {quantidadeMostrar > 6 && <button className="btn btn-secondary" onClick={handleVerMenos} aria-label="Ver menos produtos" tabIndex={0}>Ver Menos</button>}
          </div>
        </div>
      )}
    </div>
  );
}
