/**
 * createChargerPin(chargers, size?)
 *
 * chargers : string[]  — array of 'available' | 'occupied', one per charger
 * size     : number    — SVG size in px (default: 56)
 * returns  : SVGElement ready to insert into the DOM
 *
 * Usage:
 *   const pin = createChargerPin(['available', 'occupied', 'available']);
 *   document.getElementById('my-map-marker').appendChild(pin);
 */
(function (global) {
  'use strict';

  function createChargerPin(chargers, size) {
    size = size || 56;

    var ns   = 'http://www.w3.org/2000/svg';
    var svg  = document.createElementNS(ns, 'svg');
    var cx   = size / 2;
    var cy   = size / 2;
    var sw   = size * 0.10;
    var rOut = size / 2 - 1;
    var rRng = rOut - sw / 2;
    var C    = 2 * Math.PI * rRng;
    var N    = chargers.length;
    var GAP  = N === 1 ? 0 : 4;
    var segLen = C * ((360 / N) - GAP) / 360;

    svg.setAttribute('width',   size);
    svg.setAttribute('height',  size);
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('role',    'img');

    var available = chargers.filter(function (s) { return s === 'available'; }).length;
    var occupied  = chargers.filter(function (s) { return s === 'occupied';  }).length;
    svg.setAttribute('aria-label',
      'Posto com ' + N + ' carregador' + (N > 1 ? 'es' : '') +
      ': ' + available + ' livre' + (available !== 1 ? 's' : '') +
      ', ' + occupied + ' ocupado' + (occupied !== 1 ? 's' : ''));

    /* Background circle */
    var bg = document.createElementNS(ns, 'circle');
    bg.setAttribute('cx', cx);
    bg.setAttribute('cy', cy);
    bg.setAttribute('r',  rOut);
    bg.style.fill = 'var(--color-bg-default)';
    svg.appendChild(bg);

    /* Arc segments — one per charger */
    for (var i = 0; i < N; i++) {
      var arc = document.createElementNS(ns, 'circle');
      arc.setAttribute('cx', cx);
      arc.setAttribute('cy', cy);
      arc.setAttribute('r',  rRng);
      arc.setAttribute('fill', 'none');
      arc.setAttribute('stroke-width',   sw);
      arc.setAttribute('stroke-linecap', 'butt');
      arc.setAttribute('stroke-dasharray', segLen.toFixed(2) + ' ' + C.toFixed(2));
      var rot = (-90 + i * (360 / N) + GAP / 2).toFixed(2);
      arc.setAttribute('transform', 'rotate(' + rot + ', ' + cx + ', ' + cy + ')');
      arc.style.stroke = chargers[i] === 'available'
        ? 'var(--color-action-success)'
        : 'var(--color-action-error)';
      svg.appendChild(arc);
    }

    /* Number label */
    var txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x',                   cx);
    txt.setAttribute('y',                   cy);
    txt.setAttribute('text-anchor',         'middle');
    txt.setAttribute('dominant-baseline',   'central');
    txt.setAttribute('font-size',           (size * 0.38).toFixed(1));
    txt.style.fill       = 'var(--color-gray-white, #ffffff)';
    txt.style.fontFamily = 'var(--font-display, system-ui, sans-serif)';
    txt.style.fontWeight = 'var(--font-weight-heavy, 800)';
    txt.textContent = N;
    svg.appendChild(txt);

    return svg;
  }

  global.createChargerPin = createChargerPin;
}(window));
