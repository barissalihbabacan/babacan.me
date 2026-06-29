// ── Mobile menu ──────────────────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ── Scroll: nav shadow ────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 1px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ── Project filter ────────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active', 'text-primary');
      b.classList.add('text-on-surface-variant');
    });
    btn.classList.add('active', 'text-primary');
    btn.classList.remove('text-on-surface-variant');

    const filter = btn.dataset.filter;
    document.querySelectorAll('#projects-grid [data-category]').forEach(card => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
      card.style.opacity = matches ? '1' : '0';
    });
  });
});

// ── GitHub API ────────────────────────────────────────────────────────────────

function el(tag, classes, attrs = {}) {
  const node = document.createElement(tag);
  if (classes) node.className = classes;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

function icon(name, size = 14) {
  const span = el('span', 'material-symbols-outlined');
  span.style.fontSize = `${size}px`;
  span.textContent = name;
  return span;
}

function buildRepoCard(repo) {
  const card = el('a',
    'border border-primary/30 p-6 hover:border-primary/30 transition-colors group block',
    { href: repo.html_url, target: '_blank', rel: 'noopener' });

  // Top row: label + external icon
  const topRow = el('div', 'flex items-start justify-between mb-3');
  const label = el('span', 'font-label-mono text-[9px] text-on-surface-variant/40 uppercase tracking-widest');
  label.textContent = repo.fork ? 'Fork' : 'Source';
  const extIcon = icon('open_in_new', 14);
  extIcon.className += ' text-on-surface-variant/30 group-hover:text-primary transition-colors';
  topRow.append(label, extIcon);

  // Name
  const name = el('h4', 'font-label-mono text-sm text-on-surface mb-2 group-hover:text-primary transition-colors truncate');
  name.textContent = repo.name;

  // Description
  const desc = el('p', 'font-body-md text-xs text-on-surface-variant/60 mb-4 leading-relaxed line-clamp-2');
  desc.textContent = repo.description ?? 'No description.';

  // Stats row
  const stats = el('div', 'flex items-center gap-4 text-on-surface-variant/40');

  const starWrap = el('span', 'flex items-center gap-1 font-label-mono text-[10px]');
  starWrap.append(icon('star', 12));
  starWrap.append(document.createTextNode(String(repo.stargazers_count ?? 0)));

  const forkWrap = el('span', 'flex items-center gap-1 font-label-mono text-[10px]');
  forkWrap.append(icon('fork_left', 12));
  forkWrap.append(document.createTextNode(String(repo.forks_count ?? 0)));

  stats.append(starWrap, forkWrap);

  if (repo.language) {
    const lang = el('span', 'font-label-mono text-[10px] text-secondary/60');
    lang.textContent = repo.language;
    stats.appendChild(lang);
  }

  card.append(topRow, name, desc, stats);
  return card;
}

const GITHUB_USER = 'barissalihbabacan';
const GITHUB_ORGS = {
  'org-sins':  'thesinsofthefathers',
  'org-osmos': 'Osmos-App',
};

// Language colour palette (subset of GitHub's colours)
const LANG_COLORS = {
  JavaScript: '#5eead4', TypeScript: '#2dd4bf', Python: '#14b8a6',
  Go: '#67e8f9', Dart: '#06b6d4', 'C++': '#0d9488', C: '#0f766e',
  CSS: '#99f6e4', HTML: '#a7f3d0', Shell: '#6ee7b7', Ruby: '#34d399',
  Rust: '#2dd4bf', Java: '#0891b2', Kotlin: '#22d3ee', Swift: '#5eead4',
};

function langColor(name) {
  return LANG_COLORS[name] ?? '#4fd1c5';
}

function setGridMsg(text) {
  const grid = document.getElementById('github-repos-grid');
  if (!grid) return;
  const wrap = document.createElement('div');
  wrap.className = 'border border-outline-variant/10 p-6 col-span-full text-center';
  const span = document.createElement('span');
  span.className = 'font-label-mono text-[10px] text-on-surface-variant/30 uppercase tracking-widest';
  span.textContent = text;
  wrap.appendChild(span);
  grid.replaceChildren(wrap);
}

// Cached repo lists for toggle
const repoCache = { personal: null };

function renderRepoGrid(repos) {
  const grid = document.getElementById('github-repos-grid');
  if (!grid) return;
  if (!repos || repos.length === 0) { setGridMsg('No public repositories.'); return; }
  const top = [...repos].sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)).slice(0, 6);
  grid.replaceChildren(...top.map(repo => buildRepoCard(repo)));
}

