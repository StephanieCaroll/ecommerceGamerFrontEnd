import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Carrinho from '../components/Carrinho';
import Payment from '../components/Payment';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

export default function PaginaCarrinho() {
  const [pagina, setPagina] = useState('carrinho');
  const [mensagemToast, setMensagemToast] = useState('');
  const { itensDoCarrinho, removerDoCarrinho, adicionarAoCarrinho } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (pagina === 'home') {
      router.push('/');
    } else if (pagina === 'login') {
      router.push('/login');
    } else if (pagina === 'payment') {
      router.push('/payment');
    }
  }, [pagina, router]);

  const handleRemoveFromCart = (index) => {
    removerDoCarrinho(index);
    setMensagemToast('Produto removido do carrinho!');
    setTimeout(() => setMensagemToast(''), 3000);
  };

  const handleAddToCart = (produto, quantidade) => {
    adicionarAoCarrinho(produto, quantidade);
    setMensagemToast('Produto adicionado ao carrinho!');
    setTimeout(() => setMensagemToast(''), 3000);
  };

  return (
    <div>
      <Header setPagina={setPagina} />
      <main className="main">
        {pagina === 'carrinho' && (
          <Carrinho
            itensDoCarrinho={itensDoCarrinho}
            removerDoCarrinho={handleRemoveFromCart}
            adicionarAoCarrinho={handleAddToCart}
            onGoBack={() => setPagina('home')}
            onProceedToPayment={() => setPagina('payment')}
          />
        )}
        {pagina === 'payment' && <Payment cartItems={itensDoCarrinho} onGoBack={() => setPagina('carrinho')} />}
        {mensagemToast && <Toast mensagem={mensagemToast} />}
      </main>
      <Footer />
    </div>
  );
}
