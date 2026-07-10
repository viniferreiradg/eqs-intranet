# Design System — CLAUDE.md

Source of truth do projeto. Nenhuma decisão visual ou estrutural é tomada fora deste arquivo.

---

## Stack

- React 18 + Vite + TypeScript
- CSS Modules por componente + `componentes/tokens/tokens.css` (tokens globais)
- Lucide React (ícones — **nunca** criar ícones manualmente)
- ApexCharts + react-apexcharts (gráficos — usar via `LineChart` e `DonutChart` do DS)
- Storybook 8 (`npm run storybook` → porta 6006)

---

## Regras absolutas

1. **Nunca usar valores literais de cor, espaçamento, tipografia, raio ou borda no CSS.** Sempre usar tokens (`var(--color-*)`, `var(--spacing-*)`, etc.). Se o token não existir, reportar ao usuário — nunca inventar valor bruto.
2. **Nunca criar ícones manualmente.** Somente Lucide React.
3. **Nunca recriar um componente que já existe.** Importar do caminho correto.
4. **Componente filho primeiro.** Ao criar qualquer componente que usa sub-componentes, resolver os filhos antes do pai.
5. **Componente novo** → pedir autorização → criar → criar story no Storybook → registrar neste CLAUDE.md → apresentar para aprovação.
6. **Sempre ler este CLAUDE.md** antes de criar qualquer tela ou componente.
7. **Peso de fonte: títulos em `--font-weight-bold` (700); todo o restante — texto corrido, labels de campo, células de tabela — em `--font-weight-regular` (400).** Medium/semibold ficam reservados para estados pontuais (dia de hoje no calendário, item ativo), nunca para títulos ou texto comum.
7b. **Sempre carregar a fonte Inter via Google Fonts** no `<head>` das telas HTML — sem o `<link>`, `var(--font-body)`/`var(--font-display)` caem no sans-serif do sistema em vez de Inter.
8. **Respostas curtas.** Ao executar tarefas, responder apenas "Feito." — sem descrever o que foi feito. Explicar somente se houver dúvida, algo saiu do planejado, ou o usuário pedir explicitamente.
9. **Valores de layout sem token → `../shared/page.css`.** Quando um valor pixel-específico não tem token equivalente (ex: `min-width: 720px`, `margin-top: 1px`, `width: 140px`), criar uma classe nomeada em `../shared/page.css` — nunca usar `style=""` inline nem `<style>` na página. O `<style>` de página é reservado apenas para classes de layout exclusivas daquela tela que usem 100% tokens.
10. **Sempre atualizar `prototipo.html`** ao criar qualquer tela nova. Adicionar a tela no fluxo correspondente dentro do array `FLOWS`. Se o fluxo ainda não existir, criar um novo objeto `{ label, screens }` com o RF correto.

---

## Tema

O projeto é **dark mode por padrão** (`:root`). Light mode via seletor `[data-theme="light"]`.  
Os tokens semânticos (ex: `--color-text-primary`, `--color-bg-default`) se adaptam automaticamente ao tema — sempre preferir tokens semânticos a tokens de paleta bruta.

---

## Componentes disponíveis

### AppBar _(Mobile)_
**Import:** `import { AppBar } from '../AppBar/AppBar'`  
**Story:** `Mobile/AppBar`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | — | Título centralizado |
| `onBack` | `() => void` | — | Exibe botão de voltar (ChevronLeft) quando fornecido |
| `action` | `ReactNode` | — | Elemento opcional no lado direito |
| `className` | `string` | — | Classe extra no container |

```tsx
<AppBar title="Esqueci minha senha" onBack={() => router.pop()} />
<AppBar title="Detalhes" onBack={() => {}} action={<IconButton />} />
```

**Em telas HTML (sem React):** usar as classes do `AppBar.module.css` diretamente:
```html
<header class="appBar">
  <div class="appBarSide appBarSideLeft">
    <button class="appBarIconBtn" onclick="router.pop()" aria-label="Voltar">
      <i data-lucide="chevron-left" width="24" height="24"></i>
    </button>
  </div>
  <span class="appBarTitle">Título</span>
  <div class="appBarSide appBarSideRight"></div>
</header>
```

> O `padding-top` usa `calc(var(--status-bar-height, 0px) + var(--spacing-xs))`.  
> No Storybook `--status-bar-height` é `0px` (fallback). Nas telas mobile é `59px` (definido em `page-mobile.css`).

---

### FAB _(Mobile)_
**Import:** `import { FAB } from '../FAB/FAB'`  
**Story:** `Mobile/FAB`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `ReactNode` | — | Ícone Lucide React |
| `variant` | `'default' \| 'brand'` | `'default'` | Superfície sólida (padrão) ou gradiente brand |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `md` = 48×48px |
| `aria-label` | `string` | — | **Obrigatório** — acessibilidade |
| `disabled` | `boolean` | — | Herdado do `<button>` |

```tsx
<FAB icon={<Car size={20} />} aria-label="Selecionar veículo" />
<FAB icon={<QrCode size={20} />} aria-label="Escanear QR Code" />
<FAB icon={<Zap size={22} />} variant="brand" aria-label="Iniciar recarga" />
```

**Em telas HTML:** usar a classe `.fab` de `FAB.module.css` + variantes `.brand`, `.sm`, `.lg`.  
Posicionamento no mapa via `.map-fabs` em `page-mobile.css`.

---

### BottomNav _(Mobile)_
**Import:** `import { BottomNav } from '../BottomNav/BottomNav'`  
**Story:** `Mobile/BottomNav`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `items` | `NavItemDef[]` | — | Array de `{ id, label, icon }` |
| `activeId` | `string` | — | ID da aba ativa |
| `onSelect` | `(id: string) => void` | — | Callback ao clicar numa aba |

> **Nota:** Em `prototipo.html`, o BottomNav vive no shell (fora dos iframes). O router chama `updateBottomNav(screenId)` para alternar o `.navActive`. O nav flutua sobre as telas com `position: absolute; bottom: 0`.

**Em telas HTML (sem React):** usar as classes do `BottomNav.module.css` diretamente no shell.

---

### OTPInput _(Mobile)_
**Import:** `import { OTPInput } from '../OTPInput/OTPInput'`  
**Story:** `Mobile/OTPInput`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `length` | `number` | `6` | Quantidade de células |
| `onChange` | `(value: string) => void` | — | Dispara a cada mudança |
| `onComplete` | `(value: string) => void` | — | Dispara quando todas as células estão preenchidas |
| `error` | `boolean` | `false` | Bordas vermelhas em todas as células |
| `success` | `boolean` | `false` | Bordas verdes em todas as células |
| `disabled` | `boolean` | `false` | Desabilita todas as células |

```tsx
<OTPInput length={6} onComplete={(code) => verify(code)} />
<OTPInput length={6} error />
```

**Em telas HTML:** usar as classes `otpRoot` e `otpCell` do `OTPInput.module.css` diretamente,  
com o comportamento de foco escrito em vanilla JS (ver `screens/recuperar-otp.html`).

---

### Button
**Import:** `import { Button } from '../Button/Button'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'primary' \| 'secondary' \| 'destructive' \| 'ghost'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `iconLeft` | `ReactNode` | — | Ícone à esquerda |
| `iconRight` | `ReactNode` | — | Ícone à direita |
| `iconOnly` | `boolean` | `false` | Modo apenas ícone (sem texto) |
| `disabled` | `boolean` | — | Herdado do `<button>` |
| `children` | `ReactNode` | — | Texto do botão |

```tsx
<Button variant="primary" iconLeft={<Save size={16} />}>Salvar</Button>
<Button variant="destructive" iconLeft={<Trash size={16} />}>Excluir</Button>
<Button iconOnly iconLeft={<Plus size={16} />} aria-label="Adicionar" size="sm" />
```

---

### Input
**Import:** `import { Input } from '../Input/Input'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Label acima do campo |
| `helperText` | `string` | Texto auxiliar abaixo |
| `error` | `string` | Mensagem de erro (mostra ícone CircleX) |
| `success` | `string` | Mensagem de sucesso (mostra ícone CircleCheck) |
| `iconLeft` | `ReactNode` | Ícone à esquerda dentro do campo |
| `iconRight` | `ReactNode` | Ícone à direita dentro do campo (decorativo, sem interação) |
| `toggleable` | `boolean` | Modo senha com botão Eye/EyeOff interativo — use no lugar de `type="password"` |
| `disabled` | `boolean` | Desabilita o campo |
| + todos `InputHTMLAttributes` | — | `placeholder`, `type`, `value`, `onChange`, etc. |

```tsx
<Input label="Buscar" iconLeft={<Search size={16} />} placeholder="Pesquisar..." />
<Input label="Senha" toggleable placeholder="••••••••" />
<Input label="E-mail" iconLeft={<Mail size={16} />} value="admin@rede.com.br" disabled readOnly />
```

---

### Textarea
**Import:** `import { Textarea } from '../Textarea/Textarea'`

Mesma família visual do Input — compartilha `.wrapper`/`.label`/`.helperText`/`.errorText`/`.successText` (coexistem na mesma página).

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Label acima do campo |
| `helperText` | `string` | Texto auxiliar abaixo |
| `error` | `string` | Mensagem de erro |
| `success` | `string` | Mensagem de sucesso |
| + todos `TextareaHTMLAttributes` | — | `placeholder`, `rows`, `value`, `onChange`, etc. |

```tsx
<Textarea label="Conteúdo" rows={6} placeholder="Escreva o conteúdo da notícia..." />
```

---

### ImageUpload
**Import:** `import { ImageUpload } from '../ImageUpload/ImageUpload'`

Dropzone de imagem com preview funcional (clique ou arraste um arquivo). Usa `URL.createObjectURL` — sem backend.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `label` | `string` | — | Label acima do campo |
| `value` | `string \| null` | — | URL de preview inicial (edição) |
| `onChange` | `(file: File \| null, previewUrl: string \| null) => void` | — | Disparado ao selecionar/remover |
| `hint` | `string` | `'PNG ou JPG, até 5MB'` | Texto auxiliar dentro da dropzone |
| `helperText` | `string` | — | Texto auxiliar abaixo da dropzone |
| `error` | `string` | — | Mensagem de erro |

```tsx
const [file, setFile] = useState<File | null>(null);
<ImageUpload label="Imagem de capa" onChange={(f) => setFile(f)} />
```

---

