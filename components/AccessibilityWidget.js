import React, { useState, useEffect, useRef } from "react";
import {
  FaUniversalAccess,
  FaFont,
  FaAdjust,
  FaTimes,
  FaEye,
  FaVolumeUp,
  FaTextHeight,
  FaPauseCircle,
  FaPalette,
  FaChevronDown,
  FaChevronUp,
  FaUndo,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [colorBlindMode, setColorBlindMode] = useState(null);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [readingGuide, setReadingGuide] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false);
  const [customColors, setCustomColors] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [linkColor, setLinkColor] = useState("#0066cc");
  const [showColorOptions, setShowColorOptions] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const loadSetting = (key, defaultValue) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    };

    setHighContrast(loadSetting("highContrast", false));
    setFontSize(loadSetting("fontSize", 1));
    setColorBlindMode(loadSetting("colorBlindMode", null));
    setTextToSpeech(loadSetting("textToSpeech", false));
    setLineSpacing(loadSetting("lineSpacing", 1.5));
    setReadingGuide(loadSetting("readingGuide", false));
    setPauseAnimations(loadSetting("pauseAnimations", false));
    setCustomColors(loadSetting("customColors", false));
    setTextColor(loadSetting("textColor", "#000000"));
    setBgColor(loadSetting("bgColor", "#ffffff"));
    setLinkColor(loadSetting("linkColor", "#0066cc"));
  }, []);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("global-high-contrast");
      document.documentElement.style.filter = "none";
      setColorBlindMode(null);
      setCustomColors(false);
    } else {
      document.documentElement.classList.remove("global-high-contrast");
    }
    localStorage.setItem("highContrast", JSON.stringify(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const applyCustomColors = () => {
      if (customColors && !highContrast) {
        document.documentElement.style.setProperty("--custom-text-color", textColor);
        document.documentElement.style.setProperty("--custom-bg-color", bgColor);
        document.documentElement.style.setProperty("--custom-link-color", linkColor);
        document.documentElement.classList.add("custom-colors-active");
        
        const allTextElements = document.querySelectorAll('body, body *:not(script):not(style)');
        allTextElements.forEach(el => {
          el.style.color = textColor;
        });
        
        document.body.style.backgroundColor = bgColor;
        
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
          link.style.color = linkColor;
        });
      }
    };

    const resetCustomColors = () => {
      document.documentElement.style.setProperty("--custom-text-color", "");
      document.documentElement.style.setProperty("--custom-bg-color", "");
      document.documentElement.style.setProperty("--custom-link-color", "");
      document.documentElement.classList.remove("custom-colors-active");
      
      const allTextElements = document.querySelectorAll('body, body *');
      allTextElements.forEach(el => {
        el.style.color = "";
      });
      
      document.body.style.backgroundColor = "";
      
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        link.style.color = "";
      });
    };

    if (customColors && !highContrast) {
      applyCustomColors();
    } else {
      resetCustomColors();
    }

    localStorage.setItem("customColors", JSON.stringify(customColors));
    localStorage.setItem("textColor", JSON.stringify(textColor));
    localStorage.setItem("bgColor", JSON.stringify(bgColor));
    localStorage.setItem("linkColor", JSON.stringify(linkColor));
  }, [customColors, textColor, bgColor, linkColor, highContrast]);

  const resetCustomColors = () => {
    setTextColor("#000000");
    setBgColor("#ffffff");
    setLinkColor("#0066cc");
    localStorage.setItem("textColor", JSON.stringify("#000000"));
    localStorage.setItem("bgColor", JSON.stringify("#ffffff"));
    localStorage.setItem("linkColor", JSON.stringify("#0066cc"));
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}rem`;
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
  }, [fontSize]);

  useEffect(() => {
    const applyFilter = () => {
      if (!highContrast) {
        document.documentElement.style.filter = colorBlindMode
          ? `url(#${colorBlindMode}-filter)`
          : "none";
      }
      localStorage.setItem("colorBlindMode", JSON.stringify(colorBlindMode));
    };

    const checkFiltersLoaded = setInterval(() => {
      if (document.getElementById("protanopia-filter")) {
        clearInterval(checkFiltersLoaded);
        applyFilter();
      }
    }, 100);

    return () => clearInterval(checkFiltersLoaded);
  }, [colorBlindMode, highContrast]);

  useEffect(() => {
    document.body.style.lineHeight = `${lineSpacing}`;
    localStorage.setItem("lineSpacing", JSON.stringify(lineSpacing));
  }, [lineSpacing]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const guide = document.getElementById("reading-guide");
      if (guide) {
        guide.style.left = `${e.clientX}px`;
        guide.style.top = `${e.clientY}px`;
      }
    };

    if (readingGuide) {
      const guide = document.createElement("div");
      guide.id = "reading-guide";
      guide.style.position = "fixed";
      guide.style.width = "250px";
      guide.style.height = "6px";
      guide.style.backgroundColor = "#ff5252";
      guide.style.zIndex = "9998";
      guide.style.pointerEvents = "none";
      guide.style.transform = "translate(-50%, -50%)";
      guide.style.borderRadius = "3px";
      guide.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
      document.body.appendChild(guide);
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      const guide = document.getElementById("reading-guide");
      if (guide) guide.remove();
      document.removeEventListener("mousemove", handleMouseMove);
    }
    localStorage.setItem("readingGuide", JSON.stringify(readingGuide));
  }, [readingGuide]);

  useEffect(() => {
    const animations = document.querySelectorAll("*");
    animations.forEach((el) => {
      if (pauseAnimations) {
        el.style.animationPlayState = "paused";
        el.style.transition = "none";
      } else {
        el.style.animationPlayState = "";
        el.style.transition = "";
      }
    });
    localStorage.setItem("pauseAnimations", JSON.stringify(pauseAnimations));
  }, [pauseAnimations]);

  useEffect(() => {
    if (textToSpeech) {
      const handleClick = (e) => {
        if (e.target.closest(".accessibility-widget")) return;

        let textToRead = "";

        if (e.target.tagName === "IMG") {
          textToRead = e.target.alt || "Imagem sem descrição";
        } else {
          textToRead = e.target.innerText || e.target.textContent || "";
        }

        if (textToRead && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToRead);
          utterance.lang = "pt-BR";
          window.speechSynthesis.speak(utterance);
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
        window.speechSynthesis?.cancel();
      };
    }
  }, [textToSpeech]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        const toggleButton = document.querySelector(".accessibility-toggle");
        if (toggleButton && toggleButton.contains(event.target)) {
          return;
        }
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <style jsx global>{`
        /* Global High Contrast Mode */
        html.global-high-contrast,
        html.global-high-contrast body,
        html.global-high-contrast
          *:not(.accessibility-toggle):not(.accessibility-toggle *) {
          background: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }

        html.global-high-contrast img {
          filter: contrast(200%) brightness(150%) !important;
        }

        /* Custom Colors */
        :root {
          --text-color: initial;
          --bg-color: initial;
          --link-color: initial;
        }

        .custom-colors-active {
          --text-color: var(--custom-text-color);
          --bg-color: var(--custom-bg-color);
          --link-color: var(--custom-link-color);
        }

        .custom-colors-active body {
          color: var(--text-color) !important;
          background-color: var(--bg-color) !important;
        }

        .custom-colors-active a {
          color: var(--link-color) !important;
        }

        /* Widget Container */
        .accessibility-widget {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 10000;
          filter: none !important;
        }

        /* Toggle Button - Solid Background */
        .accessibility-toggle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%) !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
          transition: all 0.3s ease;
          opacity: 1 !important;
        }

        .accessibility-toggle svg {
          width: 30px;
          height: 30px;
        }

        .accessibility-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
        }

        /* Panel - Solid Background */
        .accessibility-panel {
          position: absolute;
          bottom: calc(100% + 10px);
          right: -10px;
          background: white !important;
          border-radius: 12px;
          padding: 15px 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          width: 320px;
          z-index: 10001;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        /* Button Grid */
        .btn-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 10px;
        }

        /* Buttons - Solid Background */
        .accessibility-btn {
          font-size: 12px;
          padding: 10px 5px;
          min-height: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          background: white !important;
          color: #333;
          transition: all 0.2s ease;
        }

        .accessibility-btn:hover {
          background: #f8f9fa !important;
          transform: translateY(-2px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }

        /* Active States */
        .btn-active {
          background: #4a6cf7 !important;
          color: white !important;
          border-color: #4a6cf7 !important;
        }

        .btn-dark {
          background: #333 !important;
          color: white !important;
          border-color: #333 !important;
        }

        /* Close Button */
        .close-btn {
          width: 100%;
          margin-top: 5px;
          background: #ff4757 !important;
          color: white !important;
          border: none !important;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        /* Section Titles */
        .section-title {
          font-size: 13px;
          color: #666;
          margin: 10px 0 5px;
          padding-bottom: 3px;
          border-bottom: 1px solid #eee;
        }

        /* Color Options */
        .color-options-container {
          margin-top: 10px;
          padding: 10px;
          background: #f8f9fa !important;
          border-radius: 8px;
        }
        .color-options-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: none;
          border: none;
          padding: 8px;
          color: #333;
          cursor: pointer;
        }

        .color-picker-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 10px 0;
        }

        .color-picker {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
        }

        .color-picker input[type="color"] {
          width: 25px;
          height: 25px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .color-option {
          padding: 8px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: #333;
          margin: 5px 0;
          font-size: 12px;
        }

        .color-option:hover {
          background: #e9ecef;
        }

        .options-divider {
          height: 1px;
          background-color: #eee;
          margin: 8px 0;
        }

        /* Switch Styles */
        .form-switch .form-check-input {
          width: 2.5em;
          height: 1.3em;
          margin-left: 0;
          margin-right: 8px;
          cursor: pointer;
        }

        .form-switch .form-check-label {
          cursor: pointer;
          white-space: nowrap;
          font-size: 13px;
        }

        .form-check {
          display: flex;
          align-items: center;
          min-height: auto;
          padding-left: 0;
          margin-bottom: 0;
        }
      `}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height="0"
        width="0"
        style={{ position: "absolute" }}
      >
        <defs>
          <filter id="protanopia-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
              0.567, 0.433, 0,     0, 0
              0.558, 0.442, 0,     0, 0
              0,     0.242, 0.758, 0, 0
              0,     0,     0,     1, 0
            "
            />
          </filter>
          <filter id="deuteranopia-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
              0.625, 0.375, 0,   0, 0
              0.7,   0.3,   0,   0, 0
              0,     0.3,   0.7, 0, 0
              0,     0,     0,   1, 0
            "
            />
          </filter>
          <filter id="tritanopia-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
              0.95, 0.05,  0,     0, 0
              0,    0.433, 0.567, 0, 0
              0,    0.475, 0.525, 0, 0
              0,    0,     0,     1, 0
            "
            />
          </filter>
          <filter id="achromatopsia-filter" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
              0.299, 0.587, 0.114, 0, 0
              0.299, 0.587, 0.114, 0, 0
              0.299, 0.587, 0.114, 0, 0
              0,     0,     0,     1, 0
            "
            />
          </filter>
        </defs>
      </svg>

      <div className="accessibility-widget">
        <button
          className="accessibility-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu de acessibilidade"
        >
          <FaUniversalAccess />
        </button>

        {isOpen && (
          <div className="accessibility-panel" ref={panelRef}>
            <h4 className="section-title">Tamanho do Texto</h4>
            <div className="btn-grid">
              <button
                onClick={() => setFontSize((p) => Math.min(p + 0.1, 1.5))}
                className="accessibility-btn"
              >
                <FaFont /> A+
              </button>
              <button
                onClick={() => setFontSize((p) => Math.max(p - 0.1, 0.8))}
                className="accessibility-btn"
              >
                <FaFont /> A-
              </button>
              <button
                onClick={() => setFontSize(1)}
                className="accessibility-btn"
              >
                <FaFont /> Reset
              </button>
            </div>

            <h4 className="section-title">Espaçamento</h4>
            <div className="btn-grid">
              <button
                onClick={() => setLineSpacing((p) => Math.min(p + 0.2, 3))}
                className="accessibility-btn"
              >
                <FaTextHeight /> Linha +
              </button>
              <button
                onClick={() => setLineSpacing((p) => Math.max(p - 0.2, 1))}
                className="accessibility-btn"
              >
                <FaTextHeight /> Linha -
              </button>
              <button
                onClick={() => setLineSpacing(1.5)}
                className="accessibility-btn"
              >
                <FaTextHeight /> Reset
              </button>
            </div>

            <h4 className="section-title">Ferramentas</h4>
            <div className="btn-grid">
              <button
                onClick={() => setPauseAnimations(!pauseAnimations)}
                className={`accessibility-btn ${
                  pauseAnimations ? "btn-active" : ""
                }`}
              >
                <FaPauseCircle /> {pauseAnimations ? "Ativar" : "Pausar"}
              </button>
              <button
                onClick={() => setReadingGuide(!readingGuide)}
                className={`accessibility-btn ${
                  readingGuide ? "btn-active" : ""
                }`}
              >
                <FaEye /> Guia
              </button>
              <button
                onClick={() => {
                  setHighContrast(!highContrast);
                  if (highContrast) {
                    setColorBlindMode(
                      JSON.parse(localStorage.getItem("colorBlindMode")) || null
                    );
                    setCustomColors(
                      JSON.parse(localStorage.getItem("customColors")) || false
                    );
                  }
                }}
                className={`accessibility-btn ${
                  highContrast ? "btn-dark" : ""
                }`}
              >
                <FaAdjust /> Contraste
              </button>
            </div>

            <h4 className="section-title">Acessibilidade</h4>
            <div className="btn-grid">
              <button
                onClick={() => setTextToSpeech(!textToSpeech)}
                className={`accessibility-btn ${
                  textToSpeech ? "btn-active" : ""
                }`}
              >
                <FaVolumeUp /> Leitor
              </button>
              <button
                onClick={() => setShowColorOptions(!showColorOptions)}
                className={`accessibility-btn ${
                  showColorOptions ? "btn-active" : ""
                }`}
              >
                <FaPalette /> Cores{" "}
                {showColorOptions ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div className="accessibility-btn" style={{ visibility: 'hidden' }}>
              
              </div>
            </div>

            {showColorOptions && (
              <div className="color-options-container">
                <div
                  className="form-check form-switch d-flex align-items-center"
                  style={{ padding: "5px 0" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="customColorsToggle"
                    checked={customColors}
                    onChange={() => setCustomColors(!customColors)}
                    disabled={highContrast}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customColorsToggle"
                  >
                    Cores Personalizadas
                  </label>
                </div>
                {customColors && (
                  <>
                    <div className="color-picker-container">
                      <div className="color-picker">
                        <label htmlFor="textColor">Texto:</label>
                        <input
                          type="color"
                          id="textColor"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          disabled={highContrast}
                        />
                      </div>
                      <div className="color-picker">
                        <label htmlFor="bgColor">Fundo:</label>
                        <input
                          type="color"
                          id="bgColor"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          disabled={highContrast}
                        />
                      </div>
                      <div className="color-picker">
                        <label htmlFor="linkColor">Links:</label>
                        <input
                          type="color"
                          id="linkColor"
                          value={linkColor}
                          onChange={(e) => setLinkColor(e.target.value)}
                          disabled={highContrast}
                        />
                      </div>
                    </div>
                    <button
                      onClick={resetCustomColors}
                      className="accessibility-btn"
                      style={{ marginTop: "10px", width: "100%" }}
                      disabled={highContrast}
                    >
                      <FaUndo /> Resetar Cores
                    </button>
                  </>
                )}
                <div className="options-divider"></div>
                <button
                  className="color-option"
                  onClick={() => setColorBlindMode(null)}
                  style={{
                    color: colorBlindMode === null ? "#4a6cf7" : "#333",
                  }}
                  disabled={highContrast}
                >
                  Cores Normais
                </button>
                <button
                  className="color-option"
                  onClick={() => setColorBlindMode("protanopia")}
                  style={{
                    color: colorBlindMode === "protanopia" ? "#4a6cf7" : "#333",
                  }}
                  disabled={highContrast}
                >
                  Protanopia
                </button>
                <button
                  className="color-option"
                  onClick={() => setColorBlindMode("deuteranopia")}
                  style={{
                    color:
                      colorBlindMode === "deuteranopia" ? "#4a6cf7" : "#333",
                  }}
                  disabled={highContrast}
                >
                  Deuteranopia
                </button>
                <button
                  className="color-option"
                  onClick={() => setColorBlindMode("tritanopia")}
                  style={{
                    color: colorBlindMode === "tritanopia" ? "#4a6cf7" : "#333",
                  }}
                  disabled={highContrast}
                >
                  Tritanopia
                </button>
                <button
                  className="color-option"
                  onClick={() => setColorBlindMode("achromatopsia")}
                  style={{
                    color:
                      colorBlindMode === "achromatopsia" ? "#4a6cf7" : "#333",
                  }}
                  disabled={highContrast}
                >
                  Preto e Branco
                </button>
              </div>
            )}

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes /> Fechar
            </button>
          </div>
        )}
      </div>
    </>
  );
}