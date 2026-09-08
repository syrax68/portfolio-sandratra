import { setupWaterEffects } from './water-effects';

const root = document.documentElement;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle = document.querySelector<HTMLButtonElement>('#motion-toggle');
const motionLabel = document.querySelector('#motion-label');
let reduced = motionPreference.matches;
try { const saved = localStorage.getItem('sandratra-reduced-motion'); if (saved !== null) reduced = saved === 'true' || motionPreference.matches; } catch {}
const waterEffects = setupWaterEffects(() => reduced);
function applyMotion() {
  root.classList.toggle('reduce-motion', reduced);
  if (motionToggle) motionToggle.disabled = motionPreference.matches;
  motionToggle?.setAttribute('aria-pressed', String(reduced));
  motionToggle?.setAttribute('aria-label', motionPreference.matches ? 'Animations réduites selon vos préférences système' : reduced ? 'Activer les animations' : 'Réduire les animations');
  if (motionLabel) motionLabel.textContent = reduced ? 'MOUVEMENT OFF' : 'MOUVEMENT ON';
  if (reduced) {
    resetScene();
    waterEffects.clear();
  }
}
motionToggle?.addEventListener('click', () => {
  reduced = !reduced;
  try { localStorage.setItem('sandratra-reduced-motion', String(reduced)); } catch {}
  applyMotion();
});
motionPreference.addEventListener('change', event => { reduced = event.matches; applyMotion(); });

// Animate only elements outside the initial view. The document is readable without JS.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('pending'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.07 });
document.querySelectorAll<HTMLElement>('.reveal').forEach(element => {
  if (!reduced && element.getBoundingClientRect().top > innerHeight) element.classList.add('pending');
  revealObserver.observe(element);
});

const hero = document.querySelector<HTMLElement>('.hero');
let frame = 0;
let pointerX = 0;
let pointerY = 0;
function resetScene() {
  cancelAnimationFrame(frame); frame = 0;
  ['--scene-x', '--scene-y', '--compass-x', '--compass-y', '--needle'].forEach(property => hero?.style.removeProperty(property));
  document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => card.style.removeProperty('transform'));
}
hero?.addEventListener('pointermove', event => {
  if (reduced || !finePointer.matches) return;
  const bounds = hero.getBoundingClientRect();
  pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
  pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    hero.style.setProperty('--scene-x', `${pointerX * -12}px`);
    hero.style.setProperty('--scene-y', `${pointerY * -9}px`);
    hero.style.setProperty('--compass-x', `${pointerY * -18}deg`);
    hero.style.setProperty('--compass-y', `${pointerX * 28 - 12}deg`);
    hero.style.setProperty('--needle', `${pointerX * 70}deg`);
    frame = 0;
  });
});
hero?.addEventListener('pointerleave', resetScene);
document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (reduced || !finePointer.matches) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `rotateX(${y * -12}deg) rotateY(${x * 12}deg) rotateZ(-3deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.removeProperty('transform'));
});
applyMotion();

const journeyToggle = document.querySelector<HTMLButtonElement>('#journey-toggle');
const earlierJourney = document.querySelector<HTMLElement>('#earlier-journey');
journeyToggle?.addEventListener('click', () => {
  if (!earlierJourney) return;
  const expanded = journeyToggle.getAttribute('aria-expanded') !== 'true';
  earlierJourney.hidden = !expanded;
  journeyToggle.setAttribute('aria-expanded', String(expanded));
  const label = journeyToggle.querySelector('span');
  const sign = journeyToggle.querySelector('.toggle-sign');
  if (label) label.textContent = expanded ? 'Refermer le carnet de bord' : 'Voir les 7 premières escales';
  if (sign) sign.textContent = expanded ? '−' : '+';
  if (!expanded) journeyToggle.scrollIntoView({ block: 'nearest', behavior: reduced ? 'instant' : 'smooth' });
});
function openMissionFromHash() {
  if (!location.hash.startsWith('#mission-')) return;
  const mission = document.getElementById(location.hash.slice(1));
  if (mission instanceof HTMLDetailsElement) {
    mission.open = true;
    mission.scrollIntoView({ block: 'start', behavior: reduced ? 'instant' : 'smooth' });
  }
}
document.querySelectorAll<HTMLAnchorElement>('.project-art').forEach(link => link.addEventListener('click', () => {
  const mission = document.getElementById(link.hash.slice(1));
  if (mission instanceof HTMLDetailsElement) mission.open = true;
}));
window.addEventListener('hashchange', openMissionFromHash);
openMissionFromHash();

const copyButton = document.querySelector<HTMLButtonElement>('#copy-email');
const copyStatus = document.querySelector<HTMLElement>('#copy-status');
let copyTimer: ReturnType<typeof setTimeout>;
copyButton?.addEventListener('click', async () => {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText('syraxrakotonarivo@gmail.com');
    if (copyStatus) copyStatus.textContent = 'Adresse copiée. À très vite !';
    copyButton.setAttribute('aria-label', 'Adresse e-mail copiée');
  } catch {
    if (copyStatus) copyStatus.textContent = 'Copie indisponible. Sélectionnez l’adresse ou cliquez dessus.';
  }
  copyTimer = setTimeout(() => {
    if (copyStatus) copyStatus.textContent = '';
    copyButton.setAttribute('aria-label', 'Copier l’adresse e-mail');
  }, 4500);
});
