# Design System Rules
_Last updated: 2026-05-22_

> Source of truth completa: `CLAUDE.md` neste mesmo diretório.  
> Este arquivo é a referência rápida para criação de telas HTML em `painel-adm/`, `site-desktop/` e `site-mobile/`.

---

## Stack & Setup

- React 18 + Vite + TypeScript + CSS Modules
- Ícones: **Lucide** (CDN para HTML: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`)
- Fonte: **Inter** (Google Fonts)
- Tokens: `componentes/tokens/tokens.css` — importar sempre como primeiro `<link>`
- Storybook 8 (`npm run storybook` → porta 6006)

---

## Absolute Rules

1. **Zero valores literais** — toda cor, tamanho, espaçamento, raio ou borda usa `var(--token)`.
2. **Zero estilos de componente inline** — apenas `<link>` para cada componente usado.
3. **`<style>` somente para layout de página** — body, .main, .pageHeader, grids de página, padrões page-only como .chip, .switchLabel.
4. **Nunca linkar dois componentes com a mesma classe CSS** — ver seção de Conflitos abaixo.
5. **Ícones via `data-lucide`** — nunca SVG inline.
6. **Logos via classes de `Logo.module.css`** (`<span class="logoDefault logoMd">`) — nunca `<img>`/`<svg>` direto; a troca de tema é automática via `[data-theme]`.
7. **Peso de fonte: títulos em `--font-weight-bold`, todo o restante (texto corrido, labels, células de tabela) em `--font-weight-regular`.** Medium/semibold ficam reservados para estados pontuais (ex: dia de hoje no calendário, botão de página ativo) — nunca para títulos ou texto comum.
8. **Sempre carregar a fonte Inter via Google Fonts** no `<head>` — sem o `<link>`, `var(--font-body)`/`var(--font-display)` caem no sans-serif padrão do sistema. Ver skeleton abaixo.

---

## Theming

```html
<html lang="pt-BR" data-theme="dark">
```

Tokens semânticos se adaptam automaticamente. Dark é o padrão. Light via `data-theme="light"`.  
Botão de tema alterna `data-theme` e re-executa `lucide.createIcons()`.

---

## Componentes — CSS paths e classes HTML

### StepIndicator _(Mobile)_
```html
<link rel="stylesheet" href="../../componentes/StepIndicator/StepIndicator.module.css" />
```
Classes: `.stepRoot` (container flex-column), `.stepBars` (row de barras), `.stepBar` (barra individual), `.stepBar.done` (preenchida — brand gradient), `.stepBar.pending` (vazia — fundo elevado), `.stepLabel` (texto "Passo X de Y")

```html
<!-- Passo 1 de 5 -->
<div class="stepRoot" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" aria-label="Passo 1 de 5">
  <div class="stepBars">
    <div class="stepBar done"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
    <div class="stepBar pending"></div>
  </div>
  <span class="stepLabel" aria-hidden="true">Passo 1 de 5</span>
</div>
```

Regras:
- `.done` = todos os passos com índice < current (1-indexed)
- `.pending` = todos os passos com índice >= current
- Sempre incluir `role="progressbar"` + `aria-valuenow/min/max` no `.stepRoot`

---

### UserPin _(Mobile)_
```html
<link rel="stylesheet" href="../../componentes/UserPin/UserPin.module.css" />
```
Classe: `.userPin` — círculo brand com ícone `user` do Lucide. Visual 100% no componente; posicionamento no mapa via `.map-user-pin` em `page-mobile.css`.  
Futuramente suportará prop `pulse` com animação em loop (placeholder comentado no CSS).

```html
<!-- posicionamento (.map-user-pin) + visual (.userPin) no mesmo elemento -->
<div class="map-user-pin userPin" role="img" aria-label="Sua localização">
  <i data-lucide="user" width="18" height="18"></i>
</div>
```

---

### TimeSlot _(Mobile)_
```html
<link rel="stylesheet" href="../../componentes/TimeSlot/TimeSlot.module.css" />
```
Classes: `.timeSlot` (base — disponível), `.timeSlot.selected` (selecionado — gradiente brand), `.timeSlot.unavailable` (indisponível — dimmed + strikethrough + `disabled`)

```html
<!-- Disponível -->
<button class="timeSlot" type="button">09:00</button>

<!-- Selecionado -->
<button class="timeSlot selected" type="button" aria-pressed="true">09:30</button>

<!-- Indisponível -->
<button class="timeSlot unavailable" type="button" disabled aria-disabled="true">10:00</button>
```

Usar dentro de `.time-slot-grid` (2 colunas, definida em `page-mobile.css`):
```html
<div class="time-slot-grid">
  <button class="timeSlot selected">09:00</button>
  <button class="timeSlot">09:30</button>
  <button class="timeSlot unavailable" disabled>10:00</button>
  ...
</div>
```

Layout do dia complementar via classes de `page-mobile.css`: `.day-picker`, `.day-picker__nav`, `.day-picker__scroll`, `.day-picker__day` (+ `.active`), `.day-picker__day-name`, `.day-picker__day-date`. Seções com `.schedule-section` e `.schedule-section__label`.

---

### Tokens
```html
<link rel="stylesheet" href="../componentes/tokens/tokens.css" />
```
Sempre o primeiro link. Expõe todas as variáveis `--color-*`, `--spacing-*`, etc.

---

### Sidebar
```html
<link rel="stylesheet" href="../componentes/Sidebar/Sidebar.module.css" />
```
Classes: `.sidebar`, `.open`, `.closed`, `.toggleBtn`, `.logoRow`, `.logoWrap`, `.body`, `.navList`, `.navItem`, `.navItemActive`, `.navIcon`, `.navLabel`, `.navLabelLogout`, `.spacer`, `.bottomList`, `.separator`, `.userRow`, `.userName`, `.userEmail`, `.toggleIcon-left`, `.toggleIcon-right`

**Sempre linkar junto com `Avatar.module.css` e `Logo.module.css`** — o sidebar.js injeta
`<span class="logoDefault">`/`<span class="avatar">` diretamente; sem os dois CSS linkados
esses elementos ficam sem tamanho/imagem (invisíveis, sem erro no console).

---

### Avatar
```html
<link rel="stylesheet" href="../componentes/Avatar/Avatar.module.css" />
```
Classes: `.avatar`, `.sm` (32px), `.md` (40px), `.lg` (64px), `.avatarInitials`

---

### Background
```html
<link rel="stylesheet" href="../componentes/Background/Background.module.css" />
```
Classes: `.bgWrapper` (no `<main>`), `.blob1`, `.blob2` (dois `<div>` filhos diretos do main)

---

### Button
```html
<link rel="stylesheet" href="../componentes/Button/Button.module.css" />
```
Classes: `.btn`, `.primary`, `.secondary`, `.destructive`, `.ghost`, `.sm`, `.lg`, `.hasLeft` (com ícone esquerdo), `.iconOnly`  
Ícone: `<span class="icon"><i data-lucide="..." width="16" height="16"></i></span>`

---

### Input
```html
<link rel="stylesheet" href="../componentes/Input/Input.module.css" />
```
Classes: `.wrapper`, `.label`, `.inputWrap`, `.input`, `.helperText`, `.errorText`, `.successText`  
**Atenção:** `.wrapper` também existe em Dropdown e Textarea — os três podem coexistir (mesma estrutura visual).  
**Não coexiste com:** Checkbox (`.wrapper` conflita destrutivamente) e Toggle (`.wrapper` conflita destrutivamente).

---

### Textarea
```html
<link rel="stylesheet" href="../componentes/Textarea/Textarea.module.css" />
```
Classes: `.wrapper`, `.label`, `.textarea`, `.helperText`, `.errorText`, `.successText` — mesma família do Input (coexistem).

```html
<div class="wrapper">
  <label class="label" for="conteudo">Conteúdo</label>
  <textarea class="textarea" id="conteudo" rows="6" placeholder="Escreva o conteúdo..."></textarea>
</div>
```

---

### ImageUpload
```html
<link rel="stylesheet" href="../componentes/ImageUpload/ImageUpload.module.css" />
```
Dropzone de imagem com preview funcional — clique (via `<label for>`) ou arraste um arquivo.

Classes: `.wrapper`, `.label`, `.dropzone`, `.dropzone.dragOver`, `.hiddenInput`, `.empty`, `.emptyIcon`, `.emptyText`, `.emptyHint`, `.preview`, `.previewImg`, `.previewRemove`, `.errorText`, `.helperText`

```html
<div class="wrapper">
  <span class="label">Imagem de capa</span>
  <label class="dropzone" id="capa-dropzone">
    <input type="file" accept="image/*" class="hiddenInput" id="capa-input" />
    <div class="empty" id="capa-empty">
      <span class="emptyIcon"><i data-lucide="image-plus" width="24" height="24"></i></span>
      <span class="emptyText">Clique ou arraste uma imagem</span>
      <span class="emptyHint">PNG ou JPG, até 5MB</span>
    </div>
    <div class="preview" id="capa-preview" hidden>
      <img class="previewImg" id="capa-preview-img" alt="Pré-visualização da imagem de capa" />
      <button type="button" class="previewRemove" id="capa-remove" aria-label="Remover imagem">
        <i data-lucide="x" width="14" height="14"></i>
      </button>
    </div>
  </label>
</div>
```

**JS padrão (preview funcional + drag & drop):**
```js
function setupImageUpload(id) {
  const dropzone = document.getElementById(id + '-dropzone');
  const input    = document.getElementById(id + '-input');
  const empty    = document.getElementById(id + '-empty');
  const preview  = document.getElementById(id + '-preview');
  const img      = document.getElementById(id + '-preview-img');
  const removeBtn = document.getElementById(id + '-remove');

  function showFile(file) {
    if (!file) { empty.hidden = false; preview.hidden = true; img.src = ''; return; }
    img.src = URL.createObjectURL(file);
    empty.hidden = true;
    preview.hidden = false;
  }

  input.addEventListener('change', () => showFile(input.files?.[0] ?? null));
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    input.value = '';
    showFile(null);
  });
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragOver'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragOver'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragOver');
    const file = e.dataTransfer.files?.[0];
    if (file) { input.files = e.dataTransfer.files; showFile(file); }
  });
}
setupImageUpload('capa');
```

---

### Dropdown
```html
<link rel="stylesheet" href="../componentes/Dropdown/Dropdown.module.css" />
```
Classes: `.wrapper`, `.label`, `.trigger`, `.chevron`, `.menu`, `.option`, `.selected`  
O `.wrapper` é o container do field (mesmo visual que Input `.wrapper`).  
**Não coexiste com:** Checkbox, Toggle (`.wrapper` conflita).

```html
<div class="wrapper" id="meu-dropdown">
  <label class="label" for="meu-trigger">Label</label>
  <div class="trigger" id="meu-trigger" role="button" tabindex="0" aria-haspopup="listbox">
    <span id="meu-value">Opção selecionada</span>
    <span class="chevron"><i data-lucide="chevron-down" width="14" height="14"></i></span>
  </div>
  <div class="menu" role="listbox">
    <div class="option selected" data-value="val1" role="option">Opção 1</div>
    <div class="option" data-value="val2" role="option">Opção 2</div>
  </div>
</div>
```
JS padrão para dropdowns: `querySelectorAll('[id$="-dropdown"]')`.

---

### Table
```html
<link rel="stylesheet" href="../componentes/Table/Table.module.css" />
```
Classes: `.card` (container), `.tableWrap`, `.table`, `.thead`, `.tbody`, `.tr`, `.th`, `.td`, `.tdMono`, `.badge`, `.badgeDot`, `.cellActions`  
**Atenção:** `.card` também existe em Card.module.css — **nunca linkar os dois na mesma página**.  
**Regra:** use Table.module.css em páginas de lista/detalhe; Card.module.css em páginas de formulário.  
**Status disponíveis para `.badge`:** `data-status="success|error|warning|info|orange|indigo|violet|pink"`

---

### Card
```html
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
```

| Classe | Token de fundo | Uso |
|--------|---------------|-----|
| `.card` | `--color-bg-surface` (sólido) | Superfície padrão. Usar em formulários, listagens, painéis. |
| `.card2` | `--color-bg-elevated` (sólido, um degrau mais claro) | Card de destaque/elevado sobre um `.card` padrão. |

Ambas usam `border: --color-border-subtle`. Nenhuma usa `backdrop-filter`/blur — não há fundo decorativo (blobs) por trás para justificar translucidez; o sistema é flat/sólido.  
**Não coexiste com:** Table.module.css (mesma classe `.card`).

---

### Breadcrumb
```html
<link rel="stylesheet" href="../componentes/Breadcrumb/Breadcrumb.module.css" />
```
Classes: `.nav` (no `<nav>`), `.list` (no `<ol>`), `.item` (no `<li>`), `.link` (no `<a>`), `.sep` (dentro do `<a>`), `.current` (último item, `<span>`)

**Estrutura obrigatória** — o `.sep` fica DENTRO do `<a class="link">`:
```html
<nav aria-label="Breadcrumb" class="nav">
  <ol class="list">
    <li class="item">
      <a href="pagina-pai.html" class="link">
        Pai
        <span class="sep" aria-hidden="true"><i data-lucide="chevron-right" width="12" height="12"></i></span>
      </a>
    </li>
    <li class="item">
      <span class="current" aria-current="page">Filho</span>
    </li>
  </ol>
