# Althus v2 — Estrutura e Plano de Telas

> Baseado na especificação `Althus_Eletropostos_Especificacao_v3_5.docx` (conteúdo v2.0 · Maio 2026)
> e no estado atual do repositório.

---

## Visão geral do sistema

O sistema Althus tem três superfícies:

| Superfície | Pasta | Usuário |
|---|---|---|
| App mobile | `storybook-app` + telas `app/` | Consumidor final (motorista EV) |
| Dashboard Rede | `dashboard-rede/` | Admin do credenciado (rede de eletropostos) |
| Dashboard ADM | `dashboard-adm/` | Equipe interna Althus |

Este documento foca nas duas superfícies web.

---

## 1. Dashboard Rede (Credenciado)

### 1.1 Menu v2 (nova estrutura)

O menu foi redesenhado com dropdowns. Mapeamento novo menu → arquivo HTML:

| Menu | Submenu | RF Spec | Arquivo existente | Status |
|---|---|---|---|---|
| **Início** | — | RF202 | `jornada-2-8-dashboard.html` | ✅ Existe |
| **Financeiro** | Visão geral | RF207 (parcial) | — | 🆕 Criar |
| **Financeiro** | Extrato | RF207 | `jornada-2-3-1-extrato.html` | ✅ Existe |
| **BTG Pactual** | — | RNF020 | — | 🆕 Criar |
| **Operacional** | Minha rede | RF203 | `jornada-2-1-1-listar-localidades.html` | ✅ Existe |
| **Operacional** | Histórico | RF207 (parcial) | — | 🆕 Criar |
| **Operacional** | Análise | RF202 (parcial) | — | 🆕 Criar |
| **Operacional** | Logs de falhas | RF208 | `jornada-2-5-1-logs-de-erros.html` | ✅ Existe |
| **Cupons** | Visão geral | RF206 | `jornada-2-4-1-listar-cupons.html` | ✅ Existe |
| **Cupons** | Análise | RF206 (parcial) | — | 🆕 Criar |
| **Fiscal** | Fiscal | RNF016 | — | 🆕 Criar |
| **Fiscal** | Mensalidades | — | — | 🆕 Criar |
| **Gestão de usuários** | — | RF210 + RF211 | `jornada-2-6-1-lista-usuarios.html` | ✅ Existe |
| **Suporte** | — | — | — | 🆕 Criar |

### 1.2 Telas de autenticação

| Jornada | Arquivo | RF Spec | Status |
|---|---|---|---|
| Login | `jornada-3-1-login.html` | RF201 | ✅ Existe |
| Criar senha (1º acesso) | `jornada-3-2-criar-senha.html` | RF201 | ✅ Existe |

### 1.3 Mapeamento completo: todos os arquivos existentes por módulo

#### Login / Auth
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-3-1-login.html` | Login com e-mail + senha | ✅ Manter |
| `jornada-3-2-criar-senha.html` | Definir senha no 1º acesso | ✅ Manter |

#### Dashboard (Início)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-8-dashboard.html` | Dashboard principal com KPIs e filtro de período | ✅ Manter — revisar campos conforme RF202 |
| `jornada-2-8-dashboard-loading.html` | Estado de carregamento | ✅ Manter |

#### Operacional — Minha rede (Locais)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-1-1-listar-localidades.html` | Lista de locais da rede | ✅ Manter |
| `jornada-2-1-2-cadastrar-localidade.html` | Cadastrar novo local (endereço + geocodificação) | ✅ Manter |
| `jornada-2-1-3-editar-localidade.html` | Editar local existente | ✅ Manter |

#### Operacional — Carregadores (acessados via Local)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-7-1-listar-carregadores.html` | Lista de carregadores | ✅ Manter — acessado a partir de um local |
| `jornada-2-7-2-visualizar-dispositivo.html` | Detalhe do carregador | ✅ Manter |
| `jornada-2-7-3-editar-dispositivo.html` | Editar carregador | ✅ Manter |
| `jornada-2-7-4-cadastrar-dispositivo.html` | Cadastrar carregador (marca, modelo, série, kW, conectores, status) | ✅ Manter |

