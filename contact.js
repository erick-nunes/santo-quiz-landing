// Modal de contato — abre quando o link "Contato" do footer é clicado.
// Trilingue, baseado no <html lang>.
(function () {
  'use strict';

  const CONFIG = {
    name: 'Erick Nunes Carvalho',
    initials: 'EN',
    photo: '/img/avatar.jpg?v=1', // bump quando trocar a foto
    email: 'eu@ericknunes.dev',
    phone: '+55 16 99706-5511',
    whatsapp: '5516997065511',
  };

  const T = {
    pt: {
      role: 'Desenvolvedor do Santo Quiz',
      emailAction: 'Enviar e-mail',
      whatsappAction: 'Abrir no WhatsApp',
      close: 'Fechar',
    },
    en: {
      role: 'Santo Quiz developer',
      emailAction: 'Send email',
      whatsappAction: 'Open in WhatsApp',
      close: 'Close',
    },
    es: {
      role: 'Desarrollador de Santo Quiz',
      emailAction: 'Enviar e-mail',
      whatsappAction: 'Abrir en WhatsApp',
      close: 'Cerrar',
    },
  };

  const lang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  const t = T[lang] || T.en;

  const html = `
    <div class="contact-backdrop" id="contactBackdrop"></div>
    <div class="contact-modal" id="contactModal" role="dialog" aria-modal="true" aria-labelledby="contactName">
      <button type="button" class="contact-close" id="contactClose" aria-label="${t.close}">×</button>
      <div class="contact-avatar" id="contactAvatar" aria-hidden="true">${CONFIG.initials}</div>
      <h3 class="contact-name" id="contactName">${CONFIG.name}</h3>
      <p class="contact-role">${t.role}</p>
      <div class="contact-actions">
        <a class="contact-action" href="mailto:${CONFIG.email}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="M3 7l9 6 9-6"/>
          </svg>
          <div class="contact-action-text">
            <span class="contact-action-main">${CONFIG.email}</span>
            <span class="contact-action-sub">${t.emailAction}</span>
          </div>
        </a>
        <a class="contact-action" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.9 11.9 0 0 0 12.03 0C5.4 0 .03 5.37.03 12c0 2.12.55 4.18 1.6 6l-1.7 6.2 6.37-1.67a11.94 11.94 0 0 0 5.73 1.46h.01c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.52-8.52zM12.03 21.78h-.01a9.78 9.78 0 0 1-4.98-1.36l-.36-.21-3.78.99 1.01-3.69-.23-.38a9.77 9.77 0 1 1 18.13-5.14c0 5.38-4.38 9.76-9.78 9.76zm5.37-7.32c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.2-.35.22-.64.07a8.04 8.04 0 0 1-2.37-1.46 8.9 8.9 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.13-.13.29-.34.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52l-.9-2.18c-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.74-.71 1.98-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.35z"/>
          </svg>
          <div class="contact-action-text">
            <span class="contact-action-main">${CONFIG.phone}</span>
            <span class="contact-action-sub">${t.whatsappAction}</span>
          </div>
        </a>
      </div>
    </div>
  `;

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);

  const modal = document.getElementById('contactModal');
  const backdrop = document.getElementById('contactBackdrop');
  const closeBtn = document.getElementById('contactClose');
  const avatar = document.getElementById('contactAvatar');

  // Troca as iniciais pela foto se ela carregar com sucesso.
  if (CONFIG.photo) {
    const img = new Image();
    img.onload = function () {
      img.alt = CONFIG.name;
      avatar.textContent = '';
      avatar.appendChild(img);
    };
    img.src = CONFIG.photo;
  }

  function open() {
    modal.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Intercepta o link "Contato" / "Contact" / "Contacto" do footer
  document.querySelectorAll('.footer nav a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });
})();