### Sidebar
**Import:** `import { Sidebar } from '../Sidebar/Sidebar'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | `true` | Expandida ou colapsada |
| `onToggle` | `() => void` | — | Callback do botão toggle |
| `activeItem` | `string` | `'dashboard'` | ID do item ativo |
| `onNavClick` | `(id: string) => void` | — | Callback ao clicar em item |
| `user` | `SidebarUser` | `{ name: 'Admin', email: 'admin@empresa.com', initials: 'AD' }` | Dados do usuário no rodapé |
| `onLogout` | `() => void` | — | Callback do botão Sair |
| `role` | `'adm' \| 'empresa'` | `'adm'` | Filtra itens do menu |
| `theme` | `'dark' \| 'light'` | `'dark'` | Tema atual — controla ícone Sun/Moon |
| `onThemeToggle` | `() => void` | — | Callback do botão de alternância de tema |
| `notificationCount` | `number` | `0` | Número no badge do sininho. 0 = sem badge |

**Itens de navegação padrão:**

| ID | Label | Ícone Lucide | Visível para |
|----|-------|-------------|-------------|
| `dashboard` | Dashboard | `LayoutDashboard` | adm + empresa |
| `eventos` | Eventos | `CalendarCheck` | adm + empresa |
| `usuarios` | Usuários | `User` | somente adm |
| `profissionais` | Profissionais | `ContactRound` | somente adm |
| `clientes` | Clientes | `Building2` | somente adm |
| `pesquisa` | Pesquisa | `FileText` | adm + empresa |

**Nota:** Usa `Logo`, `LogoSymbol` e `NotificationBadge` internamente.

**Bottom area:** O rodapé da sidebar tem um `iconRow` com 3 botões redondos (`.iconBtn`): tema, configurações e notificações. O de notificações usa `NotificationBadge`. Ao clicar em configurações, chama `onNavClick?.('configuracoes')`.

**Aviso CSS (HTML standalone):** Os seletores de largura em `Sidebar.module.css` são **`.sidebar.open`** e **`.sidebar.closed`** (compostos com `.sidebar`) — não são seletores nus `.open`/`.closed`. Isso evita conflito com o Accordion, que também usa a classe `.open` em seus itens. Nunca reverter para seletores nus.

**`.iconRow` collapsed:** Quando sidebar está fechada (`.sidebar.closed`), o `iconRow` muda para `flex-direction: column`, empilhando os 3 ícones verticalmente. Isso está em `Sidebar.module.css` e se aplica automaticamente ao HTML standalone.

```tsx
const [open, setOpen] = useState(true);
const [active, setActive] = useState('dashboard');

<Sidebar
  open={open}
  onToggle={() => setOpen(o => !o)}
  activeItem={active}
  onNavClick={setActive}
  role="adm"
/>
```

---

### Table
**Import:** `import { Table, StatusBadge, type TableColumn } from '../Table/Table'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título do card acima da tabela |
| `subtitle` | `string` | Subtítulo/contagem |
| `columns` | `TableColumn<T>[]` | Definição das colunas |
| `rows` | `T[]` | Dados |
| `loading` | `boolean` | Estado de carregamento |
| `emptyMessage` | `string` | Mensagem quando sem dados |
| `onSort` | `(key) => void` | Handler de ordenação |
| `sortKey` / `sortDir` | `keyof T / 'asc' \| 'desc'` | Estado da ordenação |

**Tipos de coluna (`type`):**

| Tipo | Comportamento |
|------|--------------|
| `'text'` (padrão) | Texto simples |
| `'badge'` | `StatusBadge` — requer `statusMap` |
| `'avatar'` | `<img>` com estilo de avatar |
| `'toggle'` | Usa componente `Toggle` interno — requer `onToggle` |
| `'actions'` | Botões de ação — requer `actionItems` |
| `'link'` | Link clicável — aceita `getHref` ou `onLinkClick` |

**StatusBadge — status disponíveis:** `success | error | warning | info`

```tsx
const statusMap = {
  active:   { label: 'Ativo',   status: 'success' as const },
  inactive: { label: 'Inativo', status: 'error'   as const },
};

const columns: TableColumn<MyType>[] = [
  { key: 'name',   label: 'Nome',   sortable: true },
  { key: 'status', label: 'Status', type: 'badge', statusMap },
  { key: 'active', label: 'Ativo',  type: 'toggle', onToggle: (row, val) => {} },
  {
    key: 'name', label: 'Ação', type: 'actions', width: 80,
    actionItems: [
      { icon: <Pencil size={14} />, label: 'Editar', onClick: (r) => {} },
      { icon: <Trash2 size={14} />, label: 'Remover', onClick: (r) => {}, danger: true },
    ],
  },
];

<Table title="Usuários" columns={columns} rows={data} emptyMessage="Nenhum usuário." />
```

---

### AuthCard
**Import:** `import { AuthCard } from '../AuthCard/AuthCard'`

Container de tela inteira para fluxos de autenticação. Fundo escuro, logo centralizada e card com superfície sólida (`--color-bg-surface`). Usado em todas as telas de auth.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `title` | `string` | Título principal do card |
| `description` | `string` | Subtítulo/instrução (opcional) |
| `children` | `ReactNode` | Conteúdo do formulário |

```tsx
<AuthCard title="Crie sua senha" description="Defina uma senha segura para acessar o painel.">
  <Input label="Nova senha" type="password" placeholder="••••••••" />
  <Input label="Confirmar senha" type="password" placeholder="••••••••" />
  <Button style={{ width: '100%' }}>Criar senha</Button>
</AuthCard>
```

---

### PasswordRequirements
**Import:** `import { PasswordRequirements } from '../PasswordRequirements/PasswordRequirements'`

Checklist visual de requisitos de senha. Reage em tempo real ao valor digitado. Usado abaixo do campo de senha em fluxos de criação/redefinição.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Valor do campo de senha — estados computados internamente |

Estados por requisito: `null` (neutro, bullet) · `false` (erro, × vermelho) · `true` (sucesso, ✓ verde)  
Título muda de cor: vermelho se algum requisito falhou, verde se todos cumpridos.