#### Financeiro — Extrato
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-3-1-extrato.html` | Lista de transações com filtros (localidade, carregador, período) | ✅ Manter — revisar colunas conforme RF207 |
| `jornada-2-3-2-detalhe-abastecimento.html` | Detalhe de uma transação | ✅ Manter |

#### Tarifas
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-2-1-opcoes-de-tarifas.html` | Opções gerais de tarifas | ⚠️ Revisar — RF205 reestrutura: tarifa por carregador + turnos |
| `jornada-2-2-2-tarifas-personalizadas.html` | Tarifas personalizadas por turno | ⚠️ Revisar — unificar com RF205 |
| `jornada-2-2-tarifas.html` | Visão geral de tarifas | ⚠️ Revisar |
| `jornada-2-3-nova-tarifa-personalizada.html` | Nova tarifa personalizada | ⚠️ Revisar — nomenclatura incorreta (está em 2-3, deveria ser 2-2) |

> **Nota RF205:** Tarifa agora inclui: valor padrão por kWh, turnos (Dia/Noite/Madrugada), taxa de ociosidade (toggle + valor/min + carência), taxa de reserva (toggle + valor + tempo + % cancelamento). Tudo configurável por carregador ou para toda a rede.

#### Cupons
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-4-1-listar-cupons.html` | Lista de cupons (código, tipo, validade, usos) | ✅ Manter |
| `jornada-2-4-2-cadastrar-cupom.html` | Cadastrar cupom (código, tipo %, regras de público, datas) | ✅ Manter — revisar campos novos de público-alvo |
| `jornada-2-4-3-visualizar-cupom.html` | Ver detalhe de um cupom | ✅ Manter |
| `jornada-2-4-4-editar-cupom.html` | Editar / inativar cupom | ✅ Manter |

#### Logs
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-5-1-logs-de-erros.html` | Lista de erros OCPP com filtros (localidade, carregador, severidade, período) | ✅ Manter |

#### Reservas
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-9-1-lista-reservas.html` | Lista de reservas com status badge (Ativa/Utilizada/Expirada/Cancelada/Não compareceu) | ✅ Manter — revisar filtros RF209 |
| `jornada-2-9-2-detalhe-reserva.html` | Detalhe de uma reserva | ✅ Manter |
| — | Configurar reservas por dispositivo | 🆕 Criar `jornada-2-9-3-configurar-reservas.html` |

> **Nota RF209:** A configuração de reservas por dispositivo precisa de nova tela. Campos: toggle habilitar reserva, valor da taxa, tempo (5–60 min), % cancelamento, opção "Aplicar a toda a rede" (com modal de confirmação).

#### Gestão de Usuários (RF210)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-6-1-lista-usuarios.html` | Lista de usuários da empresa com status/perfil | ✅ Manter |
| `jornada-2-6-2-novo-usuario.html` | Cadastrar usuário (nome, e-mail, telefone, perfil, status) | ✅ Manter |
| `jornada-2-6-3-alterar-usuario.html` | Editar usuário existente | ✅ Manter |

#### Gestão de Perfis (RF211)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-6-4-gestao-de-perfis.html` | Lista de perfis (nome, # usuários, status) | ✅ Manter |
| `jornada-2-6-5-novo-perfil.html` | Criar perfil com checklist de permissões por módulo | ✅ Manter |
| `jornada-2-6-6-perfil.html` | Ver detalhe de um perfil | ✅ Manter |
| `jornada-2-6-7-permissoes.html` | Editar permissões de um perfil | ✅ Manter |

#### Configurações (ícone na sidebar)
| Arquivo | Propósito | Status v2 |
|---|---|---|
| `jornada-2-10-1-minha-conta.html` | Dados da conta do usuário logado | ✅ Manter |
| `jornada-2-10-2-perfil-empresa.html` | Perfil da empresa/rede | ✅ Manter |
| `jornada-2-10-3-notificacoes.html` | Preferências de notificações | ✅ Manter |
| `jornada-2-10-4-termos.html` | Termos de uso | ✅ Manter |
| `jornada-2-10-5-sobre.html` | Sobre o sistema | ✅ Manter |
| `jornada-2-10-6-ajuda.html` | Ajuda / suporte | ✅ Manter |
| `jornada-2-10-7-temas.html` | Configurar tema (light/dark) | ✅ Manter |

### 1.4 Telas novas a criar (Dashboard Rede)

