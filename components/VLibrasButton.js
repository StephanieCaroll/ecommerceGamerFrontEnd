import React, { useState, useEffect, useRef, useCallback } from "react";
import Script from 'next/script';
import { FaSignLanguage } from "react-icons/fa";

export default function VLibrasButton() {
  const [librasActive, setLibrasActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const vlibrasAccessButton = useRef(null);
  const observerRef = useRef(null);
  const widgetInitializedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("librasActive");
      if (saved !== null) {
        setLibrasActive(JSON.parse(saved));
      }
    }
  }, []);

  const toggleWidgetDisplay = useCallback((activate) => {
    if (vlibrasAccessButton.current) {
      vlibrasAccessButton.current.classList.toggle("active", activate);
      const vlibrasRoot = document.querySelector('div[vw]');
      if (vlibrasRoot) {
        vlibrasRoot.classList.toggle("enabled", activate);
        if (!activate) {
          window.dispatchEvent(new CustomEvent("vp-widget-close"));
        }
      }
    }
  }, []);

  const initializeVLibrasWidget = useCallback(() => {
    if (widgetInitializedRef.current || typeof window === 'undefined' || !window.VLibras) {
      return;
    }

    try {
      new window.VLibras.Widget({
        rootPath: 'https://vlibras.gov.br/app',
        personalization: 'https://vlibras.gov.br/config/default_logo.json',
        position: 'L',
        avatar: 'random'
      });
      widgetInitializedRef.current = true;

      const observer = new MutationObserver(() => {
        const button = document.querySelector('[vw-access-button]');
        const pluginWrapper = document.querySelector('[vw-plugin-wrapper]');
        if (button && pluginWrapper) {
          vlibrasAccessButton.current = button;
          observer.disconnect();
          toggleWidgetDisplay(librasActive);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
      observerRef.current = observer;
    } catch (error) {
      console.error('Erro ao criar VLibras.Widget:', error);
    }
  }, [toggleWidgetDisplay, librasActive]);

  useEffect(() => {
    if (!isClient) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem("librasActive", JSON.stringify(librasActive));
    }

    if (widgetInitializedRef.current && vlibrasAccessButton.current) {
      toggleWidgetDisplay(librasActive);
    } else if (librasActive && window.VLibras && !widgetInitializedRef.current) {
      initializeVLibrasWidget();
    }
  }, [librasActive, isClient, initializeVLibrasWidget, toggleWidgetDisplay]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (librasActive && !widgetInitializedRef.current) {
            initializeVLibrasWidget();
          }
        }}
        onError={(e) => console.error("Erro ao carregar o VLibras:", e)}
        id="vlibras-plugin-script-next"
      />

      <button 
        className="vlibras-btn"
        onClick={() => {
          setLibrasActive(prev => !prev);
          if (!widgetInitializedRef.current && window.VLibras) {
            initializeVLibrasWidget();
          }
        }}
        aria-label={librasActive ? "Desativar Libras" : "Ativar Libras"}
        aria-pressed={librasActive}
      >
        <FaSignLanguage />
      </button>

      <style jsx global>{`
        .vlibras-btn {
          position: fixed;
          bottom: 25px;
          left: 25px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: ${librasActive ? '#4a6cf7' : 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)'};
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9999;
          transition: all 0.3s ease;
        }

        .vlibras-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .vlibras-btn svg {
          width: 25px;
          height: 25px;
        }

        div[vw].enabled {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        [vw-access-button].active {
          display: flex !important;
        }

        [vw-plugin-wrapper].active {
          display: flex !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>
    </>
  );
}
