import React, { useState, useEffect } from 'react';
import { FaUniversalAccess, FaFont, FaAdjust, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function WidgetAcessibilidade() {

  const [estaAberto, setEstaAberto] = useState(false);
  const [ehAltoContraste, setEhAltoContraste] = useState(false);
  const [multiplicadorTamanhoFonte, setMultiplicadorTamanhoFonte] = useState(1); 

  useEffect(() => {
  
    const contrasteSalvo = localStorage.getItem('acessibilidade-altoContraste');
    if (contrasteSalvo !== null) {
      const contrasteAnalisado = JSON.parse(contrasteSalvo);
      setEhAltoContraste(contrasteAnalisado);
      if (contrasteAnalisado) {
        document.body.classList.add('alto-contraste'); 
      }
    }

    const tamanhoFonteSalvo = localStorage.getItem('acessibilidade-tamanhoFonte');
    if (tamanhoFonteSalvo) {
      const tamanhoFonteAnalisado = parseFloat(tamanhoFonteSalvo);
      setMultiplicadorTamanhoFonte(tamanhoFonteAnalisado);
      
      document.documentElement.style.setProperty('--multiplicador-tamanho-fonte', tamanhoFonteAnalisado);
    }
  }, []); 

  useEffect(() => {
    if (ehAltoContraste) {
      document.body.classList.add('alto-contraste');
    } else {
      document.body.classList.remove('alto-contraste');
    }
   
    localStorage.setItem('acessibilidade-altoContraste', JSON.stringify(ehAltoContraste));
  }, [ehAltoContraste]);


  useEffect(() => {
   
    document.documentElement.style.setProperty('--multiplicador-tamanho-fonte', multiplicadorTamanhoFonte);
    
    localStorage.setItem('acessibilidade-tamanhoFonte', multiplicadorTamanhoFonte.toString());
  }, [multiplicadorTamanhoFonte]); 

  const alternarAltoContraste = () => {
    setEhAltoContraste(prev => !prev);
  };

  const aumentarTamanhoFonte = () => {
    setMultiplicadorTamanhoFonte(prev => Math.min(prev + 0.1, 1.3));
  };

  const diminuirTamanhoFonte = () => {
    setMultiplicadorTamanhoFonte(prev => Math.max(prev - 0.1, 0.8));
  };

  const resetarTamanhoFonte = () => {
    setMultiplicadorTamanhoFonte(1);
  };

  return (
    <div className="container-widget-acessibilidade">
      {/* Botão principal para abrir/fechar o menu de acessibilidade */}
      <button
        className="botao-alternar-acessibilidade"
        onClick={() => setEstaAberto(!estaAberto)}
        aria-label={estaAberto ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"}
        title={estaAberto ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"}
      >
        <FaUniversalAccess size={24} /> {/* Ícone de acessibilidade */}
      </button>

      {/* Menu de opções de acessibilidade, visível apenas quando 'estaAberto' é true */}
      {estaAberto && (
        <div className="menu-acessibilidade card p-3 shadow-lg" role="menu" aria-label="Opções de acessibilidade">
          {/* Botão para alternar Alto Contraste */}
          <button
            onClick={alternarAltoContraste}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label={`Alternar alto contraste. Atualmente ${ehAltoContraste ? 'ativado' : 'desativado'}.`}
            role="menuitem"
          >
            <FaAdjust className="me-2" /> Alto Contraste
          </button>
          {/* Botão para Aumentar Fonte */}
          <button
            onClick={aumentarTamanhoFonte}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label="Aumentar tamanho da fonte"
            role="menuitem"
          >
            <FaFont className="me-2" /> Aumentar Fonte (A+)
          </button>
          {/* Botão para Diminuir Fonte */}
          <button
            onClick={diminuirTamanhoFonte}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label="Diminuir tamanho da fonte"
            role="menuitem"
          >
            <FaFont className="me-2" /> Diminuir Fonte (A-)
          </button>
          {/* Botão para Resetar Fonte */}
          <button
            onClick={resetarTamanhoFonte}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center"
            aria-label="Redefinir tamanho da fonte para o padrão"
            role="menuitem"
          >
            <FaFont className="me-2" /> Resetar Fonte
          </button>
          {/* Botão para Fechar o menu de acessibilidade */}
          <button
            className="btn btn-sm btn-danger botao-fechar-acessibilidade"
            onClick={() => setEstaAberto(false)}
            aria-label="Fechar menu de acessibilidade"
            title="Fechar"
          >
            <FaTimes size={16} /> Fechar
          </button>
        </div>
      )}
    </div>
  );
}