function activateTab(tab) {
  document.querySelectorAll('.repo-tab-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tab;
    btn.style.background = isActive ? 'rgba(20,184,166,0.08)' : '';
    btn.className = isActive
      ? 'repo-tab-btn font-label-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-primary/40 text-primary transition-colors'
      : 'repo-tab-btn font-label-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-outline-variant/20 text-on-surface-variant/40 hover:border-primary/30 hover:text-primary/60 transition-colors';
  });

  if (tab === 'personal') {
    renderRepoGrid(repoCache.personal);
    return;
  }

  const orgSlug = GITHUB_ORGS[tab];
  if (!orgSlug) return;

  if (repoCache[tab] !== undefined && repoCache[tab] !== null) {
    renderRepoGrid(repoCache[tab]);
    return;
  }

  setGridMsg('Loading org repositories…');
  const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('github_token');
  const headers = token ? { Authorization: `token ${token}` } : {};
  fetch(`https://api.github.com/orgs/${orgSlug}/repos?sort=stars&per_page=30`, { headers })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(repos => {
      repoCache[tab] = Array.isArray(repos) ? repos : [];
      renderRepoGrid(repoCache[tab]);
    })
    .catch(() => setGridMsg('Could not load org repositories.'));
}

document.querySelectorAll('.repo-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

const CACHE_KEY_USER = 'github_user_data';
const CACHE_KEY_REPOS = 'github_repos_data';
const CACHE_KEY_TIME = 'github_cache_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour

function populateGitHubData(user, repos) {
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
  const totalForks = repos.reduce((s, r) => s + (r.forks_count ?? 0), 0);

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const TOTAL_REPOS = (user.public_repos ?? 0) + (user.total_private_repos ?? 3);
  setText('hero-repos', TOTAL_REPOS);
  setText('hero-stars', totalStars > 0 ? totalStars : '—');
  setText('gh-stat-repos', TOTAL_REPOS);
  setText('gh-stat-stars', totalStars);
  setText('gh-stat-forks', totalForks);
  setText('gh-stat-followers', user.followers ?? '—');

  // ── Language distribution bars ───────────────────────────────────────
  const langCount = {};
  repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1; });

  const langSorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxCount = langSorted[0]?.[1] ?? 1;

  const langBars = document.getElementById('lang-bars');
  if (langBars && langSorted.length > 0) {
    langBars.replaceChildren(...langSorted.map(([lang, count]) => {
      const row = document.createElement('div');
      row.className = 'flex items-center gap-3';

      const label = document.createElement('span');
      label.className = 'font-label-mono text-[10px] text-on-surface-variant/60 w-20 flex-shrink-0';
      label.textContent = lang;

      const track = document.createElement('div');
      track.className = 'flex-1 h-1.5 bg-outline-variant/15 overflow-hidden';

      const fill = document.createElement('div');
      fill.className = 'h-full transition-all duration-700';
      fill.style.width = `${Math.round((count / maxCount) * 100)}%`;
      fill.style.backgroundColor = langColor(lang);

      const cnt = document.createElement('span');
      cnt.className = 'font-label-mono text-[10px] text-on-surface-variant/40 w-8 text-right flex-shrink-0';
      cnt.textContent = count;

      track.appendChild(fill);
      row.append(label, track, cnt);
      return row;
    }));
  }

  // ── Repo cards (top 6 by stars) ──────────────────────────────────────
  repoCache.personal = repos;
  renderRepoGrid(repos);
}

