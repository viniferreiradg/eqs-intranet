# Estrutura v1 — Althus Web Protótipo

> Documentação do estado atual do protótipo HTML. Base para comparação com a especificação v2.
> Data de extração: junho 2026.

---

## Visão Geral

O protótipo contém dois dashboards web distintos:

| Atributo | Dashboard Rede | Dashboard ADM |
|---|---|---|
| Pasta | `dashboard-rede/` | `dashboard-adm/` |
| Tema | Escuro (`data-theme="dark"`) | Claro (`data-theme="light"`) |
| Público | Operadores de rede (credenciados) | Equipe interna Althus |
| Total de páginas | 38 | 29 |
| Design system | `storybook-desktop/src/` | `storybook-desktop/src/` |
| Layout base | `shared/page.css` + `shared/sidebar.js` | `shared/page.css` + `dashboard-adm/shared/sidebar.js` |

### Estrutura de menus

**Dashboard Rede** — itens do sidebar:
1. Dashboard
2. Localidades
3. Carregadores
4. Tarifas
5. Extrato
6. Cupons
7. Logs de erros
8. Usuários
9. Reservas
10. Configurações (ícone de engrenagem)

**Dashboard ADM** — itens do sidebar:
1. Dashboard
2. Credenciados (inclui Distribuidores como sub-item/tab)
3. Catálogo de Veículos (Veículos / Marcas / Conectores tabs)
4. Extrato
5. Logs
6. Usuários
7. Configurações (ícone de engrenagem)

---

## Dashboard Rede — Inventário de Páginas

### Autenticação

#### `jornada-3-1-login.html` — Login
- Tema: light (`data-theme="light"`)
- Fundo: vídeo em loop com `opacity: 0.2`
- Componentes: Logo, AuthCard, Input (e-mail com ícone mail, senha com toggle show/hide), Button primary (full-width)
- Validação inline: e-mail com regex, senha obrigatória; alert error `feedback-error`
- Link "Esqueci minha senha" (sem destino implementado)
- Submit: desabilita botão → "Entrando…" → redireciona para `dashboard.html` após 1,2 s
- Breadcrumb: não se aplica

#### `jornada-3-2-criar-senha.html` — Criar senha (fluxo de convite)
- Tema: light
- Fundo: vídeo em loop
- E-mail pré-preenchido e desabilitado (lido de `?email=` na URL; fallback `admin@rededemo.com.br`)
- Campos: Nova senha (com PasswordStrength 4 barras: Fraca/Média/Boa/Forte) + Confirmar senha
- Componente PasswordRequirements: 5 itens (≥8 chars, maiúscula, minúscula, número, símbolo)
- Validação: comprimento mínimo + conferência de senhas; global `feedback-error`
- Submit: redireciona para `fluxo-01-login-02-login.html` (link hard-coded)
- Rodapé: links Termos de Uso e Política de Privacidade (sem destino)

---

### Dashboard Principal

#### `jornada-2-8-dashboard.html` — Dashboard
- Tema: dark; `data-page="dashboard"`
- KPIs (3 cards): Total carregadores habilitados (142), Recargas no período (1.847), Faturamento total (R$ 28.430)
- Filtro de período: dropdown (7/30/90/365 dias)
- Gráfico de linhas: ApexCharts com 2 séries (Recargas + Faturamento)
- Gráfico donut: SVG nativo — status Ativo 98 / Inativo 24 / Manutenção 12 / Instalando 8 / Total 142
- Sheet de notificações: 5 itens (ex.: "Carregador ALT-003 offline", "Nova sessão iniciada")
- Sidebar com toggle de tema (dark/light)

#### `jornada-2-8-dashboard-loading.html` — Dashboard Loading
- Skeleton de 5 cards KPI + skeleton de gráfico de linhas + skeleton de donut
- Auto-redireciona para `jornada-2-8-dashboard.html` após 3 s (fade-out)
- Não possui interação; é o estado de carregamento inicial

---

### Módulo: Localidades

#### `jornada-2-1-1-listar-localidades.html` — Lista de Localidades
- Toolbar: busca por texto + filtro de Status (dropdown)
- Tabela: Nome (sortable), Endereço, Cidade/UF, Carregadores (link), Status (badge), Ações (pencil→editar)
- Paginação: 1–7 de 24
- Botão "Nova localidade" → `jornada-2-1-2-cadastrar-localidade.html`

#### `jornada-2-1-2-cadastrar-localidade.html` — Cadastrar Localidade
- Breadcrumb: Localidades > Nova localidade
- Seções: Identificação (Nome, Descrição opcional), Endereço (CEP, Logradouro, Número, Complemento, Cidade, Estado, Bairro), Configurações (Status dropdown), Coordenadas (Latitude, Longitude — opcionais)
- Feedback success após salvar; redireciona para lista

#### `jornada-2-1-3-editar-localidade.html` — Editar Localidade
- Breadcrumb: Localidades > Shopping Iguatemi
- Formulário pré-preenchido com Shopping Iguatemi (mesma estrutura do cadastro)
- Feedback success; redireciona para lista

---

### Módulo: Carregadores

