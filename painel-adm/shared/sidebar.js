/**
 * shared/sidebar.js
 * Componente de sidebar compartilhado — Painel ADM
 *
 * Uso em cada página:
 *   1. Adicionar <aside id="sidebar-root"></aside>
 *   2. Adicionar data-page="<id>" no <body> (veja IDs abaixo)
 *   3. Adicionar <script src="shared/sidebar.js"></script> antes do </body>
 *
 * IDs de página válidos:
 *   dashboard | noticias | eventos | comunicados | links-uteis |
 *   areas-departamentos | configuracoes
 */
(function () {
  'use strict';

  /* ── 1. Restaurar tema salvo ───────────────────────────────────────────── */
  const savedTheme = localStorage.getItem('app-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  /* ── 2. Estrutura de navegação ─────────────────────────────────────────── */
  const NAV_ITEMS = [
    { id: 'dashboard',           label: 'Dashboard',              icon: 'layout-dashboard', href: 'dashboard.html' },
    { id: 'noticias',            label: 'Notícias',                icon: 'newspaper',        href: 'noticias-lista.html' },
    { id: 'eventos',             label: 'Eventos',                 icon: 'calendar-check',   href: 'eventos-lista.html' },
    { id: 'comunicados',         label: 'Comunicados',             icon: 'megaphone',        href: 'comunicados-lista.html' },
    { id: 'links-uteis',         label: 'Links Úteis',             icon: 'link-2',           href: 'links-uteis-lista.html' },
    { id: 'areas-departamentos', label: 'Áreas e Departamentos',   icon: 'building-2',       href: 'areas-departamentos-lista.html' },
    { id: 'configuracoes',       label: 'Configurações',           icon: 'settings',         href: 'configuracoes.html' },
  ];

  /* ── 3. Página ativa ───────────────────────────────────────────────────── */
  const activePage = document.body.dataset.page || '';

  /* ── 4. Gerar HTML dos itens ───────────────────────────────────────────── */
  function buildNavHTML() {
    return NAV_ITEMS.map(item => {
      const active = item.id === activePage ? ' navItemActive' : '';
      return `
        <button class="navItem${active}" onclick="location.href='${item.href}'" type="button" aria-current="${item.id === activePage ? 'page' : 'false'}">
          <span class="navIcon"><i data-lucide="${item.icon}" width="20" height="20"></i></span>
          <span class="navLabel">${item.label}</span>
        </button>`.trim();
    }).join('\n      ');
  }

  /* ── 5. Ícone e rótulo do tema ─────────────────────────────────────────── */
  const isDarkOnLoad   = savedTheme !== 'light';
  const themeIconName  = isDarkOnLoad ? 'sun'        : 'moon';
  const themeLabelText = isDarkOnLoad ? 'Modo claro' : 'Modo escuro';

  /* ── 6. HTML completo do sidebar ───────────────────────────────────────── */
  const sidebarHTML = `
    <button class="toggleBtn" id="toggle-btn" aria-label="Recolher menu" type="button">
      <i data-lucide="chevron-left"  class="toggleIcon-left"  width="14" height="14"></i>
      <i data-lucide="chevron-right" class="toggleIcon-right" width="14" height="14"></i>
    </button>

    <div class="logoRow">
      <div class="logoWrap">
        <span class="logoDefault logoMd logo-full"   role="img" aria-label="EQS Engenharia"></span>
        <span class="logoSymbol logoSm logo-symbol"  role="img" aria-label="EQS Engenharia"></span>
      </div>
    </div>

    <div class="body">
      <nav class="navList">
        ${buildNavHTML()}
      </nav>

      <div class="spacer"></div>

      <div class="bottomList">
        <div class="iconRow">
          <button class="iconBtn" id="theme-btn" type="button" aria-label="${themeLabelText}" title="${themeLabelText}">
            <span id="theme-icon"><i data-lucide="${themeIconName}" width="16" height="16"></i></span>
          </button>
          <button class="iconBtn" type="button" id="notif-btn" aria-label="2 notificações" title="Notificações">
            <i data-lucide="bell" width="16" height="16"></i>
            <span class="notifBadge" id="notif-badge">2</span>
          </button>
        </div>
        <div class="separator"></div>
        <div class="userRow">
          <div class="avatar md"><span class="avatarInitials">AD</span></div>
          <div class="userInfo">
            <div class="userName">Admin</div>
            <div class="userEmail">admin@empresa.com</div>
          </div>
        </div>
        <button class="navItem" type="button" onclick="location.href='login.html'">
          <span class="navIcon"><i data-lucide="log-out" width="18" height="18"></i></span>
          <span class="navLabelLogout">Sair</span>
        </button>
      </div>
    </div>
  `;

  /* ── 7. Injetar no DOM ─────────────────────────────────────────────────── */
  const root = document.getElementById('sidebar-root');
  if (!root) return;
  root.className = 'sidebar open';
  root.id = 'sidebar';
  root.innerHTML = sidebarHTML;

  /* ── 8. Sidebar toggle ───────────────────────────────────────────────────── */
  document.getElementById('toggle-btn').addEventListener('click', () => {
    const sb     = document.getElementById('sidebar');
    const isOpen = sb.classList.contains('open');
    sb.classList.toggle('open',   !isOpen);
    sb.classList.toggle('closed',  isOpen);
    document.getElementById('toggle-btn')
      .setAttribute('aria-label', isOpen ? 'Expandir menu' : 'Recolher menu');
  });

  /* ── 9. Tema toggle ────────────────────────────────────────────────────── */
  document.getElementById('theme-btn').addEventListener('click', () => {
    const isDark   = document.documentElement.getAttribute('data-theme') !== 'light';
    const next     = isDark ? 'light' : 'dark';
    const newLabel = isDark ? 'Modo escuro' : 'Modo claro';
    const newIcon  = isDark ? 'moon' : 'sun';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app-theme', next);
    document.getElementById('theme-icon').innerHTML =
      `<i data-lucide="${newIcon}" width="16" height="16"></i>`;
    document.getElementById('theme-btn').setAttribute('aria-label', newLabel);
    document.getElementById('theme-btn').setAttribute('title', newLabel);
    if (window.lucide) lucide.createIcons();
  });

  /* ── 10. Renderizar ícones Lucide ──────────────────────────────────────── */
  if (window.lucide) lucide.createIcons();

  /* ── 11. Notificações ──────────────────────────────────────────────────── */
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      if (typeof notifSheetOpen === 'function') notifSheetOpen();
    });
  }

})();