</nav>
```

---

### Divider
```html
<link rel="stylesheet" href="../componentes/Divider/Divider.module.css" />
```
Uso: `<hr class="divider" />`  
Cor: `--color-border-subtle` (sólido)  
Margin: `0 var(--spacing-xl)` (inset horizontal)

---

### Timeline
```html
<link rel="stylesheet" href="../componentes/Timeline/Timeline.module.css" />
```
Classes: `.timeline`, `.tlItem`, `.tlVis`, `.tlDot`, `.tlConnector`, `.tlContent`, `.tlLabel`, `.tlTime`  
Modificadores de estado (no `.tlItem`): `.tlDone` · `.tlActive` · `.tlPending`

```html
<div class="timeline">
  <div class="tlItem tlDone">
    <div class="tlVis">
      <div class="tlDot"></div>
      <div class="tlConnector"></div>
    </div>
    <div class="tlContent">
      <div class="tlLabel">Reserva confirmada</div>
      <div class="tlTime">25/05/2026 às 09:30</div>
    </div>
  </div>
  <div class="tlItem tlActive"><!-- ... --></div>
  <div class="tlItem tlPending"><!-- ... --></div>
</div>
```

**Regras:**
- `.tlTime` é opcional (omitir quando não há timestamp)
- O conector do último item some automaticamente via CSS (`.tlItem:last-child .tlConnector`)
- Usar dentro de `.formSection` ou `.card` — não standalone

---

### Feedback
```html
<link rel="stylesheet" href="../componentes/Feedback/Feedback.module.css" />
```
Classes: `.alert`, `.success`, `.error`, `.warning`, `.info`, `.fbIcon`, `.fbBody`, `.fbTitle`, `.fbMessage`, `.fbDismiss`

```html
<div class="alert success" role="alert">
  <span><i data-lucide="circle-check" width="18" height="18"></i></span>
  <div class="fbBody">
    <div class="fbTitle">Título</div>
    <div class="fbMessage">Mensagem.</div>
  </div>
  <button class="fbDismiss" aria-label="Fechar"><i data-lucide="x" width="14" height="14"></i></button>
</div>
```

---

### Pagination
```html
<link rel="stylesheet" href="../componentes/Pagination/Pagination.module.css" />
```
Classes: `.pagination` (container), `.info` (texto "Exibindo X–Y de Z"), `.controls`, `.paginBtn`, `.paginBtnActive`, `.ellipsis`

```html
<div class="pagination">
  <span class="info">Exibindo 1–10 de 24 resultados</span>
  <div class="controls">
    <button class="paginBtn" aria-label="Página anterior"><i data-lucide="chevron-left" width="14" height="14"></i></button>
    <button class="paginBtn paginBtnActive" aria-current="page">1</button>
    <button class="paginBtn">2</button>
    <button class="paginBtn">3</button>
    <button class="paginBtn" aria-label="Próxima página"><i data-lucide="chevron-right" width="14" height="14"></i></button>
  </div>
</div>
```

---

### DatePicker
```html
<link rel="stylesheet" href="../componentes/DatePicker/DatePicker.module.css" />
```
Layout horizontal: grade de dias (esquerda) + controles Start/End/Apply (direita).  
Adaptado do Geist Calendar `horizontalLayout` com tokens do design system.

**Estrutura HTML:**
```html
<div class="popoverWrap">
  <!-- Trigger pill -->
  <button class="trigger [open]">
    <span class="triggerIcon"><i data-lucide="calendar" width="14" height="14"></i></span>
    <span class="triggerText">22/05 – 31/05/2026</span>         <!-- ou -->
    <span class="triggerPlaceholder">Selecionar período</span>   <!-- quando vazio -->
    <button class="triggerClear"><i data-lucide="x" width="12" height="12"></i></button>
  </button>

  <!-- Popover (ocultar com atributo hidden) -->
  <div class="popover">
    <!-- Painel esquerdo: calendário -->
    <div class="calPanel">
      <div class="calHeader">
        <button class="calNavBtn">...</button>
        <span class="calMonthLabel">May 2026</span>
        <button class="calNavBtn">...</button>
      </div>
      <div class="calGrid">
        <!-- 7x calDayName: S M T W T F S -->
        <!-- Nx calDay  + modificadores: calDayOutside / calDayToday / calDayStart / calDayEnd / calDayInRange -->
      </div>
    </div>

    <!-- Divisória vertical -->
    <div class="panelDivider"></div>

    <!-- Painel direito: controles -->
    <div class="ctrlPanel">
      <div><div class="ctrlFieldLabel">Start</div><input class="ctrlDateInput" /></div>
      <div><div class="ctrlFieldLabel">End</div><input class="ctrlDateInput" /></div>
      <div class="ctrlSpacer"></div>
      <button class="ctrlApply">Apply</button>
      <select class="ctrlTzSelect">...</select>
    </div>
  </div>
</div>
```

**Regras:**
- `.popover[hidden]` → `display: none` — use `hidden` attr para abrir/fechar
- `.calDayStart` e `.calDayEnd` nunca recebem `.calDayInRange`
- JS de navegação de meses e seleção de range fica na `<script>` da página

---

## Componentes do site institucional (site-desktop)

Layout de body: `body.layout-site` (sem sidebar — header no topo + `<main class="siteMain">` + footer, página inteira rola). Definido em `shared/page.css`.

### SiteHeader
```html
<link rel="stylesheet" href="../componentes/SiteHeader/SiteHeader.module.css" />
```
Sempre linkar junto: `Logo.module.css`, `Input.module.css`, `Avatar.module.css`, `DropdownMenu.module.css` (o header usa os quatro internamente).

Classes: `.siteHeader` (`<header>`, sticky top, fundo full-bleed), `.siteHeaderInner` (conteúdo — respeita o mesmo grid de 1200px das seções, `margin: 0 auto`), `.siteHeaderNav`, `.siteHeaderNavItem`, `.siteHeaderNavItemActive`, `.siteHeaderActions`, `.siteHeaderSearch` (wrapper de largura fixa em volta do Input), `.siteHeaderAvatarBtn` (trigger do DropdownMenu)

**Importante:** `.siteHeader` é só o fundo/borda full-bleed — todo o conteúdo (logo, nav, busca, avatar) fica dentro de `.siteHeaderInner`, nunca direto em `.siteHeader`.

**Nas páginas reais, este HTML não é copiado manualmente — é gerado por `shared/site-header.js`** (ver seção dedicada logo abaixo do `SiteHeaderMobile`). O bloco abaixo existe só como referência de marcação/classes.

```html
<header class="siteHeader">
  <div class="siteHeaderInner">
    <span class="logoDefault logoSm" role="img" aria-label="EQS Engenharia"></span>

    <nav class="siteHeaderNav">
      <a href="index.html" class="siteHeaderNavItem siteHeaderNavItemActive" aria-current="page">Home</a>
      <a href="noticias.html" class="siteHeaderNavItem">Notícias</a>
      <a href="comunicados.html" class="siteHeaderNavItem">Comunicados</a>
      <a href="sobre.html" class="siteHeaderNavItem">Sobre</a>
      <a href="links-uteis.html" class="siteHeaderNavItem">Links Úteis</a>
    </nav>

    <div class="siteHeaderActions">
      <div class="siteHeaderSearch wrapper">
        <div class="inputWrap hasLeft">
          <span class="iconLeft"><i data-lucide="search" width="16" height="16"></i></span>
          <input class="input" type="text" placeholder="Buscar..." />
        </div>
      </div>

      <div class="dropdownMenu" id="user-menu">
        <button class="siteHeaderAvatarBtn" id="user-menu-trigger" aria-label="Menu do usuário" type="button">
          <div class="avatar sm"><span class="avatarInitials">AD</span></div>
        </button>
        <div class="dropdownMenu__panel end" id="user-menu-panel">
          <!-- "Meu Perfil": site-header.js chama window.openProfileDialog() se a página
               definir esse hook (ex: dialog de perfil no index.html); senão navega p/ perfil.html -->
          <button class="dropdownMenu__item" onclick="window.openProfileDialog ? window.openProfileDialog() : location.href='perfil.html'">
            <span class="dropdownMenu__item__icon"><i data-lucide="user" width="16" height="16"></i></span>
            Meu Perfil
          </button>
          <button class="dropdownMenu__item dropdownMenu__item--destructive" onclick="location.href='login.html'">
            <span class="dropdownMenu__item__icon"><i data-lucide="log-out" width="16" height="16"></i></span>
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
```

**JS do menu do avatar (padrão DropdownMenu em HTML standalone):**
```js
const menu = document.getElementById('user-menu');
const trigger = document.getElementById('user-menu-trigger');
const panel = document.getElementById('user-menu-panel');
trigger.addEventListener('click', () => panel.classList.toggle('open'));
document.addEventListener('click', (e) => { if (!menu.contains(e.target)) panel.classList.remove('open'); });
```

---

### Hero
```html
<link rel="stylesheet" href="../componentes/Hero/Hero.module.css" />
```
Banner de destaque — usado no topo da Home. Classes: `.hero` (foto full-bleed), `.heroImage`, `.heroScrim` (gradiente escurecendo a base), `.heroInner` (conteúdo — mesmo grid de 1200px do resto da página, agora em flex-row para acomodar o painel lateral opcional), `.heroContent`, `.heroTag`, `.heroTitle`, `.heroDescription`, `.heroLink`, `.heroPanel` (wrapper opcional do lado direito, ex: `QuickLinksCard`)

**Importante:** igual ao SiteHeader — a foto de fundo é full-bleed, mas o texto/CTA ficam dentro de `.heroInner` para alinhar com o grid das seções abaixo.

```html
<div class="hero">
  <img class="heroImage" src="..." alt="" />
  <div class="heroScrim"></div>
  <div class="heroInner">
    <div class="heroContent">
      <span class="heroTag">Destaque</span>
      <h1 class="heroTitle">Título da notícia em destaque</h1>
      <p class="heroDescription">Resumo curto da notícia.</p>
      <a class="heroLink" href="noticia-detalhe.html">
        Ler notícia completa <i data-lucide="arrow-right" width="16" height="16"></i>
      </a>
    </div>
    <div class="heroPanel">
      <!-- opcional: QuickLinksCard ou outro conteúdo flutuante -->
    </div>
  </div>
</div>
```

**Responsivo:** abaixo de 640px o próprio `.hero` já reduz sozinho via `@media` (não precisa de classe extra) — `min-height` cai pra 480px, título vira `--font-size-2xl`, descrição vira `--font-size-sm`, e `.heroPanel` some (em mobile o painel de atalhos `QuickLinksCard` viraria uma seção própria abaixo do Hero, não um painel lateral — ainda não construída). A classe `.heroMobile` ainda existe no CSS por compatibilidade com o antigo `site-mobile/index.html` (não mais em uso), mas a Home atual não precisa dela.

---

### QuickLinksCard
```html
<link rel="stylesheet" href="../componentes/QuickLinksCard/QuickLinksCard.module.css" />
```
Painel flutuante de atalhos — usado dentro de `.heroPanel` no Hero da Home. Lista de linhas (ícone + título + subtítulo + chevron) e um rodapé com CTA "Acessar todos os links".

Classes: `.quickLinksCard`, `.quickLinksList`, `.quickLinksItem` (`<a>`), `.quickLinksItemIcon`, `.quickLinksItemText`, `.quickLinksItemTitle`, `.quickLinksItemSubtitle`, `.quickLinksItemChevron`, `.quickLinksFooter` (`<a>`)

```html
<div class="quickLinksCard">
  <div class="quickLinksList">
    <a class="quickLinksItem" href="links-uteis.html">
      <span class="quickLinksItemIcon"><i data-lucide="life-buoy" width="18" height="18"></i></span>
      <span class="quickLinksItemText">
        <span class="quickLinksItemTitle">Central de Suporte</span>
        <span class="quickLinksItemSubtitle">Abra um chamado</span>
      </span>
      <i data-lucide="chevron-right" width="16" height="16" class="quickLinksItemChevron"></i>
    </a>
  </div>
  <a class="quickLinksFooter" href="links-uteis.html">
    Acessar todos os links
    <i data-lucide="chevron-right" width="16" height="16"></i>
  </a>
</div>
```

---

### NewsCard
```html
<link rel="stylesheet" href="../componentes/NewsCard/NewsCard.module.css" />
```
Card de conteúdo — prévias de Notícias e Comunicados. Classes: `.newsCard` (`<a>`), `.newsImageWrap`, `.newsImage`, `.newsTag` (`data-status`: success/info/warning/error/disabled), `.newsBody`, `.newsTitle`, `.newsExcerpt` (2 linhas, corta com reticências), `.newsDate`

```html
<a class="newsCard" href="noticia-detalhe.html">
  <div class="newsImageWrap">
    <img class="newsImage" src="..." alt="" />
    <span class="newsTag" data-status="info">Institucional</span>
  </div>
  <div class="newsBody">
    <h3 class="newsTitle">Título da notícia</h3>
    <p class="newsExcerpt">Resumo de até 2 linhas da notícia...</p>
    <span class="newsDate">12 de dezembro de 2026</span>
  </div>
