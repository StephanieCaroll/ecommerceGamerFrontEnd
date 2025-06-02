import axios from 'axios';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Payment({ cartItems, onGoBack }) {
  const { limparCarrinho } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.preco_produto * item.quantidade, 0).toFixed(2);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const handlePayment = async (event) => {
    event.preventDefault();
    try {
      await Promise.all(cartItems.map(async (item) => {
        await axios.put(`http://localhost:3001/produtos/${item.id_produto}`, {
          estoque_produto: item.estoque_produto - item.quantidade
        });
      }));
      alert('Pagamento realizado com sucesso!');
      limparCarrinho();
      onGoBack();
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Por favor, tente novamente.');
    }
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'credit':
      case 'debit':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="cardType" className="form-label">Tipo do Cartão</label>
              <select
                className="form-select"
                id="cardType"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                required
                aria-label="Selecione o tipo do cartão"
              >
                <option value="">Selecione o tipo do cartão</option>
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="cardName" className="form-label">Nome no Cartão</label>
              <input
                type="text"
                className="form-control"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
                aria-label="Digite o nome no cartão"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Número do Cartão</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                aria-label="Digite o número do cartão"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">Data de Validade</label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                aria-label="Digite a data de validade do cartão"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                aria-label="Digite o CVV do cartão"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Digite a senha do cartão"
              />
            </div>
          </>
        );
      case 'paypal':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="paypalEmail" className="form-label">E-mail do PayPal</label>
              <input
                type="email"
                className="form-control"
                id="paypalEmail"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
                aria-label="Digite o e-mail do PayPal"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Digite a senha do PayPal"
              />
            </div>
          </>
        );
      case 'transferencia':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="bankName" className="form-label">Nome do Banco</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
                aria-label="Digite o nome do banco"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountNumber" className="form-label">Número da Conta</label>
              <input
                type="text"
                className="form-control"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                aria-label="Digite o número da conta"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Digite a senha da conta"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5" aria-label="Tela de pagamento" role="main">
      <div className="payment-container p-4 border rounded" role="region" aria-label="Formulário de pagamento">
        <h2 tabIndex={0} role="heading" aria-level="2">Pagamento</h2>
        <p tabIndex={0}>Total: R$ {total}</p>
        <div className="cart-summary" role="list" aria-label="Resumo do carrinho">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item" aria-label={`Produto: ${item.nome_produto}, Quantidade: ${item.quantidade}, Preço Total: R$ ${(item.preco_produto * item.quantidade).toFixed(2)}`} tabIndex="0" role="listitem">
              <p>Produto: {item.nome_produto}</p>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço Total: R$ {(item.preco_produto * item.quantidade).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handlePayment} role="form" aria-label="Formulário de pagamento">
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Método de Pagamento</label>
            <select
              className="form-select"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              aria-label="Selecione o método de pagamento"
              tabIndex={0}
            >
              <option value="">Selecione um método</option>
              <option value="credit">Cartão</option>
              <option value="paypal">PayPal</option>
              <option value="transferencia">Transferência Bancária</option>
            </select>
          </div>
          {renderPaymentFields()}
          {paymentMethod !== 'boleto' && (
            <button type="submit" className="btn btn-primary" aria-label="Enviar pagamento" tabIndex={0}>Enviar Pagamento</button>
          )}
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-secondary" onClick={() => onGoBack('home')} aria-label="Voltar para a página inicial" tabIndex={0}>← Voltar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