| ID proposto | Módulo de menu | Conteúdo esperado |
|---|---|---|
| `jornada-financeiro-visao-geral.html` | Financeiro → Visão geral | KPIs financeiros: faturamento total, ticket médio, receita por período, gráficos. Dados do RF202 expandidos financeiramente |
| `jornada-btg.html` | BTG Pactual | Iframe/integração BTG: PIX, transferência, pagamento de boleto, DDA (RNF020) |
| `jornada-operacional-historico.html` | Operacional → Histórico | Histórico de sessões de recarga (volume, duração, energia entregue) |
| `jornada-operacional-analise.html` | Operacional → Análise | Análise operacional: disponibilidade dos carregadores, uptime, horas de pico |
| `jornada-cupons-analise.html` | Cupons → Análise | Performance de cupons: usos, conversão, desconto concedido |
| `jornada-fiscal.html` | Fiscal → Fiscal | Notas fiscais emitidas (NF-e via Sped, RNF016): lista com link de download |
| `jornada-mensalidades.html` | Fiscal → Mensalidades | Cobranças mensais da plataforma: histórico de faturas, status de pagamento |
| `jornada-2-9-3-configurar-reservas.html` | (Configuração dentro de Reservas) | Habilitar reserva por dispositivo, parâmetros de taxa/tempo/cancelamento (RF209) |
| `jornada-suporte.html` | Suporte | Canal de atendimento, abertura de chamados, FAQ |

---

## 2. Dashboard ADM (Althus)

O painel ADM é de uso interno da equipe Althus. O documento de spec v3.5 cobre apenas o painel do Credenciado (RF201-RF211). As telas ADM existentes são baseadas em spec anterior.

### 2.1 Telas existentes (ADM)

| Arquivo | Módulo | Status v2 |
|---|---|---|
| `jornada-3-1-login.html` | Login Althus | ✅ Existe (light mode + video) |
| `jornada-3-2-extrato.html` | Extrato financeiro global | ✅ Existe |
| `jornada-3-3-veiculos.html` | Catálogo de veículos EV | ✅ Existe |
| `jornada-3-3-marcas.html` | Marcas de veículos | ✅ Existe |
| `jornada-3-3-conectores.html` | Tipos de conectores | ✅ Existe |
| `jornada-3-3-1b-detalhe-veiculo.html` | Detalhe de um veículo | ✅ Existe |
| `jornada-3-3-2-cadastrar-veiculo.html` | Cadastrar veículo | ✅ Existe |
| `jornada-3-3-2b-editar-veiculo.html` | Editar veículo | ✅ Existe |
| `jornada-3-4-dashboard.html` | Dashboard ADM | ✅ Existe |
| `jornada-3-4-dashboard-loading.html` | Loading state | ✅ Existe |
| `jornada-3-5-logs.html` | Logs globais | ✅ Existe |
| `jornada-3-6-1-credenciados.html` | Lista de credenciados | ✅ Existe |
| `jornada-3-6-1b-detalhe-credenciado.html` | Detalhe de credenciado | ✅ Existe |
| `jornada-3-6-1b-distribuidores.html` | Lista de distribuidores | ✅ Existe |
| `jornada-3-6-2-cadastrar-credenciado.html` | Cadastrar credenciado | ✅ Existe |
| `jornada-3-6-2-editar-credenciado.html` | Editar credenciado | ✅ Existe |
| `jornada-3-6-2b-cadastrar-distribuidor.html` | Cadastrar distribuidor | ✅ Existe |
| `jornada-3-6-2b-editar-distribuidor.html` | Editar distribuidor | ✅ Existe |
| `jornada-2-6-1-lista-usuarios.html` | Gestão de usuários ADM | ✅ Existe |
| `jornada-2-6-2-novo-usuario.html` | Novo usuário ADM | ✅ Existe |
| `jornada-2-6-3-alterar-usuario.html` | Editar usuário ADM | ✅ Existe |
| `jornada-2-6-4-gestao-de-perfis.html` | Perfis ADM | ✅ Existe |
| `jornada-2-6-5-novo-perfil.html` | Novo perfil ADM | ✅ Existe |
| `jornada-2-6-6-perfil.html` | Ver perfil ADM | ✅ Existe |
| `jornada-2-6-7-permissoes.html` | Permissões ADM | ✅ Existe |
| `configuracoes-meu-perfil.html` | Configurações — Meu perfil | ✅ Existe |
| `configuracoes-notificacoes.html` | Configurações — Notificações | ✅ Existe |
| `configuracoes-temas.html` | Configurações — Temas | ✅ Existe |
| `configuracoes-sobre.html` | Configurações — Sobre | ✅ Existe |

