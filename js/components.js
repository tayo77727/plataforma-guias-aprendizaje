/* === COMPONENTS.JS - Tabs, Modals === */

document.addEventListener('DOMContentLoaded', () => {
  initSessionTabs();
  initModals();
  initCompleteButtons();
});

/* --- Session Tabs --- */
function initSessionTabs() {
  const tabs = document.querySelectorAll('.session-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all panels, show target
      document.querySelectorAll('.session-panel').forEach(p => {
        p.classList.remove('active');
      });
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* --- Modal System --- */
function initModals() {
  // Close modal on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) modal.classList.remove('open');
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

/* --- Complete Session Buttons --- */
function initCompleteButtons() {
  document.querySelectorAll('[data-complete-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sessionId = btn.dataset.completeBtn;
      if (typeof toggleSessionComplete === 'function') {
        toggleSessionComplete(sessionId);
      }
    });
  });
}
