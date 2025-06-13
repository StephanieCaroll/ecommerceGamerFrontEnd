import React, { useState, useEffect } from 'react';
import { FaUniversalAccess, FaFont, FaAdjust, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); 

  useEffect(() => {
    const savedContrast = localStorage.getItem('accessibility-highContrast');
    if (savedContrast !== null) {
      const parsedContrast = JSON.parse(savedContrast);
      setIsHighContrast(parsedContrast);
      if (parsedContrast) {
        document.body.classList.add('high-contrast');
      }
    }

    const savedFontSize = localStorage.getItem('accessibility-fontSize');
    if (savedFontSize) {
      const parsedFontSize = parseFloat(savedFontSize);
      setFontSizeMultiplier(parsedFontSize);
      document.documentElement.style.setProperty('--font-size-multiplier', parsedFontSize);
    }
  }, []);

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-highContrast', JSON.stringify(isHighContrast));
  }, [isHighContrast]);

  useEffect(() => {

    document.documentElement.style.setProperty('--font-size-multiplier', fontSizeMultiplier);
    localStorage.setItem('accessibility-fontSize', fontSizeMultiplier.toString());
  }, [fontSizeMultiplier]);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  const increaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.min(prev + 0.1, 1.3)); 
  };

  const decreaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.max(prev - 0.1, 0.8)); 
  };

  const resetFontSize = () => {
    setFontSizeMultiplier(1);
  };

  return (
    <div className="accessibility-widget-container">
      <button
        className="accessibility-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"}
        title={isOpen ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade"}
      >
        <FaUniversalAccess size={24} />
      </button>

      {isOpen && (
        <div className="accessibility-menu card p-3 shadow-lg" role="menu" aria-label="Opções de acessibilidade">
          <button
            onClick={toggleHighContrast}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label={`Alternar alto contraste. Atualmente ${isHighContrast ? 'ativado' : 'desativado'}.`}
            role="menuitem"
          >
            <FaAdjust className="me-2" /> Alto Contraste
          </button>
          <button
            onClick={increaseFontSize}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label="Aumentar tamanho da fonte"
            role="menuitem"
          >
            <FaFont className="me-2" /> Aumentar Fonte (A+)
          </button>
          <button
            onClick={decreaseFontSize}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center mb-2"
            aria-label="Diminuir tamanho da fonte"
            role="menuitem"
          >
            <FaFont className="me-2" /> Diminuir Fonte (A-)
          </button>
          <button
            onClick={resetFontSize}
            className="btn btn-sm btn-block btn-outline-dark d-flex align-items-center"
            aria-label="Redefinir tamanho da fonte para o padrão"
            role="menuitem"
          >
            <FaFont className="me-2" /> Resetar Fonte
          </button>
          <button
            className="btn btn-sm btn-danger accessibility-close-button"
            onClick={() => setIsOpen(false)}
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