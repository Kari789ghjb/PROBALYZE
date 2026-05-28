import React, { useState, useEffect } from "react";
import Predicciones from "./Predicciones";

const IconCheck = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const IconChevronDown = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>;
const IconSupportAgent = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M17 11V7a5 5 0 0 1 10 0v4"/>
    <path d="M23 12h2"/>
    <path d="M15 12h2"/>
    <circle cx="18" cy="12" r="1"/>
    <circle cx="26" cy="12" r="1"/>
  </svg>
);

const FeatureItem = ({ text, isElite = false }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", lineHeight: "1.4", color: isElite ? "rgba(255,255,255,0.8)" : "#1d1d1f" }}>
    <div style={{ marginTop: "3px", flexShrink: 0, color: isElite ? "#22c55e" : "#000" }}>
      <IconCheck />
    </div>
    <span style={{ fontWeight: 500 }}>{text}</span>
  </div>
);

export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup'
  const [showContactModal, setShowContactModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background-color: #ffffff;
      color: #1d1d1f;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .text-muted {
      color: #86868b; 
    }

    /* Navbar Dynamic Styles */
    .navbar {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  padding: 12px 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;

  z-index: 100;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.15);

  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
 .navbar.scrolled {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);

  border: 1px solid rgba(0, 0, 0, 0.08);

  transform: translateX(-50%) scale(0.96);
  top: 12px;

  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}

.nav-brand {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-links-container {
  display: flex;
  gap: 22px;
  align-items: center;
}

.navbar.scrolled .nav-brand {
  color: #111;
}
    
    .navbar.scrolled .nav-brand {
      color: #000000;
    }

    .nav-link {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.9);

  text-decoration: none;

  padding: 6px 10px;
  border-radius: 999px;

  transition: all 0.25s ease;

  position: relative;
}

.navbar.scrolled .nav-link {
  color: rgba(0,0,0,0.75);
}

.nav-link:hover {
  transform: translateY(-1px);
}

.navbar.scrolled .nav-link:hover {
  background: transparent;
}

  .nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;

  width: 5px;
  height: 5px;
  border-radius: 50%;

  background: currentColor;

  transform: translateX(-50%) scale(0);
  transform-origin: center;

  transition: transform 0.25s ease;
  opacity: 0.9;
}

