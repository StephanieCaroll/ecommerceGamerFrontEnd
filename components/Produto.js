import React from 'react';
import Image from 'next/image'; 

export default function Produto({ produto, adicionarAoCarrinho, onClick }) {
 
  if (!produto) {
    console.error("Componente 'Produto' recebeu 'produto' indefinido ou nulo.");
    return null; 
  }

  const imageUrl = produto.url_imagem;

  return (
    <div 
      className="card h-100 text-center shadow-sm" 
      style={{ cursor: 'pointer' }} 
      onClick={onClick} 
      role="button"
      tabIndex="0"
      aria-label={`Detalhes do produto: ${produto.nome_produto}`}
    >
      {/* Exibição da imagem do produto*/}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Imagem de ${produto.nome_produto}`}
          width={300} 
          height={200} 
          layout="responsive" 
          objectFit="contain" 
          className="card-img-top p-2" 
          onError={(e) => { e.target.onerror = null; e.target.src="/images/placeholder.png" }} 
        />
      ) : (
        // Imagem padrão se não houver URL na propriedade 'url_imagem'
        <Image
          src="/images/placeholder.png" 
          alt="Imagem não disponível"
          width={300}
          height={200}
          layout="responsive"
          objectFit="contain"
          className="card-img-top p-2"
        />
      )}

      {produto.promocao && (
        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
          Promoção
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <h3 className="card-title fs-5 fw-bold" tabIndex={0}>{produto.nome_produto}</h3>
        <p className="card-text text-primary fw-semibold" tabIndex={0} aria-label="Preço do produto">
          {produto.promocao && produto.preco_antigo && (
            <span className="text-muted text-decoration-line-through me-2">
              R$ {parseFloat(produto.preco_antigo).toFixed(2)}
            </span>
          )}
          Preço: R$ {produto.preco_produto ? parseFloat(produto.preco_produto).toFixed(2) : 'N/A'}
        </p>
        <p className="card-text" tabIndex={0}>Descrição: {produto.descricao_produto || 'N/A'}</p>
        <p className="card-text" tabIndex={0}>Estoque: {produto.estoque_produto || 'N/A'}</p>
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
  );
}