---

## 3. Requisitos funcionais — síntese (RF201–RF211)

### RF201 — Login do Credenciado
- E-mail + senha com opção mostrar/ocultar
- Erro genérico (não revela qual campo está errado)
- 1º acesso: redireciona para definir nova senha

### RF202 — Dashboard
- KPIs: total de carregadores habilitados, quantidade de recargas (período), faturamento (período)
- Filtro de período padrão: últimos 30 dias; mudança atualiza todos os indicadores
- Só dados da rede do credenciado logado

### RF203 — Gestão de Locais
- Campos: UF, Cidade, Endereço (logradouro+número), Complemento, Lat/Lng (auto via Google Maps)
- Local aparece no mapa do app apenas quando tem ao menos 1 carregador ativo ou "Instalando"

### RF204 — Gestão de Carregadores
- Campos: localidade (select), marca, modelo, nº série, potência (kW), qtd conectores, tipo(s) de conector, fotos, status
- Status: Ativo | Inativo | Em manutenção | Instalando
- Nunca excluídos — apenas inativados; status via OCPP ou manual

### RF205 — Gestão de Tarifas
- Tarifa por carregador: valor padrão R$/kWh + turnos opcionais (Dia 06–18h, Noite 18–00h, Madrugada 00–06h)
- Taxa de ociosidade: toggle + R$/min + carência + localidade específica ou rede toda
- Taxa de reserva: toggle + valor R$ + tempo de reserva (min) + % cancelamento + localidade ou rede toda
- Log de auditoria em toda alteração (quem, quando, valor anterior/novo)

### RF206 — Gestão de Cupons
- Código único na plataforma (prefixo da rede)
- Tipo: % ou R$ fixo; para % tem teto de valor máximo
- Datas de início/fim, limite total de usos, limite por CPF
- Aplicação: automático (sem código) ou por código (campanha externa)
- Público-alvo: por GPS/raio, carregador específico, usuários ativos nos últimos X dias, primeira recarga no local

### RF207 — Extrato de Transações
- Colunas: data/hora, usuário anonimizado, kWh, valor cobrado, desconto cupom, valor pago
- Filtros: período, localidade, carregador
- Dados anonimizados por LGPD

### RF208 — Logs de Erro
- Erros OCPP: tipo/código, data/hora, carregador, localidade, severidade
- Filtros combinados; somente visualização (sem exportação nesta versão)

### RF209 — Gestão de Reservas
- Lista: localidade, dispositivo/conector, usuário anonimizado, data/hora, início janela, status badge, taxa cobrada
- Status: Ativa / Utilizada / Expirada / Cancelada / Não compareceu
- Filtros: localidade, dispositivo, status (multi), período
- Config por dispositivo: toggle habilitado, valor taxa, tempo (5–60 min), % cancelamento, "Aplicar a toda a rede" (modal de confirmação)
- Reservas Ativas não podem ser canceladas pelo admin

### RF210 — Gestão de Usuários da Empresa
- Nome, e-mail (login único), telefone, perfil, status (toggle ativo/inativo)
- E-mail de 1º acesso enviado ao criar
- Admin não pode alterar seu próprio perfil ou status
- Inativação encerra sessões ativas imediatamente

### RF211 — Gestão de Perfis (Roles)
- Nome único na rede, descrição, checklist de permissões agrupadas por módulo
- Módulos: Dashboard, Locais, Carregadores, Tarifas, Cupons, Extrato, Logs, Reservas, Usuários, Perfis
- Perfil "Administrador" criado automaticamente, não editável/inativável
- Perfil com usuários ativos não pode ser inativado
- Alteração de permissões reflete imediatamente para todos os usuários do perfil

---

## 4. Requisitos não funcionais relevantes para UI

