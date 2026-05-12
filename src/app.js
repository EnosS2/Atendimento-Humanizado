const navButtons = document.querySelectorAll(".nav-btn[data-screen]");
const screens = document.querySelectorAll(".screen");
const demoToggle = document.getElementById("demoToggle");
const demoHint = document.getElementById("demoHint");
const demoProgress = demoHint.querySelector(".demo-progress span");

const defaultData = {
  dashboard: {
    patient: {
      name: "Joao da Silva",
      age: 58,
      context: "Aposentado, mora com a esposa, baixa rede de apoio.",
    },
    alerts: [
      {
        type: "warning",
        title: "Exame PSA vencido ha 3 meses",
        text: "Risco preventivo elevado para a faixa etaria.",
      },
      {
        type: "caution",
        title: "Adesao a medicacao caiu 20%",
        text: "Monitoramento remoto detectou falhas.",
      },
    ],
    score: {
      value: 72,
      bars: [
        { label: "Fisiologico", value: 85 },
        { label: "Mental", value: 64, tone: "warning" },
        { label: "Adesao", value: 58, tone: "success" },
        { label: "Atividade", value: 79 },
      ],
    },
    timeline: [
      {
        date: "Jan 2026",
        title: "Internacao: Pneumonia",
        text: "Alta hospitalar apos 5 dias.",
      },
      {
        date: "Dez 2025",
        title: "Hemoglobina glicada 8.2%",
        text: "Alerta critico.",
        tone: "danger",
      },
      {
        date: "Nov 2025",
        title: "Consulta preventiva",
        text: "Acompanhamento regular.",
      },
    ],
    actions: ["Agendar PSA", "Verificar adesao", "Apoio familiar"],
    mini: [
      { title: "Saude Fisiologica", value: "85%", tone: "success" },
      { title: "Bem-estar Mental", value: "64%", tone: "warning" },
      { title: "Adesao Medicamentosa", value: "58%", tone: "caution" },
    ],
  },
  consulta: {
    patient: {
      name: "Elena Rocha",
      summary: "62 anos - HAS, Diabetes",
    },
    alert: {
      title: "Ativo: Pressao sistolica 155 mmHg",
      text: "Detectado via monitoramento remoto.",
    },
    insights: [
      { tone: "success", text: "Metabolismo estavel" },
      { tone: "warning", text: "Creatinina em alta" },
    ],
    aiSuggestions: [
      {
        title: "Ajuste de dose de enalapril",
        text: "Resultados recentes sugerem tendencia de creatinina em alta.",
      },
      {
        title: "Priorizar educacao sobre adesao",
        text: "Historico mostra quedas em finais de semana.",
      },
      {
        title: "Reforcar rotina de caminhada",
        text: "Atividade fisica caiu 18% no mes.",
      },
    ],
  },
  populacional: {
    unit: {
      name: "Gestao UBS",
      summary: "2.450 pacientes ativos",
    },
    risk: {
      note: "Aumento de 2% no grupo de baixo risco no ultimo mes.",
      levels: [
        { label: "Alto", value: 28, tone: "danger" },
        { label: "Medio", value: 44, tone: "warning" },
        { label: "Baixo", value: 68, tone: "success" },
      ],
    },
    insight: {
      tag: "Acao imediata",
      text: "Grupo de risco (hipertensos > 60 anos) com exames pendentes: 45 pacientes.",
    },
    stats: [
      { label: "Realizados", value: "76%" },
      { label: "Reagendados", value: "18%" },
      { label: "Ausentes", value: "6%" },
    ],
    maintenance: [
      { title: "Vacinas vencendo", text: "Lote AZ-2024 expira em 5 dias." },
      { title: "Equipe", text: "Dra. Clara entra em ferias amanha." },
      { title: "Equipamento", text: "Sensor de glicose precisa revisao." },
    ],
  },
  paciente: {
    greeting: "Ola, Sr. Joao",
    summary: "Aqui esta o resumo do encontro de hoje. Voce esta indo muito bem no seu cuidado.",
    score: {
      value: 75,
      label: "Nivel excelente",
      text: "Sua energia e batimentos estao em harmonia.",
    },
    plan: [
      { title: "Medicacao", text: "Tomar comprimido azul apos o cafe." },
      { title: "Habito saudavel", text: "Caminhar 20 min ao sol da manha.", tone: "success" },
      { title: "Proximo passo", text: "Retornar para exame de sangue em 15 dias.", tone: "warning" },
    ],
    tip: "Beber um copo de agua a cada 2 horas ajuda seu corpo a manter a pressao equilibrada.",
  },
  bodyMap: {
    patient: {
      name: "Joao Delgado",
      age: 45,
      bed: "Leito 204",
      initials: "JD",
    },
    current: {
      location: "Ombro direito / Abdominal",
      intensity: 7,
      sensations: ["Queimacao", "Aguda", "Formigamento"],
      notes: "Sem febre. Dor aumenta a noite.",
    },
    points: {
      front: [
        { x: 62, y: 42, tone: "primary", label: "Ombro direito" },
        { x: 55, y: 58, tone: "secondary", label: "Abdominal" },
      ],
      back: [
        { x: 48, y: 40, tone: "primary", label: "Escapula" },
      ],
    },
    history: [
      {
        date: "Ontem",
        title: "Dor abdominal",
        intensity: 4,
        sensation: "Surda",
        tone: "ok",
      },
      {
        date: "12 Out",
        title: "Ombro direito",
        intensity: 8,
        sensation: "Aguda",
        tone: "alert",
      },
    ],
  },
};

