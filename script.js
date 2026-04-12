/* ===========================
  AGENTIC AI UCIC - INTERACTIVE SCRIPT
   =========================== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  fx += (mouseX - fx) * 0.12;
  fy += (mouseY - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
    backTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('show');
  }
  // Active nav link
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
});

// ===== BACK TO TOP =====
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');        // legacy compat
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';   // cegah scroll di belakang
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

// Tutup menu saat klik link di dalam overlay
document.querySelectorAll('[data-mobile-link]').forEach(a => {
  a.addEventListener('click', () => closeMobileMenu());
});

// Tutup menu saat klik di luar konten (tepian overlay)
mobileMenu.addEventListener('click', e => {
  if (e.target === mobileMenu) closeMobileMenu();
});

// Tutup menu saat tekan Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== AOS (ANIMATE ON SCROLL) =====
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.aosDelay ? parseInt(el.dataset.aosDelay) : 0;
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 20 : 50;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur = 6 + Math.random() * 10;
    const opacity = 0.08 + Math.random() * 0.25;

    Object.assign(p.style, {
      position: 'absolute',
      left: x + '%',
      top: y + '%',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: Math.random() > 0.5 ? '#FFD700' : '#3B8FE0',
      opacity: opacity,
      animation: `particleFloat ${dur}s ${delay}s ease-in-out infinite alternate`,
      pointerEvents: 'none',
    });
    container.appendChild(p);
  }

  // Inject keyframes
  if (!document.querySelector('#particle-kf')) {
    const style = document.createElement('style');
    style.id = 'particle-kf';
    style.textContent = `
      @keyframes particleFloat {
        from { transform: translate(0, 0) scale(1); }
        to { transform: translate(${Math.random() > .5 ? '' : '-'}${20 + Math.random()*30}px, ${Math.random() > .5 ? '' : '-'}${20 + Math.random()*30}px) scale(${0.5 + Math.random()}); }
      }
    `;
    document.head.appendChild(style);
  }
}
createParticles();

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');

  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });

    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== BENEFIT CARD TILT =====
document.querySelectorAll('.benefit-card, .target-card, .focus-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TYPING EFFECT on Hero Badge =====
function typeEffect(element, texts, speed = 80) {
  let tIdx = 0, cIdx = 0, deleting = false;
  const baseText = '● ';

  function type() {
    const current = texts[tIdx];
    if (!deleting) {
      element.textContent = baseText + current.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      element.textContent = baseText + current.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? speed / 2 : speed);
  }
  type();
}

const badgeEl = document.querySelector('.hero-badge');
if (badgeEl) {
  typeEffect(badgeEl, [
    'Open for Submission 2026',
    'Pendanaan 100% Gratis',
    'Untuk SMA/SMK, Mahasiswa & Fresh Graduate',
    'Inovasi Robotik & AIoT'
  ], 60);
}

// ===== SCROLL REVEAL for progress bars =====
const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.animation = 'none';
        bar.offsetHeight; // trigger reflow
        bar.style.animation = 'fillProgress 1.5s ease forwards';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-card').forEach(c => progressObserver.observe(c));

// ===== GLITTER EFFECT on CTA buttons =====
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', e => {
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('span');
      Object.assign(sparkle.style, {
        position: 'fixed',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: '#FFD700',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        animation: `sparkleAnim 0.7s ease forwards`,
        '--tx': (Math.random() - 0.5) * 80 + 'px',
        '--ty': (Math.random() - 0.5) * 80 + 'px',
      });
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 700);
    }
  });
});

// Sparkle keyframe
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleAnim {
    0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
    100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(sparkleStyle);

// ===== SCROLL PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position: 'fixed', top: '0', left: '0', height: '3px',
  background: 'linear-gradient(90deg, #FFD700, #1E6FC0)',
  zIndex: '10001', width: '0%', transition: 'width 0.1s ease',
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// ===== ACTIVE SECTION HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link, .mobile-nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(l => l.classList.remove('active'));
      document.querySelectorAll(`.nav-link[href="#${entry.target.id}"], .mobile-nav-link[href="#${entry.target.id}"]`).forEach(m => m.classList.add('active'));
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== FOCUS CARD animated orbs =====
document.querySelectorAll('.focus-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    card.querySelectorAll('.orb').forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${(x - 50) * factor * 0.3}px, ${(y - 50) * factor * 0.3}px)`;
    });
  });
  card.addEventListener('mouseleave', () => {
    card.querySelectorAll('.orb').forEach(orb => { orb.style.transform = ''; });
  });
});

// ===== STEP HOVER GLOW =====
document.querySelectorAll('.flow-step').forEach(step => {
  step.addEventListener('mouseenter', () => {
    const icon = step.querySelector('.step-icon');
    if (icon) {
      icon.style.boxShadow = '0 0 20px rgba(255,215,0,0.4)';
      icon.style.background = 'rgba(255,215,0,0.25)';
    }
  });
  step.addEventListener('mouseleave', () => {
    const icon = step.querySelector('.step-icon');
    if (icon) {
      icon.style.boxShadow = '';
      icon.style.background = '';
    }
  });
});
// SCROLL PARALLAX - safely handle campus image
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const img = document.querySelector(".campus-wrapper");
  if (img && scroll < window.innerHeight) {
    img.style.transform = `translateY(${scroll * 0.04}px)`;
  }
});

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== CURSOR HOVER EXPAND =====
document.querySelectorAll('a, button, .faq-q, .benefit-card, .target-card, .focus-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      cursor.style.opacity = '0.7';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.opacity = '1';
    }
  });
});

// ===== SMOOTH STAT NUMBER SCALE ON HOVER =====
document.querySelectorAll('.stat-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const num = item.querySelector('.stat-num');
    if (num) { num.style.transform = 'scale(1.12)'; num.style.transition = 'transform 0.3s ease'; }
  });
  item.addEventListener('mouseleave', () => {
    const num = item.querySelector('.stat-num');
    if (num) { num.style.transform = ''; }
  });
});

// ===== REQUIREMENT ITEM ENTRANCE =====
const reqObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.req-item');
      items.forEach((item, idx) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, idx * 120);
      });
      reqObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const reqList = document.querySelector('.req-list');
if (reqList) {
  reqList.querySelectorAll('.req-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  reqObserver.observe(reqList);
}

console.log('%c🚀 AGENTIC AI UCIC', 'color:#FFD700;font-size:1.5rem;font-weight:bold;');
console.log('%cPowered by UCIC', 'color:#3B8FE0;font-size:0.9rem;');
