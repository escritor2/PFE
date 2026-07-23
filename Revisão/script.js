const sensoresIniciais = [
  { id: 1, nome: "Sensor Galpão A", tipo: "Temperatura", valor: 24.5, unidade: "°C", status: "normal" },
  { id: 2, nome: "Sensor Estufa 02", tipo: "Umidade", valor: 88.0, unidade: "%", status: "critico" },
  { id: 3, nome: "Sensor Compressor", tipo: "Pressão", valor: 6.2, unidade: "bar", status: "normal" },
  { id: 4, nome: "Sensor Câmara Fria", tipo: "Temperatura", valor: -2.1, unidade: "°C", status: "normal" },
  { id: 5, nome: "Sensor Almoxarifado", tipo: "Umidade", valor: 45.5, unidade: "%", status: "normal" },
  { id: 6, nome: "Sensor Caldeira", tipo: "Temperatura", valor: 98.4, unidade: "°C", status: "critico" }
];

function renderizarDashboard(lista) {
  const container = document.getElementById("sensorGrid");
  container.innerHTML = "";

  lista.forEach(sensor => {
    const card = document.createElement("div");
    card.className = "card" + (sensor.status === "critico" ? " card-alerta" : "");

    const inicial = sensor.tipo.charAt(0).toUpperCase();

    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${inicial}</div>
        <div>
          <div class="card-title">${sensor.nome}</div>
          <div class="card-meta">${sensor.tipo}</div>
        </div>
      </div>
      <div class="card-value">${sensor.valor} ${sensor.unidade}</div>
      <div class="card-actions">
        <button type="button">Histórico</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function aplicarFiltro() {
  const filtro = document.getElementById("filterType").value;
  const lista = filtro === "todos" ? sensoresIniciais : sensoresIniciais.filter(s => s.tipo.toLowerCase().startsWith(filtro));
  renderizarDashboard(lista);
  atualizarTimestamp();
}

function atualizarTimestamp() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  document.getElementById("lastUpdate").textContent = `Última atualização: ${horas}:${minutos}:${segundos}`;
}

function simularAtualizacao() {
  sensoresIniciais.forEach(sensor => {
    const variacao = Number((Math.random() * 2 - 1).toFixed(1));
    sensor.valor = Number((sensor.valor + variacao).toFixed(1));
  });
  aplicarFiltro();
}

document.getElementById("btnRefresh").addEventListener("click", simularAtualizacao);
document.getElementById("filterType").addEventListener("change", aplicarFiltro);

renderizarDashboard(sensoresIniciais);
atualizarTimestamp();
setInterval(simularAtualizacao, 30000);
