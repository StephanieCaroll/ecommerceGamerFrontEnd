import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="py-5 bg-dark text-white text-center" aria-label="Rodapé do site" role="contentinfo">
      <div className="container">
        <div className="row justify-content-center">
         
          <div className="col-12 col-md-4 mb-4">
            <h5 id="footer-sobre-nos" className="text-uppercase mb-3">Sobre a Gamer Store</h5>
            <ul className="nav flex-column" aria-labelledby="footer-sobre-nos" role="list">
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Quem Somos
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Recursos
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Planos e Preços
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 id="footer-categorias-tecnologia" className="text-uppercase mb-3">Venda de Tecnologias (Categorias)</h5>
            <ul className="nav flex-column" aria-labelledby="footer-categorias-tecnologia" role="list">
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Consoles e Acessórios
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Mouses, Teclados e Headsets
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  PCs Gamers e Periféricos
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Realidade Virtual
                </Link>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <Link href="/" className="nav-link p-0 text-white-50">
                  Ver Todos os Produtos
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 id="footer-contato" className="text-uppercase mb-3">Atendimento e Contato</h5>
            <ul className="nav flex-column" aria-labelledby="footer-contato" role="list">
              <li className="nav-item mb-2 text-white-50" tabIndex={0} role="listitem">
                <i className="bi bi-geo-alt-fill me-2"></i>Av. dos Pro Players, 1337 – São Paulo, SP, Brasil
              </li>
              <li className="nav-item mb-2 text-white-50" tabIndex={0} role="listitem">
                <i className="bi bi-clock-fill me-2"></i>Segunda a Sexta, 9h às 18h
              </li>
              <li className="nav-item mb-2" role="listitem">
                <a href="mailto:suporte@gamerstore.com" className="nav-link p-0 text-white-50">
                  <i className="bi bi-envelope-fill me-2"></i>suporte@gamerstore.com
                </a>
              </li>
              <li className="nav-item mb-2" role="listitem">
                <a href="tel:+5511987654321" className="nav-link p-0 text-white-50">
                  <i className="bi bi-telephone-fill me-2"></i>(11) 98765-4321
                </a>
              </li>
            </ul>
           
            <div className="d-flex justify-content-center mt-3"> 
              <a href="https://instagram.com/gamerstore" target="_blank" rel="noopener noreferrer" aria-label="Visite nosso Instagram" className="text-white-50 me-3 fs-4">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://facebook.com/gamerstore" target="_blank" rel="noopener noreferrer" aria-label="Visite nosso Facebook" className="text-white-50 me-3 fs-4">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com/gamerstore" target="_blank" rel="noopener noreferrer" aria-label="Visite nosso Twitter" className="text-white-50 me-3 fs-4">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 text-md-start">
            <p className="mb-0 text-white-50">&copy; {new Date().getFullYear()} Gamer-Store. Todos os direitos reservados.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link href="/" className="text-white-50 text-decoration-none">
                  Política de Privacidade
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/" className="text-white-50 text-decoration-none">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}