#### `jornada-2-7-1-listar-carregadores.html` — Lista de Carregadores
- Toolbar: busca + filtro Localidade (dropdown) + filtro Status (dropdown)
- Tabela: Serial (mono), Localidade, Modelo, Tipo (badge AC/DC), Potência (sortable), Status, Ações (pencil→editar)
- Paginação: 1–7 de 42
- Botão "Novo carregador" → `jornada-2-7-4-cadastrar-dispositivo.html`
- Linha clicável → `jornada-2-7-2-visualizar-dispositivo.html`

#### `jornada-2-7-2-visualizar-dispositivo.html` — Detalhe do Carregador (ALT-001)
- Breadcrumb: Carregadores > ALT-001
- Badge de status + botão "Editar" primary
- 3 cards de detalhe:
  - Informações do dispositivo (Serial, Modelo, Tipo, Potência, Localidade)
  - Conectores (badges CCS2, CHAdeMO)
  - Status operacional (status atual + fonte "OCPP automático")

#### `jornada-2-7-3-editar-dispositivo.html` — Editar Carregador
- Breadcrumb: Carregadores > ALT-001 > Editar
- Seções: Identificação, Especificações técnicas, Tipos de conector (chip group: CCS2/CCS1/Tipo 2/CHAdeMO/GB·T), Status
- Formulário pré-preenchido; feedback success → redireciona para detalhe

#### `jornada-2-7-4-cadastrar-dispositivo.html` — Novo Carregador
- Breadcrumb: Carregadores > Novo carregador
- Mesma estrutura do editar; Status padrão: Instalando
- Feedback success; redireciona para lista

---

### Módulo: Tarifas

#### `jornada-2-2-tarifas.html` / `jornada-2-2-1-opcoes-de-tarifas.html` — Tarifas (Tab 1: Opções)
- 2 tabs: Opções de tarifas (ativa) | Tarifas personalizadas
- Tab 1 — Tarifa de Recarga:
  - Campo R$/kWh
  - Turnos: Dia (6h–18h), Noite (18h–00h), Madrugada (00h–6h) com valor por turno
  - Taxa de Ociosidade: toggle on/off + valor R$/min
  - Taxa de Reserva: toggle on/off + valor R$/reserva
- Botão "Salvar configurações"

#### `jornada-2-2-2-tarifas-personalizadas.html` — Tarifas (Tab 2: Personalizadas)
- Tabela: Nome, Carregador, Localidade, Valor, Status, Ações (eye→detalhe, pencil→editar, trash→remover)
- Botão "Nova tarifa" → `jornada-2-3-nova-tarifa-personalizada.html`

#### `jornada-2-3-nova-tarifa-personalizada.html` — Nova Tarifa Personalizada
- Breadcrumb: Tarifas > Nova tarifa personalizada
- Seções: Identificação (Nome, Descrição), Aplicação (MultiSelect de carregadores), Valores por turno (Dia/Noite/Madrugada)
- Feedback success; redireciona para lista de personalizadas

---

### Módulo: Extrato

#### `jornada-2-3-1-extrato.html` — Extrato de Transações
- Barra de resumo: Transações 147, kWh 2.841, Receita bruta R$ 7.103, Descontos R$ 612, Receita líquida R$ 6.491
- Toolbar: DatePicker range + filtro Localidade + filtro Carregador + botão "Exportar CSV"
- Tabela: Data/hora, Usuário (CPF mascarado), Carregador, kWh, Cobrado, Desconto, Pago, Ações (eye→detalhe, download)
- Paginação presente

#### `jornada-2-3-2-detalhe-abastecimento.html` — Detalhe da Transação (TXN-20260522-1430)
- Breadcrumb: Extrato > TXN-20260522-1430
- 4 cards:
  - Sessão: ID, Início, Fim, Duração 42 min, Protocolo OCPP 1.6
  - Carregador/localidade: serial, modelo, endereço
  - Cobrança: kWh, tarifa R$/kWh, valor bruto, cupom aplicado, desconto, valor pago
  - Usuário: CPF mascarado, plataforma (iOS/Android/Web)
- Botão "Voltar para Extrato" ghost

---

### Módulo: Cupons

#### `jornada-2-4-1-listar-cupons.html` — Lista de Cupons
- Toolbar: busca + filtro Tipo + filtro Status
- Tabela: Código (mono), Tipo (badge: Fixo/Percentual/Frete grátis), Desconto, Validade, Usos (usados/máx), Status, Ações (eye→detalhe, pencil→editar)
- Botão "Novo cupom" → cadastrar

#### `jornada-2-4-2-cadastrar-cupom.html` — Cadastrar Cupom
- Seções: Identificação (Código, Tipo dropdown, Valor, Limite máximo — aparece só para Tipo=Percentual), Validade (Data início, Data fim), Público-alvo (opcional: carregadores, localidades, usuários via MultiSelect)
- Feedback success; redireciona para lista

#### `jornada-2-4-3-visualizar-cupom.html` — Detalhe do Cupom (PLT-BEMVINDO)
- Breadcrumb: Cupons > PLT-BEMVINDO
- 4 cards: Configurações do cupom, Vigência e uso (barra de progresso de usos), Aplicação (quais carregadores), Público-alvo
- Botões "Editar" + "Desativar"

