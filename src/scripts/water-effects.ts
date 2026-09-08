export function setupWaterEffects(isReduced: () => boolean) {
  const layer = document.querySelector<HTMLElement>('#water-effects');
  const cleanups = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

  function removeRipple(ripple: HTMLElement) {
    clearTimeout(cleanups.get(ripple));
    cleanups.delete(ripple);
    ripple.remove();
  }

  function clear() {
    for (const ripple of cleanups.keys()) removeRipple(ripple);
  }

  document.addEventListener('click', event => {
    // Keyboard activation has no pointer position and should not create a splash.
    if (!layer || isReduced() || event.button !== 0 || event.detail === 0) return;

    // Keep rapid clicks from accumulating decorative elements.
    if (cleanups.size >= 6) {
      const oldest = cleanups.keys().next().value;
      if (oldest) removeRipple(oldest);
    }

    const ripple = document.createElement('span');
    ripple.className = 'water-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    for (const className of ['water-ring', 'water-ring water-ring--echo']) {
      const ring = document.createElement('span');
      ring.className = className;
      ripple.append(ring);
    }

    for (const [x, y] of [[-28, -23], [26, -29], [-37, 12], [32, 18]]) {
      const drop = document.createElement('span');
      drop.className = 'water-drop';
      drop.style.setProperty('--drop-x', `${x}px`);
      drop.style.setProperty('--drop-y', `${y}px`);
      ripple.append(drop);
    }

    layer.append(ripple);
    cleanups.set(ripple, setTimeout(() => removeRipple(ripple), 1000));
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clear();
  });

  return { clear };
}
