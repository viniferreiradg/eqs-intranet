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
mkdir -p public/dashboard-rede
mkdir -p public/dashboard-adm
mkdir -p public/app
mkdir -p public/app-light
mkdir -p public/src
mkdir -p public/shared

echo "→ Copying Storybook UI..."
cp -r storybook/storybook-static/. public/storybook-ui/

echo "→ Copying CSS source files..."
cp -r storybook/src/. public/storybook/src/

echo "→ Copying shared CSS..."
cp -r shared/. public/shared/

echo "→ Copying dashboard files..."
cp -r dashboard-rede/. public/dashboard-rede/
cp -r dashboard-adm/. public/dashboard-adm/

echo "→ Copying app files..."
cp -r app/. public/app/
cp -r app-light/. public/app-light/

echo "→ Copying assets..."
cp -r src/. public/src/

echo "→ Creating root redirect..."
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/dashboard-rede/prototipo.html" />
  <title>Althus Eletropostos</title>
</head>
<body>
  <p>Redirecionando para o <a href="/dashboard-rede/prototipo.html">protótipo</a>...</p>
</body>
</html>
EOF

echo "✓ Build concluído."