const demoSteps = [
  {
    screen: "dashboard",
    target: ".hero-card",
    text: "Visao geral do paciente e contexto social.",
  },
  {
    screen: "dashboard",
    target: "[data-dashboard-timeline]",
    text: "Linha do tempo clinica com eventos e alertas.",
  },
  {
    screen: "consulta",
    target: ".ai-list",
    text: "Sugestoes de IA com validacao do profissional.",
  },
  {
    screen: "populacional",
    target: "[data-pop-risk]",
    text: "Estratificacao rapida de risco comunitario.",
  },
  {
    screen: "paciente",
    target: "[data-patient-plan]",
    text: "Plano de acao traduzido em passos simples.",
  },
];

let demoState = {
  active: false,
  index: 0,
  timer: null,
  focusEl: null,
};

function setActiveScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-visible", screen.id === screenId);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === screenId);
  });
  const currentScreen = document.getElementById(screenId);
  if (currentScreen) {
    applyStagger(currentScreen);
  }
}

function applyStagger(screen) {
  const groups = screen.querySelectorAll(".stagger");
  groups.forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.style.setProperty("--delay", `${index * 90}ms`);
    });
  });
}

function renderDashboard(data) {
  const patientEl = document.querySelector("[data-dashboard-patient]");
  const contextEl = document.querySelector("[data-dashboard-context]");
  patientEl.textContent = `${data.patient.name}, ${data.patient.age} anos`;
  contextEl.textContent = `Contexto: ${data.patient.context}`;

  const alertsEl = document.querySelector("[data-dashboard-alerts]");
  alertsEl.innerHTML = data.alerts
    .map(
      (alert) => `
      <div class="alert ${alert.type}">
        <p class="alert-title">${alert.title}</p>
        <p class="muted">${alert.text}</p>
      </div>
    `
    )
    .join("");

  const scoreNumber = document.querySelector("[data-score-number]");
  const scoreBars = document.querySelector("[data-score-bars]");
  scoreNumber.textContent = data.score.value;
  scoreBars.innerHTML = data.score.bars
    .map((bar) => {
      const tone = bar.tone ? ` ${bar.tone}` : "";
      return `
      <div>
        <p>${bar.label}</p>
        <div class="bar${tone}"><span style="width: ${bar.value}%"></span></div>
      </div>
    `;
    })
    .join("");

  const timelineEl = document.querySelector("[data-dashboard-timeline]");
  timelineEl.innerHTML = data.timeline
    .map((item) => {
      const tone = item.tone ? ` ${item.tone}` : "";
      return `
      <li>
        <span class="dot${tone}"></span>
        <div>
          <p class="event">${item.date} - ${item.title}</p>
          <p class="muted">${item.text}</p>
        </div>
      </li>
    `;
    })
    .join("");

  const actionsEl = document.querySelector("[data-dashboard-actions]");
  actionsEl.innerHTML = data.actions
    .map((label) => `<button class="pill">${label}</button>`)
    .join("");

  const miniEl = document.querySelector("[data-dashboard-mini]");
  miniEl.innerHTML = data.mini
    .map(
      (item) => `
      <div class="mini">
        <p class="mini-title">${item.title}</p>
        <p class="mini-value ${item.tone}">${item.value}</p>
      </div>
    `
    )
    .join("");
}

