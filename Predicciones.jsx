import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ================= BACKGROUND PRO (ORIGINAL STYLE) ================= */
const randomNodes = [...Array(25)].map(() => ({
  x: Math.random() * 300 - 150,
  y: Math.random() * 200 - 100,
  dur: 4 + Math.random() * 2,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`
}));

const randomLines = [...Array(15)].map(() => ({
  x1: Math.random() * 1400,
  y1: Math.random() * 800,
  x2: Math.random() * 1400,
  y2: Math.random() * 800,
  x3: Math.random() * 1400,
  y3: Math.random() * 800,
  dur: 2 + Math.random() * 2
}));

const AILinesBackground = () => {
  const colors = ["#22c55e", "#eab308", "#ffffff"];

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", overflow: "hidden" }}>
      
      {/* GRID */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(1000px) rotateX(60deg)",
          animation: "gridMove 5s linear infinite",
        }}
      />

      {/* NODOS (movimiento constante) */}
      {randomNodes.map((node, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, node.x, 0],
            y: [0, node.y, 0],
          }}
          transition={{
            duration: node.dur,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            top: node.top,
            left: node.left,
            width: "4px",
            height: "4px",
            background: colors[i % 3],
            borderRadius: "50%",
            boxShadow: `0 0 10px ${colors[i % 3]}`
          }}
        />
      ))}

      {/* MUCHAS MÁS LÍNEAS */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
        {randomLines.map((line, i) => (
          <motion.path
            key={i}
            d={`M ${line.x1} ${line.y1}
                Q ${line.x2} ${line.y2}
                ${line.x3} ${line.y3}`}
            stroke={colors[i % 3]}
            strokeWidth="1.2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0,1,1], opacity: [0,1,0] }}
            transition={{ duration: line.dur, repeat: Infinity }}
          />
        ))}
      </svg>

      <style>
        {`
          @keyframes gridMove {
            0% { transform: perspective(1000px) rotateX(60deg) translateY(0px); }
            100% { transform: perspective(1000px) rotateX(60deg) translateY(160px); }
          }
        `}
      </style>
    </div>
  );
};

const getProbColor = (prob) => {
  if (prob >= 70) return "#16a34a";
  if (prob >= 40) return "#f59e0b";
  return "#dc2626";
};

const PickCard = ({ pick, isLocked = false, cardRef = null, forcedHeight = null }) => {
  const teams = pick.match.split(" vs ");
  const homeTeam = teams[0];
  const awayTeam = teams[1];

  return (
    <motion.div
      ref={cardRef}
      style={{
        background: "linear-gradient(165deg, rgba(24,24,27,0.96) 0%, rgba(38,38,42,0.93) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "20px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        position: "relative",
        filter: isLocked ? "blur(5px)" : "none",
        opacity: isLocked ? 0.55 : 1,
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow: "hidden",
        height: forcedHeight ? `${forcedHeight}px` : "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, rgba(22,163,74,0.18), rgba(245,158,11,0.5), rgba(220,38,38,0.24))",
        }}
      />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {pick.sport}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#f3f4f6",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "999px",
              padding: "3px 9px",
            }}
          >
            {pick.time}
          </span>
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.24 }}>
          {homeTeam} vs {awayTeam}
        </h3>

        <p style={{ color: "rgba(255,255,255,0.62)", marginTop: "6px", fontSize: "12px", fontWeight: 500 }}>
          {pick.league}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {(() => {
          const outcomes = [
            { label: "Victoria", value: pick.winProb.win },
            { label: "Empate", value: pick.winProb.draw },
            { label: "Derrota", value: pick.winProb.loss },
          ];
          const highestValue = Math.max(...outcomes.map((o) => o.value));

          return outcomes.map((p, idx) => {
            const isHighest = p.value === highestValue;
            return (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "10px",
                  padding: "9px 7px",
                  textAlign: "center",
                  boxShadow: isHighest
                    ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                    : "0 2px 8px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.64)",
                    marginBottom: "5px",
                    fontWeight: 700,
                  }}
                >
                  {p.label}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: isHighest ? "17px" : "14px",
                    lineHeight: 1,
                    color: getProbColor(p.value),
                  }}
                >
                  {p.value}%
                </div>
              </div>
            );
          });
        })()}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {pick.bets.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "11px",
              padding: "10px 11px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <div style={{ fontWeight: 600, color: "#f3f4f6", fontSize: "12px", lineHeight: 1.3 }}>{b.label}</div>
            <div
              style={{
                fontWeight: 800,
                color: getProbColor(b.prob),
                fontSize: "13px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "999px",
                padding: "2px 8px",
              }}
            >
              {b.prob}%
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/* ================= MAIN ================= */
export default function Predicciones() {
  const firstActiveCardRef = useRef(null);
  const [activeCardHeight, setActiveCardHeight] = useState(null);

  const activePicks = [
    {
      sport: "Fútbol",
      league: "Bundesliga (Alemania)",
      match: "Bayern Munich vs Union Berlin",
      time: "15:30",
      winProb: { win: 90, draw: 6, loss: 4 },
      bets: [
        { label: "Bayern Gana -1.5", prob: 88 },
        { label: "Over 3.5 Goles", prob: 76 },
        { label: "Bayern Marca en ambos tiempos", prob: 82 }
      ]
    },
    {
      sport: "NBA",
      league: "Temporada Regular",
      match: "Lakers vs Warriors",
      time: "20:30",
      winProb: { win: 55, draw: 0, loss: 45 },
      bets: [
        { label: "Handicap Lakers -4.5", prob: 71 },
        { label: "Over 224.5 Pts", prob: 65 },
        { label: "LeBron +8.5 Ast", prob: 79 }
      ]
    },
    {
      sport: "MLB",
      league: "World Series",
      match: "Dodgers vs Yankees",
      time: "19:00",
      winProb: { win: 52, draw: 0, loss: 48 },
      bets: [
        { label: "Total Carreras -8.5", prob: 74 },
        { label: "Ohtani +1.5 Bases", prob: 68 },
        { label: "Strikeouts +7.5", prob: 61 }
      ]
    },
    {
      sport: "NHL",
      league: "Stanley Cup",
      match: "Panthers vs Oilers",
      time: "21:00",
      winProb: { win: 61, draw: 0, loss: 39 },
      bets: [
        { label: "Panthers Gana (ML)", prob: 61 },
        { label: "Más de 5.5 Goles", prob: 78 },
        { label: "Oilers +1.5 (PL)", prob: 65 }
      ]
    }
  ];

  const lockedPicks = [
    { 
      sport: "Tennis", match: "Alcaraz vs Sinner", league: "ATP Final", time: "12:00",
      winProb: { win: 58, draw: 0, loss: 42 },
      bets: [{ label: "Over 22.5 Juegos", prob: 62 }, { label: "Ace +12.5", prob: 55 }] 
    },
    { 
      sport: "Fútbol", match: "Man City vs Arsenal", league: "Premier League", time: "10:30",
      winProb: { win: 50, draw: 28, loss: 22 },
      bets: [{ label: "Over 2.5 Goles", prob: 88 }, { label: "Haaland Marca", prob: 72 }] 
    },
    { 
      sport: "NBA", match: "Celtics vs Mavs", league: "Finals", time: "21:00",
      winProb: { win: 62, draw: 0, loss: 38 },
      bets: [{ label: "Over 210.5 Pts", prob: 68 }, { label: "Tatum +25.5 Pts", prob: 68 }] 
    },
    { 
      sport: "MLB", match: "Astros vs Rangers", league: "ALCS", time: "18:00",
      winProb: { win: 54, draw: 0, loss: 46 },
      bets: [{ label: "Home Runs +1.5", prob: 32 }, { label: "Strikeouts +9.5", prob: 60 }] 
    }
  ];

  useEffect(() => {
    const updateHeight = () => {
      if (firstActiveCardRef.current) {
        setActiveCardHeight(firstActiveCardRef.current.getBoundingClientRect().height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#ffffff" }}>
      <style>
        {`
          .active-picks-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
          }
          @media (max-width: 1280px) {
            .active-picks-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (max-width: 768px) {
            .active-picks-grid {
              grid-template-columns: 1fr;
            }
          }
          .locked-picks-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
          }
          @media (max-width: 1280px) {
            .locked-picks-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (max-width: 768px) {
            .locked-picks-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      
      {/* HEADER SECTION (DARK) - STARTS FROM TOP */}
      <section style={{ height: "45vh", position: "relative", background: "#000", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AILinesBackground />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(32px, 12vw, 90px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            marginBottom: "20px",
            textTransform: "uppercase"
          }}>
            PREDICCIONES
          </h1>
          <p style={{ 
            fontSize: "clamp(15px, 2vw, 20px)", 
            color: "#86868b", 
            fontWeight: 400,
            letterSpacing: "-0.01em",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.5
          }}>
            Análisis estadístico avanzado impulsado por algoritmos de inteligencia artificial.
          </p>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 2, marginTop: "-80px", paddingBottom: "100px" }}>

        {/* ACTIVE PICKS GRID */}
        <section style={{ padding: "0 5%" }}>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
          className="active-picks-grid">
            {activePicks.map((pick, i) => (
              <PickCard key={i} pick={pick} cardRef={i === 0 ? firstActiveCardRef : null} />
            ))}
          </div>
        </section>

        {/* LOCKED SECTION */}
        <section style={{ marginTop: "100px", padding: "0 5% 100px 5%", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1d1d1f", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>PICKS DE HOY</h2>
            <p style={{ fontSize: "16px", color: "#86868b" }}>Desbloquea el análisis completo de la jornada.</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "34px" }}>
            <button style={{
              padding: "18px 48px",
              borderRadius: "16px",
              border: "none",
              background: "#000",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease"
            }}>
              Desbloquear
            </button>
          </div>

          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}>
            <div
              style={{
                position: "absolute",
                top: "-28px",
                left: "-30px",
                right: "-30px",
                bottom: "-34px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 18%, rgba(255,255,255,0.24) 52%, rgba(255,255,255,0.14) 78%, rgba(255,255,255,0) 100%)",
                backdropFilter: "blur(9px)",
                WebkitBackdropFilter: "blur(9px)",
                zIndex: 9,
                borderRadius: "32px",
                pointerEvents: "none",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            />

            {/* CARDS BORROSAS */}
            <div className="locked-picks-grid">
              {lockedPicks.slice(0, 3).map((pick, i) => (
                <PickCard
                  key={i}
                  pick={{ ...pick, bets: pick.bets.slice(0, 3) }}
                  isLocked
                  forcedHeight={activeCardHeight}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}