</a>
```

**Sem imagem:** omitir `<img>` — `.newsImageWrap` mantém o `aspect-ratio` com o fundo `--color-bg-subtle`.

---

### EventCard
```html
<link rel="stylesheet" href="../componentes/EventCard/EventCard.module.css" />
```
Card de evento — seção "Próximos Eventos" da Home e página completa de Eventos. Classes: `.eventCard` (`<a>`), `.eventImageWrap`, `.eventImage`, `.eventDateBadge` (chip com dia/mês, ancorado no canto superior esquerdo da imagem), `.eventDay`, `.eventMonth`, `.eventBody`, `.eventTitle`, `.eventLocation` (ícone `map-pin` + texto)

```html
<a class="eventCard" href="evento-detalhe.html">
  <div class="eventImageWrap">
    <img class="eventImage" src="..." alt="" />
    <div class="eventDateBadge">
      <span class="eventDay">18</span>
      <span class="eventMonth">Dez</span>
    </div>
  </div>
  <div class="eventBody">
    <h3 class="eventTitle">Confraternização EQS 2026</h3>
    <span class="eventLocation"><i data-lucide="map-pin" width="14" height="14"></i>Auditório — Sede SP</span>
  </div>
</a>
```

**Sem imagem:** omitir `<img>` e `.eventDateBadge` (o badge é posicionado sobre a imagem; sem imagem, a data fica só no texto se necessário) — `.eventImageWrap` mantém o `aspect-ratio` com o fundo `--color-bg-subtle`.

---

### EventHighlightCard
```html
<link rel="stylesheet" href="../componentes/EventHighlightCard/EventHighlightCard.module.css" />
```
Card do evento em destaque — topo do painel "Próximos Eventos" da Home. Foto de fundo cobre o card inteiro; `.eventHighlightScrim` é um degradê de preto (opaco) até preto com opacidade 0, indo da borda esquerda até 90% da largura — dá contraste ao texto, que fica sobreposto direto na foto (sem painel branco). Kicker+heading no topo, data+título+meta+descrição+CTA embaixo, todos em texto claro.

Classes: `.eventHighlightCard`, `.eventHighlightImage`, `.eventHighlightScrim`, `.eventHighlightOverlay`, `.eventHighlightKicker`, `.eventHighlightHeading`, `.eventHighlightPanel` (sem fundo — só posiciona o conteúdo sobre a foto), `.eventHighlightDateBadge`, `.eventHighlightDay`, `.eventHighlightMonth`, `.eventHighlightPanelBody`, `.eventHighlightTitle`, `.eventHighlightMeta`, `.eventHighlightMetaItem` (ícone + texto), `.eventHighlightDescription` (2 linhas), `.eventHighlightCta`

```html
<div class="eventHighlightCard">
  <img class="eventHighlightImage" src="..." alt="" />
  <div class="eventHighlightScrim"></div>
  <div class="eventHighlightOverlay">
    <span class="eventHighlightKicker">Agenda</span>
    <h3 class="eventHighlightHeading">Próximo Evento</h3>
  </div>
  <div class="eventHighlightPanel">
    <div class="eventHighlightDateBadge">
      <span class="eventHighlightDay">18</span>
      <span class="eventHighlightMonth">Dez</span>
    </div>
    <div class="eventHighlightPanelBody">
      <h4 class="eventHighlightTitle">Confraternização EQS 2026</h4>
      <div class="eventHighlightMeta">
        <span class="eventHighlightMetaItem"><i data-lucide="map-pin" width="14" height="14"></i>Auditório — Sede SP</span>
        <span class="eventHighlightMetaItem"><i data-lucide="clock" width="14" height="14"></i>Início às 19h</span>
      </div>
      <p class="eventHighlightDescription">Descrição curta do evento...</p>
      <a class="eventHighlightCta" href="eventos.html">Confirmar presença <i data-lucide="arrow-right" width="16" height="16"></i></a>
    </div>
  </div>
</div>
```

**Variante `wide`** (página de listagem de Eventos — `eventos.html`) — banner full-width, sem painel branco, meta em linha e até 2 CTAs. Classes: `.eventHighlightCardWide` (junto com `.eventHighlightCard`), `.eventHighlightWideContent`, `.eventHighlightWideTitle`, `.eventHighlightWideDescription`, `.eventHighlightWideActions`, `.eventHighlightSecondaryCta` (segundo botão, outline)

```html
<div class="eventHighlightCard eventHighlightCardWide">
  <img class="eventHighlightImage" src="..." alt="" />
  <div class="eventHighlightScrim"></div>
  <div class="eventHighlightWideContent">
    <span class="eventHighlightKicker">Evento em destaque</span>
    <h3 class="eventHighlightWideTitle">Confraternização EQS 2026</h3>
    <p class="eventHighlightWideDescription">Descrição do evento...</p>
    <div class="eventHighlightMeta">
      <span class="eventHighlightMetaItem"><i data-lucide="calendar" width="14" height="14"></i>18 de dezembro de 2026</span>
      <span class="eventHighlightMetaItem"><i data-lucide="clock" width="14" height="14"></i>Das 09h às 17h</span>
      <span class="eventHighlightMetaItem"><i data-lucide="map-pin" width="14" height="14"></i>Auditório — Sede SP</span>
    </div>
    <div class="eventHighlightWideActions">
      <a class="eventHighlightCta" href="eventos.html">Confirmar presença <i data-lucide="arrow-right" width="16" height="16"></i></a>
      <a class="eventHighlightSecondaryCta" href="eventos.html">Ver detalhes <i data-lucide="arrow-right" width="16" height="16"></i></a>
    </div>
  </div>
</div>
```

---

### EventRow
```html
<link rel="stylesheet" href="../componentes/EventRow/EventRow.module.css" />
```
Linha horizontal de evento — usada na listagem completa de Eventos (`eventos.html`). Diferente do `EventCard` (vertical, compacto) e do `EventListItem` (sem imagem): aqui tem data + imagem + tag + título + meta em linha + descrição + CTA, tudo num card horizontal.

Classes: `.eventRow`, `.eventRowDate`, `.eventRowDay`, `.eventRowMonth`, `.eventRowImageWrap`, `.eventRowImage`, `.eventRowContent`, `.eventRowTag` (`data-status`: success/info/warning/error/disabled), `.eventRowTitle`, `.eventRowMeta`, `.eventRowMetaItem`, `.eventRowDescription` (2 linhas), `.eventRowCta`

```html
<div class="eventRow">
  <div class="eventRowDate">
    <span class="eventRowDay">22</span>
    <span class="eventRowMonth">Dez</span>
  </div>
  <div class="eventRowImageWrap">
    <img class="eventRowImage" src="..." alt="" />
  </div>
  <div class="eventRowContent">
    <span class="eventRowTag" data-status="success">Workshop</span>
    <h3 class="eventRowTitle">Workshop de Segurança do Trabalho</h3>
    <div class="eventRowMeta">
      <span class="eventRowMetaItem"><i data-lucide="calendar" width="14" height="14"></i>Segunda-feira, 22 de dezembro de 2026</span>
      <span class="eventRowMetaItem"><i data-lucide="map-pin" width="14" height="14"></i>Sala de Treinamento — Sede RJ</span>
      <span class="eventRowMetaItem"><i data-lucide="clock" width="14" height="14"></i>Das 14h às 16h</span>
    </div>
    <p class="eventRowDescription">Descrição curta do evento...</p>
  </div>
  <a class="eventRowCta" href="eventos.html">Confirmar presença</a>
</div>
```

**Responsivo:** abaixo de 640px, `.eventRow` vira `flex-direction: column` (ordem do DOM já é a ordem visual desejada — sem `order`) — data, depois imagem 100% de largura, depois conteúdo, depois CTA também 100% de largura (`align-self: stretch; justify-content: center`). Evitar `flex:1` + `width:100%` juntos num item de `flex-wrap`: `flex-basis:0%` do `flex:1` ignora o `width`, o item colapsa e deixa o próximo item "subir" para a mesma linha.

**Container:** use `.eventRowStack` (`shared/page.css`) pra empilhar vários com espaçamento.

---

### EventInfoCard
```html
<link rel="stylesheet" href="../componentes/EventInfoCard/EventInfoCard.module.css" />
```
Card lateral com dados essenciais do evento — usado em `detalhes-evento.html`. Linhas ícone + label + valor(es), seguidas de um CTA primário e um link secundário.

Classes: `.eventInfoCard`, `.eventInfoRow`, `.eventInfoIcon`, `.eventInfoText`, `.eventInfoLabel`, `.eventInfoValue`, `.eventInfoValueStrong` (primeira linha em destaque, ex: nome do local), `.eventInfoActions`, `.eventInfoCta`, `.eventInfoCalendarLink`

```html
<div class="eventInfoCard">
  <div class="eventInfoRow">
    <span class="eventInfoIcon"><i data-lucide="calendar" width="18" height="18"></i></span>
    <div class="eventInfoText">
      <span class="eventInfoLabel">Data</span>
      <span class="eventInfoValue">08 de dezembro de 2026</span>
      <span class="eventInfoValue">Das 09h às 17h</span>
    </div>
  </div>
  <div class="eventInfoRow">
    <span class="eventInfoIcon"><i data-lucide="map-pin" width="18" height="18"></i></span>
    <div class="eventInfoText">
      <span class="eventInfoLabel">Local</span>
      <span class="eventInfoValueStrong">Auditório — Sede SP</span>
      <span class="eventInfoValue">Av. das Nações Unidas, 12.901</span>
    </div>
  </div>
  <div class="eventInfoActions">
    <a class="eventInfoCta" href="eventos.html">Confirmar presença <i data-lucide="arrow-right" width="16" height="16"></i></a>
    <a class="eventInfoCalendarLink" href="eventos.html"><i data-lucide="calendar-plus" width="16" height="16"></i>Adicionar ao calendário</a>
  </div>
</div>
```

---

### EventScheduleItem
```html
<link rel="stylesheet" href="../componentes/EventScheduleItem/EventScheduleItem.module.css" />
```
Item da lista "Programação" em `detalhes-evento.html` — ponto + conector vertical, horário e título na mesma linha, descrição abaixo. Parecido com `Timeline`, mas sem os estados done/active/pending (usa sempre a cor da marca).

Classes: `.eventScheduleItem`, `.eventScheduleVis`, `.eventScheduleDot`, `.eventScheduleConnector`, `.eventScheduleContent`, `.eventScheduleHeader`, `.eventScheduleTime`, `.eventScheduleTitle`, `.eventScheduleDescription` (opcional)

```html
<div class="eventScheduleItem">
  <div class="eventScheduleVis">
    <span class="eventScheduleDot"></span>
    <span class="eventScheduleConnector"></span>
  </div>
  <div class="eventScheduleContent">
    <div class="eventScheduleHeader">
      <span class="eventScheduleTime">09h00</span>
      <span class="eventScheduleTitle">Abertura</span>
    </div>
    <p class="eventScheduleDescription">Boas-vindas e apresentação dos objetivos do workshop.</p>
  </div>
</div>
```

**Container:** use `.eventScheduleList` (`shared/page.css`) pra empilhar vários — esconde o conector e o padding-bottom do último item automaticamente.

---

### DocumentListItem
```html
<link rel="stylesheet" href="../componentes/DocumentListItem/DocumentListItem.module.css" />
```
Item de lista de arquivo para download — usado na seção "Materiais e documentos" de `detalhes-evento.html`.

Classes: `.docItem`, `.docIcon`, `.docText`, `.docName`, `.docMeta`, `.docDownload`

```html
<div class="docItem">
  <span class="docIcon"><i data-lucide="file-text" width="18" height="18"></i></span>
  <div class="docText">
    <span class="docName">Apresentação BIM 4.0</span>
    <span class="docMeta">PDF · 8.4 MB</span>
  </div>
  <a class="docDownload" href="..." download><i data-lucide="download" width="14" height="14"></i> Baixar</a>
</div>
```

**Container:** use `.docList` (`shared/page.css`) pra empilhar vários com espaçamento.

---

### EventGalleryItem
```html
<link rel="stylesheet" href="../componentes/EventGalleryItem/EventGalleryItem.module.css" />
```
Miniatura clicável de foto (4:3, `object-fit: cover`, zoom leve no hover) — usada na seção "Fotos do evento" de `detalhes-evento.html` e na página `evento-fotos.html`. Clique abre o `Lightbox` (abaixo), com navegação entre as demais fotos da grade.

Classes: `.eventGalleryItem` (`<button type="button">`, não `<a>` — não navega, abre o Lightbox), `.eventGalleryImage`

```html
<button class="eventGalleryItem" type="button" data-lightbox-src="../src/foto.jpg">
  <img class="eventGalleryImage" src="../src/foto.jpg" alt="" />
