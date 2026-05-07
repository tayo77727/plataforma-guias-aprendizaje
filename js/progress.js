/* === PROGRESS.JS - Local Progress Tracking === */

const STORAGE_KEY = 'matide_progress';

// Default progress state
const defaultProgress = {
  sessions: {
    s1: { completed: false, label: 'Intro a MicroPython' },
    s2: { completed: false, label: 'Sensores y Contexto Social' },
    s3: { completed: false, label: 'Entrenamiento de Modelos' },
    s4: { completed: false, label: 'Motores e Integración Final' },
    s5: { completed: false, label: 'Presentación y Debate' }
  }
};

function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Error reading progress:', e);
  }
  return JSON.parse(JSON.stringify(defaultProgress));
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Error saving progress:', e);
  }
}

function toggleSessionComplete(sessionId) {
  const progress = getProgress();
  if (progress.sessions[sessionId]) {
    progress.sessions[sessionId].completed = !progress.sessions[sessionId].completed;
    saveProgress(progress);
    updateAllProgressUI();

    const isCompleted = progress.sessions[sessionId].completed;
    const label = progress.sessions[sessionId].label;
    if (typeof showToast === 'function') {
      showToast(
        isCompleted ? `✅ "${label}" completada!` : `↩️ "${label}" marcada como pendiente`,
        isCompleted ? 'success' : 'info'
      );
    }
  }
}

function getOverallProgress() {
  const progress = getProgress();
  const sessions = Object.values(progress.sessions);
  const completed = sessions.filter(s => s.completed).length;
  return Math.round((completed / sessions.length) * 100);
}

function getModuleProgress(moduleNum) {
  const progress = getProgress();
  const moduleSessions = {
    1: ['s1', 's2'],
    2: ['s3'],
    3: ['s4', 's5']
  };
  const ids = moduleSessions[moduleNum] || [];
  const completed = ids.filter(id => progress.sessions[id]?.completed).length;
  return Math.round((completed / ids.length) * 100);
}

function updateAllProgressUI() {
  // Update overall progress bar
  const overallFill = document.getElementById('overallProgressFill');
  const overallText = document.getElementById('overallProgressText');
  if (overallFill) {
    const pct = getOverallProgress();
    overallFill.style.width = pct + '%';
    if (overallText) overallText.textContent = pct + '%';
  }

  // Update module progress bars
  [1, 2, 3].forEach(m => {
    const fill = document.getElementById(`mod${m}ProgressFill`);
    const text = document.getElementById(`mod${m}ProgressText`);
    if (fill) {
      const pct = getModuleProgress(m);
      fill.style.width = pct + '%';
      if (text) text.textContent = pct + '%';
    }
  });

  // Update session status icons
  const progress = getProgress();
  Object.entries(progress.sessions).forEach(([id, data]) => {
    const statusEl = document.querySelector(`[data-session-status="${id}"]`);
    if (statusEl) {
      statusEl.className = 'session-item__status';
      if (data.completed) {
        statusEl.classList.add('session-item__status--completed');
        statusEl.innerHTML = '<i class="ph-bold ph-check"></i>';
      } else {
        statusEl.classList.add('session-item__status--available');
        statusEl.innerHTML = '<i class="ph-bold ph-play"></i>';
      }
    }

    // Update complete buttons
    const btn = document.querySelector(`[data-complete-btn="${id}"]`);
    if (btn) {
      if (data.completed) {
        btn.classList.remove('btn--success');
        btn.classList.add('btn--secondary');
        btn.innerHTML = '<i class="ph-bold ph-arrow-counter-clockwise"></i> Desmarcar sesión';
      } else {
        btn.classList.remove('btn--secondary');
        btn.classList.add('btn--success');
        btn.innerHTML = '<i class="ph-bold ph-check-circle"></i> Marcar sesión como completada';
      }
    }
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateAllProgressUI();
});