Requisitos verificados: mínimo 8 caracteres · letra maiúscula · letra minúscula · número · símbolo (!@,#)

```tsx
const [senha, setSenha] = useState('');
<Input label="Nova senha" toggleable value={senha} onChange={e => setSenha(e.target.value)} />
<PasswordRequirements value={senha} />
```

---

### PasswordStrength
**Import:** `import { PasswordStrength } from '../PasswordStrength/PasswordStrength'`

Indicador visual de força de senha com 4 barras coloridas + label. Usado abaixo de campos `toggleable` em fluxos de criação/redefinição de senha.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `value` | `string` | Valor digitado no campo de senha — score computado internamente |

Score: `length≥8` +1 · `maiúscula` +1 · `número` +1 · `especial` +1  
Labels: Fraca / Média / Boa / Forte. Cores: erro / brand / sucesso.

```tsx
const [senha, setSenha] = useState('');
<Input label="Nova senha" toggleable value={senha} onChange={e => setSenha(e.target.value)} />
<PasswordStrength value={senha} />
```

---

### Divider
**Import:** `import { Divider } from '../Divider/Divider'`

Separador horizontal. Sem props. Usa `--color-border-subtle` (sólido) com `margin: 0 var(--spacing-xl)` para inset dentro de cards.

```tsx
<Divider />
```

---

### AppHeader
**Import:** `import { AppHeader } from '../AppHeader/AppHeader'`

Sem props. Header da área pública (beneficiário/profissional). Logo centralizada, sticky, com sombra sutil.

```tsx
<AppHeader />
```

---

### Feedback
**Import:** `import { Feedback } from '../Feedback/Feedback'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | Tipo do alerta |
| `message` | `string` | Mensagem principal |
| `title` | `string` | Título opcional |
| `dismissible` | `boolean` | Exibe botão de fechar |

```tsx
<Feedback type="error" title="Erro de autenticação" message="Credenciais inválidas." />
<Feedback type="success" message="Dados salvos com sucesso." />
```

---

### Dialog
**Import:** `import { Dialog } from '../Dialog/Dialog'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | — | Visibilidade |
| `onClose` | `() => void` | — | Callback de fechar |
| `title` | `string` | — | Título do dialog |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Largura |
| `actions` | `ReactNode` | — | Botões no rodapé |
| `children` | `ReactNode` | — | Conteúdo |

```tsx
<Dialog open={open} onClose={() => setOpen(false)} title="Confirmar exclusão" size="sm"
  actions={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
    <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
  </>}>
  <p>Esta ação não pode ser desfeita.</p>
</Dialog>
```

**HTML standalone — classes:**

> ⚠️ As classes internas usam prefixo `dialog` para evitar conflito com `Sidebar.module.css` (que define `.body` globalmente).

| Classe | Descrição |
|--------|-----------|
| `.dialogOverlay` | Backdrop fixo `inset: 0`, centraliza o dialog |
| `.dialog` | Container do modal (fundo, sombra, border-radius) |
| `.sm` / `.md` / `.lg` | Largura: 360px / 540px / 720px |
| `.dialogHeader` | Barra de título + botão fechar |
| `.dialogTitle` | Texto do título |
| `.dialogCloseBtn` | Botão X |
| `.dialogBody` | Conteúdo scrollável |
| `.dialogFooter` | Rodapé com ações (justify: flex-end) |

**Abrir/fechar via JS:** usar `style="display:none"` por padrão e `style.display = 'flex'` para abrir.

```html
<link rel="stylesheet" href="../componentes/Dialog/Dialog.module.css" />

<div class="dialogOverlay" id="meu-dialog" style="display:none;" onclick="dialogClose()">
  <div class="dialog md" onclick="event.stopPropagation()" role="dialog" aria-modal="true">
    <div class="dialogHeader">
      <span class="dialogTitle">Título do dialog</span>
      <button class="dialogCloseBtn" onclick="dialogClose()" aria-label="Fechar" type="button">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="dialogBody">
      <!-- conteúdo / campos de formulário -->
    </div>
    <div class="dialogFooter">
      <button class="btn ghost" type="button" onclick="dialogClose()">Cancelar</button>
      <button class="btn primary" type="button">Salvar</button>
    </div>
  </div>
</div>

<script>
  function dialogOpen()  { document.getElementById('meu-dialog').style.display = 'flex'; }
  function dialogClose() { document.getElementById('meu-dialog').style.display = 'none'; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') dialogClose(); });
</script>
```

**Dialog de confirmação de exclusão (padrão):**
```html
<div class="dialogOverlay" id="del-dialog" style="display:none;" onclick="delDialogClose()">
  <div class="dialog sm" onclick="event.stopPropagation()" role="dialog" aria-modal="true">
    <div class="dialogHeader">
      <span class="dialogTitle">Excluir [entidade]</span>
      <button class="dialogCloseBtn" onclick="delDialogClose()" aria-label="Fechar" type="button">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="dialogBody">
      <p style="margin:0;color:var(--color-text-secondary);">
        Tem certeza que deseja excluir <strong id="del-nome"></strong>? Esta ação não pode ser desfeita.
      </p>
    </div>
    <div class="dialogFooter">
      <button class="btn ghost" type="button" onclick="delDialogClose()">Cancelar</button>
      <button class="btn destructive" type="button" onclick="delDialogClose()">Excluir</button>
    </div>
  </div>
</div>
```

---

### MultiSelect
**Import:** `import { MultiSelect } from '../MultiSelect/MultiSelect'`
**Story:** `Components/MultiSelect`

Dropdown com seleção múltipla. Os itens selecionados aparecem como chips removíveis dentro do trigger. Checkboxes visuais no menu indicam o estado de cada opção.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `MultiSelectOption[]` | — | Lista `{ label, value }` |
| `value` | `string[]` | `[]` | Valores selecionados |
| `onChange` | `(value: string[]) => void` | — | Callback ao alterar seleção |
| `label` | `string` | — | Label acima do campo |
| `placeholder` | `string` | `'Selecione...'` | Placeholder sem seleção |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `helperText` | `string` | — | Texto auxiliar |
| `error` | `string` | — | Mensagem de erro (borda vermelha) |

```tsx
const [value, setValue] = useState<string[]>([]);
<MultiSelect
  label="Carregadores"
  options={[
    { label: 'ALT-001 — ABB Terra 54', value: 'alt-001' },
    { label: 'ALT-002 — WEG EVCS-W22', value: 'alt-002' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Selecione os carregadores"
/>
```

**Conflitos:** Nenhum — todas as classes prefixadas com `ms`. Coexiste com qualquer componente.

---

### Dropdown
**Import:** `import { Dropdown } from '../Dropdown/Dropdown'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `options` | `{ label: string; value: string }[]` | Lista de opções |
| `value` | `string` | Valor selecionado |
| `onChange` | `(value: string) => void` | Callback de seleção |
| `label` | `string` | Label acima |
| `placeholder` | `string` | Placeholder |
| `disabled` | `boolean` | Desabilita |
| `error` | `string` | Mensagem de erro |

```tsx
const [val, setVal] = useState('');
<Dropdown options={options} value={val} onChange={setVal} label="Status" placeholder="Selecione..." />
```

---

### Sheet
**Import:** `import { Sheet } from '../Sheet/Sheet'`

Painel deslizante da direita (right drawer). Overlay com backdrop escurecido, animação `translateX`, scroll interno, Escape para fechar.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `open` | `boolean` | — | Visibilidade |
| `onClose` | `() => void` | — | Callback de fechar (botão X, overlay, Escape) |
| `title` | `string` | — | Título no header |
| `children` | `ReactNode` | — | Conteúdo scrollável |
| `footer` | `ReactNode` | — | Ações no rodapé (opcional) |
| `width` | `number \| string` | `400` | Largura do painel |

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Notificações</Button>

<Sheet
  open={open}
  onClose={() => setOpen(false)}
  title="Notificações"
  width={420}
  footer={<Button variant="ghost">Marcar todas como lidas</Button>}
>
  {/* conteúdo */}
</Sheet>
```

**HTML standalone — classes:**

| Classe | Descrição |
|--------|-----------|
| `.sheetOverlay` | Backdrop fixo `inset: 0`, fundo escurecido |
| `.sheetOverlay.sheetOpen` | Estado aberto (fundo visível, pointer-events ativo) |
| `.sheetPanel` | Painel lateral direito (`translateX(100%)` → `translateX(0)`) |
| `.sheetHeader` | Barra de título + botão fechar |
| `.sheetTitle` | Texto do título |
| `.sheetClose` | Botão X |
| `.sheetBody` | Área de conteúdo scrollável |
| `.sheetFooter` | Rodapé com ações (opcional) |

```html
<link rel="stylesheet" href="../componentes/Sheet/Sheet.module.css" />

<div class="sheetOverlay" id="notif-sheet" onclick="closeSheet()">
  <aside class="sheetPanel" onclick="event.stopPropagation()">
    <div class="sheetHeader">
      <span class="sheetTitle">Notificações</span>
      <button class="sheetClose" onclick="closeSheet()" aria-label="Fechar">
        <i data-lucide="x" width="16" height="16"></i>
      </button>
    </div>
    <div class="sheetBody"><!-- conteúdo --></div>
    <div class="sheetFooter"><!-- ações --></div>
  </aside>
</div>

<script>
  function openSheet()  { document.getElementById('notif-sheet').classList.add('sheetOpen'); }
  function closeSheet() { document.getElementById('notif-sheet').classList.remove('sheetOpen'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
</script>
```

---

### NotificationBadge
**Import:** `import { NotificationBadge } from '../NotificationBadge/NotificationBadge'`

Envolve qualquer elemento (ícone, botão) e sobrepõe um badge vermelho com contagem de notificações. Badge oculto quando `count === 0`. Acima de `max`, exibe `max+`.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `count` | `number` | — | Número de notificações. 0 = badge oculto |
| `max` | `number` | `9` | Limite antes de exibir "+" (ex: `9+`) |
| `children` | `ReactNode` | — | Elemento envolvido (ícone, botão) |

**Tokens usados:** `--color-action-error` (fundo), `--color-gray-white` (texto), `--color-bg-default` (ring de separação via `box-shadow`).

```tsx
<NotificationBadge count={3}>
  <button className={styles.iconBtn} aria-label="3 notificações">
    <Bell size={16} />
  </button>
</NotificationBadge>

{/* Acima do limite */}
<NotificationBadge count={12} max={9}>  {/* exibe "9+" */}
  <button>...</button>
</NotificationBadge>

{/* Sem badge */}
<NotificationBadge count={0}>
  <button>...</button>
</NotificationBadge>
```

**HTML standalone:** use `.notifBadge` dentro de um `.iconBtn` (position: relative) do `Sidebar.module.css`:
```html
<button class="iconBtn" aria-label="3 notificações">
  <i data-lucide="bell" width="16" height="16"></i>
  <span class="notifBadge">3</span>
</button>
```

---

### Accordion
**Import:** `import { Accordion } from '../Accordion/Accordion'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `{ title: string; content: ReactNode }[]` | Itens |
| `defaultOpenIndex` | `number[]` | Índices abertos por padrão |
| `allowMultiple` | `boolean` | Permite múltiplos abertos ao mesmo tempo |

```tsx
<Accordion items={[{ title: 'Pergunta', content: 'Resposta...' }]} allowMultiple />
```

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.accordion` | Container flex coluna |
| `.item` | Um item do accordion (sem `.open` = fechado) |
| `.item.open` | Item aberto — revela `.panel` e gira `.chevron` |
| `.trigger` | Botão do cabeçalho (width: 100%) |
| `.chevron` | Ícone rotacionado quando aberto |
| `.panel` | Área colapsável (`max-height: 0` → `1000px`) |
| `.content` | Padding interno do conteúdo |

**Nota:** A classe `.open` é adicionada ao `.item` via JS. Não conflita com o Sidebar porque `Sidebar.module.css` usa `.sidebar.open` (seletor composto).

```html
<link rel="stylesheet" href="../componentes/Accordion/Accordion.module.css" />

<div class="accordion">
  <div class="item">
    <button class="trigger" type="button">
      Pergunta
      <span class="chevron"><i data-lucide="chevron-down" width="16" height="16"></i></span>
    </button>
    <div class="panel">
      <div class="content">Resposta detalhada aqui.</div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.accordion .trigger').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.item').classList.toggle('open'));
  });
</script>
```

---

### Checkbox
**Import:** `import { Checkbox } from '../Checkbox/Checkbox'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `label` | `string` | Label ao lado |
| `checked` | `boolean` | Estado marcado |
| `onChange` | `() => void` | Callback |
| `indeterminate` | `boolean` | Estado intermediário |
| `disabled` | `boolean` | Desabilita |

---

### RadioButton
**Import:** `import { RadioButton } from '../RadioButton/RadioButton'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `options` | `{ label: string; value: string }[]` | — | Opções |
| `name` | `string` | — | Nome do grupo |
| `value` | `string` | — | Valor selecionado |
| `onChange` | `(value: string) => void` | — | Callback |
| `label` | `string` | — | Label do grupo |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Direção |
| `disabled` | `boolean` | — | Desabilita todo o grupo |

---

### Tab
**Import:** `import { Tab } from '../Tab/Tab'`
**CSS:** `../componentes/Tab/Tab.module.css`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `tabs` | `{ label: string; content: ReactNode }[]` | Abas |
| `defaultIndex` | `number` | Aba ativa inicial |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.tabWrapper` | Container raiz |
| `.tabList` | Linha de botões (flex, border-bottom, scroll horizontal oculto) |
| `.tabBtn` | Botão de aba inativo |
| `.tabBtnActive` | Botão de aba ativo (cor brand + underline) |
| `.tabPanel` | Área de conteúdo da aba ativa |

**Nota:** Classes prefixadas com `tab` para evitar conflito com `.wrapper` do Dropdown/Input e `.list`/`.panel` de outros componentes. Pode ser linkado diretamente sem conflito.

```html
<link rel="stylesheet" href="../componentes/Tab/Tab.module.css" />

<div class="tabWrapper">
  <div class="tabList" role="tablist">
    <button class="tabBtn tabBtnActive" role="tab" aria-selected="true">Aba 1</button>
    <button class="tabBtn" role="tab" aria-selected="false">Aba 2</button>
  </div>
  <div class="tabPanel" role="tabpanel">Conteúdo da aba ativa</div>
</div>
```

---

### Toggle
**Import:** `import { Toggle } from '../Toggle/Toggle'`
**CSS:** `../componentes/Toggle/Toggle.module.css`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `checked` | `boolean` | — | Estado ligado/desligado |
| `onChange` | `ChangeEventHandler` | — | Callback |
| `label` | `string` | — | Label ao lado |
| `size` | `'md' \| 'sm'` | `'md'` | Tamanho |
| `disabled` | `boolean` | — | Desabilita |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.toggleWrapper` | `<label>` container raiz |
| `.toggleInput` | `<input type="checkbox">` visualmente oculto |
| `.toggleTrack` | Trilho do toggle |
| `.toggleThumb` | Bolinha deslizante |
| `.toggleLabel` | Texto ao lado |
| `.toggleChecked` | Estado ativo (adicionar no wrapper via JS) |
| `.toggleSm` | Tamanho pequeno |
| `.toggleDisabled` | Estado desabilitado |

**Nota:** Estado ativo funciona de dois modos: classe `.toggleChecked` no wrapper (React) OU CSS `:has(input:checked)` automático (HTML standalone — sem JS extra).

```html
<link rel="stylesheet" href="../componentes/Toggle/Toggle.module.css" />

<label class="toggleWrapper" for="meu-toggle" style="margin-top: var(--spacing-xs);">
  <input type="checkbox" class="toggleInput" id="meu-toggle" checked />
  <span class="toggleTrack"><span class="toggleThumb"></span></span>
  <span class="toggleLabel" id="meu-toggle-label">Ativa</span>
</label>
```

---

### Tooltip
**Import:** `import { Tooltip } from '../Tooltip/Tooltip'`

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `content` | `string` | — | Texto do tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posição |
| `children` | `ReactNode` | — | Elemento alvo |

```tsx
<Tooltip content="Deletar permanentemente" placement="top">
  <Button variant="destructive" iconOnly iconLeft={<Trash size={16} />} aria-label="Excluir" />
</Tooltip>
```

---

### Breadcrumb
**Import:** `import { Breadcrumb } from '../Breadcrumb/Breadcrumb'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `{ label: string; href?: string; icon?: ReactNode }[]` | Itens do caminho |

O último item é sempre o ativo (sem link).

---

### Logo / LogoSymbol
**Import:** `import { Logo, LogoSymbol } from '../Logo/Logo'`

Marca EQS Engenharia. Arte colorida fixa (PNG, não usa `currentColor`) — a imagem correta para
cada tema (`logo-light.png` / `logo-dark.png`) é trocada automaticamente via `[data-theme]`,
sem nenhuma prop ou lógica adicional.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho predefinido |
| `width` | `number \| string` | — | Largura customizada (sobrepõe `size`) |

- `Logo` — logotipo completo (ícone + wordmark). Widths padrão: sm=80, md=160, lg=240, xl=360
- `LogoSymbol` — **ainda não existe um ícone isolado da marca.** Reaproveita temporariamente a
  arte completa em tamanho reduzido (sm=64, md=88, lg=120, xl=160) até chegar um símbolo dedicado.

**Em telas HTML (sem React):**
```html
<link rel="stylesheet" href="../componentes/Logo/Logo.module.css" />
<span class="logoDefault logoMd" role="img" aria-label="EQS Engenharia"></span>
```

**Arquivos de origem:** `componentes/Logo/logo-light.png` (fundo claro) e
`componentes/Logo/logo-dark.png` (fundo escuro) — nunca usar filtro CSS (`invert`/`brightness`)
para simular o tema oposto; a arte é colorida e o filtro distorce as cores da marca.

---

### Avatar
**Import:** `import { Avatar } from '../Avatar/Avatar'`

Filho do Sidebar — deve ser criado antes. Foto circular com fallback para iniciais.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `src` | `string` | — | URL da foto |
| `initials` | `string` | — | Iniciais exibidas quando sem foto |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm=32 px, md=40 px, lg=64 px |
| `alt` | `string` | `''` | Alt da imagem |

**Foto padrão para stories:** `./src/placeholder.jpg` (colocar JPG em `Avatar/src/`)

**Nota CSS:** `Table.module.css` usa `.cellAvatar` (não `.avatar`) para evitar conflito em HTML standalone.

```tsx
<Avatar initials="AR" size="md" />
<Avatar src="/fotos/usuario.jpg" alt="Admin Rede" size="md" />
<Avatar initials="AR" size="sm" />
```

---

### Pagination
**Import:** `import { Pagination } from '../Pagination/Pagination'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `page` | `number` | Página atual (1-indexed) |
| `pageSize` | `number` | Itens por página |
| `total` | `number` | Total de itens |
| `onChange` | `(page: number) => void` | Callback ao mudar de página |

**Nota CSS:** usa `.paginBtn` e `.paginBtnActive` (não `.btn`) para evitar conflito com Button.module.css em HTML standalone.

```tsx
const [page, setPage] = useState(1);
<Pagination page={page} pageSize={10} total={47} onChange={setPage} />
```

---

### DatePicker
**CSS:** `../componentes/DatePicker/DatePicker.module.css`

Seletor de intervalo de datas com layout horizontal (calendário à esquerda, controles à direita). Inspirado no Geist Calendar `horizontalLayout`, adaptado com os tokens do design system.

| Classe | Descrição |
|--------|-----------|
| `.trigger` | Botão pill que abre o popover |
| `.triggerIcon` | Ícone de calendário |
| `.triggerText` | Texto do intervalo selecionado |
| `.triggerPlaceholder` | Texto quando vazio |
| `.triggerClear` | Botão X para limpar |
| `.trigger.open` | Estado aberto (borda focus) |
| `.popoverWrap` | Container `position: relative` |
| `.popover` | Painel absoluto (flex row) |
| `.calPanel` | Painel esquerdo — grade de dias |
| `.calHeader` | Mês + botões nav |
| `.calMonthLabel` | "May 2026" |
| `.calNavBtn` | Seta anterior/próximo |
| `.calGrid` | Grid 7 colunas |
| `.calDayName` | S M T W T F S |
| `.calDay` | Célula de dia |
| `.calDayOutside` | Dia de outro mês (dimmed) |
| `.calDayToday` | Hoje (brand color, bold) |
| `.calDayStart` | Início do range (filled brand) |
| `.calDayEnd` | Fim do range (outlined brand) |
| `.calDayInRange` | Dias dentro do range (bg-brand) |
| `.panelDivider` | Divisória vertical entre painéis |
| `.ctrlPanel` | Painel direito — Start/End/Apply |
| `.ctrlFieldLabel` | Label "Start" / "End" |
| `.ctrlDateInput` | Input de data digitável |
| `.ctrlSpacer` | Flex spacer empurra Apply para baixo |
| `.ctrlApply` | Botão "Apply" brand |
| `.ctrlTzSelect` | Select de timezone |

**HTML standalone — uso:**
```html
<link rel="stylesheet" href="../componentes/DatePicker/DatePicker.module.css" />

<div class="popoverWrap">
  <button class="trigger open">
    <span class="triggerIcon"><i data-lucide="calendar" width="14" height="14"></i></span>
    <span class="triggerText">22/05/2026 – 31/05/2026</span>
    <button class="triggerClear"><i data-lucide="x" width="12" height="12"></i></button>
  </button>
  <div class="popover">
    <div class="calPanel">...</div>
    <div class="panelDivider"></div>
    <div class="ctrlPanel">...</div>
  </div>
</div>
```

**Notas:**
- `.popover[hidden]` esconde o painel (use JS para alternar o atributo `hidden`)
- O JS de renderização do calendário (navegar meses, selecionar range) deve viver na `<script>` da página HTML
- `.calDayStart` e `.calDayEnd` não devem receber `.calDayInRange`

---

### Card
**CSS:** `../componentes/Card/Card.module.css`

Container de superfície sólida — mesmo fundo/borda em qualquer contexto (`--color-bg-surface` + `--color-border-subtle`).

| Classe | Descrição |
|--------|-----------|
| `.card` | Fundo sólido `--color-bg-surface` + borda `--color-border-subtle` |
| `.card2` | Fundo sólido `--color-bg-elevated` (um degrau mais claro) + borda `--color-border-subtle` |

```html
<div class="card">
  <!-- conteúdo -->
</div>
```

**Atenção:** `Table.module.css` também usa `.card` para seu container — não linkar os dois na mesma página.

---

### Timeline
**Import:** `import { Timeline } from '../Timeline/Timeline'`
**CSS:** `../componentes/Timeline/Timeline.module.css`

Linha do tempo vertical com estados visuais. Usado em telas de detalhe para mostrar progressão de eventos (reservas, pedidos, instalações, etc.).

| Prop | Tipo | Descrição |
|------|------|-----------|
| `items` | `TimelineItem[]` | Lista de eventos em ordem cronológica |

**`TimelineItem`:**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `label` | `string` | Descrição do evento |
| `time` | `string` (opcional) | Timestamp ou texto de data/hora |
| `status` | `'done' \| 'active' \| 'pending'` | Estado visual do item |

**CSS classes (para HTML standalone):**

| Classe | Descrição |
|--------|-----------|
| `.timeline` | Container flex coluna |
| `.tlItem` | Um evento da linha do tempo |
| `.tlDone` | Estado concluído (ponto verde + conector verde desbotado) |
| `.tlActive` | Estado em andamento (ponto amarelo com glow) |
| `.tlPending` | Estado pendente (ponto outline, conector esmaecido) |
| `.tlVis` | Coluna visual: ponto + conector |
| `.tlDot` | Círculo de estado (12×12 px) |
| `.tlConnector` | Linha vertical entre eventos |
| `.tlContent` | Coluna de texto |
| `.tlLabel` | Texto do evento |
| `.tlTime` | Timestamp abaixo do label (opcional) |

```tsx
<Timeline items={[
  { status: 'done',    label: 'Reserva confirmada',  time: '25/05/2026 às 09:30' },
  { status: 'active',  label: 'Janela iniciada',      time: '25/05/2026 às 16:45' },
  { status: 'pending', label: 'Expiração da janela',  time: 'Previsto 25/05/2026 às 17:00' },
]} />
```

```html
<!-- HTML standalone -->
<link rel="stylesheet" href="../componentes/Timeline/Timeline.module.css" />

<div class="timeline">
  <div class="tlItem tlDone">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent">
      <div class="tlLabel">Reserva confirmada</div>
      <div class="tlTime">25/05/2026 às 09:30</div>
    </div>
  </div>
  <div class="tlItem tlActive">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent"><div class="tlLabel">Janela iniciada</div></div>
  </div>
  <div class="tlItem tlPending">
    <div class="tlVis"><div class="tlDot"></div><div class="tlConnector"></div></div>
    <div class="tlContent"><div class="tlLabel">Expiração</div></div>
  </div>
</div>
```

**Nota:** O conector do último item some automaticamente via CSS — não precisa de JS.

---

### FilterChips
**Import:** `import { FilterChips } from '../FilterChips/FilterChips'`
**CSS:** `../componentes/FilterChips/FilterChips.module.css`

Grupo de filtros em pílula com seleção exclusiva (um ativo por vez). Padrão visual: pílula com borda, fundo invertido no ativo.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `options` | `FilterChipOption[]` | Lista `{ label, value, icon? }` |
| `activeValue` | `string` | Valor do chip ativo |
| `onChange` | `(value: string) => void` | Callback ao clicar |
| `className` | `string` | Classe extra no container |

```tsx
const [period, setPeriod] = useState('30');
<FilterChips
  options={[
    { label: '30 dias', value: '30' },
    { label: '60 dias', value: '60' },
    { label: '90 dias', value: '90' },
  ]}
  activeValue={period}
  onChange={setPeriod}
/>
```

**HTML standalone — classes:**

| Classe | Descrição |
|--------|-----------|
| `.filterChips` | Container flex dos chips |
| `.filterChip` | Botão pílula individual |
| `.filterChip.active` | Estado ativo (fundo invertido) |

```html
<div class="filterChips" id="myFilters">
  <button class="filterChip active" type="button">30 dias</button>
  <button class="filterChip" type="button">60 dias</button>
  <button class="filterChip" type="button">
    <i data-lucide="calendar" width="12" height="12"></i>
    Período
  </button>
</div>
```

**Conflitos:** `.filterChip` não conflita com `.chip` (Chip.module.css).

---

### Chip / ChipGroup
**Import:** `import { Chip, ChipGroup } from '../Chip/Chip'`
**CSS:** `../componentes/Chip/Chip.module.css`

Seletor multi-opção em formato de pílulas. Usa `<input type="checkbox">` oculto com `:has(input:checked)` para estado ativo — sem JS necessário.

| Prop (Chip) | Tipo | Descrição |
|-------------|------|-----------|
| `label` | `string` | Texto do chip |
| `value` | `string` | Valor do checkbox |
| `checked` | `boolean` | Estado marcado |
| `icon` | `ReactNode` | Ícone opcional à esquerda |
| `onChange` | `(value, checked) => void` | Callback |

**CSS classes:**

| Classe | Descrição |
|--------|-----------|
| `.chipGroup` | Container flex-wrap dos chips |
| `.chip` | Pílula `<label>` com checkbox oculto |
| `.chip:has(input:checked)` | Estado ativo — borda brand, fundo brand |
| `.chipIcon` | Wrapper do ícone interno |

```html
<link rel="stylesheet" href="../componentes/Chip/Chip.module.css" />

<span class="label">Tipos de conectores</span>
<div class="chipGroup">
  <label class="chip"><input type="checkbox" value="ccs2" />CCS2</label>
  <label class="chip"><input type="checkbox" value="ccs1" />CCS1</label>
  <label class="chip"><input type="checkbox" value="tipo2" />Tipo 2</label>
</div>

<!-- Com ícone -->
<div class="chipGroup">
  <label class="chip"><input type="checkbox" checked /><i data-lucide="mail" width="14" height="14"></i>E-mail</label>
  <label class="chip"><input type="checkbox" /><i data-lucide="bell" width="14" height="14"></i>Sistema</label>
</div>
```

---

### DetailCard
**Import:** `import { DetailGrid, DetailCard, TitleRow } from '../DetailCard/DetailCard'`
**CSS:** `../componentes/DetailCard/DetailCard.module.css`

Layout padrão de telas de detalhe (visualizar entidade). Grid de 2 colunas com cards de superfície sólida que contêm pares chave–valor. Sempre usar em conjunto com `Card.module.css` (superfície sólida).

| Classe | Descrição |
|--------|-----------|
| `.titleRow` | Linha de cabeçalho: `h1` + badge de status lado a lado |
| `.detailGrid` | Grid externo 2 colunas (`1fr 1fr`) |
| `.detailCard` | Card que ocupa 1 coluna (só padding — fundo vem do `.card`) |
| `.detailCardFull` | Card que ocupa as 2 colunas |
| `.cardTitle` | Título interno do card (display, sm, semibold) |
| `.infoGrid` | Grid `auto 1fr` para os pares chave–valor |
| `.infoLabel` | Label (xs, uppercase, terciário) |
| `.infoValue` | Valor padrão (sm, primário) |
| `.infoValueMono` | Valor em fonte mono (código, serial) |
| `.infoValueDim` | Valor esmaecido (campo vazio / N/A) |
| `.infoValueStrong` | Valor em destaque (total, valor financeiro) — md, semibold, brand |
| `.cardDivider` | Divisor horizontal dentro do infoGrid (ocupa as 2 colunas) |

```html
<link rel="stylesheet" href="../componentes/Card/Card.module.css" />
<link rel="stylesheet" href="../componentes/DetailCard/DetailCard.module.css" />

<!-- Cabeçalho da página -->
<div class="titleRow">
  <h1 class="pageTitle">ALT-001</h1>
  <span class="badge" data-status="success"><span class="badgeDot"></span>Ativo</span>
</div>

<!-- Grid de cards -->
<div class="detailGrid">
  <div class="card detailCard">
    <h2 class="cardTitle">Informações</h2>
    <div class="infoGrid">
      <span class="infoLabel">Serial</span>
      <span class="infoValueMono">ALT-001</span>

      <span class="infoLabel">Status</span>
      <span class="infoValue">Ativo</span>
    </div>
  </div>

  <div class="card detailCardFull">
    <h2 class="cardTitle">Resumo financeiro</h2>
    <div class="infoGrid">
      <span class="infoLabel">Total</span>
      <span class="infoValueStrong">R$ 1.280,00</span>

      <span class="infoLabel">Observação</span>
      <span class="infoValueDim">—</span>
    </div>
  </div>
</div>
```

**Nota:** `.titleRow` não tem `h1` embutido — usar o `h1.pageTitle` da página normalmente.

---

### Skeleton
**Import:** `import { Skeleton } from '../Skeleton/Skeleton'`

Bloco de carregamento com efeito shimmer (faixa deslizante). Use para substituir qualquer elemento enquanto os dados carregam.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `width` | `string \| number` | — | Largura. Ex: `200`, `'100%'`, `'12rem'` |
| `height` | `string \| number` | `16px` | Altura. Ex: `20`, `'1.5rem'` |
| `borderRadius` | `string` | `--radius-xs` | Override de raio. Ex: `'50%'` para círculo |
| `className` | `string` | — | Classe extra |

**CSS:** `../componentes/Skeleton/Skeleton.module.css`  
**Classe:** `.skeleton`

```tsx
{/* Linha de texto */}
<Skeleton width="60%" height={14} />

{/* Avatar circular */}
<Skeleton width={40} height={40} borderRadius="50%" />

{/* Área de gráfico */}
<Skeleton width="100%" height={220} />

{/* Cartão de métrica */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Skeleton width={36} height={36} borderRadius="var(--radius-sm)" />
  <Skeleton height={12} width="65%" />
  <Skeleton height={28} width="50%" />
</div>
```

**HTML standalone:**
```html
<link rel="stylesheet" href="../componentes/Skeleton/Skeleton.module.css" />
<span class="skeleton" style="width:200px;height:16px;"></span>
<span class="skeleton" style="width:40px;height:40px;border-radius:50%;"></span>
```

**Notas:**
- `aria-hidden="true"` embutido — não precisa adicionar manualmente
- O efeito shimmer adapta automaticamente ao tema claro/escuro via tokens
- `min-height: var(--spacing-md)` garante visibilidade mesmo sem `height`

---

### Background
**Import:** `import { Background } from '../Background/Background'`

Wrapper que renderiza os dois blobs decorativos de fundo (gradientes radiais desfocados). Qualquer tela interna que use os blobs chama este componente — ou, em HTML, linka `Background.module.css` e usa as classes diretamente.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `children` | `ReactNode` | Conteúdo da página (deve ter `position: relative; z-index: 1` para sobrepor os blobs) |
| `className` | `string` | Classe extra para o wrapper |

**CSS classes (para HTML standalone):**
- `.bgWrapper` — `position: relative` no container pai
- `.blob1` — blob superior direito (520 × 520 px, `--color-blob-1`, blur 120 px)
- `.blob2` — blob inferior esquerdo (400 × 400 px, `--color-blob-2`, blur 100 px)

```tsx
/* React */
<Background className="main">
  <div style={{ position: 'relative', zIndex: 1 }}>conteúdo</div>
</Background>
```

```html
<!-- HTML standalone -->
<link rel="stylesheet" href="../componentes/Background/Background.module.css" />

<main class="main bgWrapper">
  <div class="blob1"></div>
  <div class="blob2"></div>
  <!-- conteúdo com position: relative; z-index: 1 -->
</main>
```

---

### MetricCard
**Import:** `import { MetricCard } from '../MetricCard/MetricCard'`

Card de KPI para dashboards. Exibe ícone Lucide, label descritivo, valor principal e variação opcional vs. período anterior.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `icon` | `LucideIcon` | Ícone do componente Lucide |
| `label` | `string` | Descrição do indicador |
| `value` | `string` | Valor formatado (ex: `"1.847"`, `"R$ 28.430"`) |
| `trend` | `{ value: string; direction: 'up' \| 'down' \| 'neutral' }` | Variação opcional |

```tsx
<MetricCard
  icon={Zap}
  label="Total de carregadores habilitados"
  value="142"
  trend={{ value: '+8', direction: 'up' }}
/>
```

Grid de 3 colunas típico:
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
  <MetricCard icon={Zap} label="Carregadores" value="142" trend={{ value: '+8', direction: 'up' }} />
  <MetricCard icon={RotateCcw} label="Recargas" value="1.847" trend={{ value: '+12%', direction: 'up' }} />
  <MetricCard icon={CircleDollarSign} label="Faturamento" value="R$ 28.430" trend={{ value: '-3%', direction: 'down' }} />
</div>
```

---

### LineChart
**Import:** `import { LineChart } from '../LineChart/LineChart'`

Gráfico de linha com ApexCharts. Suporta múltiplas séries, formatação customizada do eixo Y e dark mode automático.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `series` | `{ name: string; data: number[] }[]` | — | Séries de dados |
| `categories` | `string[]` | — | Labels do eixo X |
| `title` | `string` | — | Título opcional acima do gráfico |
| `height` | `number` | `280` | Altura em px |
| `yFormatter` | `(val: number) => string` | `String(v)` | Formatação dos valores do eixo Y e tooltip |
| `colors` | `string[]` | `['#7c3aed', '#3b82f6']` | Cores das linhas |

```tsx
<LineChart
  title="Recargas no período"
  series={[{ name: 'Recargas', data: [42, 58, 73, 61, 88] }]}
  categories={['01/05', '08/05', '15/05', '22/05', '29/05']}
/>
```

---

### DonutChart
**Import:** `import { DonutChart } from '../DonutChart/DonutChart'`

Gráfico de rosca com ApexCharts. Total centralizado automático, legenda na base, dark mode automático.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `series` | `number[]` | — | Valores de cada fatia |
| `labels` | `string[]` | — | Labels de cada fatia |
| `title` | `string` | — | Título opcional |
| `height` | `number` | `280` | Altura em px |
| `colors` | `string[]` | `['#7c3aed', '#6b7280', '#f59e0b', '#3b82f6']` | Cores das fatias |
| `totalLabel` | `string` | `'Total'` | Label do total centralizado |

```tsx
<DonutChart
  title="Status dos carregadores"
  series={[98, 24, 12, 8]}
  labels={['Ativo', 'Inativo', 'Em manutenção', 'Instalando']}
/>
```

---

## Tokens de Design

### Importação
```css
/* Importado no Storybook via storybook/.storybook/preview.tsx */
/* Em telas HTML: primeiro <link> da página → ../componentes/tokens/tokens.css */
```

### Tokens semânticos (preferir sempre)

#### Texto
| Token | Dark | Light |
|-------|------|-------|
| `--color-text-primary` | gray-50 | gray-950 |
| `--color-text-secondary` | gray-300 | gray-700 |
| `--color-text-tertiary` | gray-400 | gray-500 |
| `--color-text-disabled` | gray-600 | gray-400 |
| `--color-text-brand` | brand-300 | brand-600 |
| `--color-text-link` | blue-300 | blue-600 |
| `--color-text-error` | red-300 | red-600 |
| `--color-text-success` | green-300 | green-700 |
| `--color-text-warning` | yellow-300 | yellow-700 |

#### Background
| Token | Dark | Light |
|-------|------|-------|
| `--color-bg-default` | gray-black | gray-50 |
| `--color-bg-subtle` | gray-950 | gray-100 |
| `--color-bg-surface` | gray-900 | white |
| `--color-bg-elevated` | gray-800 | white |
| `--color-bg-disabled` | gray-700 | gray-200 |
| `--color-bg-brand` | brand-950 | brand-50 |
| `--color-bg-brand-strong` | brand-500 | brand-500 |

#### Borda
| Token | Dark | Light |
|-------|------|-------|
| `--color-border-default` | gray-700 | gray-300 |
| `--color-border-subtle` | gray-800 | gray-100 |
| `--color-border-muted` | gray-600 | gray-200 |
| `--color-border-focus` | brand-400 | brand-500 |

#### Ação
| Token | Uso |
|-------|-----|
| `--color-action-primary` / `-hover` / `-pressed` | Botão primário (brand) |
| `--color-action-secondary` / `-hover` / `-pressed` | Botão secundário (blue) |
| `--color-action-error` / `-hover` / `-pressed` | Destrutivo (red) |
| `--color-action-warning` / `-hover` / `-pressed` | Aviso (yellow) |
| `--color-action-success` / `-hover` / `-pressed` | Sucesso (green) |

#### Status (para badges e feedbacks)
```css
--color-status-success-bg / -fg
--color-status-error-bg / -fg
--color-status-warning-bg / -fg
--color-status-info-bg / -fg
--color-status-disabled-bg / -fg
--color-status-cyan-bg / -fg
--color-status-purple-bg / -fg
```

> **Sidebar/Table/Card não têm tokens próprios de fundo.** O sistema é flat/sólido (sem blobs decorativos por trás), então Sidebar, Table e Card usam diretamente os tokens semânticos acima: fundo `--color-bg-surface`, hover `--color-bg-subtle`, item ativo `--color-bg-brand`/`--color-text-brand`, borda `--color-border-subtle`. Não recriar tokens dedicados tipo `--color-sidebar-bg`/`--color-nav-*`/`--color-table-*` — isso foi removido de propósito (era um resquício "glass" do produto anterior, renderizando sobre um fundo de blobs que não existe mais no sistema).

#### Gradiente e glow brand
```css
--gradient-brand           /* gradiente diagonal brand-400 → brand-600 */
--shadow-glow-sm / -md / -lg  /* glow vermelho brand */
--shadow-highlight         /* inset brilho sutil */
```

---

### Tipografia
| Token | Valor |
|-------|-------|
| `--font-display` | Inter |
| `--font-body` | Inter |
| `--font-mono` | JetBrains Mono / Fira Code |

#### Tamanhos
`--font-size-xs` (12px) → `--font-size-sm` (14px) → `--font-size-md` (16px) → `--font-size-lg` (20px) → `--font-size-xl` (24px) → `--font-size-2xl` (28px) → `--font-size-3xl` (32px) → ... → `--font-size-9xl` (96px)

#### Pesos
`--font-weight-light` (300) · `--font-weight-regular` (400) · `--font-weight-medium` (500) · `--font-weight-semibold` (600) · `--font-weight-bold` (700) · `--font-weight-heavy` (800)

#### Line-height
`--line-height-tight` (1.2) · `--line-height-snug` (1.375) · `--line-height-normal` (1.5) · `--line-height-relaxed` (1.625) · `--line-height-loose` (2)

---

### Espaçamento
`--spacing-2xs` (2px) · `--spacing-xs` (4px) · `--spacing-sm` (8px) · `--spacing-md` (16px) · `--spacing-lg` (24px) · `--spacing-xl` (32px) · `--spacing-2xl` (48px) · `--spacing-3xl` (64px) · `--spacing-4xl` (96px) · `--spacing-5xl` (128px) · `--spacing-6xl` (160px) · `--spacing-7xl` (200px)

---

### Border Radius
`--radius-none` (0) · `--radius-xs` (4px) · `--radius-sm` (8px) · `--radius-md` (16px) · `--radius-lg` (24px) · `--radius-xl` (32px) · `--radius-2xl` (48px) · `--radius-full` (9999px)

---

### Border Width
`--border-width-hairline` (0.5px) · `--border-width-thin` (1px) · `--border-width-medium` (2px) · `--border-width-thick` (4px)

---

### Sombras
`--shadow-xs` · `--shadow-sm` · `--shadow-md` · `--shadow-lg` · `--shadow-xl` · `--shadow-2xl` · `--shadow-inner`

---

### Opacidade
`--opacity-0` (0) · `--opacity-5` (0.05) · `--opacity-10` (0.10) · `--opacity-20` · `--opacity-25` · `--opacity-50` · `--opacity-75` · `--opacity-90` · `--opacity-100` (1)

---

### Motion / Transições
```css
--transition-fast:   150ms ease
--transition-normal: 250ms ease
--transition-slow:   400ms ease

--easing-standard: cubic-bezier(0.3, 0.07, 0.34, 1)
--easing-entrance:  cubic-bezier(0, 0, 0.34, 1)
--easing-exit:      cubic-bezier(0.3, 0.07, 1, 1)
```

---

## Padrões de composição observados

### Layout de página interna (área admin)
```tsx
<div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  <Sidebar open={open} onToggle={...} activeItem={active} onNavClick={...} />
  <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    {/* Page header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 0' }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--color-text-primary)' }}>Título</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-text-tertiary)' }}>Subtítulo</p>
      </div>
      <Button iconLeft={<PlusIcon size={16} />}>Ação primária</Button>
    </div>

    {/* Toolbar (busca/filtros) */}
    <div style={{ padding: '20px 32px 0' }}>
      <Input iconLeft={<Search size={16} />} placeholder="Buscar..." style={{ maxWidth: 320 }} />
    </div>

    {/* Conteúdo principal */}
    <div style={{ flex: 1, overflow: 'auto', padding: '16px 32px 32px' }}>
      <Table columns={...} rows={...} />
    </div>
  </main>
</div>
```

### Card de métricas
```tsx
<div style={{
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 12, padding: '20px 24px',
}}>
  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Label</div>
  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--color-text-secondary)' }}>Valor</div>