.nav-link:hover::after {
  transform: translateX(-50%) scale(1);
}

    .nav-btn {
      background: #ffffff;
      color: #000000;
      border: none;
      padding: 10px 40px;
      border-radius: 100px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .nav-btn:hover {
      transform: scale(1.05);
    }
    
    .navbar.scrolled .nav-btn {
      background: #000000;
      color: #ffffff;
    }

    .navbar.scrolled .nav-btn:hover {
      background: #333333;
    }

    /* Botones Profesionales Generales */
    .btn-black {
      background: #000000;
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
      padding: 14px 28px;
      border-radius: 14px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-black:hover {
      background: #2c2c2e;
      transform: translateY(-1px);
    }

    .btn-white {
      background: #ffffff;
      color: #000000;
      border: none;
      padding: 14px 28px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-white:hover {
      background: #f5f5f7;
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: #1d1d1f;
      border: 1px solid #d2d2d7;
      padding: 12px 24px;
      border-radius: 100px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-outline:hover {
      border-color: #1d1d1f;
      background: #f5f5f7;
    }

    /* Tarjetas Limpias */
    .feature-card {
      background: #ffffff;
      border: 1px solid #d2d2d7;
      border-radius: 18px;
      padding: 32px;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      border-color: #000000;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);
      transform: translateY(-2px);
    }

    .icon-wrapper {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #f5f5f7;
      color: #1d1d1f;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      transition: all 0.3s ease;
    }

    .feature-card:hover .icon-wrapper {
      background: #000000;
      color: #ffffff;
    }

    /* Pricing Minimalista */
    .pricing-card {
      background: #ffffff;
      border: 1px solid #d2d2d7;
      border-radius: 24px;
      padding: 48px 40px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .pricing-card.popular {
      border: 2px solid #000000;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    /* FAQ Limpio */
    .faq-item {
      border-bottom: 1px solid #d2d2d7;
      padding: 24px 0;
      cursor: pointer;
    }

    .nav-links-container {
      display: flex;
      gap: 32px;
    }

    .nav-actions-desktop {
      display: flex;
      gap: 20px;
      align-items: center;
    }
     
    .mobile-menu-btn {
  width: 46px;
  height: 46px;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  padding: 10px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255,255,255,0.15);

  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-menu-btn span {
  height: 2px;
  width: 100%;
  background: rgba(255,255,255,0.9);
  border-radius: 999px;
  transition: all 0.3s ease;
}

.navbar.scrolled .mobile-menu-btn span {
  background: rgba(0,0,0,0.8);
}

.mobile-menu-btn:hover {
  transform: scale(1.05);
  background: rgba(255,255,255,0.12);
}

.mobile-menu-btn.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
   


    .mobile-menu-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
      z-index: 98;
    }

    .mobile-menu-backdrop.open {
      opacity: 1;
      pointer-events: all;
    }

    .mobile-drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 99;
      
      background: rgba(10, 10, 12, 0.85);
      backdrop-filter: blur(40px) saturate(200%);
      -webkit-backdrop-filter: blur(40px) saturate(200%);
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      
      opacity: 0;
      pointer-events: none;
      transform: translateY(-20px);
      transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .mobile-drawer.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .mobile-link {
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .mobile-link:hover {
      color: #ffffff;
      transform: scale(1.05);
    }

    .mobile-drawer-footer {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
    }
      @media (max-width: 900px) {

  .nav-links-container {
    display: none;
  }

  .nav-actions-desktop {
    display: none;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }
}

@media (min-width: 901px) {
  .mobile-menu-btn {
    display: none;
  }
}

  /* Premium Typography & Layout System */
  .section-title {
    font-size: clamp(28px, 5vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin-bottom: 20px;
    color: #1d1d1f;
  }
  
  .section-subtitle {
    font-size: clamp(14px, 1.8vw, 19px);
    color: #86868b;
    max-width: 1000px;
    width: 95%;
    margin: 0 auto 60px;
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: -0.01em;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    padding: 0 10px;
  }

  .body-text {
    font-size: clamp(13px, 1.5vw, 16.5px);
    line-height: 1.7;
    color: #424245;
    max-width: 1100px;
    width: 96%;
    margin: 0 auto;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
    letter-spacing: -0.005em;
    padding: 0 10px;
  }

  /* Responsive breakpoints */
  @media (max-width: 1280px) {
    .analytics-layout { gap: 80px; }
    .analytics-card-wrapper { max-width: 500px; }
    .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .players-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .sports-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 1024px) {
    .navbar { width: 95%; }
    .nav-brand { font-size: 13px; }
    .analytics-layout { gap: 60px; flex-direction: column; align-items: center; }
    .analytics-header { text-align: center; max-width: 100%; }
    .analytics-desc { margin: 0 auto !important; text-align: center !important; }
    .analytics-card-wrapper { align-self: center !important; max-width: 100%; }
    .analytics-label { left: 50% !important; transform: translateX(-50%); }
  }

  @media (max-width: 768px) {
    .nav-links-container, .nav-actions-desktop { display: none; }
    .mobile-menu-btn { display: flex; }
    .steps-container { flex-direction: column !important; gap: 40px !important; }
    .step-connector { display: none !important; }
    .hero-title { font-size: clamp(32px, 8vw, 48px) !important; }
    .hero-subtitle { font-size: 15px !important; padding: 0 10px; }
    .analytics-section { 
      padding: 100px 5% !important; 
      background-image: url('src/img/barcelona2.png') !important;
      background-position: center top !important;
    }
    .analytics-layout { gap: 100px; }
    .players-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .sports-grid { grid-template-columns: 1fr !important; }
    .pricing-grid { grid-template-columns: 1fr !important; }
    p { text-align: center !important; }
    .section-title { font-size: 32px !important; }
    .section-subtitle { font-size: 15px !important; margin-bottom: 40px; }
    .analytics-label { top: -80px !important; }
  }

  @media (max-width: 480px) {
    .navbar { top: 10px; padding: 10px 16px; width: 92%; }
    .nav-brand { font-size: 12px; }
    .hero-title { font-size: 32px !important; }
    .analytics-label { top: -60px !important; }
    .pricing-card-box { padding: 40px 24px !important; }
    .btn-black, .btn-white { width: 100%; text-align: center; }
  }

  .analytics-layout {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 65vh;
    gap: 40px;
  }
  .analytics-header {
    max-width: 500px;
    position: relative;
  }
  .analytics-card-wrapper {
    align-self: flex-end;
    max-width: 580px;
    width: 100%;
  }

  .step-connector {
    width: 60px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
  }

  .sports-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: stretch;
  }

  .players-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  `;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const faqs = [
    { 
      q: "¿Garantizan ganancias?", 
      a: "No. En las apuestas deportivas no existen garantías. Nuestro sistema identifica picks con ventaja matemática (EDGE) para aumentar la probabilidad de rentabilidad a largo plazo." 
    },
    { 
      q: "¿Cómo funcionan sus predicciones?", 
      a: "Utilizamos modelos de análisis basados en datos históricos, rendimiento reciente, contexto del partido y comportamiento de cuotas para detectar oportunidades de valor." 
    },
    { 
      q: "¿Qué deportes incluyen?", 
      a: "Cubrimos múltiples deportes como fútbol , NBA , MLB/LMB y NHL , con enfoque en los mercados más relevantes." 
    },
    { 
      q: "¿Qué tipo de picks recibiré?", 
      a: "Incluimos picks en: Goles (Over/Under), Corners, Tarjetas y Props de jugadores. Cada pick incluye stake recomendado y nivel de confianza." 
    },
    { 
      q: "¿A qué hora publican los picks?", 
      a: "Los picks se actualizan diariamente antes de los eventos, con prioridad para que puedas aprovechar las mejores cuotas disponibles." 
    },
    { 
      q: "¿Qué diferencia hay entre PRO y ELITE?", 
      a: "El plan ELITE incluye picks exclusivos, alertas en tiempo real, acceso anticipado y estrategias más avanzadas para maximizar el rendimiento." 
    },
    { 
      q: "¿Necesito experiencia en apuestas?", 
      a: "No. Los picks están diseñados para ser fáciles de seguir, incluyendo recomendaciones claras y gestión básica de stake." 
    },
    { 
      q: "¿Puedo cancelar cuando quiera?", 
      a: "Sí, puedes cancelar tu suscripción en cualquier momento sin compromisos." 
    }
  ];

  return (
    <>
      <style>{css}</style>
      
      {/* NAVBAR APPLE STYLE DINÁMICO */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand">
          PROBALYZE
        </div>

        <div className="nav-links-container">
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Inicio</a>
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { setActiveTab("predicciones"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Predicciones</a>
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" }), 100); }}>Análisis</a>
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 100); }}>Planes</a>
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); }}>FAQ</a>
        </div>

        <div className="nav-actions-desktop">
          <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => setAuthMode("login")}>Login</a>
          <button className="nav-btn" onClick={() => setAuthMode("signup")}>
            Sign Up
          </button>
        </div>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

      </nav>

      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      />
      <aside className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <a className="mobile-link" onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); closeMobileMenu(); }}>Inicio</a>
        <a className="mobile-link" onClick={() => { setActiveTab("predicciones"); window.scrollTo({ top: 0, behavior: "smooth" }); closeMobileMenu(); }}>Predicciones</a>
        <a className="mobile-link" onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" }), 100); closeMobileMenu(); }}>Análisis</a>
        <a className="mobile-link" onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 100); closeMobileMenu(); }}>Planes</a>
        <a className="mobile-link" onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); closeMobileMenu(); }}>FAQ</a>
        <div className="mobile-drawer-footer">
          <a className="mobile-link" onClick={() => { setAuthMode("login"); closeMobileMenu(); }}>Login</a>
          <button className="nav-btn" onClick={() => { setAuthMode("signup"); closeMobileMenu(); }}>
            Sign Up
          </button>
        </div>
      </aside>



      {activeTab === "home" ? (
        <>
          {/* HERO SECTION */}
          <section style={{
        position: "relative",
        height: "100vh",
        minHeight: "650px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("src/img/soccer.png")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Readability overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.42)",
          }}
        />

        {/* Hero Content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px", padding: "0 20px", width: "100%" }}>
          
          <h1 style={{ 
            fontSize: "clamp(42px, 8vw, 72px)", 
            fontWeight: 800, 
            lineHeight: 1.05, 
            letterSpacing: "-0.03em", 
            marginBottom: "20px", 
            color: "#ffffff",
            textShadow: "0 0 12px rgba(255, 255, 255, 0.31)"
          }}>
            LOS MEJORES PICKS CON <span style={{ color: "#8b5cf6" }}>DATA</span>
          </h1>

          <p className="hero-subtitle" style={{ 
            color: "#e2e8f0", 
            fontSize: "clamp(13px, 2.2vw, 14px)", 
            lineHeight: 1.5, 
            maxWidth: "940px", 
            margin: "0 auto 36px auto",
            fontWeight: 200
          }}>
            Analizamos datos deportivos en tiempo real para encontrar picks con ventaja matemática y tomar decisiones más inteligentes.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn-black" style={{ 
              background: "#ffffff", 
              color: "#000000", 
              padding: "16px 40px", 
              fontSize: "15px" 
            }}>
              Acceder
            </button>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA - CARDS CONECTADAS */}
<section
  style={{
    padding: "120px 5%",
    background: "#0a0a0a",
  }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

    {/* HEADER */}
    <div style={{ textAlign: "center", marginBottom: "80px" }}>
      <h2 className="section-title" style={{ color: "#fff" }}>
        Cómo opera el algoritmo
      </h2>

      <p className="section-subtitle" style={{ color: "#a1a1aa" }}>
        El proceso técnico detrás de cada alerta de valor.
      </p>
    </div>

    {/* CONTENEDOR */}
    <div
      className="steps-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >

      {[
        {
          num: "01",
          title: "Recolección de Datos",
          desc: "Analizamos estadísticas, forma reciente, lesiones y cuotas en tiempo real desde múltiples fuentes.",
        },
        {
          num: "02",
          title: "Análisis Predictivo",
          desc: "Nuestros modelos ejecutan miles de simulaciones para estimar probabilidades basadas en rendimiento real.",
        },
        {
          num: "03",
          title: "Detección de Valor",
          desc: "Detectamos oportunidades cuando nuestra probabilidad supera la implícita en las cuotas del mercado.",
        },
      ].map((step, i) => (
        <React.Fragment key={i}>

          {/* CARD */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#8b5cf6",
              marginBottom: 8
            }}>
              PASO {step.num}
            </div>

            <h3 style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 10
            }}>
              {step.title}
            </h3>

            <p className="body-text" style={{
              color: "#a1a1aa",
              fontSize: 14,
              lineHeight: 1.7,
              margin: "0 auto",
              textAlign: "center" /* Keep center for small cards */
            }}>
              {step.desc}
            </p>
          </div>

          {/* LÍNEA ENTRE CARDS */}
          {i < 2 && (
            <div
              className="step-connector"
              style={{
                flexShrink: 0,
              }}
            />
          )}

        </React.Fragment>
      ))}
    </div>
  </div>
</section>



{/* DEPORTES */}
<section
  style={{
    padding: "120px 5%",
    background: "#ffffff",
  }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

    {/* HEADER */}
    <div style={{ textAlign: "center", marginBottom: "80px" }}>
      <h2 className="section-title" style={{ color: "#1d1d1f" }}>
        Deportes que analizamos
      </h2>

      <p className="section-subtitle">
        Modelos entrenados para diferentes ligas y contextos competitivos.
      </p>
    </div>

    {/* GRID */}
    <div className="sports-grid">
      {[
        {
          title: "Fútbol",
          desc: "Cobertura en ligas de Europa, Estados Unidos y México, analizando el rendimiento general de equipos y partidos.",
          emoji: "⚽",
        },
        {
          title: "NBA",
          desc: "Seguimiento completo de la liga con enfoque en dinámicas de juego, ritmo y desempeño colectivo.",
          emoji: "🏀",
        },
        {
          title: "MLB / LBM",
          desc: "Análisis de partidos considerando tendencias de equipos y contexto competitivo a lo largo de la temporada.",
          emoji: "⚾",
        },
        {
          title: "NHL",
          desc: "Evaluación del juego en función del ritmo, consistencia y comportamiento general de los equipos.",
          emoji: "🏒",
        },
      ].map((sport, i) => (
        <div
          key={i}
          style={{
            background: "#f5f5f7",
            border: "1px solid #e5e5e7",
            borderRadius: "18px",
            padding: "28px",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 15px 40px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* ICON */}
          <div style={{ fontSize: "28px", marginBottom: "14px" }}>
            {sport.emoji}
          </div>

          {/* TITLE */}
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1d1d1f",
              marginBottom: "10px",
            }}
          >
            {sport.title}
          </h3>

          {/* DESC */}
          <p className="body-text"
            style={{
              fontSize: "14px",
              color: "#6e6e73",
              lineHeight: 1.6,
              margin: "0 auto"
            }}
          >
            {sport.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ANÁLISIS DE EQUIPOS */}
      <section className="analytics-section" style={{ 
        padding: "80px 5%", 
        color: "#ffffff", 
        position: "relative",
        backgroundImage: 'url("src/img/barcelona.png")',
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
      }} id="analytics">
        <div className="analytics-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.55)", transition: "background 0.3s" }} />
        <div className="analytics-layout" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          
          <div className="analytics-header">
            <div className="analytics-label" style={{ position: "absolute", top: "-60px", left: 0, fontSize: "10px", fontWeight: 800, color: "#86868b", letterSpacing: "2px" }}>
              EJEMPLO
            </div>
            <h2 style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "12px" }}>
              Modelo de Análisis
            </h2>
            <p className="analytics-desc" style={{ 
              fontSize: "clamp(13px, 1.5vw, 16px)", 
              color: "rgba(255,255,255,0.85)", 
              lineHeight: "1.75", 
              maxWidth: "520px", 
              width: "92%",
              margin: "0 auto",
              fontWeight: 400,
              textAlign: "justify",
              textJustify: "inter-word",
              hyphens: "auto",
              padding: "0 10px"
            }}>
              Este modelo analiza el rendimiento del equipo usando datos actualizados, estadísticas clave y tendencias recientes. A partir de esta información, identifica patrones de juego y genera una visión clara del nivel actual y posibles escenarios del partido.
            </p>
          </div>

          <div className="analytics-card-wrapper">
            <div style={{ 
              background: "rgba(255, 255, 255, 0.02)", 
              border: "1px solid rgba(255, 255, 255, 0.08)", 
              borderRadius: "24px", 
              padding: "28px",
              backdropFilter: "blur(10px)"
            }}>
            
            {/* LADO IZQUIERDO: MÉTRICAS Y JUGADORES */}
            <div>
              <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#3b82f6", fontWeight: 700, marginBottom: "2px", textTransform: "uppercase" }}>La Liga • España</div>
                  <h3 style={{ fontSize: "24px", fontWeight: 800 }}>FC Barcelona</h3>
                </div>
              </div>

              {/* GRID DE ESTADÍSTICAS AVANZADAS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "16px" }}>
                {[
                  { label: "Goles anotados", value: "79", meta: "Registro del sistema" },
                  { label: "AI Offensive Index", value: "88/100", meta: "Score del sistema" },
                  { label: "Tiros a puerta", value: "6.2/p", meta: "Output del modelo" },
                  { label: "Estabilidad Defensiva", value: "82/100", meta: "Score del sistema" },
                  { label: "Eficiencia Ataque", value: "12.4%", meta: "Ponderado por modelo" },
                  { label: "Forma Reciente", value: "W-W-D-W-W", meta: "Registro del sistema" }
                ].map((stat, i) => (
                  <div key={i} style={{ 
                    background: "rgba(255, 255, 255, 0.03)", 
                    padding: "14px 18px", 
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.04)"
                  }}>
                    <div style={{ fontSize: "9px", color: "#86868b", textTransform: "uppercase", marginBottom: "6px" }}>{stat.label}</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>{stat.value}</div>
                    <div style={{ fontSize: "8px", color: "#3b82f6", fontWeight: 600 }}>{stat.meta}</div>
                  </div>
                ))}
              </div>

              {/* REDISEÑO ESTIMACIÓN DE GOLES */}
              <div style={{ 
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)", 
                border: "1px solid rgba(59, 130, 246, 0.2)", 
                padding: "20px", 
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "#3b82f6" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#3b82f6", textTransform: "uppercase", fontWeight: 800, letterSpacing: "1px", marginBottom: "4px" }}>Estimación de Goles</div>
                  <div style={{ fontSize: "12px", color: "#86868b", fontWeight: 500 }}>Proyección del Modelo Predictivo</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>Over 2.5</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", marginTop: "2px" }}>
                      <div style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%" }} />
                      <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 800 }}>78% Prob.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECCIÓN JUGADORES CLAVE */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "10px", color: "#86868b", textTransform: "uppercase", fontWeight: 800, marginBottom: "12px", letterSpacing: "1px" }}>Jugadores Destacados</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                  {[
                    { name: "Lewandowski", role: "Delantero", gpg: "0.82", sap: "3.4" },
                    { name: "Raphinha", role: "Extremo", gpg: "0.45", sap: "2.8" },
                    { name: "Lamine Yamal", role: "Extremo", gpg: "0.32", sap: "2.5" }
                  ].map((p, i) => (
                    <div key={i} style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "11px", fontWeight: 800, color: "#fff" }}>{p.name}</div>
                      <div style={{ fontSize: "9px", color: "#3b82f6", fontWeight: 600, marginBottom: "4px" }}>{p.role}</div>
                      <div style={{ fontSize: "10px", color: "#86868b" }}>Goles/partido: {p.gpg}</div>
                      <div style={{ fontSize: "10px", color: "#86868b" }}>Tiros a puerta: {p.sap}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: "18px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "11px", color: "#3b82f6", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>Análisis Predictivo del Sistema</div>
                <p className="body-text" style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6", maxWidth: "100%" }}>
                  El sistema detecta patrones de dominio ofensivo sustentados por la alta eficiencia de conversión de los delanteros clave. La combinación de solidez defensiva y xG positivo incrementa la probabilidad estimada de victoria en mercados de hándicap.
                </p>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>

     {/* JUGADORES PRO */}
      <section style={{ padding: "120px 5%", background: "#ffffffff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <h2 className="section-title" style={{ textAlign: "center", color: "#000" }}>
            Métricas de Jugadores
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "70px" }}>
            Analizamos el rendimiento individual de las estrellas mundiales para detectar ventajas competitivas en mercados de props y actuaciones personales.
          </p>

          <div className="players-grid">

            {[
              {
                name: "MESSI",
                rating: 94,
                position: "RW",
                country: "🇦🇷",
                club: "🦩",
                img: "src/img/messi.png",
                stats: [
                  { label: "GLS", value: 20 },
                  { label: "AST", value: 16 },
                  { label: "APP", value: 19 },
                  { label: "G/A", value: 36 },
                  { label: "SOT", value: 45 },
                  { label: "MIN", value: 1485 },
                ]
              },
              {
                name: "CURRY",
                rating: 96,
                position: "PG",
                country: "🇺🇸",
                club: "🌉",
                img: "src/img/curry.png",
                stats: [
                  { label: "PTS", value: "26.4" },
                  { label: "AST", value: "5.1" },
                  { label: "REB", value: "4.5" },
                  { label: "3P%", value: "40.8" },
                  { label: "STL", value: "0.7" },
                  { label: "MIN", value: "32.7" },
                ]
              },
              {
                name: "OHTANI",
                rating: 99,
                position: "DH",
                country: "🇯🇵",
                club: "⚾",
                img: "src/img/ohtani.png",
                stats: [
                  { label: "HR", value: 54 },
                  { label: "SB", value: 59 },
                  { label: "AVG", value: ".310" },
                  { label: "RBI", value: 130 },
                  { label: "OPS", value: "1.03" },
                  { label: "H", value: 197 },
                ]
              }
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  aspectRatio: "2.4/3.5",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  fontFamily: "'Din Pro', 'Oswald', 'Inter', sans-serif",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 30px 60px rgba(212,175,55,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                }}
              >

                {/* IMAGEN DE FONDO (FULL COVER) */}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    zIndex: 0
                  }}
                />

                {/* GRADIENTE DORADO (OVERLAY) */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, rgba(58, 44, 20, 1) 0%, rgba(170, 119, 28, 0.9) 35%, rgba(212, 175, 55, 0.4) 60%, transparent 100%)`,
                  zIndex: 1
                }} />

                {/* BORDES (INNER RING) */}
                <div style={{
                  position: "absolute",
                  inset: "6px",
                  border: "2px solid rgba(253, 243, 196, 0.5)",
                  borderRadius: "14px",
                  zIndex: 2,
                  pointerEvents: "none"
                }} />

                {/* CONTENIDO DE LA TARJETA */}
                <div style={{
                  position: "relative",
                  zIndex: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px"
                }}>

                  {/* TOP LEFT INFO */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "fit-content",
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                    padding: "6px 8px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.2)"
                  }}>
                    <span style={{ fontSize: "28px", fontWeight: 900, lineHeight: 1, color: "#fdf3c4", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{p.rating}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{p.position}</span>
                    <span style={{ fontSize: "16px", marginBottom: "2px" }}>{p.country}</span>
                    <span style={{ fontSize: "16px" }}>{p.club}</span>
                  </div>

                  {/* ESPACIO VACÍO PARA QUE SE VEA EL JUGADOR */}
                  <div style={{ flex: 1 }} />

                  {/* BOTTOM INFO (NAME & STATS) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    
                    {/* NAME */}
                    <div style={{ textAlign: "center" }}>
                      <h3 style={{
                        fontSize: "28px",
                        fontWeight: 900,
                        margin: 0,
                        letterSpacing: "1px",
                        color: "#fdf3c4",
                        textShadow: "0 2px 15px rgba(0,0,0,0.8)"
                      }}>
                        {p.name}
                      </h3>
                      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, rgba(253,243,196,0.5), transparent)", marginTop: "6px" }} />
                    </div>

                    {/* STATS */}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "5px" }}>
                      
                      {/* LEFT COL */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, borderRight: "1px solid rgba(255,255,255,0.2)", paddingRight: "15px", alignItems: "flex-end" }}>
                        {p.stats.slice(0, 3).map((s, idx) => (
                          <div key={idx} style={{ display: "flex", gap: "8px", fontSize: "15px" }}>
                            <span style={{ fontWeight: 900, color: "#fff" }}>{s.value}</span>
                            <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.7)", width: "32px", textAlign: "left" }}>{s.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* RIGHT COL */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, paddingLeft: "15px", alignItems: "flex-start" }}>
                        {p.stats.slice(3, 6).map((s, idx) => (
                          <div key={idx} style={{ display: "flex", gap: "8px", fontSize: "15px" }}>
                            <span style={{ fontWeight: 900, color: "#fff" }}>{s.value}</span>
                            <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.7)", width: "32px", textAlign: "left" }}>{s.label}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ 
        padding: "160px 5%", 
        background: "#ffffff", 
        position: "relative",
        overflow: "hidden"
      }} id="pricing">
        
        {/* ELEMENTOS DECORATIVOS SUPERIORES */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: "1px", 
          background: "linear-gradient(90deg, transparent, #e5e5e7, transparent)" 
        }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 className="section-title">
              Elige tu plan
            </h2>
            <p className="section-subtitle">
              Acceso completo a picks con ventaja matemática.
            </p>
          </div>

          <div className="pricing-grid">
            
            {/* PLAN PRO - MINIMALISTA BLANCO */}
            <div 
              className="pricing-card-box"
              style={{
                background: "#ffffff",
                borderRadius: "28px",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #f2f2f7",
                boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.02)";
              }}
            >
              <div style={{ marginBottom: "32px" }}>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 800, 
                  color: "#86868b", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "12px"
                }}>Acceso Estándar</span>
                <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#1d1d1f", marginBottom: "16px" }}>PLAN PRO</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 800, color: "#000" }}>$199</span>
                  <span style={{ fontSize: "16px", color: "#86868b", fontWeight: 500 }}>/mes</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px", flex: 1 }}>
                <FeatureItem text="Picks diarios: Fútbol, NBA, MLB/LMB y NHL" />
                <FeatureItem text="Probabilidades % (Gana / Empata / Pierde)" />
                <FeatureItem text="Mercados: Goles, Corners y Tarjetas" />
                <FeatureItem text="Props de jugadores (Actuaciones)" />
                <FeatureItem text="Gestión de Stake recomendado" />
                <FeatureItem text="Algoritmo EDGE con ventaja matemática" />
                <FeatureItem text="Explicación breve por cada pick" />
              </div>

              <div style={{ marginTop: "auto" }}>
                <button style={{
                  width: "100%",
                  background: "#000000",
                  color: "#ffffff",
                  border: "none",
                  padding: "18px 32px",
                  borderRadius: "16px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >Empezar PRO</button>
                <div style={{ textAlign: "center", marginTop: "16px", fontSize: "11px", color: "#86868b", fontWeight: 500 }}>
                  Cancela cuando quieras
                </div>
              </div>
            </div>

            {/* PLAN ELITE - PREMIUM DARK GRID */}
            <div 
              className="pricing-card-box"
              style={{
                background: "#000000",
                borderRadius: "28px",
                padding: "48px 40px",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 40px 80px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.15)";
              }}
            >
              {/* GRADIENTE DE FONDO SUTIL */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "radial-gradient(circle at top right, rgba(212,175,55,0.08), transparent)",
                pointerEvents: "none"
              }} />

              <div style={{ 
                position: "absolute", 
                top: "24px", 
                right: "24px", 
                background: "rgba(212,175,55,0.15)", 
                color: "#d4af37", 
                padding: "6px 14px", 
                borderRadius: "100px", 
                fontSize: "10px", 
                fontWeight: 800,
                textTransform: "uppercase",
                border: "1px solid rgba(212,175,55,0.3)",
                letterSpacing: "0.1em"
              }}>Recomendado</div>

              <div style={{ marginBottom: "32px", position: "relative" }}>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 800, 
                  color: "rgba(255,255,255,0.4)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "12px"
                }}>Máximo Rendimiento</span>
                <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>PLAN ELITE</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 800, color: "#ffffff" }}>$449</span>
                  <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/mes</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px", flex: 1, position: "relative" }}>
                <FeatureItem text="Todo lo de PRO +" isElite />
                <FeatureItem text="Picks Premium (Cuotas +2.00)" isElite />
                <FeatureItem text="Alertas Instantáneas en tiempo real" isElite />
                <FeatureItem text="Acceso Anticipado (Mejores cuotas)" isElite />
                <FeatureItem text="Gestión de Banca Avanzada" isElite />
                <FeatureItem text="Picks ELITE exclusivos de modelos IA" isElite />
                <FeatureItem text="Soporte VIP Prioritario" isElite />
              </div>

              <div style={{ marginTop: "auto", position: "relative" }}>
                <button style={{
                  width: "100%",
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  padding: "18px 32px",
                  borderRadius: "16px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 20px rgba(255,255,255,0.1)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f7"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#ffffff"}
                >Desbloquear ELITE</button>
                <div style={{ textAlign: "center", marginTop: "16px", fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  Cancela cuando quieras
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" style={{ padding: "100px 5%", background: "#fbfbfd" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "60px", color: "#1d1d1f" }}> PREGUNTAS FRECUENTES</h2>
          
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#1d1d1f" }}>{faq.q}</h4>
                  <div style={{ transform: activeFaq === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: "#86868b" }}>
                    <IconChevronDown />
                  </div>
                </div>
                {activeFaq === index && (
                  <p className="text-muted" style={{ marginTop: "16px", lineHeight: 1.6, fontSize: "15px" }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      ) : activeTab === "predicciones" ? (
        <Predicciones />
      ) : null}

      
      {/* FOOTER PREMIUM 2026 */}
      <footer style={{ 
        padding: "40px 5% 24px 5%", 
        background: "#050505", 
        color: "#ffffff",
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        {/* TOP GRADIENT LINE */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "1px", 
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)" 
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", 
            gap: "40px", 
            marginBottom: "32px" 
          }}>
            
            {/* SECCIÓN IZQUIERDA: BRANDING */}
            <div>
              <div style={{ 
                fontWeight: 900, 
                fontSize: "20px", 
                letterSpacing: "-1px", 
                marginBottom: "12px", 
                color: "#ffffff"
              }}>
                PROBALYZE
              </div>
              <p style={{ color: "#86868b", lineHeight: 1.5, fontSize: "13px", maxWidth: "340px", fontWeight: 400, textAlign: "left" }}>
                Predicciones más precisas. Decisiones más inteligentes.
              </p>
            </div>

            {/* SECCIÓN CENTRAL: LINKS 1 */}
            <div>
              <h4 style={{ fontSize: "10px", fontWeight: 800, marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "2px" }}>Plataforma</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontSize: "12px", color: "#86868b", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#86868b"}>Inicio</a>
                <a onClick={() => { setActiveTab("predicciones"); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontSize: "12px", color: "#86868b", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#86868b"}>Predicciones</a>
                <a onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{ fontSize: "12px", color: "#86868b", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#86868b"}>Análisis</a>
              </div>
            </div>

            {/* SECCIÓN CENTRAL: LINKS 2 */}
            <div>
              <h4 style={{ fontSize: "10px", fontWeight: 800, marginBottom: "16px", color: "#ffffff", textTransform: "uppercase", letterSpacing: "2px" }}>Recursos</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{ fontSize: "12px", color: "#86868b", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#86868b"}>Preguntas Frecuentes</a>
                <a onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{ fontSize: "12px", color: "#86868b", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "#fff"} onMouseLeave={(e) => e.target.style.color = "#86868b"}>Planes</a>
              </div>
            </div>

            {/* SECCIÓN DERECHA: BOTÓN SOPORTE CIRCULAR */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <button 
                onClick={() => setShowContactModal(true)}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  gap: "2px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <IconSupportAgent />
                <span style={{ fontSize: "7px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>Soporte</span>
              </button>
            </div>

          </div>

          {/* PARTE INFERIOR */}
          <div style={{ 
            paddingTop: "24px", 
            borderTop: "1px solid rgba(255,255,255,0.05)", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap"
          }}>
            <p style={{ color: "#86868b", fontSize: "11px", fontWeight: 500, textAlign: "left", width: "100%" }}>
              © 2026 PROBALYZE. Todos los derechos reservados.
            </p>
            <div style={{ 
              fontSize: "10px", 
              fontWeight: 800, 
              color: "#ffffff", 
              letterSpacing: "2px",
              textTransform: "uppercase",
              textShadow: "0 0 10px rgba(255,255,255,0.3)"
            }}>
              Designs by Mendoza
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE AUTENTICACIÓN */}
      {authMode && (
        <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthMode(null)} />
      )}

      {/* MODAL DE CONTACTO */}
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </>
  );
}

// COMPONENTE MODAL DE AUTENTICACIÓN (LOGIN/SIGNUP MULTI-PASO)
function AuthModal({ mode, setMode, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", plan: "pro" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reiniciar paso al cambiar modo
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(1);
    setErrors({});
  }, [mode]);

  const validate = () => {
    let newErrors = {};
    if (mode === "signup") {
      if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
      else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.name)) newErrors.name = "Solo se permiten letras";
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!form.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo no válido";

    if (!form.password) newErrors.password = "La contraseña es obligatoria";
    else if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value !== "" && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup" && step < 3) {
      if (step === 2 && !validate()) return;
      setStep(step + 1);
      return;
    }
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(20px)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 10001, padding: "20px"
    }}>
      <div style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "32px",
        padding: "40px",
        maxWidth: "440px",
        width: "100%",
        position: "relative",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        transition: "all 0.3s ease"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "24px", right: "24px",
          background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "50%",
          width: "32px", height: "32px", color: "#fff", cursor: "pointer",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>×</button>

        {/* INDICADOR DE PASOS (Solo signup) */}
        {mode === "signup" && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ width: "30px", height: "4px", borderRadius: "2px", background: step >= 1 ? "#fff" : "rgba(255,255,255,0.2)", transition: "0.3s" }} />
            <div style={{ width: "30px", height: "4px", borderRadius: "2px", background: step >= 2 ? "#fff" : "rgba(255,255,255,0.2)", transition: "0.3s" }} />
            <div style={{ width: "30px", height: "4px", borderRadius: "2px", background: step >= 3 ? "#fff" : "rgba(255,255,255,0.2)", transition: "0.3s" }} />
          </div>
        )}

        <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "8px", textAlign: "center" }}>
          {mode === "login" ? "Bienvenido" : (step === 1 ? "Elige tu Plan" : (step === 2 ? "Tu Perfil" : "Pago Seguro"))}
        </h3>
        <p style={{ color: "#86868b", fontSize: "14px", marginBottom: "32px", textAlign: "center" }}>
          {mode === "login" ? "Ingresa tus credenciales." : (step === 1 ? "Selecciona tu suscripción." : (step === 2 ? "Completa tus datos." : "Finaliza tu suscripción élite."))}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* PASO 1: PLANES */}
          {mode === "signup" && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div 
                onClick={() => setForm({...form, plan: "pro"})}
                style={{
                  background: form.plan === "pro" ? "rgba(255,255,255,0.06)" : "transparent",
                  border: `1px solid ${form.plan === "pro" ? "#fff" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "20px", padding: "24px", cursor: "pointer", transition: "all 0.3s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff", display: "block", marginBottom: "4px" }}>PLAN PRO</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>$199</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>/mes</span>
                    </div>
                  </div>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {form.plan === "pro" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Picks diarios: Fútbol, NBA y más</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Probabilidades % por partido</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Gestión de Stake recomendado</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Soporte vía comunidad</div>
                </div>
              </div>
              
              <div 
                onClick={() => setForm({...form, plan: "elite"})}
                style={{
                  background: form.plan === "elite" ? "rgba(255,255,255,0.06)" : "transparent",
                  border: `1px solid ${form.plan === "elite" ? "#fff" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "20px", padding: "24px", cursor: "pointer", transition: "all 0.3s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>PLAN ELITE</span>
                      <span style={{ fontSize: "9px", background: "rgba(255,255,255,0.1)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>VIP</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>$449</span>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>/mes</span>
                    </div>
                  </div>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid #fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {form.plan === "elite" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Alertas VIP en tiempo real</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Picks exclusivos Cuotas +2.00</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Acceso Anticipado (Mejores cuotas)</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>• Soporte VIP Prioritario 24/7</div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: DATOS */}
          {(mode === "login" || (mode === "signup" && step === 2)) && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {mode === "signup" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Nombre</label>
                  <input 
                    name="name" type="text" placeholder="Tu nombre" value={form.name} onChange={handleChange}
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${errors.name ? "#ff453a" : "rgba(255,255,255,0.1)"}`, borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} 
                  />
                  {errors.name && <span style={{ color: "#ff453a", fontSize: "10px" }}>{errors.name}</span>}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Email</label>
                <input 
                  name="email" type="text" placeholder="email@ejemplo.com" value={form.email} onChange={handleChange}
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${errors.email ? "#ff453a" : "rgba(255,255,255,0.1)"}`, borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} 
                />
                {errors.email && <span style={{ color: "#ff453a", fontSize: "10px" }}>{errors.email}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Contraseña</label>
                <input 
                  name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange}
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${errors.password ? "#ff453a" : "rgba(255,255,255,0.1)"}`, borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} 
                />
                {errors.password && <span style={{ color: "#ff453a", fontSize: "10px" }}>{errors.password}</span>}
              </div>

              {mode === "signup" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Confirmar Contraseña</label>
                  <input 
                    name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange}
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${errors.confirmPassword ? "#ff453a" : "rgba(255,255,255,0.1)"}`, borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} 
                  />
                  {errors.confirmPassword && <span style={{ color: "#ff453a", fontSize: "10px" }}>{errors.confirmPassword}</span>}
                </div>
              )}
            </div>
          )}

          {/* PASO 3: PAGO Y TICKET */}
          {mode === "signup" && step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* TICKET DE RESUMEN */}
              <div style={{ 
                background: "rgba(255,255,255,0.05)", 
                border: "1px dashed rgba(255,255,255,0.2)", 
                borderRadius: "20px", 
                padding: "24px",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "16px", letterSpacing: "1px" }}>Resumen de orden</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#fff", fontWeight: 500 }}>{form.plan === "pro" ? "Plan Pro" : "Plan Elite"}</span>
                  <span style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>${form.plan === "pro" ? "199" : "449"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Impuestos (IVA)</span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Incluido</span>
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "16px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "16px", color: "#fff", fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: "24px", color: "#fff", fontWeight: 900 }}>${form.plan === "pro" ? "199" : "449"}</span>
                </div>
              </div>

              {/* MOCK DE TARJETA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600 }}>Número de Tarjeta</label>
                  <input type="text" placeholder="0000 0000 0000 0000" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600 }}>MM/YY</label>
                    <input type="text" placeholder="12/26" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600 }}>CVV</label>
                    <input type="password" placeholder="•••" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", outline: "none" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Pago procesado de forma segura vía Stripe.</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
            {mode === "signup" && step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                style={{ 
                  flex: 1, 
                  background: "rgba(255,255,255,0.05)", 
                  color: "#fff", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: "16px", 
                  padding: "16px", 
                  fontSize: "15px", 
                  fontWeight: 600, 
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
              >
                Volver
              </button>
            )}
            <button type="submit" style={{ 
              flex: 2, 
              background: "#ffffff", 
              color: "#000", 
              border: "none", 
              borderRadius: "16px", 
              padding: "16px",
              fontSize: "15px", 
              fontWeight: 700, 
              cursor: "pointer", 
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
            >
              {isSubmitting ? "Procesando..." : (mode === "login" ? "Entrar" : (step < 3 ? "Siguiente" : "Suscribirse Ahora"))}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <p style={{ color: "#86868b", fontSize: "14px" }}>
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <button 
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); }}
              style={{ background: "none", border: "none", color: "#fff", fontWeight: 600, marginLeft: "8px", cursor: "pointer" }}
            >
              {mode === "login" ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// COMPONENTE MODAL DE CONTACTO CON VALIDACIÓN
function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.name)) newErrors.name = "Solo se permiten letras";
    
    if (!form.email.trim()) newErrors.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo no válido";
    
    if (!form.message.trim()) newErrors.message = "El mensaje no puede estar vacío";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación en tiempo real para el nombre (solo letras)
    if (name === "name" && value !== "" && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (e) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    setIsSubmitting(true);
    // El formulario se enviará vía mailto
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(20px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
      padding: "20px"
    }}>
      <div style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "32px",
        padding: "40px",
        maxWidth: "500px",
        width: "100%",
        position: "relative",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px"
          }}
        >×</button>

        <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Contáctanos</h3>
        <p style={{ color: "#86868b", fontSize: "14px", marginBottom: "32px" }}>
          Nuestro equipo de soporte responderá a tu solicitud lo antes posible.
        </p>

        <form action="mailto:designsbymendozadbm@gmail.com" method="post" encType="text/plain" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>Nombre completo</label>
            <input 
              name="name"
              type="text" 
              placeholder="Tu nombre" 
              value={form.name}
              onChange={handleChange}
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: `1px solid ${errors.name ? "#ff453a" : "rgba(255,255,255,0.08)"}`, 
                borderRadius: "12px", 
                padding: "14px", 
                color: "#fff", 
                fontSize: "14px",
                outline: "none"
              }} 
            />
            {errors.name && <span style={{ color: "#ff453a", fontSize: "11px" }}>{errors.name}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>Correo electrónico</label>
            <input 
              name="email"
              type="text" 
              placeholder="email@ejemplo.com" 
              value={form.email}
              onChange={handleChange}
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: `1px solid ${errors.email ? "#ff453a" : "rgba(255,255,255,0.08)"}`, 
                borderRadius: "12px", 
                padding: "14px", 
                color: "#fff", 
                fontSize: "14px",
                outline: "none"
              }} 
            />
            {errors.email && <span style={{ color: "#ff453a", fontSize: "11px" }}>{errors.email}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>Mensaje</label>
            <textarea 
              name="message"
              placeholder="¿En qué podemos ayudarte?" 
              value={form.message}
              onChange={handleChange}
              style={{ 
                background: "rgba(255,255,255,0.03)", 
                border: `1px solid ${errors.message ? "#ff453a" : "rgba(255,255,255,0.08)"}`, 
                borderRadius: "12px", 
                padding: "14px", 
                color: "#fff", 
                fontSize: "14px",
                minHeight: "120px",
                resize: "none",
                outline: "none"
              }} 
            />
            {errors.message && <span style={{ color: "#ff453a", fontSize: "11px" }}>{errors.message}</span>}
          </div>

          <button type="submit" style={{ 
            background: "#ffffff", 
            color: "#000", 
            border: "none", 
            borderRadius: "12px", 
            padding: "16px", 
            fontSize: "15px", 
            fontWeight: 700, 
            cursor: "pointer",
            marginTop: "16px",
            transition: "transform 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}