#### `jornada-2-4-4-editar-cupom.html` — Editar Cupom
- Mesmo formulário do cadastro, pré-preenchido com PLT-BEMVINDO
- Feedback success; redireciona para detalhe

---

### Módulo: Logs

#### `jornada-2-5-1-logs-de-erros.html` — Logs de Erros
- 5 KPI cards: Total erros, Críticos, Altos, Médios, Resolvidos
- Toolbar: DatePicker range + filtro Severidade + filtro Localidade + filtro Carregador
- Tabela: Data/hora, Carregador (mono), Localidade, Código OCPP (ex: ConnectorLockFailure, HighTemperature, EVCommunicationError), Descrição, Severidade (badge: Crítico/Alto/Médio/Baixo), Status (Aberto/Resolvido)
- Paginação

---

### Módulo: Usuários

#### `jornada-2-6-1-lista-usuarios.html` — Lista de Usuários
- Header: título + botão "Perfis" (secondary) → gestão de perfis + botão "Novo usuário" (primary)
- Toolbar: busca por nome/e-mail + filtro Perfil (Administrador/Financeiro/Operacional) + filtro Status
- Tabela: Nome (com avatar iniciais), E-mail, Perfil (badge), Último acesso, Status, Ações (pencil→editar)

#### `jornada-2-6-2-novo-usuario.html` — Novo Usuário
- Breadcrumb: Usuários > Novo usuário
- Seções: Dados pessoais (Nome, E-mail), Acesso (Perfil dropdown, Status dropdown)
- Feedback success: "E-mail com convite enviado ao usuário"; redireciona para lista

#### `jornada-2-6-3-alterar-usuario.html` — Alterar Usuário (Carlos Mendes)
- Breadcrumb: Usuários > Carlos Mendes
- Seções: Dados pessoais (Nome, E-mail pré-preenchidos), Acesso (Perfil, Status pré-selecionados), Informações do sistema read-only (Criado em, Último acesso, Perfil atual)
- Feedback success; redireciona para lista

#### `jornada-2-6-4-gestao-de-perfis.html` — Gestão de Perfis
- Header: título + botões "Usuários" (secondary) + "Novo perfil" (primary)
- 2 tabs: Lista de Perfis (ativa) | Permissões
- Tabela: Nome do perfil, Descrição, Usuários (count), Status, Ações (pencil→editar)
- 3 perfis: Administrador, Financeiro, Operacional

#### `jornada-2-6-5-novo-perfil.html` — Novo Perfil
- Breadcrumb: Gestão de Perfis > Novo perfil
- Campos: Nome do perfil, Status dropdown, Descrição (textarea)
- Feedback success; redireciona para gestão de perfis

#### `jornada-2-6-6-perfil.html` — Editar Perfil (Administrador)
- Breadcrumb: Gestão de Perfis > Administrador
- Mesmos campos do novo perfil, pré-preenchidos
- Informações do sistema read-only: Criado em, Usuários com este perfil
- Feedback success; redireciona para gestão de perfis

#### `jornada-2-6-7-permissoes.html` — Permissões
- Tab ativa: Permissões (tab nav compartilhado com gestão de perfis)
- Matriz checkbox: 3 perfis × 8 módulos
  - Administrador: todos marcados
  - Financeiro: Dashboard + Extrato
  - Operacional: Dashboard + Localidades + Carregadores + Tarifas + Logs
- Botão "Salvar permissões" → feedback success

---

### Módulo: Reservas

#### `jornada-2-9-1-lista-reservas.html` — Lista de Reservas
- Somente leitura (sem botão "Nova reserva")
- Toolbar: DatePicker range + filtro Localidade + filtro Status
- Tabela: Data/Hora, Usuário, Localidade/Carregador (stacked), Duração, Status (Ativa/Concluída/Cancelada/Não compareceu), Valor pago, Taxa cancelamento, Ações (eye→detalhe)

#### `jornada-2-9-2-detalhe-reserva.html` — Detalhe da Reserva (RSV-2026-0847)
- Breadcrumb: Reservas > RSV-2026-0847
- Layout 2 colunas:
  - Esquerda: Informações da reserva (ID, Data, Início janela 16:45, Término 17:00, Duração 15 min, Confirmada em, Status: Ativa), Local e equipamento (Localidade, Endereço, Carregador, Conector), Timeline com 4 steps (Confirmada, Notificação 1h antes, Janela iniciada [ativo], Expiração [pendente])
  - Direita: Card usuário (avatar, nome, plataforma iOS, membro desde), Card financeiro (Taxa reserva R$ 5,00, Taxa cancelamento —, Total R$ 5,00)
- Botão "Voltar para Reservas" ghost

---

### Módulo: Configurações

> Atenção: a maioria dos tabs apontam para páginas não implementadas.

#### `jornada-2-10-1-minha-conta.html` — Minha Conta
- 7 tabs no nav: Minha conta (ativa), Perfil da empresa, Temas, Notificações, Termos de uso, Sobre a Althus, Ajuda/Suporte
- Seções: Foto de perfil (avatar + botões Remover/Alterar), Informações pessoais (Nome, E-mail disabled com helper "não pode ser alterado", Cargo, Telefone), Alterar senha (Senha atual, Nova senha, Confirmar — todos com show/hide)
- Botão "Salvar alterações"