</div>
```

### Grid de cards (4 colunas)
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
  {/* cards */}
</div>
```

---

### SiteHeader
**Import:** `import { SiteHeader } from '../SiteHeader/SiteHeader'`

Cabeçalho do site institucional (`site-desktop`). Usa `Logo`, `Input`, `Avatar` e `DropdownMenu` internamente — sempre linkar os quatro CSS junto do `SiteHeader.module.css` em telas HTML.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `navItems` | `{ label: string; href: string; active?: boolean }[]` | Itens do menu horizontal |
| `user` | `{ name: string; initials: string }` | Usuário exibido no avatar |
| `onSearchChange` | `(value: string) => void` | Callback da busca |
| `onProfileClick` | `() => void` | Callback de "Meu Perfil" |
| `onLogout` | `() => void` | Callback de "Sair" |

```tsx
<SiteHeader
  navItems={[
    { label: 'Home', href: '/', active: true },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Comunicados', href: '/comunicados' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Links Úteis', href: '/links-uteis' },
  ]}
  user={{ name: 'Admin', initials: 'AD' }}
/>
```

---

### Hero
**Import:** `import { Hero } from '../Hero/Hero'`

Banner de destaque no topo da Home do site institucional.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | URL da imagem de fundo |
| `tag` | `string` | — | Selo (ex: "Destaque") |
| `title` | `string` | — | Título principal |
| `description` | `string` | — | Texto de apoio |
| `href` | `string` | `'#'` | Link do CTA |
| `linkLabel` | `string` | `'Ler notícia completa'` | Texto do CTA |
| `rightSlot` | `ReactNode` | — | Painel opcional do lado direito do Hero, ex: `QuickLinksCard` |

