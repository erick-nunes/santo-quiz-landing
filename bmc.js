// Botão flutuante que leva ao perfil Buy Me a Coffee.
// Usa o mesmo estilo .coffee-fab do style.css (branco, ícone azul).
(function () {
  'use strict';

  const BMC_URL = 'https://buymeacoffee.com/ericknc?utm_source=santo-quiz&utm_medium=floating-btn';

  // Rótulos por idioma (identificado pelo <html lang>)
  const LABELS = {
    en: { aria: 'Support the project on Buy Me a Coffee', text: 'Support the project' },
    es: { aria: 'Apoya el proyecto en Buy Me a Coffee', text: 'Apoya el proyecto' },
  };

  const lang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  const { aria, text } = LABELS[lang] || LABELS.en;

  const html = `
    <a class="coffee-fab" id="bmcFab" href="${BMC_URL}" target="_blank" rel="noopener noreferrer" aria-label="${aria}">
      <span class="fab-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </span>
      <span class="fab-label">${text}</span>
    </a>
  `;

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
})();
