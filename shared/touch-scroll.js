/* Emula scroll por arrasto (touch) via mouse — usado na Home (site-desktop/index.html,
   vista tanto larga quanto dentro do mockup de celular em site-mobile/prototipo.html)
   pra testar como se fosse um toque real, sem depender da barra de rolagem.
   Só ativa abaixo de 640px — acima disso não deve interferir no mouse comum
   (seleção de texto, arrastar, etc. continuam funcionando normal no desktop). */
(() => {
  const MOBILE_BREAKPOINT = 640;
  let isDown = false;
  let dragged = false;
  let startY = 0;
  let startScroll = 0;
  const DRAG_THRESHOLD = 6;

  function isMobileWidth() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  document.addEventListener('mousedown', (e) => {
    if (!isMobileWidth()) return;
    isDown = true;
    dragged = false;
    startY = e.clientY;
    startScroll = window.scrollY;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const delta = e.clientY - startY;
    if (Math.abs(delta) > DRAG_THRESHOLD) dragged = true;
    if (dragged) {
      e.preventDefault();
      window.scrollTo(0, startScroll - delta);
    }
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    /* Se o mouseup terminar fora do elemento do mousedown, nenhum "click" é
       disparado — sem este reset, "dragged" ficaria travado em true e
       bloquearia o próximo clique real da página. */
    if (dragged) setTimeout(() => { dragged = false; }, 0);
  });
  document.addEventListener('mouseleave', () => { isDown = false; });

  /* Evita que o "arrasto" dispare cliques em links/botões */
  document.addEventListener('click', (e) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }
  }, true);
})();
