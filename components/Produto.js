import React from 'react';

export default function Produto({ produto, adicionarAoCarrinho, onClick }) {
  console.log('Produto:', produto);
  return (
    <div className="card h-100 text-center shadow-sm" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title fs-5 fw-bold">{produto.nome_produto}</h3>
        <p className="card-text text-primary fw-semibold">
          Preço: R$ {produto.preco_produto ? parseFloat(produto.preco_produto).toFixed(2) : 'N/A'}
        </p>
        <p className="card-text">Descrição: {produto.descricao_produto || 'N/A'}</p>
        <p className="card-text">Estoque: {produto.estoque_produto || 'N/A'}</p>
        <button
          className="btn btn-primary me-2 d-flex align-items-center transition"
          onClick={(e) => {
            e.stopPropagation();
            adicionarAoCarrinho(produto);
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
