import React, { useState, useEffect } from 'react';
import { FaUniversalAccess, FaFont, FaAdjust, FaTimes, FaSignLanguage } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export default function AccessibilityWidget() {
  const [estaAberto, setEstaAberto] = useState(false);
  const [ehAltoContraste, setEhAltoContraste] = useState(false);
  const [multiplicadorTamanhoFonte, setMultiplicadorTamanhoFonte] = useState(1);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-widget.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      new window.VLibras.Widget('https://vlibras.gov.br/app', 'top', ['acessibility-button'], 'button');
    };
  }, []);

  useEffect(() => {
    const contrasteSalvo = localStorage.getItem('acessibilidade-altoContraste');
    if (contrasteSalvo !== null) {
      setEhAltoContraste(JSON.parse(contrasteSalvo));
      document.body.classList.toggle('alto-contraste', JSON.parse(contrasteSalvo));
    }

    const tamanhoFonteSalvo = localStorage.getItem('acessibilidade-tamanhoFonte');
    if (tamanhoFonteSalvo) {
      setMultiplicadorTamanhoFonte(parseFloat(tamanhoFonteSalvo));
      document.documentElement.style.setProperty('--multiplicador-tamanho-fonte', tamanhoFonteSalvo);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('alto-contraste', ehAltoContraste);
    localStorage.setItem('acessibilidade-altoContraste', JSON.stringify(ehAltoContraste));
  }, [ehAltoContraste]);

  useEffect(() => {
    document.documentElement.style.setProperty('--multiplicador-tamanho-fonte', multiplicadorTamanhoFonte);
    localStorage.setItem('acessibilidade-tamanhoFonte', multiplicadorTamanhoFonte.toString());
  }, [multiplicadorTamanhoFonte]);

  return (
    <div className="container-widget-acessibilidade">
      <button className="botao-alternar-acessibilidade" onClick={() => setEstaAberto(!estaAberto)}>
        <FaUniversalAccess size={24} />
      </button>
      {estaAberto && (
        <div className="menu-acessibilidade card p-3 shadow-lg">
          <button onClick={() => setEhAltoContraste(prev => !prev)} className="btn btn-sm btn-outline-dark">
            <FaAdjust className="me-2" /> Alto Contraste
          </button>
          <button onClick={() => setMultiplicadorTamanhoFonte(prev => Math.min(prev + 0.1, 1.3))} className="btn btn-sm btn-outline-dark">
            <FaFont className="me-2" /> Aumentar Fonte (A+)
          </button>
          <button onClick={() => setMultiplicadorTamanhoFonte(prev => Math.max(prev - 0.1, 0.8))} className="btn btn-sm btn-outline-dark">
            <FaFont className="me-2" /> Diminuir Fonte (A-)
          </button>
          <button onClick={() => setMultiplicadorTamanhoFonte(1)} className="btn btn-sm btn-outline-dark">
            <FaFont className="me-2" /> Resetar Fonte
          </button>
          <button id="acessibility-button" className="btn btn-sm btn-outline-dark">
            <FaSignLanguage className="me-2" /> Libras 
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => setEstaAberto(false)}>
            <FaTimes size={16} /> Fechar
          </button>
        </div>
      )}
    </div>
  );
}