function renderConsulta(data) {
  document.querySelector("[data-consulta-name]").textContent = data.patient.name;
  document.querySelector("[data-consulta-sub]").textContent = data.patient.summary;
  document.querySelector("[data-consulta-alert-title]").textContent = data.alert.title;
  document.querySelector("[data-consulta-alert-text]").textContent = data.alert.text;

  const insightsEl = document.querySelector("[data-consulta-insights]");
  insightsEl.innerHTML = data.insights
    .map(
      (item) =>
        `<li><span class="badge ${item.tone}"></span> ${item.text}</li>`
    )
    .join("");

  const aiEl = document.querySelector("[data-consulta-ai]");
  aiEl.innerHTML = data.aiSuggestions
    .map(
      (suggestion, index) => `
      <div class="ai-card" data-suggestion="${index}">
        <p class="ai-title">${suggestion.title}</p>
        <p class="muted">${suggestion.text}</p>
        <div class="actions">
          <button class="pill ai-approve">Validar</button>
          <button class="pill ghost ai-ignore">Ignorar</button>
        </div>
      </div>
    `
    )
    .join("");
}

function renderPopulacional(data) {
  document.querySelector("[data-pop-name]").textContent = data.unit.name;
  document.querySelector("[data-pop-sub]").textContent = data.unit.summary;
  document.querySelector("[data-pop-tag]").textContent = data.insight.tag;
  document.querySelector("[data-pop-insight]").textContent = data.insight.text;

  const riskEl = document.querySelector("[data-pop-risk]");
  riskEl.innerHTML = data.risk.levels
    .map(
      (level) => `
      <div class="chart-bar">
        <span>${level.label}</span>
        <div class="bar ${level.tone}"><span style="width: ${level.value}%"></span></div>
      </div>
    `
    )
    .join("");
  riskEl.insertAdjacentHTML("beforeend", `<p class="muted">${data.risk.note}</p>`);

  const statsEl = document.querySelector("[data-pop-stats]");
  statsEl.innerHTML = data.stats
    .map(
      (stat) => `
      <div>
        <p class="stat">${stat.value}</p>
        <p class="muted">${stat.label}</p>
      </div>
    `
    )
    .join("");

  const maintenanceEl = document.querySelector("[data-pop-maintenance]");
  maintenanceEl.innerHTML = data.maintenance
    .map(
      (item) => `<li><strong>${item.title}</strong> ${item.text}</li>`
    )
    .join("");
}