```tsx
<Hero image="/img/destaque.jpg" tag="Destaque" title="Expansão do Terminal Norte" description="..." href="/noticias/1" />
```

Com painel lateral:
```tsx
<Hero
  image="/img/destaque.jpg"
  tag="Destaque"
  title="Expansão do Terminal Norte"
  description="..."
  rightSlot={<QuickLinksCard links={[...]} />}
/>
```

**Responsivo:** abaixo de 640px o `.hero` reduz sozinho via `@media` no `Hero.module.css` (título, descrição, min-height, remove `heroPanel`) — não precisa de prop nem de classe extra. A Home vive num arquivo único (`site-desktop/index.html`) que serve desktop e mobile; ver "Home única — desktop + mobile responsiva" em `rules.md`.

---

### QuickLinksCard
**Import:** `import { QuickLinksCard } from '../QuickLinksCard/QuickLinksCard'`

Painel flutuante de atalhos — usado no `rightSlot` do Hero da Home.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `links` | `{ icon: LucideIcon; title: string; subtitle?: string; href?: string }[]` | — | Lista de atalhos (obrigatório) |
| `footerLabel` | `string` | `'Acessar todos os links'` | Texto do CTA de rodapé |
| `footerHref` | `string` | `'#'` | Link do CTA de rodapé |