</button>
```

**Container:** `.eventGalleryGrid` (`shared/page.css`) — grid de 4 colunas no desktop, 2 no mobile (abaixo de 640px).

---

### Lightbox
```html
<link rel="stylesheet" href="../componentes/Lightbox/Lightbox.module.css" />
```
Visualizador de foto em tela cheia (fundo escuro, imagem centralizada `object-fit: contain`, contador "X / Y") com navegação entre fotos — abre ao clicar num `EventGalleryItem`. Fecha ao clicar no fundo (backdrop), no X, ou apertar Escape; setas do teclado (`←`/`→`) navegam.

Classes: `.lightboxOverlay` (fixed, fundo `rgba(0,0,0,0.9)`), `.lightboxClose`, `.lightboxNavBtn` + `.lightboxPrev`/`.lightboxNext` (botões circulares translúcidos), `.lightboxImageWrap`, `.lightboxImage`, `.lightboxCounter`.

```html
<div class="lightboxOverlay" id="lightbox-overlay" style="display:none;">
  <button class="lightboxClose" type="button" aria-label="Fechar" id="lightbox-close">
    <i data-lucide="x" width="20" height="20"></i>
  </button>
  <button class="lightboxNavBtn lightboxPrev" type="button" aria-label="Foto anterior" id="lightbox-prev">
    <i data-lucide="chevron-left" width="24" height="24"></i>
  </button>
  <div class="lightboxImageWrap">
    <img class="lightboxImage" id="lightbox-image" src="" alt="" />
    <span class="lightboxCounter" id="lightbox-counter"></span>
  </div>
  <button class="lightboxNavBtn lightboxNext" type="button" aria-label="Próxima foto" id="lightbox-next">
    <i data-lucide="chevron-right" width="24" height="24"></i>
  </button>
</div>
```

**JS (abrir/fechar/navegar — igual em `detalhes-evento.html` e `evento-fotos.html`):**
```js
function openLightbox(index) { lightboxIndex = index; renderLightbox(); lightboxOverlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightboxOverlay.style.display = 'none'; document.body.style.overflow = ''; }
/* fecha só se o clique foi no próprio backdrop, não em botões/imagem por cima dele */
lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) closeLightbox(); });
```

---

### Layout: página "Galeria de fotos" — `evento-fotos.html` (page.css)
Estrutura: header → breadcrumb (4 níveis: Home / Eventos / nome do evento / Fotos) → `.sitePageHeader` (kicker "Eventos" + título "Fotos do evento" + contagem total) → `.eventGalleryGrid` de `EventGalleryItem` + `Lightbox` → `Footer`. Acessada pelo botão "Veja mais fotos" em `detalhes-evento.html`.

**Carregamento em lotes (infinite scroll) — protótipo com 100 fotos:** em vez de renderizar as 100 de uma vez, a página gera as imagens ciclando sobre 8 fotos reais (`BASE_IMAGES`) e as injeta 8 por vez (`BATCH_SIZE`) conforme o usuário rola a página. Um `IntersectionObserver` observa `.eventGalleryLoading` (ícone `loader-circle` girando via `@keyframes eventGalleryLoadingSpin`, `shared/page.css`) logo abaixo da grade; quando ele entra na tela, espera ~600ms (atraso simulado, só pra deixar o ícone visível) e injeta o próximo lote via `insertAdjacentHTML('beforeend', ...)`.

**Cuidado ao reimplementar esse padrão:** o `IntersectionObserver` só dispara numa *mudança* de estado (entrou/saiu da tela) — se a sentinela permanecer visível após um lote carregar (tela alta o bastante), ele não dispara de novo sozinho. A página guarda o último estado em `sentinelVisible` e chama `maybeLoadMore()` recursivamente depois de cada lote, pra continuar carregando em cascata até a sentinela sair da tela ou acabarem as fotos — sem isso, o carregamento trava depois do primeiro lote em telas grandes.

O clique nas miniaturas usa delegação de evento no container da grade (`grid.addEventListener('click', ...)` com `e.target.closest('.eventGalleryItem')`), então itens injetados depois já funcionam sem precisar religar listener nenhum.

---

### Layout: página de Detalhe do Evento
`detalhes-evento.html`: header → breadcrumb (3 níveis: Home / Eventos / nome do evento) → `.eventDetailHeader` (badge `.newsTag` + `.eventDetailTitle` + `.eventDetailDateRow`) → `.eventDetailMainGrid` (esquerda: foto `.articleHero` + `.eventDetailSectionTitle` "Sobre o evento" + `.articleBody`; direita: `EventInfoCard`) → `.eventDetailGallery` ("Fotos do evento": `.eventGalleryGrid` de `EventGalleryItem`, 8 fotos) → `.eventDetailSecondaryGrid` (dois `.card.eventDetailPanel`: "Programação" com `.eventScheduleList` de `EventScheduleItem`, e "Materiais e documentos" com `.docList` de `DocumentListItem` + `Feedback` tipo `info`) → seção "Eventos relacionados" (`EventCard` × 3) → Links Úteis → `Footer`.

`.eventDetailSectionTitle` é o padrão de título com barra vermelha à esquerda usado nas três seções (Sobre o evento / Programação / Materiais e documentos) — genérico o bastante pra reaproveitar em outras páginas de detalhe futuras.

**Responsivo:** abaixo de 640px, `.eventDetailMainGrid` e `.eventDetailSecondaryGrid` colapsam pra 1 coluna (ordem do DOM já é a ordem visual: foto/sobre → info card → programação → materiais) e `.eventDetailTitle` reduz para `--font-size-2xl` (mesmo padrão do `.articleTitle`).

---

### Layout: página de Setores — `setores.html` (page.css)
Estrutura: header → breadcrumb (2 níveis: Home / Setores) → `.sitePageHeader` (eyebrow `.siteSectionKicker` + `.sitePageTitle` + texto `.siteBodyText`, sem imagem — página de listagem pura) → `.deptDetailList` (pilha vertical de `DepartmentDetailCard`, um por área) → seção Links Úteis → `Footer`.

`.sitePageTitle` é o padrão de título grande de página de listagem (sem imagem/hero) — reaproveitável em futuras páginas do tipo "Sobre", diferente do `.articleTitle` (tem foto de capa acima) e do `.eventDetailTitle` (tem badge + data).

---

### Tab
```html
<link rel="stylesheet" href="../componentes/Tab/Tab.module.css" />
```
Duas variantes: **segmented** (padrão, abas em caixa com fundo gradiente — usado no painel-adm) e **underline** (abas simples com sublinhado vermelho — usado no site institucional, ex: "Próximos eventos" / "Eventos passados" em `eventos.html`).

Classes (underline): `.tabWrapper`, `.tabList.tabListUnderline`, `.tabBtnUnderline`, `.tabBtnUnderlineActive`

```html
<div class="tabWrapper">
  <div class="tabList tabListUnderline" role="tablist">
    <button class="tabBtnUnderline tabBtnUnderlineActive" role="tab" aria-selected="true" onclick="selectTab('a')">Próximos eventos</button>
    <button class="tabBtnUnderline" role="tab" aria-selected="false" onclick="selectTab('b')">Eventos passados</button>
  </div>
</div>
```

Em HTML estático, a troca de painel é feita via JS simples: toggle da classe `.tabBtnUnderlineActive` + `hidden` no painel correspondente (ver `selectEventsTab()` em `eventos.html`).

---

### EventListItem
```html
<link rel="stylesheet" href="../componentes/EventListItem/EventListItem.module.css" />
```
Linha compacta de evento — usada na lista "Outros eventos" ao lado do `EventHighlightCard`. Sem imagem, formato horizontal.

Classes: `.eventListItem` (`<a>`), `.eventListItemDate`, `.eventListItemDay`, `.eventListItemMonth`, `.eventListItemText`, `.eventListItemTitle`, `.eventListItemLocation`

```html
<a class="eventListItem" href="eventos.html">
  <div class="eventListItemDate">
    <span class="eventListItemDay">22</span>
    <span class="eventListItemMonth">Dez</span>
  </div>
  <div class="eventListItemText">
    <span class="eventListItemTitle">Workshop de Segurança do Trabalho</span>
    <span class="eventListItemLocation"><i data-lucide="map-pin" width="12" height="12"></i>Sala de Treinamento — Sede RJ</span>
  </div>
</a>
```

---

### EventCalendar
```html
<link rel="stylesheet" href="../componentes/EventCalendar/EventCalendar.module.css" />
```
Calendário compacto — coluna lateral do painel "Próximos Eventos" da Home. Estático (protótipo): os botões de mês anterior/próximo não têm lógica real, servem apenas de indicação visual.

Classes: `.eventCalendar`, `.eventCalendarHeader`, `.eventCalendarMonth`, `.eventCalendarNav`, `.eventCalendarNavBtn`, `.eventCalendarWeekdays`, `.eventCalendarWeekday`, `.eventCalendarGrid`, `.eventCalendarCell`, `.eventCalendarCellEmpty` (dias em branco no início/fim do mês), `.eventCalendarCellActive` (dia com evento, destacado), `.eventCalendarFooter` (link com barra de destaque à esquerda)

```html
<div class="eventCalendar">
  <div class="eventCalendarHeader">
    <h3 class="eventCalendarMonth">Dezembro 2026</h3>
    <div class="eventCalendarNav">
      <button class="eventCalendarNavBtn" type="button" aria-label="Mês anterior"><i data-lucide="chevron-left" width="16" height="16"></i></button>
      <button class="eventCalendarNavBtn" type="button" aria-label="Próximo mês"><i data-lucide="chevron-right" width="16" height="16"></i></button>
    </div>
  </div>
  <div class="eventCalendarWeekdays">
    <span class="eventCalendarWeekday">Dom</span>
    <!-- ...Seg a Sáb -->
  </div>
  <div class="eventCalendarGrid">
    <span class="eventCalendarCellEmpty"></span>
    <span class="eventCalendarCell">1</span>
    <span class="eventCalendarCell eventCalendarCellActive">18</span>
    <!-- ...demais dias -->
  </div>
  <a class="eventCalendarFooter" href="eventos.html">
    Ver todos os eventos <i data-lucide="chevron-right" width="16" height="16"></i>
  </a>
</div>
```

---

### Layout: seção "Próximos Eventos" (page.css)
Classes de `shared/page.css` específicas para montar a seção na Home: `.siteEventsGrid` (grid 2fr/1fr — painel de eventos + calendário), `.eventsPanel` (card branco que agrupa `EventHighlightCard` + lista "Outros eventos" — sem padding próprio, o `EventHighlightCard` ocupa o painel de ponta a ponta), `.eventsOtherWrap` (só esse bloco recebe padding), `.eventsOtherLabel`, `.eventsOtherList` (grid 2 colunas de `EventListItem`)

---

### Layout: página de Eventos — `eventos.html` (page.css)
Classes específicas da listagem completa: `.eventsTabsBar` (espaçamento entre o card de destaque e os tabs), `.eventsContentPanel` (espaçamento entre os tabs e o grid de conteúdo), `.eventRowStack` (pilha vertical de `EventRow` — reaproveita `.siteEventsGrid` pro split lista/calendário), `.eventsSidebar` (coluna direita: só o calendário, `display:flex; flex-direction:column`), `.eventsSidebarMiniList` (lista de `EventListItem` dentro do card do calendário, com borda superior separando da grade de dias — no desktop, o `EventCalendar` tem `height:100%` e estica pra acompanhar a altura da lista à esquerda via `align-items: stretch` do `.siteEventsGrid`, então a mini lista inclui **todos** os próximos eventos, sem link "ver mais", pra preencher o espaço sem sobra vazia). `.eventsPromoCard`/`.eventsPromoIcon`/`.eventsPromoTitle`/`.eventsPromoDescription`/`.eventsPromoCta` (card "Não perca!" com CTA de notificações) ficam definidas mas **não usadas** por enquanto — removidas da página a pedido do usuário, prontas pra reaproveitar depois.

Estrutura geral da página: header → breadcrumb → `EventHighlightCard` variante `wide` → `Tab` variante `underline` (Próximos/Passados, troca de painel via JS) → `.siteEventsGrid` (esquerda: `.eventRowStack` de `EventRow` + `Pagination`; direita: `.eventsSidebar`) → seção Links Úteis → `Footer`.

---

### CommunicationListItem
```html
<link rel="stylesheet" href="../componentes/CommunicationListItem/CommunicationListItem.module.css" />
```
Linha de lista vertical — usada na seção Comunicados da Home (substituiu os cards horizontais do `NewsCard`). Ícone quadrado à esquerda, título+descrição no meio, data e chevron à direita.

Classes: `.commListItem` (`<a>`), `.commListItemIcon`, `.commListItemText`, `.commListItemTitle`, `.commListItemDescription` (1 linha, corta com reticências), `.commListItemMeta`, `.commListItemDate`, `.commListItemChevron`

```html
<a class="commListItem" href="comunicados.html">
  <span class="commListItemIcon"><i data-lucide="heart-pulse" width="18" height="18"></i></span>
  <span class="commListItemText">
    <span class="commListItemTitle">Atualização do plano de saúde a partir de janeiro</span>
    <span class="commListItemDescription">Novas regras de coparticipação entram em vigor no próximo ciclo.</span>
  </span>
  <span class="commListItemMeta">
    <span class="commListItemDate">10 de dezembro de 2026</span>
    <i data-lucide="chevron-right" width="16" height="16" class="commListItemChevron"></i>
  </span>
