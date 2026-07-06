#!/bin/bash
set -e

echo "→ Building Storybook..."
cd storybook
npm ci
npm run build-storybook
cd ..

echo "→ Setting up output directory..."
rm -rf public
mkdir -p public/storybook/src
mkdir -p public/storybook-ui
mkdir -p public/painel-adm
mkdir -p public/painel-usuario-desktop
mkdir -p public/painel-usuario-mobile
mkdir -p public/src
mkdir -p public/shared

echo "→ Copying Storybook UI..."
cp -r storybook/storybook-static/. public/storybook-ui/

echo "→ Copying CSS source files..."
cp -r storybook/src/. public/storybook/src/

echo "→ Copying shared CSS..."
cp -r shared/. public/shared/

echo "→ Copying panel files..."
cp -r painel-adm/. public/painel-adm/
cp -r painel-usuario-desktop/. public/painel-usuario-desktop/
cp -r painel-usuario-mobile/. public/painel-usuario-mobile/

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