```tsx
<QuickLinksCard
  links={[
    { icon: LifeBuoy, title: 'Central de Suporte', subtitle: 'Abra um chamado', href: '/suporte' },
    { icon: BookOpen, title: 'Manual da Marca EQS', subtitle: 'Diretrizes da identidade', href: '/manual' },
    { icon: ShieldCheck, title: 'Código de Conduta', subtitle: 'Políticas internas', href: '/conduta' },
  ]}
  footerHref="/links-uteis"
/>
```

---

### NewsCard
**Import:** `import { NewsCard } from '../NewsCard/NewsCard'`

Card de conteúdo reaproveitado nas prévias de Notícias e Comunicados.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | Thumbnail (16:9). Sem imagem, mantém o placeholder de fundo |
| `tag` | `string` | — | Categoria/rótulo |
| `tagStatus` | `'success' \| 'info' \| 'warning' \| 'error' \| 'disabled'` | `'info'` | Cor do selo |
| `title` | `string` | — | Título (obrigatório) |
| `excerpt` | `string` | — | Resumo — corta em 2 linhas |
| `date` | `string` | — | Data formatada |
| `href` | `string` | `'#'` | Link do card |

```tsx
<NewsCard image="/img/1.jpg" tag="Institucional" title="..." excerpt="..." date="12 dez 2026" href="/noticias/1" />
```

---

### EventCard
**Import:** `import { EventCard } from '../EventCard/EventCard'`

Card de evento — seção "Próximos Eventos" da Home e página completa de Eventos. Data em destaque como chip sobre a imagem, local com ícone `MapPin`.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | Thumbnail (16:9). Sem imagem, mantém o placeholder de fundo |
| `day` | `string` | — | Dia do evento (obrigatório), ex: `'18'` |
| `month` | `string` | — | Mês abreviado (obrigatório), ex: `'Dez'` |
| `title` | `string` | — | Título (obrigatório) |
| `location` | `string` | — | Local do evento (obrigatório) |
| `href` | `string` | `'#'` | Link do card |

```tsx
<EventCard image="/img/evento.jpg" day="18" month="Dez" title="Confraternização EQS 2026" location="Auditório — Sede SP" href="/eventos/1" />
```

---

### EventHighlightCard
**Import:** `import { EventHighlightCard } from '../EventHighlightCard/EventHighlightCard'`

Card do evento em destaque — topo do painel "Próximos Eventos" da Home.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | Foto de fundo |
| `kicker` | `string` | `'Agenda'` | Selo pequeno sobre a foto |
| `heading` | `string` | `'Próximo Evento'` | Título grande sobre a foto |
| `day` | `string` | — | Dia do evento (obrigatório) |
| `month` | `string` | — | Mês abreviado (obrigatório) |
| `title` | `string` | — | Nome do evento (obrigatório) |
| `meta` | `{ icon: LucideIcon; label: string }[]` | — | Linha de informações (local, horário etc.) |
| `description` | `string` | — | Texto de apoio — corta em 2 linhas |
| `ctaLabel` | `string` | `'Confirmar presença'` | Texto do CTA |
| `href` | `string` | `'#'` | Link do CTA |

```tsx
<EventHighlightCard
  image="/img/evento.jpg"
  day="18"
  month="Dez"
  title="Confraternização EQS 2026"
  meta={[{ icon: MapPin, label: 'Auditório — Sede SP' }, { icon: Clock, label: 'Início às 19h' }]}
  description="Um momento especial para celebrar nossas conquistas..."
  href="/eventos/1"
/>
```

---

### EventListItem
**Import:** `import { EventListItem } from '../EventListItem/EventListItem'`

Linha compacta de evento — lista "Outros eventos" ao lado do `EventHighlightCard`.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `day` | `string` | — | Dia do evento (obrigatório) |
| `month` | `string` | — | Mês abreviado (obrigatório) |
| `title` | `string` | — | Título (obrigatório) |
| `location` | `string` | — | Local do evento (obrigatório) |
| `href` | `string` | `'#'` | Link do item |

```tsx
<EventListItem day="22" month="Dez" title="Workshop de Segurança do Trabalho" location="Sala de Treinamento — Sede RJ" href="/eventos/2" />
```

---

### EventCalendar
**Import:** `import { EventCalendar } from '../EventCalendar/EventCalendar'`