</a>
```

**Container:** use `.commsPanel` (`shared/page.css`) para agrupar vários `.commListItem` — card branco com borda entre os itens (o próprio componente cuida do `border-bottom`, exceto no último).

**Responsivo:** abaixo de 640px cada `.commListItem` vira um card individual (borda, radius, sombra própria, `flex-wrap`), e `.commListItemMeta` (data + chevron) desce pra uma linha própria em vez de ficar espremida ao lado do texto — foi o que causava o título quebrando palavra por palavra por falta de espaço. `.commsPanel` fica transparente/sem borda nesse breakpoint (o espaçamento vem do `gap` entre os cards, não mais de divisórias internas).

**Variante `.commListItemCard`** — usada em `comunicados.html` (listagem completa). Cada item é um card independente **e expansível**: renderizado como `<button>` (não `<a>`) — clicar expande um `.commListItemPanel` com o texto completo do comunicado, tipo FAQ/accordion. Não existe página de "detalhe do comunicado" — a expansão inline substitui a navegação. Classes extras: `.commListItemPanel` (colapsado por padrão, `max-height:0`), `.commListItemPanelContent` (texto completo). A seta (`.commListItemChevron`) fica sempre centralizada verticalmente no card via `position:absolute` e gira 90° quando `.commListItemCard.open`.

```html
<button type="button" class="commListItem commListItemCard" aria-expanded="false">
  <span class="commListItemIcon"><i data-lucide="heart-pulse" width="18" height="18"></i></span>
  <span class="commListItemText">
    <span class="commListItemTitle">Atualização do plano de saúde a partir de janeiro</span>
    <span class="commListItemDescription">Novas regras de coparticipação entram em vigor no próximo ciclo.</span>
  </span>
  <span class="commListItemMeta">
    <span class="commListItemDate">10 de dezembro de 2026</span>
    <i data-lucide="chevron-right" width="16" height="16" class="commListItemChevron"></i>
  </span>
  <span class="commListItemPanel">
    <p class="commListItemPanelContent">Texto completo do comunicado...</p>
  </span>
</button>
```

```js
document.querySelectorAll('.commListItemCard').forEach((card) => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(isOpen));
  });
});
```

---

### StatsBanner
```html
<link rel="stylesheet" href="../componentes/StatsBanner/StatsBanner.module.css" />
```
Banner escuro full-bleed com números de destaque — usado na seção Sobre da Home. Segue o mesmo padrão do Hero/SiteHeader: fundo full-bleed, conteúdo alinhado ao grid de 1200px. Altura definida por `padding: var(--spacing-3xl) 0` (64px), não por `min-height`. Linha superior (texto + CTA) e linha de números empilhadas verticalmente — os números ficam num bloco à parte, ocupando 100% da largura, abaixo de tudo.

**Importante:** vai direto em `<main>`, fora de `.siteSection`/`.siteContainer` — igual ao `Hero`, porque o fundo é full-bleed.

Classes: `.statsBanner`, `.statsBannerImage` (opcional — sem imagem, cai no fundo escuro `--color-gray-950`), `.statsBannerScrim`, `.statsBannerInner` (coluna: `.statsBannerTop` + `.statsBannerStats`), `.statsBannerTop` (linha: conteúdo + CTA), `.statsBannerContent`, `.statsBannerKicker`, `.statsBannerTitle`, `.statsBannerDescription`, `.statsBannerCta`, `.statsBannerStats` (linha full-width, `justify-content: space-between`), `.statsBannerStat`, `.statsBannerStatIcon`, `.statsBannerStatText`, `.statsBannerStatValue`, `.statsBannerStatLabel`

```html
<div class="statsBanner">
  <img class="statsBannerImage" src="..." alt="" />
  <div class="statsBannerScrim"></div>
  <div class="statsBannerInner">
    <div class="statsBannerTop">
      <div class="statsBannerContent">
        <span class="statsBannerKicker">Institucional</span>
        <h2 class="statsBannerTitle">Sobre a EQS</h2>
        <p class="statsBannerDescription">Texto de apoio...</p>
      </div>
      <a class="statsBannerCta" href="sobre.html">Saiba mais sobre a EQS <i data-lucide="arrow-right" width="16" height="16"></i></a>
    </div>
    <div class="statsBannerStats">
      <div class="statsBannerStat">
        <span class="statsBannerStatIcon"><i data-lucide="clock" width="18" height="18"></i></span>
        <div class="statsBannerStatText">
          <span class="statsBannerStatValue">20+</span>
          <span class="statsBannerStatLabel">Anos de história</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Sem imagem:** omitir `<img class="statsBannerImage">` — o banner cai no fundo escuro sólido (`--color-gray-950`) com o mesmo scrim por cima.

---

### Home única — desktop + mobile responsiva (arquitetura)

**A Home do site institucional é UMA página só: `site-desktop/index.html`.** Não existe mais `site-mobile/index.html` como página separada em uso — ela virou obsoleta (deixada no repositório sem uso, não deletada, mas não referenciada por nenhum `prototipo.html`). A ideia: qualquer alteração de conteúdo/layout se faz uma vez só, num arquivo só.

**Duas formas de visualizar a mesma página:**
- `site-desktop/prototipo.html` → carrega `index.html` largo, num iframe de largura normal
- `site-mobile/prototipo.html` → carrega **a mesma página** (`../site-desktop/index.html`) dentro do mockup de celular — o iframe estreito faz a página cair sozinha no breakpoint mobile

**Breakpoint único: `640px`**, controlado só via `@media` em `shared/page.css` e nos `.module.css` dos componentes. Nada de duplicar página nem de variante manual tipo `.heroMobile`/`.siteSectionMobile` (essas classes antigas ainda existem no CSS por compatibilidade com o `site-mobile/index.html` abandonado, mas a Home atual não usa mais — usa os `@media` automáticos).

**Regra ao criar uma seção nova nessa página:** pense sempre nos dois lados do breakpoint. Se o layout precisar de marcação diferente entre desktop e mobile (não só tamanho/coluna), duplique o bloco e alterne com `.hideMobile`/`.hideDesktop` (ver abaixo) — não crie uma segunda página.

---

### SiteHeaderMobile
```html
<link rel="stylesheet" href="../componentes/SiteHeaderMobile/SiteHeaderMobile.module.css" />
<link rel="stylesheet" href="../componentes/Sheet/Sheet.module.css" />
```
Header mobile do site institucional — vive **dentro do mesmo `site-desktop/index.html`** que o `SiteHeader` desktop, escondido/mostrado via `.hideMobile`/`.hideDesktop` conforme a largura (ver seção "Home única" acima). Layout de 3 colunas: busca (esquerda) · logo (centro) · hambúrguer (direita). Tocar na busca troca a linha inteira por um input full-width + botão de fechar (X). Tocar no hambúrguer abre o menu, que **reaproveita o `Sheet`** (painel deslizante) com 100% de altura — em mobile a largura também vira 100% automaticamente porque `Sheet` já limita a `max-width: 100vw`.

Classes do header: `.siteHeaderMobile` (`padding-top: 56px` fixo — não é token, libera espaço pra dynamic island/status bar do mockup de celular do `prototipo.html` não tapar o header), `.siteHeaderMobileRow` (grid 3 colunas), `.siteHeaderMobileSearchRow`, `.siteHeaderMobileSearchInput`, `.siteHeaderMobileIconBtn`

Classes do conteúdo do menu (dentro do `Sheet`): `.siteHeaderMobileMenuPanel` (aplicar junto com `.sheetPanel` — define a largura de 400px que no `Sheet.tsx` viria via prop `width`, mas em HTML estático não tem prop, então fica aqui; também aplica `padding-top: 56px` no `.sheetHeader` interno, mesmo motivo do header — libera espaço pra dynamic island/status bar do mockup não tapar o topo do menu. Escopado só a `.siteHeaderMobileMenuPanel .sheetHeader`, não afeta o `Sheet` genérico usado em outras telas), `.siteHeaderMobileNavList`, `.siteHeaderMobileNavItem`, `.siteHeaderMobileNavItemActive`, `.siteHeaderMobileFooterList`, `.siteHeaderMobileFooterItem`, `.siteHeaderMobileFooterItemDestructive`

```html
<!-- Header desktop — visível acima de 640px -->
<header class="siteHeader hideMobile">...</header>

<!-- Header mobile — visível abaixo de 640px -->
<header class="siteHeaderMobile hideDesktop">
  <div class="siteHeaderMobileRow" id="mobile-header-default">
    <button class="siteHeaderMobileIconBtn" type="button" aria-label="Buscar" onclick="openSearch()">
      <i data-lucide="search" width="20" height="20"></i>
    </button>
    <span class="logoDefault logoSm" role="img" aria-label="EQS Engenharia"></span>
    <button class="siteHeaderMobileIconBtn" type="button" aria-label="Abrir menu" onclick="openMobileMenu()">
      <i data-lucide="menu" width="20" height="20"></i>
    </button>
  </div>
  <div class="siteHeaderMobileSearchRow" id="mobile-header-search" hidden>
    <input class="siteHeaderMobileSearchInput" type="text" placeholder="Buscar..." id="mobile-search-input" />
    <button class="siteHeaderMobileIconBtn" type="button" aria-label="Fechar busca" onclick="closeSearch()">
      <i data-lucide="x" width="20" height="20"></i>
    </button>
  </div>
</header>

<div class="sheetOverlay hideDesktop" id="mobile-menu-overlay" onclick="closeMobileMenu()">
  <aside class="sheetPanel siteHeaderMobileMenuPanel" onclick="event.stopPropagation()" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="sheetHeader">
      <span class="sheetTitle">Menu</span>
      <button class="sheetClose" type="button" aria-label="Fechar" onclick="closeMobileMenu()">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="sheetBody">
      <nav class="siteHeaderMobileNavList">
        <a href="index.html" class="siteHeaderMobileNavItem siteHeaderMobileNavItemActive" aria-current="page">Home</a>
        <a href="noticias.html" class="siteHeaderMobileNavItem">Notícias</a>
        <!-- ...demais itens -->
      </nav>
    </div>
    <div class="sheetFooter">
      <div class="siteHeaderMobileFooterList">
        <a class="siteHeaderMobileFooterItem" href="perfil.html">
          <i data-lucide="user" width="16" height="16"></i> Meu Perfil
        </a>
        <a class="siteHeaderMobileFooterItem siteHeaderMobileFooterItemDestructive" href="../painel-adm/login.html">
          <i data-lucide="log-out" width="16" height="16"></i> Sair
        </a>
      </div>
    </div>
  </aside>
</div>
```

**JS (toggle busca + menu — nomeado `openMobileMenu`/`closeMobileMenu`, não `openMenu`/`closeMenu`, pra não colidir com nada do header desktop):**
```js
function openSearch() {
  document.getElementById('mobile-header-default').hidden = true;
  document.getElementById('mobile-header-search').hidden = false;
  document.getElementById('mobile-search-input').focus();
}
function closeSearch() {
  document.getElementById('mobile-header-search').hidden = true;
  document.getElementById('mobile-header-default').hidden = false;
}
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
function openMobileMenu() {
  mobileMenuOverlay.classList.add('sheetOpen');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('sheetOpen');
  document.body.style.overflow = '';
}
```

**Este JS acima é só referência de comportamento — nas páginas reais ele vive dentro de `shared/site-header.js`, não em cada HTML.** Ver seção seguinte.

---

### `shared/site-header.js` — header compartilhado entre todas as páginas do site-desktop

O `SiteHeader`/`SiteHeaderMobile`/drawer descritos acima **não são mais copiados manualmente em cada página** (`index.html`, `noticias.html`, `eventos.html` etc.) — isso gerava 3 blocos de HTML idênticos (só o item ativo do nav mudava) repetidos em 11 arquivos, exigindo editar todos toda vez que o menu mudasse (ex: renomear um item). Mesmo problema que o `painel-adm/shared/sidebar.js` já resolve para a sidebar do painel — o header do site segue o mesmo padrão: um único array de itens, renderizado via JS, injetado em cada página.

**Uso em cada página:**
```html
<body class="layout-site" data-page="noticias">
  <div id="site-header-root"></div>
  <!-- resto da página -->

  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script src="../shared/site-header.js"></script>
  <!-- ../shared/, não shared/ — o arquivo vive na raiz do projeto (mesma pasta do touch-scroll.js), não dentro de site-desktop/ -->
</body>
```

`data-page` no `<body>` controla qual item do nav recebe `.siteHeaderNavItemActive`/`.siteHeaderMobileNavItemActive`. IDs válidos: `home | noticias | eventos | comunicados | setores | sobre | links-uteis`. Páginas sem item correspondente no menu (`search.html`, `search-vazio.html`) simplesmente omitem o atributo — nenhum item fica ativo.

O script:
- Injeta os 3 blocos (header desktop, header mobile, drawer) dentro de `#site-header-root`
- Chama `lucide.createIcons()` depois de injetar (os ícones do header não existiam no DOM até então)
- Liga o dropdown do avatar, abrir/fechar busca mobile, abrir/fechar o drawer — tudo que antes era `<script>` inline duplicado em cada página
- Expõe `window.goToSearch(value)` — redireciona para `search.html?q=<valor>` ao apertar Enter nos dois campos de busca do header (desktop e mobile). `search.html`/`search-vazio.html` reaproveitam essa mesma função pro campo de busca da própria página (`search-page-input`), em vez de duplicar a lógica de redirect.
- Botão "Modo escuro"/"Modo claro" (estado logado) — entre "Meu Perfil" e "Sair" no dropdown do avatar (desktop, `#theme-toggle-desktop`) e no rodapé do drawer (mobile, `#theme-toggle-mobile`). Alterna `data-theme` no `<html>`, troca ícone (moon/sun) e label, e persiste em `localStorage` (`eqs-site-theme`) — sem isso o tema resetaria a cada navegação, já que toda página nasce com `data-theme="light"`.