| Código | Impacto nas telas |
|---|---|
| RNF001 | APIs ≤ 2s → estados de loading em todas as listas |
| RNF002 | Mapa ≤ 3s → skeleton/loader no mapa |
| RNF007 | CPF/cartão nunca visível nas telas → anonimização no extrato e reservas |
| RNF008 | Aceite de T&U no cadastro → tela de primeiro acesso com checkbox |
| RNF011 | App iOS 14+ / Android 10+ |
| RNF012 | Painel web responsivo a partir de 1280px, Chrome/Safari/Edge |
| RNF016 | NF-e automática (Sped) → tela Fiscal com link de download |
| RNF017 | Google Maps API → geocodificação automática no cadastro de local |
| RNF019 | Push notifications (FCM + APNs) → badge de notificações no sidebar |
| RNF020 | BTG Pactual (futuro) → PIX, transferência, pagamento de boleto, DDA |

---

## 5. Resumo de trabalho pendente

### Dashboard Rede — Alta prioridade
1. **Revisar** `jornada-2-8-dashboard.html` — conferir se KPIs batem com RF202
2. **Criar** `jornada-financeiro-visao-geral.html` — visão financeira com gráficos
3. **Revisar** `jornada-2-2-*.html` (Tarifas) — adaptar campos de turnos, ociosidade e reserva (RF205)
4. **Criar** `jornada-2-9-3-configurar-reservas.html` — config de reservas por dispositivo (RF209)
5. **Revisar** `jornada-2-4-2-cadastrar-cupom.html` — adicionar campos de público-alvo GPS/carregador/primeira recarga (RF206)

### Dashboard Rede — Média prioridade
6. **Criar** `jornada-operacional-historico.html`
7. **Criar** `jornada-operacional-analise.html`
8. **Criar** `jornada-cupons-analise.html`
9. **Criar** `jornada-fiscal.html` (NF-e)
10. **Criar** `jornada-mensalidades.html`
11. **Criar** `jornada-suporte.html`

### Dashboard Rede — Baixa prioridade / Futuro
12. **Criar** `jornada-btg.html` — integração BTG (RNF020 marcado como "Futuro")

### Dashboard ADM
- Aguardando spec específica do painel ADM (RF301+)
- Telas existentes parecem cobertas por spec anterior; conferir com próxima versão do documento

---

## 6. Convenções de nomenclatura de arquivos

```
dashboard-rede/
  jornada-[módulo-número]-[ação].html

  Autenticação:  jornada-3-*.html
  Dashboard:     jornada-2-8-*.html
  Locais:        jornada-2-1-*.html
  Carregadores:  jornada-2-7-*.html
  Tarifas:       jornada-2-2-*.html
  Extrato:       jornada-2-3-*.html
  Cupons:        jornada-2-4-*.html
  Logs:          jornada-2-5-*.html
  Usuários:      jornada-2-6-*.html
  Reservas:      jornada-2-9-*.html
  Configurações: jornada-2-10-*.html
  
  Novos (sem numeração canônica):
    jornada-financeiro-visao-geral.html
    jornada-btg.html
    jornada-operacional-historico.html
    jornada-operacional-analise.html
    jornada-cupons-analise.html
    jornada-fiscal.html
    jornada-mensalidades.html
    jornada-suporte.html
```

---

## 7. data-page IDs para o sidebar.js

Cada `<body>` precisa de `data-page="<id>"` para o highlight de item ativo no sidebar:

| ID | Tela |
|---|---|
| `dashboard` | jornada-2-8-dashboard.html |
| `financeiro-visao` | jornada-financeiro-visao-geral.html |
| `extrato` | jornada-2-3-1-extrato.html |
| `btg` | jornada-btg.html |
| `minha-rede` | jornada-2-1-1-listar-localidades.html |
| `historico` | jornada-operacional-historico.html |
| `analise` | jornada-operacional-analise.html |
| `logs` | jornada-2-5-1-logs-de-erros.html |
| `cupons-visao` | jornada-2-4-1-listar-cupons.html |
| `cupons-analise` | jornada-cupons-analise.html |
| `fiscal-notas` | jornada-fiscal.html |
| `mensalidades` | jornada-mensalidades.html |
| `usuarios` | jornada-2-6-1-lista-usuarios.html |
| `suporte` | jornada-suporte.html |
