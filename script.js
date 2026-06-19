document.documentElement.classList.add('js');

const filterButtons = Array.from(document.querySelectorAll('.filter'));
const helperCards = Array.from(document.querySelectorAll('.helper-card'));
const navLinks = Array.from(document.querySelectorAll('.top-nav a'));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function setFilter(filter) {
  filterButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  });

  helperCards.forEach(card => {
    const lenses = (card.dataset.lens || '').split(/\s+/).filter(Boolean);
    const show = filter === 'all' || lenses.includes(filter);
    card.classList.toggle('is-hidden', !show);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter || 'all'));
});

setFilter('all');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    });
  }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}

const revealTargets = document.querySelectorAll('.reveal-block, .overview-card, .principle-card, .helper-card, .consultant-card, .sequence-card, .governance-card');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
