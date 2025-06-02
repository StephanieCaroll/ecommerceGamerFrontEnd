import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    try {
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
      setItensDoCarrinho(carrinhoSalvo);
    } catch (error) {
      console.error("Erro ao carregar carrinho do localStorage:", error);
      setItensDoCarrinho([]);
    }
  }, []);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem('carrinho', JSON.stringify(itensDoCarrinho));
    }, 0);
  }, [itensDoCarrinho]);

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setItensDoCarrinho((prevItens) => {
      const existe = prevItens.find((item) => item.id_produto === produto.id_produto);
  
      let novoCarrinho;
      if (existe) {
        novoCarrinho = prevItens.map((item) =>
          item.id_produto === produto.id_produto ? { ...item, quantidade: item.quantidade + quantidade } : item
        );
      } else {
        novoCarrinho = [...prevItens, { ...produto, quantidade }];
      }

      setTimeout(() => {
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      }, 0);

      return novoCarrinho;
    });

    setProdutos((prevProdutos) =>
      prevProdutos.map((item) =>
        item.id_produto === produto.id_produto ? { ...item, estoque_produto: item.estoque_produto - quantidade } : item
      )
    );
  };
  
  const removerDoCarrinho = (index) => {
    setItensDoCarrinho((prevItens) => {
      const itemRemovido = prevItens[index];
      const novosItens = prevItens.filter((_, i) => i !== index);

      setTimeout(() => {
        localStorage.setItem('carrinho', JSON.stringify(novosItens));
      }, 0);

      setProdutos((prevProdutos) =>
        prevProdutos.map((item) =>
          item.id_produto === itemRemovido.id_produto ? { ...item, estoque_produto: item.estoque_produto + itemRemovido.quantidade } : item
        )
      );

      return novosItens;
    });
  };

  const limparCarrinho = () => {
    setItensDoCarrinho([]);
    localStorage.removeItem('carrinho');
  };

  const finalizarCompra = async () => {
    try {
      await Promise.all(itensDoCarrinho.map(async (item) => {
        await axios.put(`http://localhost:3001/produtos/${item.id_produto}`, {
          estoque_produto: item.estoque_produto - item.quantidade
        });
      }));
      limparCarrinho();
      alert('Compra finalizada com sucesso!');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar compra. Por favor, tente novamente.');
    }
  };

  return (
    <CartContext.Provider value={{ itensDoCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, finalizarCompra, usuarioLogado, setUsuarioLogado, setItensDoCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