Calendário compacto — coluna lateral do painel "Próximos Eventos" da Home. Estático (protótipo): sem lógica real de troca de mês.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `monthLabel` | `string` | — | Ex: `'Dezembro 2026'` (obrigatório) |
| `weekdays` | `string[]` | `['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']` | Cabeçalho dos dias da semana |
| `days` | `(number \| null)[]` | — | Grade de 7 colunas — `null` para células em branco (obrigatório) |
| `highlightDays` | `number[]` | `[]` | Dias a destacar (com evento) |
| `footerLabel` | `string` | `'Ver todos os eventos'` | Texto do link de rodapé |
| `footerHref` | `string` | `'#'` | Link do rodapé |

```tsx
<EventCalendar
  monthLabel="Dezembro 2026"
  days={[null, null, 1, 2, 3, 4, 5, /* ... */ 31, null, null]}
  highlightDays={[18]}
  footerHref="/eventos"
/>
```

---

### EventInfoCard
**Import:** `import { EventInfoCard } from '../EventInfoCard/EventInfoCard'`

Card lateral com dados essenciais do evento (data, local, público-alvo, inscrições) + CTAs — usado na página de detalhe do evento (`detalhes-evento.html`).

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `rows` | `EventInfoRow[]` | — | Linhas ícone + label + valor(es) (obrigatório) |
| `ctaLabel` | `string` | `'Confirmar presença'` | Texto do CTA primário |
| `href` | `string` | `'#'` | Link do CTA primário |
| `calendarLabel` | `string` | `'Adicionar ao calendário'` | Texto do link secundário |
| `calendarHref` | `string` | `'#'` | Link do link secundário |

**`EventInfoRow`:** `{ icon: LucideIcon; label: string; lines: string[]; strongFirstLine?: boolean }` — `strongFirstLine` destaca a primeira linha (ex: nome do local).

```tsx
<EventInfoCard
  rows={[
    { icon: Calendar, label: 'Data', lines: ['08 de dezembro de 2026', 'Das 09h às 17h'] },
    { icon: MapPin, label: 'Local', lines: ['Auditório — Sede SP', 'Av. das Nações Unidas, 12.901'], strongFirstLine: true },
    { icon: Users, label: 'Público-alvo', lines: ['Equipes de Engenharia, Projetos e Planejamento'] },
    { icon: CheckCircle, label: 'Inscrições', lines: ['Até 03 de dezembro de 2026'] },
  ]}
  href="/eventos/1"
/>
```

**HTML standalone — classes:** `.eventInfoCard`, `.eventInfoRow`, `.eventInfoIcon`, `.eventInfoText`, `.eventInfoLabel`, `.eventInfoValue`, `.eventInfoValueStrong`, `.eventInfoActions`, `.eventInfoCta`, `.eventInfoCalendarLink` (ver exemplo completo em `rules.md`).

---

### EventScheduleItem
**Import:** `import { EventScheduleItem } from '../EventScheduleItem/EventScheduleItem'`

Item da lista "Programação" na página de detalhe do evento — ponto + conector vertical, horário e título na mesma linha, descrição abaixo. Mesma família visual do `Timeline`, mas sem estados done/active/pending (sempre cor da marca).

| Prop | Tipo | Descrição |
|------|------|-----------|
| `time` | `string` | Horário (obrigatório) |
| `title` | `string` | Título do item da programação (obrigatório) |
| `description` | `string` | Texto de apoio (opcional) |

```tsx
<EventScheduleItem time="09h00" title="Abertura" description="Boas-vindas e apresentação dos objetivos do workshop." />
```

**Container:** envolver vários num elemento com classe `.eventScheduleList` (`shared/page.css`) — esconde automaticamente o conector e o padding-bottom do último item.

---

### DocumentListItem
**Import:** `import { DocumentListItem } from '../DocumentListItem/DocumentListItem'`

Item de lista de arquivo para download — usado na seção "Materiais e documentos" da página de detalhe do evento.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `name` | `string` | — | Nome do arquivo (obrigatório) |
| `meta` | `string` | — | Ex: `'PDF · 8.4 MB'` (obrigatório) |
| `href` | `string` | `'#'` | Link de download |

```tsx
<DocumentListItem name="Apresentação BIM 4.0" meta="PDF · 8.4 MB" href="/docs/apresentacao.pdf" />
```

**Container:** envolver vários num elemento com classe `.docList` (`shared/page.css`).

---

### EventGalleryItem
**Import:** `import { EventGalleryItem } from '../EventGalleryItem/EventGalleryItem'`

Miniatura clicável de foto (4:3, zoom leve no hover) — seção "Fotos do evento" da página de detalhe do evento e da página `evento-fotos.html`. Clique abre o `Lightbox`, com navegação entre as demais fotos.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `src` | `string` | — | Miniatura exibida na grade (obrigatório) |
| `alt` | `string` | `''` | Texto alternativo |
| `onClick` | `() => void` | — | Abre o `Lightbox` nesta foto |

```tsx
<EventGalleryItem src="/img/evento-1.jpg" onClick={() => openLightbox(0)} />
```

**Container:** envolver vários num elemento com classe `.eventGalleryGrid` (`shared/page.css`) — grid de 4 colunas no desktop, 2 no mobile.

---

### Lightbox
**Import:** `import { Lightbox } from '../Lightbox/Lightbox'`

Visualizador de foto em tela cheia com navegação entre imagens (setas na tela + teclado). Aberto ao clicar num `EventGalleryItem`.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `images` | `string[]` | Lista de URLs das fotos (obrigatório) |
| `index` | `number` | Índice da foto atual (obrigatório) |
| `onClose` | `() => void` | Fecha o Lightbox (obrigatório) |
| `onPrev` | `() => void` | Vai pra foto anterior, com wraparound (obrigatório) |
| `onNext` | `() => void` | Vai pra próxima foto, com wraparound (obrigatório) |

```tsx
const [index, setIndex] = useState(0);
const [open, setOpen] = useState(false);

{open && (
  <Lightbox
    images={images}
    index={index}
    onClose={() => setOpen(false)}
    onPrev={() => setIndex((i) => (i - 1 + images.length) % images.length)}
    onNext={() => setIndex((i) => (i + 1) % images.length)}
  />
)}
```

**Em telas HTML standalone:** ver padrão completo (markup + JS) em `rules.md`, seção "Lightbox" — inclui o carregamento em lotes usado em `evento-fotos.html`.

---

### CommunicationListItem
**Import:** `import { CommunicationListItem } from '../CommunicationListItem/CommunicationListItem'`

Linha de lista vertical — usada na seção Comunicados da Home.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `LucideIcon` | — | Ícone do comunicado (obrigatório) |
| `title` | `string` | — | Título (obrigatório) |
| `description` | `string` | — | Resumo — corta em 1 linha |
| `date` | `string` | — | Data formatada |
| `href` | `string` | `'#'` | Link do item |

```tsx
<CommunicationListItem icon={HeartPulse} title="..." description="..." date="10 de dezembro de 2026" href="/comunicados/1" />
```

Combine vários dentro de um container com a classe `.commsPanel` (`shared/page.css`) para o efeito de card com divisórias entre os itens.

---

### StatsBanner
**Import:** `import { StatsBanner } from '../StatsBanner/StatsBanner'`

Banner escuro full-bleed com números de destaque — seção Sobre da Home. Igual ao `Hero`, renderiza direto em `<main>`, fora de `.siteSection`. Altura via `padding: var(--spacing-3xl) 0`, não `min-height`. Título/descrição/CTA ficam numa linha (`.statsBannerTop`); os números (`stats`) ficam numa linha separada abaixo, ocupando 100% da largura.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | Foto de fundo (opcional — sem ela, cai no fundo escuro sólido) |
| `kicker` | `string` | `'Institucional'` | Selo pequeno |
| `title` | `string` | — | Título (obrigatório) |
| `description` | `string` | — | Texto de apoio |
| `stats` | `{ icon: LucideIcon; value: string; label: string }[]` | — | Números de destaque. **Opcional** — sem `stats`, renderiza só kicker/título/descrição/CTA (usado no banner final da página Sobre, que não tem números) |
| `ctaLabel` | `string` | `'Saiba mais'` | Texto do CTA |
| `href` | `string` | `'#'` | Link do CTA |

```tsx
<StatsBanner
  title="Sobre a EQS"
  description="A EQS Engenharia atua há mais de 20 anos..."
  stats={[
    { icon: Clock, value: '20+', label: 'Anos de história' },
    { icon: Users, value: '350+', label: 'Colaboradores' },
    { icon: Map, value: '18', label: 'Estados atendidos' },
    { icon: ShieldCheck, value: '7', label: 'Escritórios' },
  ]}
  ctaLabel="Saiba mais sobre a EQS"
  href="/sobre"
/>
```

---

### AboutHero
**Import:** `import { AboutHero } from '../AboutHero/AboutHero'`

Bloco de topo da página Sobre. Texto+CTA à esquerda, foto à direita com um card de estatísticas flutuando sobre a borda inferior da imagem. Diferente do `Hero` (full-bleed, texto sobre a foto).

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `kicker` | `string` | — | Selo pequeno (obrigatório) |
| `title` | `string` | — | Título grande (obrigatório) |
| `description` | `string` | — | Texto de apoio (obrigatório) |
| `ctaLabel` | `string` | — | Texto do CTA (opcional — sem ele, não renderiza o botão) |
| `href` | `string` | `'#'` | Link do CTA |
| `image` | `string` | — | Foto à direita (obrigatório) |
| `stats` | `{ icon: LucideIcon; value: string; label: string }[]` | — | Estatísticas do card flutuante (obrigatório) |

```tsx
<AboutHero
  kicker="Sobre a EQS"
  title="Construindo o futuro com engenharia, inovação e compromisso"
  description="Há mais de 20 anos, a EQS Engenharia entrega soluções inteligentes..."
  ctaLabel="Conheça nossa história"
  image="/img/bridge.jpg"
  stats={[
    { icon: Clock, value: '20+', label: 'Anos de história' },
    { icon: Users, value: '350+', label: 'Colaboradores' },
    { icon: MapPin, value: '18', label: 'Estados atendidos' },
    { icon: Building2, value: '7', label: 'Escritórios' },
  ]}
/>
```

---

### ContentSplit
**Import:** `import { ContentSplit } from '../ContentSplit/ContentSplit'`

Bloco genérico imagem + texto lado a lado — reaproveitável em qualquer página institucional (usado em "Nossa história" na página Sobre).

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `image` | `string` | — | Imagem (obrigatório) |
| `imagePosition` | `'left' \| 'right'` | `'left'` | Lado da imagem — inverte via `order`, sem duplicar markup |
| `kicker` | `string` | — | Selo pequeno (obrigatório) |
| `title` | `string` | — | Título (obrigatório) |
| `paragraphs` | `string[]` | — | Um `<p>` por item do array (obrigatório) |
| `ctaLabel` | `string` | — | Texto do CTA (opcional) |
| `href` | `string` | `'#'` | Link do CTA |

```tsx
<ContentSplit
  image="/img/historia.jpg"
  kicker="Nossa história"
  title="De um propósito sólido para grandes conquistas"
  paragraphs={[
    'A EQS nasceu com o propósito de transformar desafios em oportunidades...',
    'Ao longo dessas duas décadas, evoluímos constantemente...',
  ]}
  ctaLabel="Linha do tempo"
/>
```

---

### ValueCard
**Import:** `import { ValueCard } from '../ValueCard/ValueCard'`

