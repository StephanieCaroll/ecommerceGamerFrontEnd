import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ setPagina, cartItemCount, usuarioLogado, onLogout }) {
  const router = useRouter();

  return (
    <header className="header bg-dark text-white py-3" aria-label="Cabeçalho do site" role="banner">
      <nav className="navbar navbar-expand-lg navbar-dark container" aria-label="Navegação principal" role="navigation">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-house-door me-2" aria-hidden="true"></i>
            <Link href="/" legacyBehavior>
              <a
                className="navbar-brand"
                onClick={() => setPagina("home")}
                aria-label="Ir para a página inicial"
                tabIndex={0}
                role="link"
              >
                Gamer-Store
              </a>
            </Link>
          </div>
          <div className="d-flex align-items-center" role="menubar" aria-label="Menu de navegação">
            <button
              className="btn btn-outline-light me-2 d-flex align-items-center"
              onClick={() => setPagina("home")}
              aria-label="Ir para a página inicial"
              tabIndex={0}
              role="menuitem"
            >
              <i className="bi bi-house-door me-1" aria-hidden="true"></i>
              Home
            </button>
            {usuarioLogado && (
              <button
                className="btn btn-outline-light me-2 d-flex align-items-center"
                onClick={() => setPagina("protected")}
                aria-label="Ir para a área administrativa"
                tabIndex={0}
                role="menuitem"
              >
                <i className="bi bi-shield-lock me-1" aria-hidden="true"></i>
                Área Administrativa
              </button>
            )}
            <button
              className="btn btn-outline-light me-2"
              onClick={() => setPagina("carrinho")}
              aria-label={`Ir para o carrinho de compras com ${cartItemCount} itens`}
              tabIndex={0}
              role="menuitem"
            >
              Carrinho ({cartItemCount})
            </button>
            {!usuarioLogado && (
              <button
                className="btn btn-outline-light me-2 d-flex align-items-center"
                onClick={() => setPagina("login")}
                aria-label="Ir para a página de login"
                tabIndex={0}
                role="menuitem"
              >
                <i className="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>
                Login
              </button>
            )}
            {usuarioLogado && (
              <>
                <span
                  className="text-success me-2 d-flex align-items-center"
                  aria-label={`Bem-vindo, ${usuarioLogado.nome_usuario}`}
                  tabIndex={0}
                  role="status"
                >
                  <i className="bi bi-person-circle me-1" aria-hidden="true"></i>
                  Bem-vindo, {usuarioLogado.nome_usuario}
                </span>
                <button
                  className="btn btn-outline-light"
                  onClick={onLogout}
                  aria-label="Fazer logout"
                  tabIndex={0}
                  role="menuitem"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