**Para adicionar/renomear um item do menu:** editar só o array `NAV_ITEMS` em `shared/site-header.js` — não precisa tocar nenhuma página.

---

### Utilitários responsivos (`.hideMobile` / `.hideDesktop`)
```css
/* shared/page.css */
@media (max-width: 640px) { .hideMobile { display: none !important; } }
@media (min-width: 641px) { .hideDesktop { display: none !important; } }
```
Usar quando o mesmo conteúdo precisa de marcação diferente nos dois lados do breakpoint (não dá pra resolver só com CSS reflow) — ex: header desktop vs. mobile, ou botão "Ver todos" ao lado do título (desktop) vs. centralizado embaixo (mobile). Duplica o bloco no HTML, uma cópia com `.hideMobile`, outra com `.hideDesktop`.

**Botão "Ver todos/todas":** no desktop fica dentro de `.siteSectionHeader`, ao lado do título. Em mobile não cabe — vira uma cópia separada, centralizada, com `.siteSectionFooter` (`shared/page.css`), depois do grid de conteúdo.

```html
<div class="siteSectionHeader">
  <div>
    <span class="siteSectionKicker">Fique por dentro</span>
    <h2 class="siteSectionTitle">Notícias</h2>
  </div>
  <button class="btn secondary hideMobile" type="button" onclick="location.href='noticias.html'">Ver todas as notícias</button>
</div>
<div class="siteGrid3">
  <!-- ...cards — colapsa pra 1 coluna sozinho abaixo de 640px -->
</div>
<div class="siteSectionFooter hideDesktop">
  <button class="btn secondary" type="button" onclick="location.href='noticias.html'">Ver todas</button>
</div>
```

**Exceção:** a seção "Próximos Eventos" não duplica o botão em mobile — o `EventCalendar` já tem seu próprio CTA "Ver todos os eventos" no rodapé (`.eventCalendarFooter`), então o botão do `.siteSectionHeader` só recebe `.hideMobile`, sem cópia.

---

### Grids responsivos (automático, sem classe extra)
`.siteGrid3`, `.siteEventsGrid` e `.eventsOtherList` colapsam pra 1 coluna sozinhos abaixo de 640px (`@media` em `shared/page.css`) — não precisa trocar a classe no HTML nem usar `.siteGridStack` (essa classe ainda existe, mas é resquício da época de página separada; pode ser útil pra outros casos, mas as três grids acima já resolvem sozinhas).

---

### Scroll por arrasto (emula touch abaixo de 640px)
`site-desktop/index.html` inclui `../shared/touch-scroll.js` no final — o script já checa `window.innerWidth <= 640` sozinho e só ativa o arrasto-pra-scroll abaixo disso (acima disso não interfere em nada do mouse normal: seleção de texto, drag, etc.). A barra de rolagem nativa some automaticamente abaixo de 640px via `@media` em `body.layout-site` (`shared/page.css`) — não precisa de nenhuma classe no `<body>`.

```html
<body class="layout-site">
  ...
  <script src="../shared/touch-scroll.js"></script>
</body>
```

---

### Footer
```html
<link rel="stylesheet" href="../componentes/Footer/Footer.module.css" />
```
Classes: `.footer`, `.footerInner`, `.footerBrand`, `.footerTagline`, `.footerColumns`, `.footerColumn`, `.footerColumnTitle`, `.footerLink`, `.footerBottom`

```html
<footer class="footer">
  <div class="footerInner">
    <div class="footerBrand">
      <span class="logoDefault logoSm" role="img" aria-label="EQS Engenharia"></span>
      <p class="footerTagline">Intranet corporativa da EQS Engenharia.</p>
    </div>
    <div class="footerColumns">
      <div class="footerColumn">
        <span class="footerColumnTitle">Portal</span>
        <a class="footerLink" href="noticias.html">Notícias</a>
        <a class="footerLink" href="eventos.html">Eventos</a>
        <a class="footerLink" href="comunicados.html">Comunicados</a>
      </div>
      <div class="footerColumn">
        <span class="footerColumnTitle">Institucional</span>
        <a class="footerLink" href="sobre.html">Sobre</a>
        <a class="footerLink" href="links-uteis.html">Links Úteis</a>
      </div>
    </div>
  </div>
  <div class="footerBottom">© 2026 EQS Engenharia. Todos os direitos reservados.</div>
</footer>
```

---

### DepartmentCard
```html
<link rel="stylesheet" href="../componentes/DepartmentCard/DepartmentCard.module.css" />
<link rel="stylesheet" href="../componentes/Avatar/Avatar.module.css" />
```
Card de área/departamento — prévia na Home + página completa de Setores. Mostra gestor responsável e pilha de avatares dos colaboradores (com "+N" quando passa do limite visível).

Classes: `.deptCard` (`<a>`), `.deptHeader`, `.deptIcon`, `.deptName`, `.deptRow`, `.deptRowLabel`, `.deptManager`, `.deptManagerName`, `.deptAvatarStack`, `.deptAvatarStackItem` (envolve cada `.avatar` para o efeito de sobreposição), `.deptAvatarMore` (bolha "+N", mesmo tamanho de um avatar sm)

**Fotos dos avatares:** todos os avatares visíveis (gestor + colaboradores, exceto o "+N") usam foto real, não iniciais — `<img class="avatarImg" src="..." />` dentro do `.avatar`, em vez de `<span class="avatarInitials">`. Fotos ficam em `src/avatar/team-01.jpg` a `team-10.jpg` (recortadas 240×240, ~10-15KB cada, originais do usuário também na mesma pasta). Como só existem 10 fotos únicas para 11 avatares visíveis na Home, uma foto é reaproveitada em duas pessoas de departamentos diferentes (LA em Financeiro e HC em RH dividem `team-04.jpg`) — sem problema visual porque não aparecem lado a lado.

```html
<a class="deptCard card" href="setores.html">
  <div class="deptHeader">
    <span class="deptIcon"><i data-lucide="megaphone" width="20" height="20"></i></span>
    <h3 class="deptName">Marketing</h3>
  </div>

  <div class="deptRow">
    <span class="deptRowLabel">Gestor responsável</span>
    <div class="deptManager">
      <div class="avatar sm"><span class="avatarInitials">CR</span></div>
      <span class="deptManagerName">Camila Rocha</span>
    </div>
  </div>

  <div class="deptRow">
    <span class="deptRowLabel">Colaboradores</span>
    <div class="deptAvatarStack">
      <span class="deptAvatarStackItem"><div class="avatar sm"><span class="avatarInitials">JS</span></div></span>
      <span class="deptAvatarStackItem"><div class="avatar sm"><span class="avatarInitials">MC</span></div></span>
      <span class="deptAvatarStackItem"><div class="avatar sm"><span class="avatarInitials">PA</span></div></span>
      <span class="deptAvatarStackItem"><div class="avatar sm"><span class="avatarInitials">FL</span></div></span>
      <span class="deptAvatarMore">+2</span>
    </div>
  </div>
</a>
```

**Nota:** `.deptCard` é linkado junto com `.card` (superfície sólida) para o fundo do card — mesma composição usada em `.linkCard` (`LinkCard`, Links Úteis).

---

### DepartmentDetailCard
```html
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
<link rel="stylesheet" href="../componentes/DepartmentDetailCard/DepartmentDetailCard.module.css" />
```
Card completo de área/departamento — usado na página `setores.html`. Diferente do `DepartmentCard` (prévia compacta da Home, avatar stack com "+N"): aqui lista **todos** os colaboradores (nunca corta com "ver todos", mesmo que sejam muitos) e inclui e-mail de cada pessoa + texto de resumo da área.

Classes: `.deptDetailCard` (linkado junto com `.card`), `.deptDetailHeader`, `.deptDetailHeaderLeft`, `.deptDetailTitleRow`, `.deptDetailIcon`, `.deptDetailName`, `.deptDetailDivider` (linha vertical entre o bloco esquerdo e o gestor), `.deptDetailManagerCol` (coluna com o badge acima do gestor), `.deptDetailBadge` ("Gestor responsável"), `.deptDetailManager`, `.deptDetailContactText`, `.deptDetailContactName`, `.deptDetailContactEmail`, `.deptDetailBody`, `.deptDetailSectionLabel` ("Colaboradores"), `.deptDetailCollabGrid` (4 colunas desktop → 2 em ~900px → 1 em mobile), `.deptDetailCollabItem`, `.deptDetailDescription`

```html
<div class="card deptDetailCard">
  <div class="deptDetailHeader">
    <div class="deptDetailHeaderLeft">
      <div class="deptDetailTitleRow">
        <span class="deptDetailIcon"><i data-lucide="megaphone" width="22" height="22"></i></span>
        <h2 class="deptDetailName">Marketing</h2>
      </div>
    </div>
    <span class="deptDetailDivider"></span>
    <div class="deptDetailManagerCol">
      <span class="deptDetailBadge">Gestor responsável</span>
      <div class="deptDetailManager">
        <div class="avatar md"><img class="avatarImg" src="..." alt="Camila Rocha" /></div>
        <div class="deptDetailContactText">
          <span class="deptDetailContactName">Camila Rocha</span>
          <span class="deptDetailContactEmail">camila.rocha@eqs.com.br</span>
        </div>
      </div>
    </div>
  </div>
  <div class="deptDetailBody">
    <span class="deptDetailSectionLabel">Colaboradores</span>
    <div class="deptDetailCollabGrid">
      <div class="deptDetailCollabItem">
        <div class="avatar sm"><img class="avatarImg" src="..." alt="João Pereira" /></div>
        <div class="deptDetailContactText">
          <span class="deptDetailContactName">João Pereira</span>
          <span class="deptDetailContactEmail">joao.pereira@eqs.com.br</span>
        </div>
      </div>
      <!-- ...um .deptDetailCollabItem por colaborador, sem limite/corte -->
    </div>
    <p class="deptDetailDescription">Texto de resumo da área...</p>
  </div>
</div>
```

**Responsivo:** abaixo de 640px o `.deptDetailDivider` some, `.deptDetailManagerCol` (badge + gestor) desce pra uma linha própria (borda superior no lugar do divisor) e `.deptDetailCollabGrid` vira 1 coluna. Entre 641–900px a grade já reduz para 2 colunas.

**Container:** use `.deptDetailList` (`shared/page.css`) pra empilhar vários cards de departamento com espaçamento generoso (`--spacing-xl`).

---

### LinkCard
```html
<link rel="stylesheet" href="../componentes/LinkCard/LinkCard.module.css" />
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
```
Card simples de atalho — ícone + título + descrição. Usado na seção Links Úteis da Home. Variante mais enxuta da mesma família do `DepartmentCard` (mesmo ícone 40×40, mesma composição com `.card`), sem a parte de gestor/colaboradores.

Classes: `.linkCard` (`<a>`, linkado junto com `.card` para o fundo sólido), `.linkIcon`, `.linkTitle`, `.linkDescription`

```html
<a class="card linkCard" href="links-uteis.html">
  <span class="linkIcon"><i data-lucide="book-open" width="20" height="20"></i></span>
  <h3 class="linkTitle">Manual da Marca EQS</h3>
  <p class="linkDescription">Diretrizes de identidade visual e uso da marca.</p>
</a>
```

---

### AboutHero
```html
<link rel="stylesheet" href="../componentes/AboutHero/AboutHero.module.css" />
```
Bloco de topo da página Sobre — texto + CTA à esquerda, foto à direita com um card de estatísticas **flutuando sobre a borda inferior da imagem** (`position: absolute` + `transform: translateY(50%)`). Diferente do `Hero` (full-bleed, texto sobre a foto com scrim escuro).

Classes: `.aboutHero` (grid 2 colunas), `.aboutHeroContent`, `.aboutHeroKicker`, `.aboutHeroTitle`, `.aboutHeroDescription`, `.aboutHeroCta` (pill sólido), `.aboutHeroMedia` (`position: relative` — âncora da foto e do card flutuante), `.aboutHeroImage`, `.aboutHeroStats` (card branco flutuante), `.aboutHeroStat`, `.aboutHeroStatIcon` (ícone sem caixa, só cor), `.aboutHeroStatValue`, `.aboutHeroStatLabel`

```html
<div class="aboutHero">
  <div class="aboutHeroContent">
    <span class="aboutHeroKicker">Sobre a EQS</span>
    <h1 class="aboutHeroTitle">Construindo o futuro com engenharia, inovação e compromisso</h1>
    <p class="aboutHeroDescription">Há mais de 20 anos...</p>
    <a class="aboutHeroCta" href="#historia">Conheça nossa história <i data-lucide="arrow-right" width="16" height="16"></i></a>
  </div>
  <div class="aboutHeroMedia">
    <img class="aboutHeroImage" src="..." alt="" />
    <div class="aboutHeroStats">
      <div class="aboutHeroStat">
        <span class="aboutHeroStatIcon"><i data-lucide="clock" width="22" height="22"></i></span>
        <span class="aboutHeroStatValue">20+</span>
        <span class="aboutHeroStatLabel">Anos de história</span>
      </div>
      <!-- ...demais stats -->
    </div>
  </div>
</div>
```