#### `jornada-2-10-3-notificacoes.html` — Notificações
- Tab ativa: Notificações
- 4 categorias com chip group (E-mail / Sistema checkboxes) por tipo:
  - Reservas: Confirmação, Cancelamento, Início da janela
  - Carregadores: Offline, Falha na sessão
  - Financeiro: Novo pagamento, Relatório mensal
  - Sistema: Atualizações, Alertas de segurança

#### `jornada-2-10-7-temas.html` — Temas
- Tab ativa: Temas
- Sistema de cores: 2 option cards (Tema escuro — selecionado, Tema claro)
- Tema visual: 2 option cards (Glass — selecionado, Minimalista)
- Persiste em `localStorage` sob chave `althus-theme`; atualiza botão de toggle no sidebar

**Páginas NÃO implementadas** (links existem nas tabs mas arquivos ausentes):
- `jornada-2-10-2-alterar-senha.html`
- `jornada-2-10-4-sobre.html` (Perfil da empresa)
- `jornada-2-10-5-central-de-ajuda.html` (Ajuda/Suporte)
- `jornada-2-10-6-politicas.html` (Termos de uso)

---

## Dashboard ADM — Inventário de Páginas

### Autenticação

#### `jornada-3-1-login.html` — Login ADM
- Estrutura idêntica ao Login da Rede
- Subtítulo diferente: "Acesse o painel de administração Althus"
- Redireciona para `jornada-3-4-dashboard.html`

---

### Dashboard Principal

#### `jornada-3-4-dashboard.html` — Dashboard ADM
- Tema: light; `data-page="dashboard"`
- 5 KPIs (grid 5 colunas): Credenciados ativos (48, +3), Carregadores na rede (318, +14), Recargas no período (12.847, +18%), Faturamento credenciados (R$ 143.200, +9%), Receita Althus taxa (R$ 14.320, +9%)
- Filtro de período dropdown
- Gráfico de linhas: ApexCharts — séries Recargas + Receita Althus
- Gráfico donut: SVG nativo — Ativo 248 / Inativo 38 / Manutenção 20 / Instalando 12 / Total 318
- Sheet de notificações: 5 itens ADM-específicos (ex.: "Novo credenciado aguardando aprovação")

#### `jornada-3-4-dashboard-loading.html` — Dashboard Loading ADM
- Skeleton 5 KPI cards + skeleton gráficos
- Auto-redireciona para dashboard após 3 s

---

### Módulo: Credenciados

#### `jornada-3-6-1-credenciados.html` — Lista de Credenciados
- Toolbar: busca por razão social/CNPJ + filtro Distribuidor + filtro Status
- Tabela: Razão social (com logo avatar), CNPJ, Responsável, Distribuidor, Status (Ativo/Inativo/Pendente), Ações (eye→detalhe, pencil→editar)
- Paginação: 1–8 de 48
- Botão "Novo credenciado" → cadastrar

#### `jornada-3-6-1b-detalhe-credenciado.html` — Detalhe do Credenciado (Rede Flex Eletropostos)
- Breadcrumb: Credenciados > Rede Flex Eletropostos
- Badge: Ativo; 2 botões header: "Gerar link de acesso" (secondary, copia link com feedback animado) + "Editar" (primary)
- 4 cards de detalhe:
  - Dados da empresa: Razão social, Nome fantasia, CNPJ (mono), E-mail, Telefone
  - Endereço: CEP (mono), Logradouro, Complemento, Bairro, Cidade/Estado
  - Responsável: Nome, CPF (mono), E-mail, Celular
  - Plataforma: Distribuidor, Status badge, Cadastrado em, Última atualização

#### `jornada-3-6-2-cadastrar-credenciado.html` — Cadastrar Credenciado
- Breadcrumb: Credenciados > Novo credenciado
- 4 seções: Dados da empresa (Razão social, CNPJ, Nome fantasia, E-mail corporativo com ícone mail, Telefone), Endereço (CEP, Logradouro, Número, Complemento opcional, Cidade, Estado dropdown UF, Bairro), Responsável (Nome, CPF, E-mail, Celular), Configurações (Distribuidor dropdown, Status inicial: Ativo/Pendente/Inativo)
- Feedback success: "E-mail de boas-vindas foi enviado ao responsável"; redireciona para lista

#### `jornada-3-6-2-editar-credenciado.html` — Editar Credenciado (Rede Flex)
- Breadcrumb: Credenciados > Rede Flex > Editar
- Mesmas 4 seções, pré-preenchidas
- Seção Responsável inclui botão "Gerar link de acesso"
- Rodapé: botão "Desativar credenciado" (destructive, alinha à esquerda) + Cancelar + "Salvar alterações"

---

### Sub-módulo: Distribuidores

