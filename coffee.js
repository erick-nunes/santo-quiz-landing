// Widget flutuante de doação via Pix — somente PT-BR.
// Depende de pix.js (window.PixBuilder) e da lib qrcode-generator (CDN).
(function () {
  'use strict';

  const CONFIG = {
    key: 'eu@ericknunes.dev',
    name: 'Erick Nunes de Carvalho',
    city: 'Ibate',
  };

  const PRESETS = [5, 10, 20, 50, 100];

  // ---------- Markup ----------
  const html = `
    <button type="button" class="coffee-fab" id="coffeeFab" aria-label="Ajude o projeto com um Pix">
      <span class="fab-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </span>
      <span class="fab-label">Ajude o projeto</span>
    </button>
    <div class="coffee-backdrop" id="coffeeBackdrop"></div>
    <div class="coffee-modal" id="coffeeModal" role="dialog" aria-modal="true" aria-labelledby="coffeeTitle">
      <button type="button" class="coffee-close" id="coffeeClose" aria-label="Fechar">×</button>
      <h3 id="coffeeTitle">Me ajude a manter esse projeto</h3>
      <p class="sub">O Santo Quiz é gratuito e sem anúncios. Se quiser apoiar, envie um Pix de qualquer valor — serve de cafezinho ou de hospedagem. 🙏</p>

      <div class="coffee-chips" id="coffeeChips">
        ${PRESETS.map(
          (v) => `<button type="button" class="coffee-chip" data-value="${v}">R$ ${v}</button>`
        ).join('')}
        <button type="button" class="coffee-chip" data-value="other">Outro</button>
      </div>

      <div class="coffee-custom" id="coffeeCustom">
        <div class="coffee-custom-wrap">
          <span>R$</span>
          <input type="number" id="coffeeAmount" min="1" step="1" inputmode="decimal" placeholder="25" />
        </div>
      </div>

      <div class="coffee-qr" id="coffeeQr">
        <div class="qr-box" id="coffeeQrBox"></div>
        <p>Abra o app do seu banco e escaneie o QR Code, ou copie o código abaixo:</p>
        <button type="button" class="coffee-copy" id="coffeeCopy">
          <span class="emoji">📋</span><span id="coffeeCopyLabel">Copiar código Pix</span>
        </button>
        <p class="coffee-hint" id="coffeeHint"></p>
      </div>
    </div>
  `;

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);

  // ---------- Refs ----------
  const fab = document.getElementById('coffeeFab');
  const backdrop = document.getElementById('coffeeBackdrop');
  const modal = document.getElementById('coffeeModal');
  const closeBtn = document.getElementById('coffeeClose');
  const chipsWrap = document.getElementById('coffeeChips');
  const chips = chipsWrap.querySelectorAll('.coffee-chip');
  const customWrap = document.getElementById('coffeeCustom');
  const customInput = document.getElementById('coffeeAmount');
  const qrWrap = document.getElementById('coffeeQr');
  const qrBox = document.getElementById('coffeeQrBox');
  const copyBtn = document.getElementById('coffeeCopy');
  const copyLabel = document.getElementById('coffeeCopyLabel');
  const hint = document.getElementById('coffeeHint');

  let currentPayload = '';

  // ---------- FAB visibility ----------
  function updateFabVisibility() {
    if (window.scrollY > 300) fab.classList.add('visible');
    else fab.classList.remove('visible');
  }
  window.addEventListener('scroll', updateFabVisibility, { passive: true });
  updateFabVisibility();

  // ---------- Modal open/close ----------
  function openModal() {
    backdrop.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    backdrop.classList.remove('open');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  fab.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // ---------- Chip selection ----------
  function setActiveChip(el) {
    chips.forEach((c) => c.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      setActiveChip(chip);
      const val = chip.dataset.value;
      if (val === 'other') {
        customWrap.classList.add('visible');
        customInput.focus();
        const typed = Number(customInput.value);
        if (typed > 0) renderPix(typed);
        else hideQr();
      } else {
        customWrap.classList.remove('visible');
        renderPix(Number(val));
      }
    });
  });

  customInput.addEventListener('input', () => {
    const v = Number(customInput.value);
    if (v > 0) renderPix(v);
    else hideQr();
  });

  // ---------- QR rendering ----------
  function hideQr() {
    qrWrap.classList.remove('visible');
    currentPayload = '';
  }

  function renderPix(amount) {
    if (!window.PixBuilder || typeof qrcode === 'undefined') {
      hint.textContent = 'Erro ao carregar o gerador de Pix. Recarregue a página.';
      return;
    }

    const payload = window.PixBuilder.buildPixPayload({
      key: CONFIG.key,
      name: CONFIG.name,
      city: CONFIG.city,
      amount,
      txid: 'santoquiz',
    });
    currentPayload = payload;

    // qrcode-generator: type 0 = auto, ECC 'M'
    const qr = qrcode(0, 'M');
    qr.addData(payload);
    qr.make();
    qrBox.innerHTML = qr.createSvgTag({ scalable: true, margin: 0 });

    qrWrap.classList.add('visible');
    copyLabel.textContent = 'Copiar código Pix';
    copyBtn.classList.remove('copied');
    hint.textContent = `Enviando R$ ${amount.toFixed(2).replace('.', ',')} para ${CONFIG.name}`;
  }

  // ---------- Copy ----------
  copyBtn.addEventListener('click', async () => {
    if (!currentPayload) return;
    try {
      await navigator.clipboard.writeText(currentPayload);
      copyLabel.textContent = 'Copiado!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyLabel.textContent = 'Copiar código Pix';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = currentPayload;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        copyLabel.textContent = 'Copiado!';
        copyBtn.classList.add('copied');
      } catch (_) {
        copyLabel.textContent = 'Não consegui copiar';
      }
      document.body.removeChild(ta);
      setTimeout(() => {
        copyLabel.textContent = 'Copiar código Pix';
        copyBtn.classList.remove('copied');
      }, 2000);
    }
  });
})();
