import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListaDeProdutos({ produtos, adicionarAoCarrinho, categoriaSelecionada, handleVerMais, handleVoltar, onProductClick }) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeMostrar, setQuantidadeMostrar] = useState(6);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
   
    if (produtoSelecionado) {
      onProductClick(); 
    } else {
    }
  }, [produtoSelecionado]); 

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

  const handleVerMaisLocais = () => { 
    setQuantidadeMostrar(quantidadeMostrar + 6);
  };

  const handleVerMenosLocais = () => {
    setQuantidadeMostrar(Math.max(6, quantidadeMostrar - 6));
  };

  const produtosFinaisParaExibir = categoriaSelecionada
    ? produtos.filter(produto => produto.categoria === categoriaSelecionada)
    : produtos;

  return (
    <>
      <section className="py-0"> 
        <div className="container px-4 px-lg-5 mt-0">
          {produtoSelecionado ? (
            <div className="produto-detalhado p-4 border rounded shadow bg-light text-black" role="region" aria-label="Detalhes do produto selecionado">
              <h2 className="mb-3" tabIndex={0} role="heading" aria-level="2">{produtoSelecionado.nome_produto}</h2>
              <p tabIndex={0}>Descrição: {produtoSelecionado.descricao_produto || 'N/A'}</p>
              <p tabIndex={0} aria-label="Preço do produto">
                Preço: R$ {produtoSelecionado.preco_produto ? parseFloat(produtoSelecionado.preco_produto).toFixed(2) : 'N/A'}
              </p>
              <p tabIndex={0} aria-label="Estoque do produto">
                Estoque: {produtoSelecionado?.estoque_produto || 'N/A'}
              </p>

              <div className="input-group mb-3" style={{ maxWidth: '150px' }} role="group" aria-label="Alterar quantidade">
                <button
                  className="btn btn-dark"
                  onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                  aria-label="Diminuir quantidade"
                  tabIndex={0}
                  disabled={quantidade <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantidade}
                  onChange={handleQuantidadeChange}
                  min="1"
                  aria-label="Quantidade do produto"
                  tabIndex={0}
                />
                <button
                  className="btn btn-dark"
                  onClick={() => setQuantidade(prev => prev + 1)}
                  aria-label="Aumentar quantidade"
                  tabIndex={0}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary me-2 d-flex align-items-center transition"
                onClick={() => adicionarAoCarrinho(produtoSelecionado, quantidade)}
                aria-label={`Adicionar ${quantidade} unidades de ${produtoSelecionado.nome_produto} ao carrinho`}
                tabIndex={0}
              >
                Adicionar ao Carrinho
              </button>
              <button
                className="btn btn-secondary mt-2 ms-2"
                onClick={() => {
                  setProdutoSelecionado(null);
                  handleVoltar(); 
                }}
                aria-label="Voltar para a lista de produtos"
                tabIndex={0}
              >
                ← Voltar
              </button>
            </div>
          ) : (
            <div>
              {produtosFinaisParaExibir.length === 0 && (
                <p className="text-center lead text-black">Nenhum produto encontrado.</p>
              )}

              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" role="list" aria-label="Lista de produtos">
                {
                  produtosFinaisParaExibir.slice(0, quantidadeMostrar).map((produto) => (
                    <div className="col mb-5" key={produto.id_produto} role="listitem">
                      <div
                        className="card h-100 bg-light"
                       
                        onClick={() => handleProductClick(produto)}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex="0"
                        aria-label={`Detalhes do produto: ${produto.nome_produto}`}
                      >
                        {produto.promocao && (
                          <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                            Promoção
                          </div>
                        )}

                        <img className="card-img-top" src={`https://dummyimage.com/450x300/dee2e6/6c757d.jpg&text=${produto.nome_produto}`} alt={`Imagem de ${produto.nome_produto}`} />

                        <div className="card-body p-4">
                          <div className="text-center">
                            <h5 className="fw-bolder" tabIndex={0}>{produto.nome_produto}</h5>

                            <p tabIndex={0} aria-label="Preço do produto">
                              {produto.promocao && produto.preco_antigo && (
                                <span className="text-muted text-decoration-line-through me-2">
                                  R$ {parseFloat(produto.preco_antigo).toFixed(2)}
                                </span>
                              )}
                              R$ {produto.preco_produto ? parseFloat(produto.preco_produto).toFixed(2) : 'N/A'}
                            </p>
                          </div>
                        </div>

                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            <button
                              className="btn btn-primary mt-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                adicionarAoCarrinho(produto, 1);
                              }}
                              aria-label={`Adicionar ${produto.nome_produto} ao carrinho`}
                              tabIndex={0}
                            >
                              Adicionar ao Carrinho
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="d-flex justify-content-center mt-4">
                {
                  quantidadeMostrar < produtosFinaisParaExibir.length && (
                    <button className="btn btn-dark" onClick={handleVerMaisLocais} aria-label="Ver mais produtos" tabIndex={0}>
                      Ver Mais
                    </button>
                  )}
                {quantidadeMostrar > 6 && (
                  <button className="btn btn-dark ms-3" onClick={handleVerMenosLocais} aria-label="Ver menos produtos" tabIndex={0}>
                    Ver Menos
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}