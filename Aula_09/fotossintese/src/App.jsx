import React, { useState, useEffect, useRef } from 'react';

const styles = {
  container: { padding: '20px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto', position: 'relative', backgroundColor: '#000', color: '#fff', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  card: { 
    border: '1px solid #0f0', 
    borderRadius: '8px', 
    padding: '25px', 
    marginBottom: '20px', 
    backgroundColor: 'rgba(0, 20, 0, 0.8)', 
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',      
    flexDirection: 'column',
    alignItems: 'center',  
    textAlign: 'center'  
  },
  button: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#008f11', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' },
  activeText: { color: '#00ff41', fontWeight: 'bold', marginTop: '10px' },
  matrixObject: {
    fontSize: '60px',
    margin: '20px 0',
    transition: 'transform 0.5s ease',
    transform: 'matrix3d(0.866, 0.5, 0, 0, -0.5, 0.866, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
  }
};

const App = () => {
  const [etapa, setEtapa] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.floor(width / 15);
    let yPos = Array(columns).fill(0);

    const matrixRain = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0f0';
      ctx.font = '15px monospace';
      yPos.forEach((y, i) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 15, y);
        if (y > height && Math.random() > 0.975) yPos[i] = 0;
        else yPos[i] = y + 15;
      });
    };
    const interval = setInterval(matrixRain, 50);
    return () => clearInterval(interval);
  }, []);

  const aulas = [
    { title: "Luz Solar", desc: "A clorofila decodifica os fótons da Matrix solar.", icon: "☀️" },
    { title: "Água e CO2", desc: "Input de dados: H2O do solo e CO2 da atmosfera.", icon: "💧" },
    { title: "Glicose e Oxigênio", desc: "Output: Glicose (energia) e Oxigênio (liberado no sistema).", icon: "🌳" }
  ];

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, opacity: 0.2 }} />

      <header style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#00ff41' }}>🌿 Protocolo: Fotossíntese.exe</h1>
        <p>Injetando conhecimento na rede orgânica.</p>
      </header>

      <section style={styles.card}>
        <h2>Etapa: {aulas[etapa].title}</h2>
        
        <div style={styles.matrixObject}>
          {aulas[etapa].icon}
        </div>

        <p style={{ maxWidth: '400px' }}>{aulas[etapa].desc}</p>
        
        {/* CENTRALIZAÇÃO DOS BOTÕES MODO */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
          {aulas.map((_, i) => (
            <button key={i} style={styles.button} onClick={() => setEtapa(i)}>
              Modo {i + 1}
            </button>
          ))}
        </div>
      </section>

      <Quiz />
    </div>
  );
};

const Quiz = () => {
  const [respondido, setRespondido] = useState(false);
  return (
    <section style={{ ...styles.card, border: '1px solid #00ff41', backgroundColor: 'rgba(0, 40, 0, 0.9)' }}>
      <h3>🧠 Debug de Sistema</h3>
      <p>O que as plantas liberam após o processamento dos dados?</p>
      <button onClick={() => setRespondido(!respondido)} style={styles.button}>
        {respondido ? "Codificar Resposta" : "Decodificar Resposta"}
      </button>
      {respondido && <p style={styles.activeText}>✅ Sys_Output: Oxigênio (O₂)!</p>}
    </section>
  );
};

export default App;