#### `jornada-3-6-1b-distribuidores.html` — Lista de Distribuidores
- `data-page="distribuidoras"`
- Tabela: Nome, URL da API OCPI (mono), Cor no mapa (swatch + hex), Credenciados (count), Status, Ações (pencil→editar, ban/power toggle)
- 4 distribuidores: Tupi (#E63946 vermelho, Ativo), DCC (#2196F3 azul, Ativo), PlugShare BR (#4CAF50 verde, Ativo), Voltbras (#FF9800 laranja, Inativo)
- Botão "Novo distribuidor" → cadastrar
- Protocolo: OCPI 2.2

#### `jornada-3-6-2b-cadastrar-distribuidor.html` — Novo Distribuidor
- Breadcrumb: Distribuidores > Novo distribuidor
- 3 seções: Identificação (Nome), Integração OCPI (URL da API com ícone link, Token com show/hide + hint "Armazenado criptografado"), Configurações (Cor do pino: native color picker + hex input, Status dropdown)
- Feedback success; redireciona para lista

#### `jornada-3-6-2b-editar-distribuidor.html` — Editar Distribuidor (Tupi)
- Breadcrumb: Distribuidores > Tupi
- Mesmas 3 seções pré-preenchidas
- Token exibido como "••••••••••••••••" com botão lápis (clique limpa campo para reedição)
- Seção adicional: Informações do sistema (Cadastrado em 12/02/2026, Credenciados vinculados 14, Última alteração)

---

### Módulo: Catálogo de Veículos

#### `jornada-3-3-veiculos.html` — Veículos (Tab 1)
- `data-page="veiculos"`
- 3 tabs: Veículos (ativa) | Marcas | Conectores
- Toolbar: busca + filtro Marca + filtro Conector + filtro Status
- Tabela: Modelo/Versão (stacked), Marca, Conector (badge), Potência DC (sortable), Bateria kWh (sortable), Status, Ações (eye→detalhe, pencil→editar)
- Paginação: 1–8 de 34
- Botão "Novo veículo" → cadastrar

#### `jornada-3-3-marcas.html` — Marcas (Tab 2)
- Tab ativa: Marcas
- Tabela: Marca, Modelos cadastrados (count), Obs., Status, Ações (pencil abre Sheet inline, ban/power toggle)
- 8 marcas listadas
- Botão "Nova marca" abre Sheet drawer com: Nome da marca, Obs. (opcional), Status dropdown

#### `jornada-3-3-conectores.html` — Conectores (Tab 3)
- Tab ativa: Conectores
- Tabela: Nome, Tipo de carga (badge Rápido/Lento), Status, Ações (pencil abre Sheet inline, ban/power toggle)
- 6 conectores
- Botão "Novo conector" abre Sheet drawer com: Nome, Tipo de carga dropdown, Status dropdown

#### `jornada-3-3-1b-detalhe-veiculo.html` — Detalhe do Veículo (Tesla Model 3)
- Breadcrumb: Catálogo > Model 3
- Badge: Ativo; botão "Editar" primary
- 2 cards de detalhe:
  - Identificação: Marca, Modelo, Versão, Ano 2023, Status, Cadastrado em, Atualizado em
  - Especificações de carga: Conector CCS2 (badge), Potência DC 170 kW, AC 11 kW, Bateria 82 kWh, Autonomia 602 km, Tração AWD

#### `jornada-3-3-2-cadastrar-veiculo.html` — Novo Veículo
- Breadcrumb: Catálogo > Novo veículo
- 2 seções: Identificação (Marca dropdown, Modelo, Versão opcional, Ano, Status), Especificações de carga (Conectores chip group: CCS2/CCS1/Tipo 2/CHAdeMO/GB·T, Tração dropdown, Potência DC com ícone zap, Potência AC opcional, Bateria, Autonomia opcional)
- Feedback success; redireciona para lista após 2 s

#### `jornada-3-3-2b-editar-veiculo.html` — Editar Veículo (Model 3)
- Breadcrumb: Catálogo > Model 3 > Editar
- Formulário idêntico ao cadastro, pré-preenchido
- Cancelar → detalhe; Salvar → detalhe após 2 s

---

### Módulo: Extrato ADM

#### `jornada-3-2-extrato.html` — Extrato Financeiro
- Toolbar: busca por rede/CNPJ + filtro Pagamento (PIX/Cartão) + date range + botão "Exportar planilha"
- Tabela: CNPJ, Nome Fantasia, Data e hora, Local, Pagamento (badge PIX/Cartão), kWh, Bruto (R$), Cupom (R$), Split (R$), Líquido (R$)
- Linha de totais no rodapé da tabela
- Paginação: 1–8 de 47
- Sheet de notificações: 5 itens

---

### Módulo: Logs ADM

#### `jornada-3-5-logs.html` — Logs de Erros
- Sem KPI cards (diferente da versão Rede)
- Toolbar: busca por ID do carregador + filtro Credenciado (dropdown: EcoCharge/Flex/Spark/VoltMax) + filtro Localidade + filtro Severidade + date range
- Tabela: Data/hora, Carregador (mono), Localidade, Credenciado, Tipo/Código de erro (OCPP, exibido como `<code>`), Severidade (badge)
- Paginação: 1–10 de 47

---

### Módulo: Usuários ADM

#### `jornada-2-6-1-lista-usuarios.html` — Lista de Usuários ADM
- Header: título "Usuários" + subtítulo "Gerencie os usuários com acesso ao painel ADM"
- Botões header: "Perfis" (secondary) + "Novo usuário" (primary)
- Toolbar: busca por nome/e-mail + filtro Perfil (Super Admin/Financeiro/Operacional/Visualizador) + filtro Status
- Tabela: Nome (com avatar iniciais), E-mail, Perfil (badge colorido: info=Super Admin, purple=Financeiro, orange=Operacional), Último acesso, Status, Ações (pencil→editar)
- Usuários sample: Guilherme Canto (Super Admin), Carla Moreira (Financeiro), Ricardo Pires (Operacional), Fernanda Santos (Operacional), Lucas Brandão (Financeiro), Juliana Neves (...)

#### `jornada-2-6-2-novo-usuario.html` — Novo Usuário ADM
- Breadcrumb: Usuários > Novo usuário
- Seções: Dados pessoais (Nome completo, E-mail), Acesso (Perfil dropdown: Super Admin/Financeiro/Operacional/Visualizador, Status dropdown)
- Feedback success: "E-mail de acesso enviado"; redireciona para lista

#### `jornada-2-6-3-alterar-usuario.html` — Alterar Usuário ADM (Carla Moreira)
- Breadcrumb: Usuários > Carla Moreira
- Seções: Dados pessoais (Nome + E-mail pré-preenchidos), Acesso (Perfil=Financeiro selecionado, Status=Ativo), Informações do sistema read-only (Criado em 10/01/2026, Último acesso Ontem 14:30, Cadastrado por Admin Althus)
- Feedback success; redireciona para lista

#### `jornada-2-6-4-gestao-de-perfis.html` — Gestão de Perfis ADM
- Header: "Gestão de Perfis" + botões "Usuários" (secondary) + "Novo perfil" (primary)
- 2 tabs: Lista de Perfis (ativa) | Permissões
- Tabela: Nome do perfil, Descrição, Usuários (count), Status, Ações (pencil→editar)
- 4 perfis: Super Admin (2 usuários, Ativo), Financeiro (2 usuários, Ativo), Operacional (2 usuários, Ativo), Visualizador (1 usuário, Inativo)

#### `jornada-2-6-5-novo-perfil.html` — Novo Perfil ADM
- Breadcrumb: Gestão de Perfis > Novo perfil
- Campos: Nome do perfil, Status dropdown, Descrição textarea (opcional)
- Feedback success; redireciona para gestão de perfis

#### `jornada-2-6-6-perfil.html` — Editar Perfil ADM (Financeiro)
- Breadcrumb: Gestão de Perfis > Financeiro
- Campos pré-preenchidos: Nome=Financeiro, Status=Ativo, Descrição="Acesso ao extrato de transações e métricas financeiras"
- Informações do sistema: Criado em 10/01/2026, Usuários com este perfil: 2, Última alteração: Admin Althus 15/05/2026
- Feedback success; redireciona para gestão de perfis

#### `jornada-2-6-7-permissoes.html` — Permissões ADM
- Tab ativa: Permissões
- Matriz checkbox: 4 perfis × 7 módulos
  - Módulos: Dashboard, Credenciados, Distribuidores, Veículos, Logs, Extrato, Usuários
  - Super Admin: todos marcados
  - Financeiro: Dashboard + Extrato
  - Operacional: Dashboard + Credenciados + Distribuidores + Veículos + Logs
  - Visualizador: apenas Dashboard
- Botão "Salvar permissões" → feedback success

---

### Configurações ADM

> O ADM usa 4 tabs (todas implementadas), diferente da Rede que tem 7 tabs com várias sem arquivo.

#### `configuracoes-meu-perfil.html` — Meu Perfil
- 4 tabs: Meu Perfil (ativa) | Notificações | Temas | Sobre o Sistema
- Seções: Foto de perfil (avatarGradientRing + botão upload), Dados pessoais (Nome editável, E-mail disabled readonly com helper "não pode ser alterado"), Perfil de acesso read-only (Perfil: Super Admin, Membro desde, Último acesso), Segurança (Senha atual + Nova senha + Confirmar — todos com show/hide toggle)
- Botão "Salvar alterações"

#### `configuracoes-notificacoes.html` — Notificações
- Tab ativa: Notificações
- 5 categorias com chip group (E-mail / Sistema):
  - Credenciados: Novo cadastro aguardando aprovação, Contrato vencendo, Credenciado desativado
  - Carregadores: Offline, Falha crítica
  - Financeiro: Meta de faturamento atingida, Relatório mensal
  - Usuários: Novo usuário cadastrado, Alteração de perfil
  - Sistema: Atualizações de plataforma, Alertas de segurança

#### `configuracoes-temas.html` — Temas
- Tab ativa: Temas
- Idêntico ao temas da Rede: Sistema de cores (dark selecionado, light) + Tema visual (Glass selecionado, Minimalista)
- Persiste em localStorage

#### `configuracoes-sobre.html` — Sobre o Sistema
- Tab ativa: Sobre o Sistema
- Hero com logo Althus + tagline "Painel de administração da plataforma Althus"
- Descrição em prosa
- Versão e ambiente: v1.0.0, Produção, Maio 2026, OCPI 2.2.1
- Seção "Novidades" (changelog)
- Suporte técnico: docs.althus.com.br, suporte@althus.com.br, Slack #althus-adm
- Rodapé: © 2026 Althus

---

## Fluxos de Navegação

### Dashboard Rede — Fluxo Principal
```
[Login] → [Dashboard Loading (3s)] → [Dashboard]
                                          ↓
              ┌───────────────────────────┤
              ↓                           ↓
       [Localidades] ←──────── Sidebar ──→ [Carregadores]
       [Listar]                            [Listar]
          ↓ Nova                              ↓ item
       [Cadastrar]                         [Visualizar]
          ↑ Editar ←── pencil                  ↓ Editar btn
       [Editar]                            [Editar]
                                           ↓ Nova
                                        [Cadastrar]
```

### Dashboard Rede — Fluxo de Autenticação
```
[Login] ──erro──→ inline validation (alert error)
       ──ok──→ [Dashboard Loading] ──3s──→ [Dashboard]

[Criar Senha] ←── e-mail de convite (link com ?email=)
       ──ok──→ [Login]
```

### Dashboard Rede — Fluxos Modulares
```
Tarifas:
[Tarifas Tab1: Opções] ←tab→ [Tarifas Tab2: Personalizadas]
                                   ↓ Nova
                              [Nova Tarifa Personalizada]

Extrato:
[Extrato] ──eye──→ [Detalhe Abastecimento]

Cupons:
[Lista Cupons] ──eye──→ [Detalhe Cupom] ──Editar btn──→ [Editar Cupom]
              ──pencil──→ [Editar Cupom]
              ──Nova──→ [Cadastrar Cupom]

Usuários:
[Lista Usuários] ──"Perfis"──→ [Gestão de Perfis: Lista]
                                    ──tab──→ [Permissões]
                                    ──"Novo perfil"──→ [Novo Perfil]
                                    ──pencil──→ [Editar Perfil]
[Lista Usuários] ──"Novo usuário"──→ [Novo Usuário]
                ──pencil──→ [Alterar Usuário]

Reservas:
[Lista Reservas] ──eye──→ [Detalhe Reserva]

Configurações:
[Minha Conta (tab1)] ←tabs→ [Notificações (tab3)] ←tabs→ [Temas (tab7)]
(tabs 2, 4, 5, 6: páginas não implementadas)
```

### Dashboard ADM — Fluxo Principal
```
[Login ADM] → [Dashboard Loading (3s)] → [Dashboard ADM]
```

### Dashboard ADM — Fluxos Modulares
```
Credenciados:
[Lista Credenciados] ──eye──→ [Detalhe Credenciado] ──"Editar"──→ [Editar Credenciado]
                    ──pencil──→ [Editar Credenciado]
                    ──"Novo"──→ [Cadastrar Credenciado]

Distribuidores (acessado via sidebar item Credenciados ou link interno):
[Lista Distribuidores] ──pencil──→ [Editar Distribuidor]
                       ──"Novo"──→ [Cadastrar Distribuidor]

Catálogo de Veículos:
[Veículos tab] ──eye──→ [Detalhe Veículo] ──"Editar"──→ [Editar Veículo]
               ──pencil──→ [Editar Veículo]
               ──"Novo"──→ [Cadastrar Veículo]
[Veículos tab] ←tabs→ [Marcas tab] ←tabs→ [Conectores tab]
Marcas: "Nova marca" / pencil ──→ Sheet drawer inline (sem página separada)
Conectores: "Novo conector" / pencil ──→ Sheet drawer inline (sem página separada)

Extrato ADM: página única (sem detalhe de transação individual)

Logs ADM: página única (sem detalhe de log individual)

Usuários ADM:
[Lista Usuários] ──"Perfis"──→ [Gestão de Perfis: Lista]
                                    ──tab──→ [Permissões]
                                    ──"Novo perfil"──→ [Novo Perfil]
                                    ──pencil──→ [Editar Perfil]
[Lista Usuários] ──"Novo usuário"──→ [Novo Usuário]
                ──pencil──→ [Alterar Usuário]

Configurações ADM:
[Meu Perfil] ←tabs→ [Notificações] ←tabs→ [Temas] ←tabs→ [Sobre o Sistema]
(todas as 4 tabs implementadas)
```

---

## Observações sobre Padrões v1

### Padrões recorrentes

**Layout e estrutura**
- Todas as páginas autenticadas seguem: `<aside id="sidebar-root">` + `<main class="main bgWrapper">` + `pageHeader` + `pageContent`
- Sidebar injetado dinamicamente via `sidebar.js` (`dashboard-rede/shared/sidebar.js` e `dashboard-adm/shared/sidebar.js`)
- Auth pages (Login, Criar Senha) usam layout próprio incompatível com `page.css`, sem sidebar
- `data-page="..."` no `<body>` controla o item ativo no sidebar

**Componentes de formulário**
- Inputs sempre dentro de `.wrapper` > `.inputWrap` (padrão do design system)
- Ícones decorativos via `.iconLeft`, botões de toggle via `.iconRightBtn`
- Dropdowns custom (não `<select>` nativo): `.trigger` + `.menu` + `.option`; abrem com classe `.open`
- MultiSelect via componente próprio para campos de múltipla seleção (carregadores, localidades)
- Chip group para seleção múltipla de conectores (formulários de veículo/carregador) e preferências de notificação (E-mail/Sistema)
- Color picker: `<input type="color">` nativo sincronizado com `<input type="text">` para valor hex
- Todos os formulários têm `.formFooter` com botões Cancelar (ghost) + Salvar (primary)

**Tabelas**
- Estrutura: `.tableWrap` > `.table` > `thead.headerRow` + `tbody`
- Colunas sortable exibem ícone `chevrons-up-down` (Lucide)
- Ações inline sempre na última coluna (`.tdActions`): ícones pencil (editar), eye (visualizar), download, trash, ban/power
- Paginação: `.pagination` com info de registros + controles prev/next + páginas numeradas

**Feedback e estados**
- Feedback de sucesso: `.feedbackWrap` com `.alert.success` que aparece ao adicionar classe `.visible`
- Feedback de erro inline: `.alert.error` com classe `.hidden` removida na validação
- Campos inválidos recebem classe `.error` no `.wrapper`
- Skeleton loading: usado apenas nas páginas de dashboard loading (rede e ADM)
- Após salvar: `setTimeout` de 1,2–2 s → redirect automático

**Navegação contextual**
- Breadcrumb: usado em todas as páginas de detalhe/edição/criação (não em listagens)
- Páginas de lista: sem breadcrumb, título direto no `pageHeader`
- Botão de retorno "Voltar para X" em páginas de detalhe read-only (sem edição inline)
- Tab nav: presente em Tarifas (2 tabs), Catálogo Veículos (3 tabs), Gestão de Perfis (2 tabs)

**Sheet / Drawer**
- Componente Sheet (`.sheetOverlay` + `.sheetPanel`) usado para:
  1. Notificações globais (presente em todas as páginas autenticadas via sidebar)
  2. CRUD inline de Marcas e Conectores no ADM (sem página separada)
- Sheet de notificações: 400–420 px de largura, fecha com overlay click, botão X ou Escape

**Ícones**
- Lucide icons via CDN: `<i data-lucide="nome">` + `lucide.createIcons()` no script
- Ícones comuns: search, plus, pencil, eye, eye-off, trash-2, chevron-down, chevron-right, chevrons-up-down, mail, lock, link, zap, circle-check, circle-alert, x, ban

### Inconsistências e limitações identificadas

1. **Tabs de Configurações (Rede) incompletas**: 4 das 7 tabs apontam para páginas inexistentes (`jornada-2-10-2`, `-4`, `-5`, `-6`). Apenas Minha conta, Notificações e Temas estão implementadas.

2. **Módulos assimétricos**: Rede tem módulo Reservas sem equivalente no ADM. ADM tem Distribuidores e Catálogo de Veículos sem equivalente na Rede.

3. **Detalhe de log ausente**: Nenhum dos dois dashboards tem página de detalhe de log individual (apenas lista).

4. **Detalhe de transação no ADM ausente**: ADM Extrato não tem página de detalhe individual (apenas Rede tem `jornada-2-3-2-detalhe-abastecimento.html`).

5. **Criação de Conta/Senha no ADM ausente**: Não há equivalente ao `jornada-3-2-criar-senha.html` no ADM — usuários ADM são criados pelo formulário `jornada-2-6-2-novo-usuario.html` que envia e-mail (fluxo não prototipado).

6. **Perfil da empresa (Rede) ausente**: Tab "Perfil da empresa" na configuração da Rede não tem página implementada.

7. **Skeleton apenas para Dashboard**: Estado de carregamento skeleton implementado somente no Dashboard (rede e ADM). Demais listagens não têm skeleton.

8. **Marcas e Conectores (ADM) sem páginas dedicadas**: CRUD feito via Sheet inline, sem URL própria, sem breadcrumb.

9. **Nomenclatura de arquivos mista**: Auth usa prefixo `jornada-3-x`, páginas autenticadas usam `jornada-2-x`, configurações ADM usam `configuracoes-x` sem prefixo de jornada.

10. **Sidebar ADM referencia `dashboard-adm/shared/sidebar.js`** enquanto Rede usa `shared/sidebar.js` (caminhos diferentes); ADM tem um `sidebar.js` próprio.

11. **Perfis ADM vs Rede divergem**: ADM tem 4 perfis (Super Admin, Financeiro, Operacional, Visualizador) e 7 módulos na matriz de permissões; Rede tem 3 perfis (Administrador, Financeiro, Operacional) e 8 módulos diferentes.

12. **Sheet de notificações vazia em páginas de formulário**: Em páginas de edição/cadastro do ADM, a Sheet de notificações exibe "Nenhuma notificação no momento." enquanto na lista e dashboard há notificações reais. Provável limitação do protótipo.

---

## Resumo de Contagem

| Categoria | Dashboard Rede | Dashboard ADM |
|---|---|---|
| Autenticação | 2 | 1 |
| Dashboard | 2 | 2 |
| Listagens | 9 | 8 |
| Detalhes (read-only) | 4 | 3 |
| Formulários criar | 7 | 8 |
| Formulários editar | 7 | 7 |
| Configurações | 3 | 4 |
| Páginas inexistentes (links quebrados) | 4 | 0 |
| **Total implementado** | **34** | **29** |

> Nota: o total de 38 mencionado anteriormente para Rede inclui 4 páginas inexistentes (links no nav sem arquivo correspondente).
