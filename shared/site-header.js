/**
 * shared/site-header.js
 * Header compartilhado do site institucional (site-desktop) — desktop, mobile e drawer.
 *
 * Uso em cada página:
 *   1. Adicionar <div id="site-header-root"></div> no lugar do header
 *   2. Adicionar data-page="<id>" no <body> (veja IDs abaixo — omitir em páginas
 *      sem item de menu correspondente, ex: busca)
 *   3. Adicionar <script src="shared/site-header.js"></script> depois do script do lucide
 *
 * IDs de página válidos:
 *   home | noticias | eventos | comunicados | setores | sobre | links-uteis | documentos
 *
 * Estado deslogado: adicionar data-logged-in="false" no <body> — troca o avatar/dropdown
 * (desktop) e o rodapé "Meu Perfil"/"Sair" (drawer mobile) por um botão "Login".
 * Sem o atributo (ou com qualquer valor diferente de "false"), assume usuário logado.
 */
(function () {
  'use strict';

  const NAV_ITEMS = [
    { id: 'home',        label: 'Home',        href: 'index.html' },
    { id: 'noticias',    label: 'Notícias',    href: 'noticias.html' },
    { id: 'eventos',     label: 'Eventos',     href: 'eventos.html' },
    { id: 'comunicados', label: 'Comunicados', href: 'comunicados.html' },
    { id: 'setores',     label: 'Setores',     href: 'setores.html' },
    { id: 'sobre',       label: 'Sobre',       href: 'sobre.html' },
    { id: 'links-uteis', label: 'Links Úteis', href: 'links-uteis.html' },
    { id: 'documentos',  label: 'Documentos',  href: 'documentos.html' },
  ];

  const activePage = document.body.dataset.page || '';
  const loggedIn = document.body.dataset.loggedIn !== 'false';

  function navLinks(itemClass, activeClass) {
    return NAV_ITEMS.map((item) => {
      const active = item.id === activePage;
      const cls = active ? `${itemClass} ${activeClass}` : itemClass;
      const current = active ? ' aria-current="page"' : '';
      return `<a href="${item.href}" class="${cls}"${current}>${item.label}</a>`;
    }).join('\n          ');
  }

  const headerHTML = `
    <header class="siteHeader hideMobile">
      <div class="siteHeaderInner">
        <span class="logoDefault logoSm" role="img" aria-label="EQS Engenharia"></span>

        <nav class="siteHeaderNav">
          ${navLinks('siteHeaderNavItem', 'siteHeaderNavItemActive')}
        </nav>

        <div class="siteHeaderActions">
          <div class="siteHeaderSearch wrapper">
            <div class="inputWrap hasLeft">
              <span class="iconLeft"><i data-lucide="search" width="16" height="16"></i></span>
              <input class="input" type="text" placeholder="Buscar..." id="site-header-search-input" />
            </div>
          </div>

          ${loggedIn ? `
          <div class="dropdownMenu" id="user-menu">
            <button class="siteHeaderAvatarBtn" id="user-menu-trigger" aria-label="Menu do usuário" type="button">
              <div class="avatar sm"><img class="avatarImg" src="../src/avatar/team-01.jpg" alt="Usuário" /></div>
            </button>
            <div class="dropdownMenu__panel end" id="user-menu-panel">
              <button class="dropdownMenu__item" type="button" onclick="window.openProfileDialog ? window.openProfileDialog() : location.href='perfil.html'">
                <span class="dropdownMenu__item__icon"><i data-lucide="user" width="16" height="16"></i></span>
                Meu Perfil
              </button>
              <button class="dropdownMenu__item" type="button" id="theme-toggle-desktop">
                <span class="dropdownMenu__item__icon" data-theme-icon><i data-lucide="moon" width="16" height="16"></i></span>
                <span data-theme-label>Modo escuro</span>
              </button>
              <button class="dropdownMenu__item dropdownMenu__item--destructive" type="button" onclick="location.href='../painel-adm/login.html'">
                <span class="dropdownMenu__item__icon"><i data-lucide="log-out" width="16" height="16"></i></span>
                Sair
              </button>
            </div>
          </div>
          ` : `
          <a class="btn primary sm" href="../painel-adm/login.html">Login</a>
          `}
        </div>
      </div>
    </header>

    <!-- ── Header mobile: busca | logo | hambúrguer ─────────────── -->
    <header class="siteHeaderMobile hideDesktop">
      <div class="siteHeaderMobileRow" id="mobile-header-default">
        <button class="siteHeaderMobileIconBtn" type="button" aria-label="Buscar" id="site-header-open-search">
          <i data-lucide="search" width="20" height="20"></i>
        </button>
        <span class="logoDefault logoSm" role="img" aria-label="EQS Engenharia"></span>
        <button class="siteHeaderMobileIconBtn" type="button" aria-label="Abrir menu" id="site-header-open-menu">
          <i data-lucide="menu" width="20" height="20"></i>
        </button>
      </div>
      <div class="siteHeaderMobileSearchRow" id="mobile-header-search" hidden>
        <input class="siteHeaderMobileSearchInput" type="text" placeholder="Buscar..." id="mobile-search-input" />
        <button class="siteHeaderMobileIconBtn" type="button" aria-label="Fechar busca" id="site-header-close-search">
          <i data-lucide="x" width="20" height="20"></i>
        </button>
      </div>
    </header>

    <!-- ── Menu mobile (drawer) — reaproveita o Sheet ───────────── -->
    <div class="sheetOverlay hideDesktop" id="mobile-menu-overlay">
      <aside class="sheetPanel siteHeaderMobileMenuPanel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="sheetHeader">
          <span class="sheetTitle">Menu</span>
          <button class="sheetClose" type="button" aria-label="Fechar" id="site-header-close-menu">
            <i data-lucide="x" width="16" height="16"></i>
          </button>
        </div>
        <div class="sheetBody">
          <nav class="siteHeaderMobileNavList">
            ${navLinks('siteHeaderMobileNavItem', 'siteHeaderMobileNavItemActive')}
          </nav>
        </div>
        <div class="sheetFooter">
          <div class="siteHeaderMobileFooterList">
            ${loggedIn ? `
            <a class="siteHeaderMobileFooterItem" href="perfil.html" onclick="if (window.openProfileSheet) { event.preventDefault(); window.openProfileSheet(); }">
              <i data-lucide="user" width="16" height="16"></i> Meu Perfil
            </a>
            <button class="siteHeaderMobileFooterItem" type="button" id="theme-toggle-mobile">
              <span data-theme-icon><i data-lucide="moon" width="16" height="16"></i></span> <span data-theme-label>Modo escuro</span>
            </button>
            <a class="siteHeaderMobileFooterItem siteHeaderMobileFooterItemDestructive" href="../painel-adm/login.html">
              <i data-lucide="log-out" width="16" height="16"></i> Sair
            </a>
            ` : `
            <a class="btn primary btnFullWidth" href="../painel-adm/login.html">
              <i data-lucide="log-in" width="16" height="16"></i> Login
            </a>
            `}
          </div>
        </div>
      </aside>
    </div>
  `;

  const root = document.getElementById('site-header-root');
  if (!root) return;
  root.innerHTML = headerHTML;

  if (window.lucide) lucide.createIcons();

  /* Avatar dropdown (header desktop) — só existe no estado logado */
  const menu = document.getElementById('user-menu');
  if (menu) {
    const trigger = document.getElementById('user-menu-trigger');
    const panel = document.getElementById('user-menu-panel');
    trigger.addEventListener('click', () => panel.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) panel.classList.remove('open');
    });
  }

  /* Tema — botão "Modo escuro"/"Modo claro" no menu do avatar (desktop) e no rodapé
     do drawer (mobile). Persiste em localStorage porque cada página nasce com
     data-theme="light" no <html> — sem isso o tema resetaria a cada navegação. */
  const THEME_KEY = 'eqs-site-theme';
  const themeToggles = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggles.forEach((btn) => {
      btn.querySelector('[data-theme-icon]').innerHTML =
        `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}" width="16" height="16"></i>`;
      btn.querySelector('[data-theme-label]').textContent =
        theme === 'dark' ? 'Modo claro' : 'Modo escuro';
    });
    if (window.lucide) lucide.createIcons();
  }
  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  });
  if (localStorage.getItem(THEME_KEY) === 'dark') applyTheme('dark');

  /* Busca (header mobile) */
  const mobileHeaderDefault = document.getElementById('mobile-header-default');
  const mobileHeaderSearch = document.getElementById('mobile-header-search');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  document.getElementById('site-header-open-search').addEventListener('click', () => {
    mobileHeaderDefault.hidden = true;
    mobileHeaderSearch.hidden = false;
    mobileSearchInput.focus();
  });
  document.getElementById('site-header-close-search').addEventListener('click', () => {
    mobileHeaderSearch.hidden = true;
    mobileHeaderDefault.hidden = false;
  });

  /* Menu (drawer, header mobile) */
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('sheetOpen');
    document.body.style.overflow = '';
  }
  document.getElementById('site-header-open-menu').addEventListener('click', () => {
    mobileMenuOverlay.classList.add('sheetOpen');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById('site-header-close-menu').addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.querySelector('.sheetPanel').addEventListener('click', (e) => e.stopPropagation());

  /* Busca — Enter nos campos do header redireciona para a página de resultados */
  window.goToSearch = function goToSearch(value) {
    const term = (value || '').trim();
    if (term) window.location.href = 'search.html?q=' + encodeURIComponent(term);
  };
  document.getElementById('site-header-search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') window.goToSearch(e.target.value);
  });
  mobileSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') window.goToSearch(e.target.value);
  });
})();
