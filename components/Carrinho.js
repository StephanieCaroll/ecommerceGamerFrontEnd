import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Carrinho({ removerDoCarrinho, onProceedToPayment, onUpdateCart, setPagina }) {
  const { itensDoCarrinho, limparCarrinho } = useCart();
  const [itens, setItens] = useState([]);

  useEffect(() => {
    setItens(itensDoCarrinho);
  }, [itensDoCarrinho]);

  const handleIncrement = (index) => {
    const novoCarrinho = itens.map((item, i) => {
      if (i === index) {
        const novaQuantidade = item.quantidade + 1;
        onUpdateCart(index, novaQuantidade);
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });

    setItens(novoCarrinho);
  };

  const handleDecrement = (index) => {
    const novoCarrinho = itens.map((item, i) => {
      if (i === index && item.quantidade > 1) {
        const novaQuantidade = item.quantidade - 1;
        onUpdateCart(index, novaQuantidade);
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });

    setItens(novoCarrinho);
  };

  const total = itens.reduce((acc, item) => acc + item.preco_produto * item.quantidade, 0).toFixed(2);

  return (
    <div className="container mt-5" aria-label="Carrinho de compras" role="main">
      <div className="cart-container p-4 border rounded" aria-label="Carrinho de compras" role="region">
        <div className="d-flex justify-content-between align-items-center text-black">
          <h2 tabIndex={0} role="heading" aria-level="2">Seu Carrinho</h2>
        </div>
        {itens.length === 0 ? (
           <div className="d-flex justify-content-between align-items-center text-black">
          <p tabIndex={0} role="status">Seu carrinho está vazio.</p>

           <button
                className="btn btn-outline-warning "
                style={{ color: '#fff', borderColor: '#ff9800', backgroundColor: '#ff9800' }}
                onClick={() => (typeof setPagina === 'function' ? setPagina('home') : window.location.assign('/'))}
                aria-label="Adicionar mais itens ao carrinho"
                tabIndex={0}
              >
                Adicionar itens
              </button>
              
          </div>
          
        ) : (
          <>
            <div className="row" role="list" aria-label="Lista de itens do carrinho">
              {itens.map((item, index) => (
                <div className="col-6 col-md-3 mb-4" key={index} aria-label={`Item: ${item.nome_produto}, Quantidade: ${item.quantidade}`} tabIndex="0" role="listitem">
                  <div className="card h-100 text-center shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title fs-5 fw-bold text-black" tabIndex={0}>{item.nome_produto}</h3>
                      <p className="card-text text-primary fw-semibold">Preço: R$ {item.preco_produto}</p>
                      <p className="card-text text-black">Estoque: {item.estoque_produto}</p>
                      <div className="input-group mb-2" role="group" aria-label="Alterar quantidade">
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleDecrement(index)} aria-label={`Diminuir quantidade de ${item.nome_produto}`}>-</button>
                        <input
                          type="number"
                          className="form-control text-black text-center"
                          value={item.quantidade}
                          readOnly
                          aria-label={`Quantidade de ${item.nome_produto}`}
                          tabIndex={0}
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncrement(index)} aria-label={`Aumentar quantidade de ${item.nome_produto}`}>+</button>
                      </div>
                      <button className="btn btn-danger mt-auto" onClick={() => removerDoCarrinho(index)} aria-label={`Remover ${item.nome_produto} do carrinho`} tabIndex={0}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 text-black">
              <h4 tabIndex={0}>Total: R$ {total}</h4>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-3 mt-3" role="group" aria-label="Ações do carrinho">
              <button
                className="btn btn-outline-warning"
                style={{ color: '#fff', borderColor: '#ff9800', backgroundColor: '#ff9800' }}
                onClick={() => (typeof setPagina === 'function' ? setPagina('home') : window.location.assign('/'))}
                aria-label="Adicionar mais itens ao carrinho"
                tabIndex={0}
              >
                Adicionar mais itens
              </button>
              <button className="btn btn-success" onClick={onProceedToPayment} aria-label="Ir para a página de pagamento" tabIndex={0}>Finalizar Compra</button>
              <button className="btn btn-danger" onClick={limparCarrinho} aria-label="Limpar carrinho" tabIndex={0}>Limpar Carrinho</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
