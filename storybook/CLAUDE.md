# Storybook — camada de visualização

Este diretório contém apenas a configuração do Storybook e as stories de fundação
(cores, tipografia, espaçamento etc.).

**A fonte da verdade dos componentes é a pasta [`../componentes/`](../componentes/).**

- Documentação de APIs, tokens e convenções: `../componentes/CLAUDE.md`
- Regras de criação de telas: `../rules.md` (raiz do projeto)
- Cada componente vive em `componentes/<Nome>/` com `<Nome>.tsx`, `<Nome>.module.css`
  e `<Nome>.stories.tsx` — o Storybook os descobre via glob em `.storybook/main.ts`.

Nunca criar componentes aqui dentro; sempre em `../componentes/`.