**Responsivo:** abaixo de 640px vira 1 coluna e o card de estatísticas quebra linha (2 por linha) — precisa de mais `padding-bottom` na seção pra acomodar a sobreposição.

---

### ContentSplit
```html
<link rel="stylesheet" href="../componentes/ContentSplit/ContentSplit.module.css" />
```
Bloco genérico **imagem + texto lado a lado** — usado em "Nossa história" (Sobre), reaproveitável em qualquer seção institucional futura. `imagePosition` (`'left'`/`'right'`) inverte o lado da imagem via `order` no CSS, sem duplicar markup.

Classes: `.contentSplit` (grid 2 colunas — adicionar `.contentSplitImageRight` pra inverter), `.contentSplitImage`, `.contentSplitText`, `.contentSplitKicker`, `.contentSplitTitle`, `.contentSplitParagraph` (um `<p>` por parágrafo), `.contentSplitCta` (pill outline, preenche no hover)

```html
<div class="contentSplit">
  <img class="contentSplitImage" src="..." alt="" />
  <div class="contentSplitText">
    <span class="contentSplitKicker">Nossa história</span>
    <h2 class="contentSplitTitle">De um propósito sólido para grandes conquistas</h2>
    <p class="contentSplitParagraph">Parágrafo 1...</p>
    <p class="contentSplitParagraph">Parágrafo 2...</p>
    <a class="contentSplitCta" href="#">Linha do tempo <i data-lucide="arrow-right" width="16" height="16"></i></a>
  </div>
</div>
```

**Inverter lado da imagem:** `<div class="contentSplit contentSplitImageRight">` — a imagem some visualmente pra direita via `order`, sem trocar a ordem no DOM.

---

### ValueCard
```html
<link rel="stylesheet" href="../componentes/ValueCard/ValueCard.module.css" />
```
Ícone circular (outline) + título + descrição, **centralizado** — usado na seção "Nossos valores" (Sobre). Ícone segue a regra padrão de icon box: sem fundo, só `border: 1px solid var(--color-gray-300)`.

Classes: `.valueCard`, `.valueIcon`, `.valueTitle`, `.valueDescription`

```html
<div class="valueCard">
  <span class="valueIcon"><i data-lucide="shield-check" width="24" height="24"></i></span>
  <h3 class="valueTitle">Segurança</h3>
  <p class="valueDescription">Cuidamos das pessoas acima de tudo, sempre.</p>
</div>
```

**Container:** use `.siteGrid5` (`shared/page.css`) — 5 colunas desktop → 2 em ~900px → 1 em mobile.

---

### LeadershipCard
```html
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
<link rel="stylesheet" href="../componentes/LeadershipCard/LeadershipCard.module.css" />
```
Foto + nome + cargo + link do LinkedIn — usado na seção "Liderança" (Sobre). Ícone do LinkedIn não existe mais no `lucide-react` (ícones de marca foram removidos da lib) — usa o texto `"in"` estilizado dentro de um círculo outline, no lugar de um ícone.

Classes: `.leadershipCard` (linkado junto com `.card`), `.leadershipPhoto`, `.leadershipBody`, `.leadershipText`, `.leadershipName`, `.leadershipRole`, `.leadershipLinkedin`

```html
<div class="card leadershipCard">
  <img class="leadershipPhoto" src="..." alt="Marcos Aurélio" />
  <div class="leadershipBody">
    <div class="leadershipText">
      <span class="leadershipName">Marcos Aurélio</span>
      <span class="leadershipRole">Diretor Presidente</span>
    </div>
    <a class="leadershipLinkedin" href="#" aria-label="LinkedIn de Marcos Aurélio">in</a>
  </div>
</div>
```

**Container:** use `.aboutLeadershipGrid` (`shared/page.css`) — 3 colunas desktop, 1 coluna mobile.

---

### Layout: página Sobre — `sobre.html` (page.css)
Estrutura: header → breadcrumb (Home / Sobre) → `AboutHero` → `ContentSplit` ("Nossa história", foto à esquerda) → "Nossos valores" (`.siteSectionHeaderCentered` + `.siteGrid5` de `ValueCard`) → "Atuação" (`.siteSectionHeaderCentered` + `.siteGrid5` de `.card.linkCard`) → "Liderança" (`.aboutLeadershipSection`: `.aboutLeadershipContent` + `.aboutLeadershipGrid` de `LeadershipCard`) → banner final (`.statsBanner` **sem** `.statsBannerStats` — só kicker/título/descrição/CTA) → Links Úteis → `Footer`.

Novas classes de `page.css`: `.siteSectionHeaderCentered` (kicker+título+subtítulo centralizados, diferente do `.siteSectionHeader` que é alinhado à esquerda com botão à direita), `.siteGrid5`, `.aboutLeadershipSection`/`.aboutLeadershipContent`/`.aboutLeadershipGrid`.

`StatsBanner` (componente) teve a prop `stats` tornada **opcional** — sem `stats`, renderiza só kicker/título/descrição/CTA (usado no banner final desta página, que não tem números).

**Conflito resolvido:** existia uma classe `.aboutHero` antiga e não utilizada em `page.css` ("Sobre a empresa: hero centrado — logo + tagline", de um protótipo anterior nunca finalizado) que colidia com o componente `AboutHero` novo — o `text-align: center` dela vazava pro desktop mesmo sem o componente pedir isso. Removida junto com `.aboutTagline` (também morta, sem uso).

---

### Layout: página Links Úteis — `links-uteis.html` (page.css)
Igual à estrutura de `noticias.html`, trocando os cards: `.sitePageHeader` (kicker "Recursos" + título "Links Úteis" + texto) → `.siteGrid3` de `.card.linkCard` (9 itens) → `Pagination` → banner final `.statsBanner` (mesmo do `sobre.html`, sem stats) → `Footer`.

**Diferença importante:** não tem a seção "Links Úteis" no final (seria redundante, é a própria página) — no lugar dela entra o banner de CTA reaproveitado de `sobre.html`.

---

### DocumentCard
```html
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
<link rel="stylesheet" href="../componentes/DocumentCard/DocumentCard.module.css" />
```
Card de documento para download — usado na página `documentos.html`. Título/descrição + linha de meta (badge de extensão, tamanho, data de atualização) à esquerda; divisor vertical; ícone + rótulo "Fazer download" (cor da marca) à direita. Diferente do `DocumentListItem` (linha única, usado em "Materiais e documentos" na página de detalhe do evento) — este é um card maior, de grid 2 colunas, com mais metadados.

Classes: `.documentCard` (linkado junto com `.card` pro fundo sólido), `.documentCardMain`, `.documentCardTitle`, `.documentCardDescription`, `.documentCardMeta`, `.documentCardBadge` (outline, ex: ".PDF"), `.documentCardDivider`, `.documentCardDownload`, `.documentCardDownloadIcon`, `.documentCardDownloadLabel`

```html
<a class="card documentCard" href="...">
  <div class="documentCardMain">
    <h3 class="documentCardTitle">Manual da Marca EQS</h3>
    <p class="documentCardDescription">Diretrizes de identidade visual e uso da marca.</p>
    <div class="documentCardMeta">
      <span class="documentCardBadge">.PDF</span>
      <span>8.4 MB</span>
      <span>Atualizado em 12/05/2025</span>
    </div>
  </div>
  <div class="documentCardDivider"></div>
  <div class="documentCardDownload">
    <span class="documentCardDownloadIcon"><i data-lucide="download" width="20" height="20"></i></span>
    <span class="documentCardDownloadLabel">Fazer download</span>
  </div>
</a>
```

**Container:** `.siteGrid2` (`shared/page.css`, nova classe — grid de 2 colunas no desktop, 1 no mobile abaixo de 640px, mesmo padrão de colapso do `.siteGrid3`/`.siteGrid5`).

**Responsivo:** abaixo de 640px o card empilha em coluna (`flex-direction: column`), o divisor vira horizontal, e o bloco de download volta a ficar em linha (ícone + rótulo lado a lado, centralizado).

---

### Layout: página Documentos — `documentos.html` (page.css)
Estrutura idêntica à `links-uteis.html`, trocando os cards: `.sitePageHeader` (kicker "Recursos" + título "Documentos" + texto) → `.siteGrid2` de `.card.documentCard` (8 itens) → `Pagination` → banner final `.statsBanner` (mesmo do `sobre.html`/`links-uteis.html`, sem stats) → `Footer`.

Item de menu "Documentos" adicionado em `shared/site-header.js` (`NAV_ITEMS`, id `documentos`) — aparece no header desktop, no drawer mobile, e no rodapé (coluna "Institucional", depois de "Links Úteis") de todas as páginas do site.

---

### Layout: dialog "Meu Perfil" — `index.html` (page.css)
Dialog aberto pela opção "Meu Perfil" do menu do avatar (só o `index.html` define o hook `window.openProfileDialog` — nas demais páginas o item ainda navega para `perfil.html`). Compõe `Dialog` (`.dialogOverlay` > `.dialog.sm`) + `Avatar` (`.avatar.lg`) + `DetailCard` (`.infoGrid`/`.infoLabel`/`.infoValue` para nome/e-mail/setor somente leitura) + `Button`.

Classes próprias em `shared/page.css`: `.profilePhotoRow` (avatar + ações, com divisor inferior), `.profilePhotoActions` (botões "Trocar foto"/"Remover"), `.profilePhotoHint` (texto auxiliar). Troca de foto via `<input type="file">` oculto + `URL.createObjectURL`; remover volta para `.avatarInitials`.

---

### SearchResultItem
```html
<link rel="stylesheet" href="../componentes/SearchResultItem/SearchResultItem.module.css" />
```
Linha genérica de resultado de busca — usada na página de Pesquisa (`search.html`). O slot `leading` (miniatura, ícone outline ou date-badge) é livre, permitindo reaproveitar a mesma linha pros 5 tipos de resultado (notícias, eventos, comunicados, departamentos, links úteis) sem criar 5 componentes quase idênticos.

Classes: `.searchResultItem` (`<a>`, borda inferior entre itens exceto o último — mesmo padrão do `CommunicationListItem`), `.searchResultItemLeading`, `.searchResultItemText`, `.searchResultItemTitle`, `.searchResultItemDescription` (corta em 1 linha), `.searchResultItemMeta` (alinhado à direita), `.searchResultItemChevron`. Variantes do `leading`: `.searchResultItemImage` (miniatura 64×64, notícias/eventos), `.searchResultItemDate` + `.searchResultItemDay` + `.searchResultItemMonth` (date-badge, eventos, igual ao `EventRow`), `.searchResultItemDot` (bolinha vermelha 8×8 — comunicados, áreas e departamentos, links úteis; substituiu o ícone outline que era usado antes nesses 3 grupos). `.searchResultItemIcon` (ícone outline no leading) continua disponível na CSS pra uso futuro, mas não é mais usado em `search.html`.

**Nota:** o destaque `<mark class="searchHighlight">` do termo buscado foi removido de `search.html`/`search-vazio.html` a pedido do usuário — não fazia sentido visualmente. A classe `.searchHighlight` continua na CSS do componente mas não é mais usada.

```html
<a class="searchResultItem" href="noticia-detalhe.html">
  <div class="searchResultItemLeading">
    <img class="searchResultItemImage" src="..." alt="" />
  </div>
  <div class="searchResultItemText">
    <span class="searchResultItemTitle">Workshop BIM 4.0 reúne equipe técnica...</span>
    <span class="searchResultItemDescription">O evento apresentou as novas ferramentas...</span>
  </div>
  <div class="searchResultItemMeta"><span>08 dez 2026</span></div>
</a>

<!-- Comunicados / Setores / Links Úteis — leading em bolinha -->
<a class="searchResultItem" href="comunicados.html">
  <div class="searchResultItemLeading">
    <span class="searchResultItemDot"></span>
  </div>
  <div class="searchResultItemText">
    <span class="searchResultItemTitle">Inscrições abertas para o Workshop de Liderança 2027</span>
    <span class="searchResultItemDescription">As inscrições para o Workshop de Liderança já estão abertas...</span>
  </div>
  <div class="searchResultItemMeta"><span>02 dez 2026</span></div>
</a>
```

**Container:** use `.commsPanel` (`shared/page.css`, já existente) pra agrupar vários `.searchResultItem` num painel branco com bordas entre os itens — mesma classe reaproveitada de Comunicados.

**Responsivo:** abaixo de 640px, `.searchResultItemMeta` some (evita aglomerar texto secundário numa tela estreita).

---

### Layout: página de Busca — `search.html` (page.css)
Estrutura: header → breadcrumb (Home / Buscar) → `.searchResultsHeader` (título com o termo buscado + subtítulo com contagem + botão "Limpar busca") → `.searchResultsGrid` (2fr/1fr: `.searchResultsMain` com um grupo por tipo de resultado + sidebar "Sugestões") → `Footer` (sem seção de Links Úteis nem banner — página utilitária, não institucional).

