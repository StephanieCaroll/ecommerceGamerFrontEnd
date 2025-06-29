import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Produto from './Produto'; 

export default function ListaDeProdutos({ produtos, adicionarAoCarrinho, categoriaSelecionada, setCategoriaSelecionada, handleVoltarHome, onProductClick }) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeMostrar, setQuantidadeMostrar] = useState(6);
  const [quantidade, setQuantidade] = useState(1);
  const categoriasUnicas = ["Teclados", "Mouses", "Monitores", "Cadeiras", "Componentes", "Periféricos", "Notebooks", "Outros"];
  const produtosPorCategoria = {};
  categoriasUnicas.forEach(cat => (produtosPorCategoria[cat] = []));

  produtos.forEach(produto => {
    const nomeProdutoLower = produto.nome_produto ? produto.nome_produto.toLowerCase() : '';

    if (nomeProdutoLower.includes("teclado")) produtosPorCategoria["Teclados"].push(produto);
    else if (nomeProdutoLower.includes("mouse")) produtosPorCategoria["Mouses"].push(produto);
    else if (nomeProdutoLower.includes("monitor")) produtosPorCategoria["Monitores"].push(produto);
    else if (nomeProdutoLower.includes("cadeira")) produtosPorCategoria["Cadeiras"].push(produto);
    else if (
      nomeProdutoLower.includes("placa") ||
      nomeProdutoLower.includes("fonte") ||
      nomeProdutoLower.includes("gabinete") ||
      nomeProdutoLower.includes("ssd") ||
      nomeProdutoLower.includes("memória")
    ) produtosPorCategoria["Componentes"].push(produto);
    else if (
      nomeProdutoLower.includes("fone") ||
      nomeProdutoLower.includes("headset") ||
      nomeProdutoLower.includes("webcam") ||
      nomeProdutoLower.includes("microfone") ||
      nomeProdutoLower.includes("controlador")
    ) produtosPorCategoria["Periféricos"].push(produto);
    else if (nomeProdutoLower.includes("notebook")) produtosPorCategoria["Notebooks"].push(produto);
    else produtosPorCategoria["Outros"].push(produto);
  });

  const produtosFinaisParaExibir = categoriaSelecionada
    ? produtosPorCategoria[categoriaSelecionada] || []
    : produtos;

  useEffect(() => {

    if (produtoSelecionado) {
      onProductClick(true);
    } else {
      onProductClick(false);
    }

  }, [produtoSelecionado, onProductClick]);

  const handleProductClick = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidade(1); 
  };

  const handleQuantidadeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) > 0 && !isNaN(parseInt(value)))) {
      setQuantidade(parseInt(value));
    }
  };

  const handleVerMaisLocais = () => {
    setQuantidadeMostrar(quantidadeMostrar + 6);
  };

  const handleVerMenosLocais = () => {
    setQuantidadeMostrar(Math.max(6, quantidadeMostrar - 6));
  };

  const handleVoltarDaCategoria = () => {
    setCategoriaSelecionada(null);
    setQuantidadeMostrar(6); 
  };

  const handleVoltarDosDetalhes = () => {
    setProdutoSelecionado(null);
    handleVoltarHome();
  };

  return (
    <section className="py-0">
      <div className="container-fluid mt-0"> 
        <div className="row">

          {/* Barra Lateral de Categorias */}
          <div className="col-lg-3 d-none d-lg-block"> 
            <div className="list-group sidebar-categories">
              <h4 className="fw-bold mb-3 text-black">Categorias</h4>
              {categoriasUnicas.map((categoria) => (
                <button
                  key={categoria}
                  className={`list-group-item list-group-item-action ${categoriaSelecionada === categoria ? 'active' : ''}`}
                  onClick={() => {
                    setCategoriaSelecionada(categoria);
                    setProdutoSelecionado(null);
                    setQuantidadeMostrar(6);
                  }}
                  aria-current={categoriaSelecionada === categoria ? 'true' : 'false'}
                >
                  {categoria} ({produtosPorCategoria[categoria]?.length || 0})
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-9">
            {produtoSelecionado ? (
              <div className="produto-detalhado p-4 border rounded shadow bg-light text-black" role="region" aria-label="Detalhes do produto selecionado">
                <h2 className="mb-3" tabIndex={0} role="heading" aria-level="2">{produtoSelecionado.nome_produto}</h2>
                
                {produtoSelecionado.url_imagem ? (
                  <Image
                    src={produtoSelecionado.url_imagem}
                    alt={`Imagem de ${produtoSelecionado.nome_produto}`}
                    width={400} 
                    height={300}
                    layout="responsive"
                    objectFit="contain"
                    className="mb-3 rounded"
                    onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png" }}
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    alt="Imagem não disponível"
                    width={400}
                    height={300}
                    layout="responsive"
                    objectFit="contain"
                    className="mb-3 rounded"
                  />
                )}

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
                  onClick={handleVoltarDosDetalhes} 
                  aria-label="Voltar para a lista de produtos"
                  tabIndex={0}
                >
                  ← Voltar
                </button>
              </div>
            ) : (
              <>

                <h2 className="text-black mb-4">
                  {categoriaSelecionada ? `Produtos em ${categoriaSelecionada}` : 'Todos os Produtos'}
                </h2>

                {categoriaSelecionada && (
                  <div className="mb-4">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleVoltarDaCategoria}
                      aria-label="Voltar para a seleção de categorias"
                      tabIndex={0}
                    >
                      ← Voltar para Categorias
                    </button>
                  </div>
                )}

                {produtosFinaisParaExibir.length === 0 && (
                  <p className="text-center lead text-black">Nenhum produto encontrado nesta categoria.</p>
                )}

                {/* Grid de Produtos */}
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-3 justify-content-center" role="list" aria-label="Lista de produtos">
                  {produtosFinaisParaExibir.slice(0, quantidadeMostrar).map((produto) => (
                    <div className="col mb-5" key={produto.id_produto} role="listitem">
                      <Produto
                        produto={produto}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                        onClick={() => handleProductClick(produto)}
                      />
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  {quantidadeMostrar < produtosFinaisParaExibir.length && (
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}