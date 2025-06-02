import React from 'react';
import Carrinho from '../components/Carrinho';

export default function Pedidos({ itensDoCarrinho, removerDoCarrinho }) {
  return (
    <div>
      <Carrinho itensDoCarrinho={itensDoCarrinho} removerDoCarrinho={removerDoCarrinho} />
    </div>
  );
}
