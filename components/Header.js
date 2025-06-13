import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import Image from 'next/image';

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />

export default function Header({
  setPagina,
  cartItemCount,
  usuarioLogado,
  onLogout,
}) {
  const router = useRouter();

  return (
    <header
      className="header bg-white text-dark py-2 shadow"
      aria-label="Cabeçalho do site"
      role="banner"
    >
      <nav
        className="navbar navbar-expand-lg navbar-light container"
        aria-label="Navegação principal"
        role="navigation"
      >
         <Link href="/" legacyBehavior>
          <a
            className="navbar-brand d-flex align-items-center" 
            onClick={() => setPagina("home")}
            aria-label="Ir para a página inicial"
            tabIndex={0}
            role="link"
          >
           
            <Image
              src="/images/logo-transparent.png" 
              alt="Logo Gamer-Store"
              width={200} 
              height={50}
              className="d-inline-block align-top"
              style={{ objectFit: 'contain', marginRight: '10px' }}
            />
          </a>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex align-items-center ms-auto">
            <button
              className="btn btn-outline-dark me-2 d-flex align-items-center transition"
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
                className="btn btn-outline-dark me-2 d-flex align-items-center transition"
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
              className="btn btn-outline-dark me-2 d-flex align-items-center transition"
              onClick={() => setPagina("carrinho")}
              aria-label={`Ir para o carrinho de compras com ${cartItemCount} itens`}
              tabIndex={0}
              role="menuitem"
            >
              <i className="bi bi-cart me-1" aria-hidden="true"></i>
              Carrinho ({cartItemCount})
            </button>
             
            {!usuarioLogado && (
              <button
                className="btn btn-primary me-2 d-flex align-items-center transition"
                onClick={() => setPagina("login")}
                aria-label="Ir para a página de login"
                tabIndex={0}
                role="menuitem"
              >
                <i
                  className="bi bi-box-arrow-in-right me-1"
                  aria-hidden="true"
                ></i>
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
                  <i
                    className="bi bi-person-circle me-1"
                    aria-hidden="true"
                  ></i>
                  Bem-vindo, {usuarioLogado.nome_usuario}
                </span>
                <button
                  className="btn btn-outline-dark transition"
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
