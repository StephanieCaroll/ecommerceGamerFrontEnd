export default function Footer() {
  return (
    <footer className="py-5 bg-dark text-white text-center" aria-label="Rodapé do site" role="contentinfo">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 mb-3">
            <h5 id="footer-loja">Gamer Store</h5>
            <ul className="nav flex-column" aria-labelledby="footer-loja" role="list">
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Características</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Preços</li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <h5 id="footer-categorias">Categorias</h5>
            <ul className="nav flex-column" aria-labelledby="footer-categorias" role="list">
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Ação</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Aventura</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Estratégia</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Entre outros...</li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <h5 id="footer-contato">Contato</h5>
            <ul className="nav flex-column" aria-labelledby="footer-contato" role="list">
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Endereço: Av. dos Pro Players, 1337 – São Paulo, SP, Brasil</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Horário de funcionamento: Segunda a Sexta, das 9h às 18h</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Email: suporte@ultragamerstore.com</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Telefone: (11) 98765-4321</li>
              <li className="nav-item mb-2" tabIndex={0} role="listitem">Instagram: @ultragamerstore</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <p>&copy; 2025 Gamer-Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