**Correção de layout (grid + texto que encolhe):** `.searchResultsMain` (item do grid `.searchResultsGrid`) precisa de `min-width: 0` — sem isso, o item do CSS Grid não encolhe abaixo do conteúdo intrínseco (título/descrição em `white-space: nowrap`), ficando mais largo que a coluna e cortando texto no mobile (bug reportado e corrigido).

Cada grupo de resultado: `.searchResultGroupHeader` (`.searchResultGroupIcon` outline + `.searchResultGroupName` com contagem + botão "Ver todos") seguido de um `.commsPanel` com `SearchResultItem`s dentro.

Sidebar "Sugestões": `.card.searchSuggestions` com `.searchSuggestionsHeader`/`.searchSuggestionsTitle`/`.searchSuggestionsSubtitle`/`.searchSuggestionsList`/`.searchSuggestionItem` (links com ícone de busca, cada um leva pra `search.html?q=<termo>`).

**Interatividade:** a página lê `?q=` da URL pra atualizar o texto destacado no título (`#search-term`) — os resultados em si continuam fixos (protótipo estático, sem busca real). Os campos de busca do header (desktop e mobile), em **todas** as páginas do site (via `window.goToSearch` de `shared/site-header.js`), redirecionam para `search.html?q=<valor>` ao pressionar Enter.

**Nota de ambiente:** o preview usado durante o desenvolvimento normaliza a URL e descarta a query string na navegação — o comportamento de `?q=` não pôde ser 100% confirmado nesse ambiente, apesar do código ser padrão (`URLSearchParams`).

**Input de busca no próprio header da página** (`.searchResultsInput`, dentro de `.searchResultsHeader`): reaproveita as classes do `Input` (`.wrapper`/`.inputWrap hasLeft`/`.iconLeft`/`.input`). `.searchResultsHeader` é `flex-direction: column` (título+botão numa linha via `.searchResultsHeaderTop`, input full-width embaixo, max 480px no desktop). Vem pré-preenchido com o termo atual e também dispara `goToSearch()` no Enter.

---

### Layout: página de Busca — estado vazio — `search-vazio.html` (page.css)
Mesma estrutura de `search.html` (header, breadcrumb, `.searchResultsHeader` com input) até o `.searchResultsGrid` — a partir daí, no lugar dos grupos de resultado, entra:

- `.searchEmptyState` (centralizado, `max-width: 480px`): `.searchEmptyIcon` (círculo outline 96px, ícone `search-x` — mesma regra de sempre, sem fundo) + `.searchEmptyTitle` + `.searchEmptyDescription` + `.searchEmptyActions` (botão "Voltar para a Home")
- `.card.searchSuggestions.searchSuggestionsCentered` — o mesmo card de sugestões da `search.html`, só que centralizado (`max-width: 420px; margin: 0 auto`) já que não há mais coluna de resultados ao lado pra ele ser sidebar de.

Sem `.searchResultsGrid` nessa página — como não há resultados, não faz sentido o grid 2fr/1fr.

---

## Conflitos de classes conhecidos

| Classe | Componentes conflitantes | Solução |
|--------|--------------------------|---------|
| `.card` | Table.module.css + Card.module.css | Nunca linkar juntos. Table para listas; Card para formulários. |
| `.wrapper` | Input + Dropdown + Checkbox + Toggle | Input e Dropdown coexistem (mesmo visual). Checkbox e Toggle **não** coexistem com nenhum dos outros. |
| `.badge` | Table.module.css (selo de status, inline) + NotificationBadge.module.css (bolha de contador, `position:absolute`) | **Nunca linkar NotificationBadge.module.css numa página que usa Table.** O badge do sininho na sidebar já vem de `.notifBadge` em `Sidebar.module.css` — `NotificationBadge.module.css` só é necessário em telas React/Storybook, nunca em páginas HTML com sidebar. |
| `.icon` | Button.module.css (slot de ícone dentro do botão, herda `color` via `currentColor`) + Breadcrumb.module.css (ícone opcional no item atual) | Breadcrumb usa `.crumbIcon` (renomeado) para nunca colidir. Se aparecer um ícone com a cor errada dentro de um botão, suspeitar de outro componente definindo `.icon` com `color` fixo. |

### Toggle sem Toggle.module.css (workaround)

Quando a página já usa Dropdown, implementar toggle com CSS page-level:

```css
.switchLabel { display: inline-flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; user-select: none; flex-shrink: 0; }
.switchInput { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.switchTrack { position: relative; width: 44px; height: 24px; background: var(--color-bg-subtle); border: var(--border-width-thin) solid var(--color-border-default); border-radius: var(--radius-full); transition: background var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast); flex-shrink: 0; }
.switchThumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; box-shadow: var(--shadow-xs); transition: transform var(--transition-fast); }
.switchLabel:has(input:checked) .switchTrack { background: var(--gradient-brand); border-color: transparent; box-shadow: var(--shadow-highlight), var(--shadow-glow-sm); }
.switchLabel:has(input:checked) .switchThumb { transform: translateX(20px); }
```

### MultiSelect
```html
<link rel="stylesheet" href="../componentes/MultiSelect/MultiSelect.module.css" />
```
Classes: `.multiSelect` (container), `.msLabel`, `.msField` (trigger), `.msField.msOpen`, `.msField.msDisabled`, `.msField.msError`, `.msInner`, `.msPlaceholder`, `.msChip`, `.msChipLabel`, `.msChipRemove`, `.msChevron`, `.msMenu`, `.msOption`, `.msOption.msSelected`, `.msCheck`, `.msOptionLabel`, `.msHelperText`, `.msErrorText`

Todas as classes prefixadas com `ms` — sem conflito com Dropdown, Input, Toggle ou outros.

```html
<div class="multiSelect" id="meu-ms" data-placeholder="Selecione...">
  <span class="msLabel">Campo</span>
  <div class="msField" role="combobox" tabindex="0" aria-expanded="false" aria-haspopup="listbox">
    <div class="msInner"><!-- chips injetados por JS --></div>
    <span class="msChevron"><i data-lucide="chevron-down" width="14" height="14"></i></span>
  </div>
  <div class="msMenu" hidden role="listbox" aria-multiselectable="true">
    <div class="msOption" data-value="val1" role="option" aria-selected="false">
      <span class="msCheck"></span>
      <span class="msOptionLabel">Opção 1</span>
    </div>
    <div class="msOption" data-value="val2" role="option" aria-selected="false">
      <span class="msCheck"></span>
      <span class="msOptionLabel">Opção 2</span>
    </div>
  </div>
</div>
```

JS padrão (vanilla): usar `makeMultiSelect(containerId, options[])` — função que gerencia seleção, chips e abertura/fechamento do menu. Sempre chamar `lucide.createIcons()` após inserir chips ou ícones de check. Fechar menu no `document.addEventListener('click', ...)`.

---

### FilterChips — filtros em pílula (seleção única)

**CSS:** `../componentes/FilterChips/FilterChips.module.css`
**Classes:** `.filterChips` (container) · `.filterChip` (cada botão) · `.filterChip.active` (ativo)

Usado sempre que precisar de um grupo de filtros em pílula com seleção exclusiva (um ativo por vez). Padrão visual: pílula com borda, fundo invertido no ativo.

```html
<link rel="stylesheet" href="../componentes/FilterChips/FilterChips.module.css" />

<div class="filterChips">
  <button class="filterChip active" type="button">30 dias</button>
  <button class="filterChip" type="button">60 dias</button>
  <button class="filterChip" type="button">90 dias</button>
  <button class="filterChip" type="button">
    <i data-lucide="calendar" width="12" height="12"></i>
    Período
  </button>
</div>
```

JS para alternar ativo:
```js
document.querySelectorAll('.filterChips').forEach(group => {
  group.querySelectorAll('.filterChip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.filterChip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
});
```

**Conflitos:** `.filterChip` não conflita com `.chip` (Chip.module.css). Não linkar Chip.module.css e FilterChips.module.css na mesma página — classes distintas, mas evitar por clareza.

---

### Chips multi-select (workaround para Checkbox)

Quando a página já usa Dropdown, implementar multi-select com CSS page-level:

```css
.chipGroup { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); margin-top: var(--spacing-xs); }
.chip { display: inline-flex; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-xs) var(--spacing-md); border: var(--border-width-thin) solid var(--color-border-muted); border-radius: var(--radius-full); font-size: var(--font-size-sm); color: var(--color-text-secondary); cursor: pointer; user-select: none; transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast); }
.chip input[type="checkbox"] { display: none; }
.chip:has(input:checked) { border-color: var(--color-action-primary); color: var(--color-text-brand); background: var(--color-bg-brand); }
```

---

## Padrões de página estabelecidos

### Página de lista (ex: listar-carregadores)
- CSS: tokens + Sidebar + Avatar + Background + Button + Input + Dropdown + Table + Pagination
- Sem breadcrumb (top-level nav)
- Header: título + subtítulo + botão de ação primária
- Toolbar: inputs de busca + dropdowns de filtro
- Conteúdo: `<div class="card tableWrap">...</div>`

### Página de detalhe (ex: visualizar-dispositivo)
- CSS: tokens + Sidebar + Avatar + Background + Button + Breadcrumb + **Table.module.css** (para `.card` + `.badge`) + Divider
- Breadcrumb: "Pai > Filho"
- Header: título + badge de status + botão "Editar"
- Grid de cards com label/value pairs

### Página de formulário (ex: editar/cadastrar dispositivo, tarifas)
- CSS: tokens + Sidebar + Avatar + Background + Button + Input + Dropdown + Breadcrumb + Divider + Feedback + **Card.module.css**
- 1 card com múltiplas seções separadas por `<hr class="divider" />`
- Footer dentro do card: `<div class="formFooter">` com Cancelar + Salvar

### Estrutura de formulário padrão
```html
<div class="card">
  <div class="formSection">
    <h2 class="sectionTitle">Seção</h2>
    <p class="sectionSubtitle">Descrição</p>
    <div class="formGrid grid2">
      <!-- campos -->
    </div>
  </div>
  <hr class="divider" />
  <!-- próxima seção -->
  <div class="formFooter">
    <button class="btn secondary">Cancelar</button>
    <button class="btn primary hasLeft"><span class="icon"><i data-lucide="save" ...></i></span>Salvar</button>
  </div>
</div>
```

---

## Tokens mais usados

### Cores semânticas (preferir sempre)
- Texto: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-brand`
- Fundo: `--color-bg-default`, `--color-bg-surface`, `--color-bg-brand`
- Borda: `--color-border-default`, `--color-border-subtle`, `--color-border-muted`, `--color-border-focus`
- Ação: `--color-action-primary`, `--color-action-primary-hover`

### Espaçamento
`--spacing-xs` (4px) · `--spacing-sm` (8px) · `--spacing-md` (16px) · `--spacing-lg` (24px) · `--spacing-xl` (32px) · `--spacing-2xl` (48px)

### Tipografia
- Tamanhos: `--font-size-xs` (12) · `--font-size-sm` (14) · `--font-size-md` (16) · `--font-size-xl` (24)
- Pesos: `--font-weight-regular` (400) · `--font-weight-medium` (500) · `--font-weight-semibold` (600)
- Mono: `--font-mono`

### Raios
`--radius-xs` (4) · `--radius-sm` (8) · `--radius-md` (16) · `--radius-full` (9999)

### Border width
`--border-width-thin` (1px) · `--border-width-medium` (2px)

### Gradiente e glow brand
`--gradient-brand` · `--shadow-glow-sm` · `--shadow-highlight` · `--shadow-xs`

---

## Sidebar — estado padrão

```html
<aside class="sidebar open" id="sidebar">
  <button class="toggleBtn" id="toggle-btn" aria-label="Recolher menu">
    <i data-lucide="chevron-left" class="toggleIcon-left" width="14" height="14"></i>
    <i data-lucide="chevron-right" class="toggleIcon-right" width="14" height="14"></i>
  </button>
  <!-- logoRow, body com navList, spacer, bottomList -->
</aside>
```

Itens de nav: Dashboard (`layout-dashboard`), Locais (`map-pin`), Carregadores (`zap`), Tarifas (`receipt`), Cupons (`tag`), Extrato (`file-text`), Logs de Erros (`triangle-alert`).  
Adicionar `navItemActive` no item ativo da página.

---

## HTML page skeleton

**Dashboard (com sidebar):**
```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título — {Projeto}</title>

  <!-- Fonte real — sem isso o navegador cai no sans-serif do sistema, não Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="../componentes/tokens/tokens.css" />
  <link rel="stylesheet" href="../shared/page.css" />
  <!-- demais links de componentes -->
</head>
<body class="layout-dashboard">
  <!-- Sidebar (shared/sidebar.js) -->
  <!-- Main (class="main bgWrapper") -->
  <!--   blob1 + blob2 -->
  <!--   pageHeader -->
  <!--   pageContent (overflow-y: auto) -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script>
    lucide.createIcons();
  </script>
</body>
</html>
```

**Auth (login, redefinir senha, criar senha):** mesmo `<head>`, `<body class="layout-auth">`.
