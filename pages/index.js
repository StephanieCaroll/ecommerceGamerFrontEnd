import { useEffect, useState } from "react";
import AreaProtegida from "../components/AreaAdministrativa";
import Carrinho from "../components/Carrinho";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListaDeProdutos from "../components/ListaDeProdutos";
import Login from "../components/Login";
import Payment from "../components/Payment";
import Toast from "../components/Toast";
import { useCart } from "../context/CartContext";
import { useProdutos } from "../hooks/useProdutos";
import "../styles/toast.css";

export default function Home() {
  const [pagina, setPagina] = useState("home");
  const [mensagemToast, setMensagemToast] = useState("");
  const [tipoToast, setTipoToast] = useState("");
  const { itensDoCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, setItensDoCarrinho } = useCart();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  let toastTimeout = null;

  const { produtos, loading } = useProdutos();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    }
  }, []);

  const mostrarToast = (mensagem, tipo, duracao = 2000) => {
    clearTimeout(toastTimeout);
    setMensagemToast(mensagem);
    setTipoToast(tipo);
    toastTimeout = setTimeout(() => setMensagemToast(""), duracao);
  };

  const handleAddToCart = (produto, quantidade) => {
    adicionarAoCarrinho(produto, quantidade);
    mostrarToast("Produto adicionado ao carrinho!", "add");
  };

  const handleRemoveFromCart = (index) => {
    removerDoCarrinho(index);
    mostrarToast("Produto removido do carrinho!", "remove");
  };

  const handleGoBack = () => {
    setPagina("home");
  };

  const handleProceedToPayment = () => {
    if (itensDoCarrinho.length === 0) {
      mostrarToast("Seu carrinho está vazio!", "error");
      return;
    }
    setPagina("payment");
  };

  const handleUpdateCart = (index, quantidade) => {
    const novoCarrinho = itensDoCarrinho.map((item, i) => {
      if (i === index) {
        return { ...item, quantidade };
      }
      return item;
    });
    setItensDoCarrinho(novoCarrinho);
    mostrarToast("Quantidade atualizada!", "update");
  };

  const handleVerMais = (categoria) => {
    setCategoriaSelecionada(categoria);
  };

  const handleVoltar = () => {
    setCategoriaSelecionada(null);
  };

  const handleLoginSuccess = (usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    mostrarToast(`Bem-vindo, ${usuario.nome_usuario}!`, "success");
    setPagina("home");
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    limparCarrinho();
    localStorage.removeItem("usuarioLogado");
    mostrarToast("Logout realizado com sucesso!", "success");
    setPagina("home");
  };

  return (
    <div>
      <Header
        setPagina={setPagina}
        cartItemCount={itensDoCarrinho.length}
        usuarioLogado={usuarioLogado}
        onLogout={handleLogout}
        aria-label="Cabeçalho do site"
      />
      <main className="main">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <>
            {pagina === "home" && (
              <ListaDeProdutos
                produtos={produtos}
                adicionarAoCarrinho={handleAddToCart}
                categoriaSelecionada={categoriaSelecionada}
                handleVerMais={handleVerMais}
                handleVoltar={handleVoltar}
                aria-label="Lista de produtos disponíveis"
              />
            )}
            {pagina === "carrinho" && (
              <Carrinho
                itensDoCarrinho={itensDoCarrinho}
                removerDoCarrinho={handleRemoveFromCart}
                adicionarAoCarrinho={adicionarAoCarrinho}
                onGoBack={handleGoBack}
                onProceedToPayment={handleProceedToPayment}
                onUpdateCart={handleUpdateCart}
                aria-label="Carrinho de compras"
              />
            )}
            {pagina === "login" && <Login onLoginSuccess={handleLoginSuccess} aria-label="Tela de login" />}
            {pagina === "payment" && <Payment cartItems={itensDoCarrinho} onGoBack={() => setPagina("carrinho")} aria-label="Tela de pagamento" />}
            {pagina === "protected" && <AreaProtegida aria-label="Área protegida" />}
          </>
        )}
        {mensagemToast && <Toast mensagem={mensagemToast} tipo={tipoToast} aria-live="polite" />}
      </main>
      <Footer aria-label="Rodapé do site" />
    </div>
  );
}