async function loadGitHub() {
  // 1. Try loading static build data
  try {
    const res = await fetch('/github-data.json');
    if (res.ok) {
      const staticData = await res.json();
      console.log('Loaded GitHub data from static build cache, generated at:', new Date(staticData.timestamp));

      // Save orgs repos to cache
      if (staticData.orgs) {
        Object.keys(staticData.orgs).forEach(key => {
          repoCache[key] = staticData.orgs[key];
        });
      }

      populateGitHubData(staticData.user, staticData.repos);
      return;
    }
  } catch (e) {
    console.log('Static build data not found, falling back to live API.');
  }

  // 2. Live API fallback
  const cachedUser = localStorage.getItem(CACHE_KEY_USER);
  const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
  const cachedTime = localStorage.getItem(CACHE_KEY_TIME);
  const now = Date.now();

  // If cache is fresh, load it immediately
  if (cachedUser && cachedRepos && cachedTime && (now - cachedTime < CACHE_DURATION)) {
    try {
      const user = JSON.parse(cachedUser);
      const repos = JSON.parse(cachedRepos);
      populateGitHubData(user, repos);
      return;
    } catch (e) {
      console.error('Error parsing cached GitHub data:', e);
    }
  }

  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('github_token');
    const headers = token ? { Authorization: `token ${token}` } : {};
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&per_page=30`, { headers }),
    ]);

    if (userRes.status === 403 || reposRes.status === 403 || !userRes.ok || !reposRes.ok) {
      // Fallback to stale cache if API fails (e.g. rate limit)
      if (cachedUser && cachedRepos) {
        console.warn('GitHub API failed or rate-limited. Loading stale cache.');
        populateGitHubData(JSON.parse(cachedUser), JSON.parse(cachedRepos));
        return;
      }
      setGridMsg('GitHub API rate limit reached — try again later.');
      return;
    }

    const user = await userRes.json();
    const repos = await reposRes.json();
    if (!Array.isArray(repos)) {
      if (cachedUser && cachedRepos) {
        populateGitHubData(JSON.parse(cachedUser), JSON.parse(cachedRepos));
        return;
      }
      setGridMsg('Could not load repositories.');
      return;
    }

    // Save to cache
    localStorage.setItem(CACHE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(CACHE_KEY_REPOS, JSON.stringify(repos));
    localStorage.setItem(CACHE_KEY_TIME, String(now));

    populateGitHubData(user, repos);

  } catch (err) {
    console.warn('Error fetching GitHub API, loading stale cache:', err);
    if (cachedUser && cachedRepos) {
      populateGitHubData(JSON.parse(cachedUser), JSON.parse(cachedRepos));
    } else {
      setGridMsg('Could not connect to GitHub API.');
      const langBarsEl = document.getElementById('lang-bars');
      if (langBarsEl) langBarsEl.replaceChildren();
    }
  }
}

loadGitHub();

// ── Project Modals ────────────────────────────────────────────────────────────

const PROJECT_DATA = {
  osmos: {
    title: 'Osmos',
    category: 'P2P · Local-First',
    categoryColor: 'text-primary border-primary/20',
    status: 'Alpha',
    statusColor: 'bg-primary/20 border border-primary/30 text-primary',
    year: '2026–',
    role: 'Architect & Lead Developer',
    cardGradient: 'linear-gradient(135deg, #0f3635 0%, #081e21 50%, #0a1214 100%)',
    description: 'Local-first, peer-to-peer version control & sync system for the Apple ecosystem. Powered by a Rust core and a native SwiftUI layer, Osmos aims to eliminate cloud dependency — giving creators total data sovereignty through a secure, offline-first architecture.',
    highlights: [
      'Rust core for performance and memory safety',
      'Native SwiftUI interface for macOS & iOS',
      'Zero cloud dependency — fully offline-first',
      'Peer-to-peer sync over local network',
    ],
    tech: ['Rust', 'SwiftUI', 'P2P', 'CRDTs', 'Local-First'],
  },
  sortify: {
    title: 'Sortify',
    category: 'Mobile · Full-Stack',
    categoryColor: 'text-secondary border-secondary/20',
    status: 'Active',
    statusColor: 'bg-secondary/20 border border-secondary/30 text-secondary',
    year: 'Active',
    role: 'CTO · Project Manager · Lead Developer',
    cardGradient: 'linear-gradient(135deg, #0b3a42 0%, #072228 50%, #0a1214 100%)',
    description: 'Mobile application built under the Garage.ist umbrella. Serving as CTO, Project Manager, and Lead Developer — orchestrating the full development lifecycle and App Store launches for both iOS and Android.',
    highlights: [
      'Built under Garage.ist umbrella',
      'Full product development lifecycle ownership',
      'iOS & Android App Store launches',
      'SwiftUI native iOS interface',
      'Node.js + TypeScript backend API',
    ],
    tech: ['SwiftUI', 'Node.js', 'TypeScript'],
  },
  qpass: {
    title: 'Q-PASS',
    category: 'Hardware · IoT',
    categoryColor: 'text-tertiary border-tertiary/20',
    status: 'Active Production',
    statusColor: 'bg-tertiary/20 border border-tertiary/30 text-tertiary',
    year: 'Active',
    role: 'Engineer',
    cardGradient: 'linear-gradient(135deg, #062f33 0%, #031c20 50%, #0a1214 100%)',
    description: 'Engineered a real-world RFID access control system securing a public institution. Integrated C++ (Arduino) firmware with a Python/PHP/MySQL backend via serial communications — end-to-end hardware–software integration in a live environment.',
    highlights: [
      'Securing a real public institution in production',
      'End-to-end hardware–software integration',
      'C++ Arduino microcontroller firmware',
      'Serial communication bridge to web backend',
      'PHP/MySQL web management interface',
    ],
    tech: ['C++ / Arduino', 'Python', 'PHP', 'MySQL', 'RFID', 'Serial'],
  },
  'plus-tv': {
    title: '+TV',
    category: 'Mobile · Full-Stack',
    categoryColor: 'text-secondary border-secondary/20',
    status: 'Launched',
    statusColor: 'bg-secondary/20 border border-secondary/30 text-secondary',
    year: 'Garage.ist',
    role: 'Lead Developer',
    cardGradient: 'linear-gradient(135deg, #0d382f 0%, #06201b 50%, #0a1214 100%)',
    description: 'TV remote control application that operates over a local network. Built at Garage.ist as Lead Developer — designed the control protocol, architected core systems, and managed all technical operations end-to-end.',
    highlights: [
      'Network-based TV control protocol design',
      'Core system architecture from the ground up',
      'Full technical operations at Garage.ist',
      'End-to-end development lifecycle ownership',
    ],
    tech: ['Lead Dev', 'Garage.ist'],
  },
  itrms: {
    title: 'IT-RMS',
    category: 'Enterprise · Full-Stack',
    categoryColor: 'text-primary border-primary/20',
    status: 'Deployed',
    statusColor: 'bg-primary/20 border border-primary/30 text-primary',
    year: '2023',
    role: 'Developer',
    cardGradient: 'linear-gradient(135deg, #0d353a 0%, #051d20 50%, #0a1214 100%)',
    description: 'Built a multi-branch IT Resource Management System. Migrated a monolithic PHP codebase to Node.js/NoSQL. Implemented barcode generation pipelines and role-based access control across branches.',
    highlights: [
      'Multi-branch support across locations',
      'PHP → Node.js/NoSQL architecture migration',
      'Barcode generation pipeline',
      'Role-based access control (RBAC)',
    ],
    tech: ['Node.js', 'NoSQL', 'RBAC', 'Barcode', 'PHP'],
  },
};

const modal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');

function openModal(projectKey) {
  const data = PROJECT_DATA[projectKey];
  if (!data || !modal) return;

  const imageWrap = document.getElementById('modal-image-wrap');
  if (imageWrap && data.cardGradient) imageWrap.style.background = data.cardGradient;

  const badge = document.getElementById('modal-status-badge');
  badge.textContent = data.status;
  badge.className = `absolute top-4 left-4 font-label-mono text-[9px] px-2 py-0.5 uppercase tracking-widest ${data.statusColor}`;

  const cat = document.getElementById('modal-category');
  cat.textContent = data.category;
  cat.className = `font-label-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 ${data.categoryColor}`;

  document.getElementById('modal-year').textContent = data.year;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-role').textContent = data.role;
  document.getElementById('modal-desc').textContent = data.description;

  const ul = document.getElementById('modal-highlights');
  ul.replaceChildren(...data.highlights.map(h => {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-3 text-xs text-on-surface-variant/70';
    const dot = document.createElement('span');
    dot.className = 'text-primary mt-0.5 flex-shrink-0';
    dot.textContent = '—';
    const txt = document.createElement('span');
    txt.textContent = h;
    li.append(dot, txt);
    return li;
  }));

  const techWrap = document.getElementById('modal-tech');
  techWrap.replaceChildren(...data.tech.map(t => {
    const span = document.createElement('span');
    span.className = 'font-label-mono text-[9px] text-on-surface-variant/50 border border-outline-variant/20 px-2 py-0.5';
    span.textContent = t;
    return span;
  }));

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
