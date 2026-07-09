#!/bin/bash
set -e

echo "→ Building Storybook..."
npm ci
npm run build-storybook

echo "→ Setting up output directory..."
rm -rf public
mkdir -p public/componentes
mkdir -p public/storybook-ui
mkdir -p public/painel-adm
mkdir -p public/site-desktop
mkdir -p public/site-mobile
mkdir -p public/src
mkdir -p public/shared

echo "→ Copying Storybook UI..."
cp -r storybook-static/. public/storybook-ui/

echo "→ Copying componentes (fonte da verdade)..."
cp -r componentes/. public/componentes/

echo "→ Copying shared CSS..."
cp -r shared/. public/shared/

echo "→ Copying panel files..."
cp -r painel-adm/. public/painel-adm/
cp -r site-desktop/. public/site-desktop/
cp -r site-mobile/. public/site-mobile/

echo "→ Copying assets..."
cp -r src/. public/src/

echo "→ Creating root redirect..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/painel-adm/prototipo.html" />
  <title>EQS Intranet</title>
</head>
<body>
  <p>Redirecionando para o <a href="/painel-adm/prototipo.html">protótipo</a>...</p>
</body>
</html>
EOF

echo "✓ Build concluído."