Ícone circular (outline) + título + descrição, centralizado — seção "Nossos valores" da página Sobre.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `icon` | `LucideIcon` | Ícone (obrigatório) |
| `title` | `string` | Título (obrigatório) |
| `description` | `string` | Texto de apoio (obrigatório) |

```tsx
<ValueCard icon={ShieldCheck} title="Segurança" description="Cuidamos das pessoas acima de tudo, sempre." />
```

---

### LeadershipCard
**Import:** `import { LeadershipCard } from '../LeadershipCard/LeadershipCard'`

Foto + nome + cargo + link do LinkedIn — seção "Liderança" da página Sobre. Compõe internamente `Card.module.css`. O ícone do LinkedIn não existe mais no `lucide-react` (ícones de marca foram removidos da lib) — usa o texto `"in"` estilizado dentro de um círculo outline.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `photo` | `string` | — | Foto (obrigatório) |
| `name` | `string` | — | Nome (obrigatório) |
| `role` | `string` | — | Cargo (obrigatório) |
| `linkedinHref` | `string` | — | Link do LinkedIn (opcional — sem ele, não renderiza o botão) |

```tsx
<LeadershipCard photo="/img/marcos.jpg" name="Marcos Aurélio" role="Diretor Presidente" linkedinHref="https://linkedin.com/in/..." />
```

---

### SearchResultItem
**Import:** `import { SearchResultItem } from '../SearchResultItem/SearchResultItem'`

Linha genérica de resultado de busca — página de Pesquisa. O slot `leading` é livre (`ReactNode`), permitindo reaproveitar a mesma linha para notícias/eventos (miniatura + date-badge) e comunicados/departamentos/links (bolinha vermelha), evitando 5 componentes quase idênticos.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `leading` | `ReactNode` | Miniatura, date-badge ou bolinha — slot livre à esquerda (obrigatório) |
| `title` | `ReactNode` | Título (obrigatório) |
| `description` | `string` | Texto de apoio, corta em 1 linha (opcional) |
| `meta` | `ReactNode` | Conteúdo à direita — data, contagem, local etc. (opcional) |
| `showChevron` | `boolean` | Exibe seta à direita (opcional) |
| `href` | `string` | Link do item (padrão `'#'`) |

```tsx
<SearchResultItem
  leading={<img className={styles.searchResultItemImage} src="..." alt="" />}
  title="Workshop BIM 4.0 reúne equipe técnica..."
  description="O evento apresentou as novas ferramentas..."
  meta={<span>08 dez 2026</span>}
/>

{/* Comunicados / Setores / Links Úteis — leading em bolinha vermelha */}
<SearchResultItem
  leading={<span className={styles.searchResultItemDot} />}
  title="Inscrições abertas para o Workshop de Liderança 2027"
  description="As inscrições já estão abertas..."
/>
```

**Container:** use `.commsPanel` (`shared/page.css`) para agrupar vários `SearchResultItem` num painel branco com bordas entre os itens.

---

### SiteHeaderMobile
**Import:** `import { SiteHeaderMobile } from '../SiteHeaderMobile/SiteHeaderMobile'`

Header do site institucional em telas mobile. 3 colunas: busca · logo · hambúrguer. Tocar na busca troca a linha por um input + botão fechar (estado interno `searchOpen`). O menu do hambúrguer é responsabilidade de quem usa o componente — reaproveita `Sheet` (ver exemplo abaixo), não é renderizado pelo próprio `SiteHeaderMobile`.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `onMenuOpen` | `() => void` | Chamado ao tocar no ícone de hambúrguer |
| `onSearch` | `(value: string) => void` | Chamado a cada mudança no input de busca |

```tsx
const [menuOpen, setMenuOpen] = useState(false);

<SiteHeaderMobile onMenuOpen={() => setMenuOpen(true)} onSearch={handleSearch} />

<Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" footer={<FooterActions />}>
  <nav className={styles.siteHeaderMobileNavList}>
    <a className={`${styles.siteHeaderMobileNavItem} ${styles.siteHeaderMobileNavItemActive}`} href="/">Home</a>
    <a className={styles.siteHeaderMobileNavItem} href="/noticias">Notícias</a>
    {/* ...demais itens */}
  </nav>
</Sheet>
```

Classes do conteúdo do menu (usadas dentro do `Sheet`): `.siteHeaderMobileMenuPanel` (largura — combinar com `.sheetPanel`), `.siteHeaderMobileNavList`, `.siteHeaderMobileNavItem`, `.siteHeaderMobileNavItemActive`, `.siteHeaderMobileFooterList`, `.siteHeaderMobileFooterItem`, `.siteHeaderMobileFooterItemDestructive`

**Nas telas HTML estáticas do site-desktop:** este header convive com o `SiteHeader` desktop e o drawer — um leva `.hideMobile`, o outro `.hideDesktop` (ver `.hideMobile`/`.hideDesktop` em `rules.md`), e só um aparece por vez conforme a largura (breakpoint 640px). **Nenhuma página copia esse HTML manualmente** — os três blocos são injetados por `shared/site-header.js` (ver seção `shared/site-header.js — header compartilhado` em `rules.md`); a página só declara `<div id="site-header-root"></div>` + `data-page="<id>"` no `<body>`.

---

### Footer
**Import:** `import { Footer } from '../Footer/Footer'`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `columns` | `{ title: string; links: { label: string; href: string }[] }[]` | Colunas de links — tem default com Portal/Institucional |

```tsx
<Footer />
```

---

### DepartmentCard
**Import:** `import { DepartmentCard } from '../DepartmentCard/DepartmentCard'`

Card de área/departamento — prévia compacta usada só na Home (avatar stack com "+N"). Para a página completa `setores.html`, ver `DepartmentDetailCard` (lista todos os colaboradores, sem corte). Compõe internamente `Card.module.css` (`.card`, superfície sólida) + `Avatar` para o gestor e a pilha de colaboradores.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `LucideIcon` | — | Ícone do departamento |
| `name` | `string` | — | Nome do departamento |
| `manager` | `{ name: string; initials: string; avatarUrl?: string }` | — | Gestor responsável |
| `collaborators` | `DepartmentPerson[]` | — | Lista de colaboradores |
| `maxAvatars` | `number` | `4` | Quantos avatares mostrar antes do "+N" |
| `href` | `string` | `'#'` | Link do card |

```tsx
<DepartmentCard
  icon={Megaphone}
  name="Marketing"
  manager={{ name: 'Camila Rocha', initials: 'CR' }}
  collaborators={[
    { name: 'João Silva', initials: 'JS' },
    { name: 'Marina Costa', initials: 'MC' },
  ]}
  href="/setores"
/>
```

---

### DepartmentDetailCard
**Import:** `import { DepartmentDetailCard } from '../DepartmentDetailCard/DepartmentDetailCard'`

Card completo de área/departamento — usado na página `setores.html`. Diferente do `DepartmentCard`: lista **todos** os colaboradores (nunca corta com "ver todos") com e-mail de cada, e inclui um texto de resumo da área. Compõe internamente `Card.module.css` (`.card`) + `Avatar`.

| Prop | Tipo | Descrição |
|------|------|-----------|
| `icon` | `LucideIcon` | Ícone do departamento (obrigatório) |
| `name` | `string` | Nome do departamento (obrigatório) |
| `manager` | `DepartmentContact` | Gestor responsável (obrigatório) |
| `collaborators` | `DepartmentContact[]` | Lista completa de colaboradores — sem limite (obrigatório) |
| `description` | `string` | Texto de resumo da área (obrigatório) |

**`DepartmentContact`:** `{ name: string; initials: string; email: string; avatarUrl?: string }`

```tsx
<DepartmentDetailCard
  icon={Megaphone}
  name="Marketing"
  manager={{ name: 'Camila Rocha', initials: 'CR', email: 'camila.rocha@eqs.com.br' }}
  collaborators={[
    { name: 'João Pereira', initials: 'JP', email: 'joao.pereira@eqs.com.br' },
    { name: 'Mariana Santos', initials: 'MS', email: 'mariana.santos@eqs.com.br' },
  ]}
  description="Responsável por fortalecer a marca EQS..."
/>
```

---

### LinkCard
**Import:** `import { LinkCard } from '../LinkCard/LinkCard'`

Card simples de atalho — ícone + título + descrição, usado na seção Links Úteis da Home. Mesma família visual do `DepartmentCard` (compõe com `Card.module.css`, mesmo ícone 40×40), só que sem gestor/colaboradores.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `icon` | `LucideIcon` | — | Ícone do atalho (obrigatório) |
| `title` | `string` | — | Título (obrigatório) |
| `description` | `string` | — | Texto de apoio |
| `href` | `string` | `'#'` | Link do card |

```tsx
<LinkCard icon={BookOpen} title="Manual da Marca EQS" description="Diretrizes de identidade visual e uso da marca." href="/links-uteis" />
```

---

### DocumentCard
**Import:** `import { DocumentCard } from '../DocumentCard/DocumentCard'`

Card de documento para download — página `documentos.html`. Título/descrição + badge de extensão/tamanho/data à esquerda, divisor, ícone + rótulo "Fazer download" (cor da marca) à direita. Diferente do `DocumentListItem` (linha única, "Materiais e documentos" da página de evento) — este é um card de grid maior, com mais metadados.

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `title` | `string` | — | Título do documento (obrigatório) |
| `description` | `string` | — | Texto de apoio |
| `fileType` | `string` | — | Ex: `'PDF'` — exibido em maiúsculas num badge outline (obrigatório) |
| `fileSize` | `string` | — | Ex: `'8.4 MB'` (obrigatório) |
| `updatedAt` | `string` | — | Ex: `'12/05/2025'` (obrigatório) |
| `href` | `string` | `'#'` | Link de download |

```tsx
<DocumentCard
  title="Manual da Marca EQS"
  description="Diretrizes de identidade visual e uso da marca."
  fileType="PDF"
  fileSize="8.4 MB"
  updatedAt="12/05/2025"
/>
```

**Container:** `.siteGrid2` (`shared/page.css`) — grid de 2 colunas no desktop, 1 no mobile.

---


## Telas HTML standalone (painel-adm, site-desktop, site-mobile)

Telas fora do Storybook são arquivos `.html` servidos via HTTP server. **Regra de CSS:**

1. **Nunca embutir CSS de tokens ou componentes inline** — linkar os arquivos do Storybook diretamente
2. `tokens.css` e os `.module.css` são linkados por caminho relativo — o servidor HTTP resolve
3. CSS `<style>` inline apenas para layout/estilo exclusivo daquela tela

```html
<link rel="stylesheet" href="../componentes/tokens/tokens.css" />
<link rel="stylesheet" href="../componentes/Button/Button.module.css" />
<!-- um link por componente usado na tela -->
```

Mudou o estilo de um componente → todas as telas atualizam automaticamente.

---

## Convenções do projeto

- **CSS Modules** para estilo de componentes (`.module.css` por componente)
- **Importações relativas** entre componentes: `'../ComponentName/ComponentName'`
- **Todos os ícones** via Lucide React — nunca SVG inline, nunca outro lib
- **Componentes são funções nomeadas** (`export function Button...`), não default exports
- **Tipos exportados** junto com o componente no mesmo arquivo
- **Stories** em `ComponentName.stories.tsx` ao lado do componente
- **Novas telas** como stories em `storybook/src/stories/NomeDaTela.stories.tsx`
