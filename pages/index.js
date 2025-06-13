import { useEffect, useState } from "react";
import AreaProtegida from "../components/AreaAdministrativa";
import AccessibilityWidget from "../components/AccessibilityWidget";
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
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [pagina, setPagina] = useState("home");
  const [mensagemToast, setMensagemToast] = useState("");
  const [tipoToast, setTipoToast] = useState("");
  const { itensDoCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, setItensDoCarrinho } = useCart();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [progresso, setProgresso] = useState(0);
  const [produtoDetalheAberto, setProdutoDetalheAberto] = useState(false); 
  let toastTimeout = null;

  const { produtos, loading } = useProdutos();
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const produtosExibidos = produtos.filter(produto => {
    const nomeCorresponde = produto.nome_produto.toLowerCase().includes(termoPesquisa.toLowerCase());
    const descricaoCorresponde = produto.descricao_produto ? produto.descricao_produto.toLowerCase().includes(termoPesquisa.toLowerCase()) : false;
    const categoriaCorresponde = categoriaSelecionada ? produto.categoria === categoriaSelecionada : true;

    return (nomeCorresponde || descricaoCorresponde) && categoriaCorresponde;
  });

  useEffect(() => {
    let intervalo;
    if (loading) {
      setProgresso(0);
      intervalo = setInterval(() => {
        setProgresso(progressoAntigo => {
          const novoProgresso = progressoAntigo + 5;
          if (novoProgresso >= 95) {
            clearInterval(intervalo);
            return 95;
          }
          return novoProgresso;
        });
      }, 100);
    } else {
      setProgresso(100);
      clearInterval(intervalo);
    }

    return () => {
      clearInterval(intervalo);
    };
  }, [loading]);

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
    setTermoPesquisa("");
    setCategoriaSelecionada(null);
    setProdutoDetalheAberto(false); 
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
    setTermoPesquisa("");
  };

  const handleVoltar = () => {
    setCategoriaSelecionada(null);
    setTermoPesquisa("");
    setProdutoDetalheAberto(false); 
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

  const handleProductCardClick = () => {
    setProdutoDetalheAberto(true);
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

      {pagina === "home" && !loading && !produtoDetalheAberto && (
        <div className="banner-container">
          <Image
            src="/images/bluePixel.gif"
            alt="gif de banner"
            width={1200}
            height={250}
            layout="responsive"
            objectFit="cover"
          />
          <div className="banner-text">
            <h1>Ofertas Exclusivas de Tecnologia!</h1>
          </div>
        </div>
      )}

      {pagina === "home" && !loading && !produtoDetalheAberto && (
        <div className="container my-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produtos (nome, descrição ou categoria)..."
              aria-label="Buscar produtos"
              value={termoPesquisa}
              onChange={(e) => {
                setTermoPesquisa(e.target.value);
                setCategoriaSelecionada(null); 
              }}
            />
            <button className="btn btn-outline-dark" type="button" onClick={() => { }}>
              <i className="bi bi-search"></i> Pesquisar
            </button>
            {termoPesquisa && ( 
              <button
                className="btn btn-outline-danger ms-2"
                type="button"
                onClick={() => setTermoPesquisa("")}
                aria-label="Limpar pesquisa"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      )}

      <main className="main">
        {loading ? (
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="text-center">
              <p className="mb-3 text-black">Carregando produtos...</p>
              <div className="progress" style={{ width: '500px', height: '20px' }} role="progressbar" aria-valuenow={progresso} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                  style={{ width: `${progresso}%`, transition: 'width .5s ease-in-out' }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {pagina === "home" && (
              <ListaDeProdutos
                produtos={produtosExibidos}
                adicionarAoCarrinho={handleAddToCart}
                categoriaSelecionada={categoriaSelecionada}
                handleVerMais={handleVerMais}
                handleVoltar={handleVoltar}
                onProductClick={handleProductCardClick} 
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
       <AccessibilityWidget />
    </div>
    
  );
}