function renderPaciente(data) {
  document.querySelector("[data-patient-greeting]").textContent = data.greeting;
  document.querySelector("[data-patient-summary]").textContent = data.summary;
  document.querySelector("[data-patient-score]").textContent = data.score.value;
  document.querySelector("[data-patient-score-label]").textContent = data.score.label;
  document.querySelector("[data-patient-score-text]").textContent = data.score.text;
  document.querySelector("[data-patient-tip]").textContent = data.tip;

  const planEl = document.querySelector("[data-patient-plan]");
  planEl.innerHTML = data.plan
    .map((item) => {
      const tone = item.tone ? ` ${item.tone}` : "";
      return `
      <div class="task">
        <span class="badge${tone}"></span>
        <div>
          <p class="task-title">${item.title}</p>
          <p class="muted">${item.text}</p>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderBodyMap(data) {
  const nameEl = document.querySelector("[data-bodymap-name]");
  const subEl = document.querySelector("[data-bodymap-sub]");
  const initialsEl = document.querySelector("[data-bodymap-initials]");
  if (nameEl) {
    nameEl.textContent = data.patient.name;
  }
  if (subEl) {
    subEl.textContent = `${data.patient.age} anos - ${data.patient.bed}`;
  }
  if (initialsEl) {
    initialsEl.textContent = data.patient.initials;
  }

  const locationEl = document.querySelector("[data-bodymap-location]");
  const intensityEl = document.querySelector("[data-bodymap-intensity]");
  const intensityBar = document.querySelector("[data-bodymap-intensity-bar]");
  const sensationsEl = document.querySelector("[data-bodymap-sensations]");
  const notesEl = document.querySelector("[data-bodymap-notes]");

  const updateCurrentLocation = (label, dotElement) => {
    if (locationEl) {
      locationEl.textContent = label;
    }
    document.querySelectorAll(".bodymap-dot").forEach((dot) => {
      dot.classList.toggle("is-active", dot === dotElement);
    });
  };

  if (locationEl) {
    locationEl.textContent = data.current.location;
  }
  if (intensityEl) {
    intensityEl.textContent = `${data.current.intensity}/10`;
  }
  if (intensityBar) {
    intensityBar.style.width = `${data.current.intensity * 10}%`;
  }
  if (sensationsEl) {
    sensationsEl.innerHTML = data.current.sensations
      .map((item) => `<span class="chip">${item}</span>`)
      .join("");
  }
  if (notesEl) {
    notesEl.textContent = data.current.notes;
  }

  const frontDots = document.querySelector("[data-bodymap-dots=\"front\"]");
  const backDots = document.querySelector("[data-bodymap-dots=\"back\"]");
  const createDot = (point, extraClass = "") => {
    const tone = point.tone === "secondary" ? " secondary" : "";
    return `<button class="bodymap-dot${tone}${extraClass}" type="button" data-label="${point.label}" style="left:${point.x}%; top:${point.y}%;" title="${point.label}" aria-label="${point.label}"></button>`;
  };

  if (frontDots) {
    frontDots.innerHTML = data.points.front
      .map((point) => createDot(point))
      .join("");
  }
  if (backDots) {
    backDots.innerHTML = data.points.back
      .map((point) => createDot(point))
      .join("");
  }

  const bindBodyMapDots = () => {
    document.querySelectorAll(".bodymap-dot").forEach((dot) => {
      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        const label = dot.dataset.label || data.current.location;
        updateCurrentLocation(label, dot);
      });
    });
  };

  const inferRegion = (x, y, view) => {
    const side = x < 43 ? "esquerdo" : x > 57 ? "direito" : "central";
    const viewLabel = view === "back" ? "posterior" : "frontal";
    if (y < 20) return `Cabeca - vista ${viewLabel}`;
    if (y < 39) return side === "central" ? `Torax - vista ${viewLabel}` : `Ombro ${side}`;
    if (y < 58) return side === "central" ? `Abdomen - vista ${viewLabel}` : `Braco ${side}`;
    if (y < 77) return side === "central" ? `Quadril - vista ${viewLabel}` : `Coxa ${side}`;
    return side === "central" ? `Pernas - vista ${viewLabel}` : `Perna ${side}`;
  };

  bindBodyMapDots();
  const initialDot = Array.from(document.querySelectorAll(".bodymap-dot")).find((dot) =>
    data.current.location.includes(dot.dataset.label)
  );
  if (initialDot) {
    initialDot.classList.add("is-active");
  }

  document.querySelectorAll("[data-bodymap-figure]").forEach((figure) => {
    figure.addEventListener("click", (event) => {
      const rect = figure.getBoundingClientRect();
      const x = Math.max(12, Math.min(88, ((event.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(14, Math.min(92, ((event.clientY - rect.top) / rect.height) * 100));
      const view = figure.dataset.bodymapFigure;
      const label = inferRegion(x, y, view);
      const dotsLayer = figure.querySelector("[data-bodymap-dots]");
      if (!dotsLayer) return;

      const previousMark = dotsLayer.querySelector(".bodymap-dot.user-mark");
      if (previousMark) {
        previousMark.remove();
      }

      dotsLayer.insertAdjacentHTML("beforeend", createDot({ label, x, y }, " user-mark"));
      const newDot = dotsLayer.querySelector(".bodymap-dot.user-mark");
      if (newDot) {
        newDot.addEventListener("click", (dotEvent) => {
          dotEvent.stopPropagation();
          updateCurrentLocation(label, newDot);
        });
        updateCurrentLocation(label, newDot);
      }
    });
  });

  const historyEl = document.querySelector("[data-bodymap-history]");
  if (historyEl) {
    historyEl.innerHTML = data.history
      .map((item) => {
        const marker = item.tone === "alert" ? "history-marker alert" : "history-marker";
        return `
        <li>
          <span class="${marker}"></span>
          <div>
            <p class="event">${item.date} - ${item.title}</p>
            <p class="muted">Intensidade: ${item.intensity} | Sensacao: ${item.sensation}</p>
          </div>
        </li>
      `;
      })
      .join("");
  }
}

function bindAiActions() {
  const aiCards = document.querySelectorAll(".ai-card");
  aiCards.forEach((card) => {
    const approve = card.querySelector(".ai-approve");
    const ignore = card.querySelector(".ai-ignore");

    approve.addEventListener("click", () => {
      card.classList.remove("ignored");
      card.classList.add("validated");
    });

    ignore.addEventListener("click", () => {
      card.classList.remove("validated");
      card.classList.add("ignored");
    });
  });
}

function renderAll(data) {
  renderDashboard(data.dashboard);
  renderConsulta(data.consulta);
  renderPopulacional(data.populacional);
  renderPaciente(data.paciente);
  renderBodyMap(data.bodyMap);
  bindAiActions();
  applyStagger(document.querySelector(".screen.is-visible"));
}

function resetDemoProgress() {
  demoProgress.style.animation = "none";
  demoProgress.offsetHeight;
  demoProgress.style.animation = "";
}

function clearDemoFocus() {
  if (demoState.focusEl) {
    demoState.focusEl.classList.remove("demo-focus");
  }
}

function runDemoStep(index) {
  const step = demoSteps[index];
  if (!step) {
    return;
  }
  clearDemoFocus();
  setActiveScreen(step.screen);
  const target = document.querySelector(step.target);
  if (target) {
    target.classList.add("demo-focus");
    demoState.focusEl = target;
  }
  demoHint.querySelector(".demo-text").textContent = step.text;
  resetDemoProgress();
}

function startDemo() {
  demoState.active = true;
  demoState.index = 0;
  document.body.classList.add("demo-active");
  runDemoStep(demoState.index);
  demoState.timer = setInterval(() => {
    demoState.index = (demoState.index + 1) % demoSteps.length;
    runDemoStep(demoState.index);
  }, 6000);
}

function stopDemo() {
  demoState.active = false;
  document.body.classList.remove("demo-active");
  clearInterval(demoState.timer);
  demoState.timer = null;
  clearDemoFocus();
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (demoState.active) {
      stopDemo();
    }
    setActiveScreen(button.dataset.screen);
  });
});

demoToggle.addEventListener("click", () => {
  if (demoState.active) {
    stopDemo();
  } else {
    startDemo();
  }
});

const bodyMapTabs = document.querySelectorAll("[data-bodymap-view]");
const bodyMapFigures = document.querySelectorAll("[data-bodymap-figure]");

bodyMapTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetView = tab.dataset.bodymapView;
    bodyMapTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.bodymapView === targetView);
    });
    bodyMapFigures.forEach((figure) => {
      figure.classList.toggle("is-active", figure.dataset.bodymapFigure === targetView);
    });
  });
});

async function loadData() {
  try {
    const response = await fetch("../src/data/patients.json");
    if (!response.ok) {
      throw new Error("Fetch failed");
    }
    const data = await response.json();
    renderAll(data);
  } catch (error) {
    renderAll(defaultData);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
  setActiveScreen("dashboard");
  loadData();
});
