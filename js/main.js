// ===== CURSOR GLOW =====
const glow = document.getElementById("cursorGlow");
if (glow) {
  let mx = 0,
    my = 0,
    cx = 0,
    cy = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  (function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + "px";
    glow.style.top = cy + "px";
    requestAnimationFrame(animate);
  })();
}

// ===== NAV =====
const nav = document.getElementById("nav");
const navBtn = document.getElementById("navMobileBtn");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
});

if (navBtn && mobileMenu) {
  navBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ===== PARTICLES =====
const particlesEl = document.getElementById("particles");
if (particlesEl) {
  const colors = ["#4f8fff", "#8b5cf6", "#22d3ee", "#34d399", "#f472b6"];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--delay", Math.random() * 12 + "s");
    p.style.setProperty("--dur", 8 + Math.random() * 8 + "s");
    const s = 1 + Math.random() * 3;
    p.style.width = s + "px";
    p.style.height = s + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particlesEl.appendChild(p);
  }
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
          // Animate score bars
          entry.target.querySelectorAll(".sc-fill").forEach((bar) => {
            bar.style.transform = "scaleX(1)";
          });
        }, parseInt(delay));
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.max(1, target / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 35);
  });
}

const heroCounters = document.querySelector(".hero-counters");
if (heroCounters) {
  const cObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          cObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  cObserver.observe(heroCounters);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ===== CARD TILT =====
document.querySelectorAll(".showcase-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * 8;
    const ry = (0.5 - x) * 8;
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll(".btn-glow").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});
