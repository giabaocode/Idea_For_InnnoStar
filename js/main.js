// Cursor glow
const glow = document.getElementById("cursorGlow");
if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// Nav scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav && nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Particles
const particlesEl = document.getElementById("particles");
if (particlesEl) {
  const colors = ["#4f8fff", "#8b5cf6", "#22d3ee", "#34d399"];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 10 + "s";
    p.style.animationDuration = 7 + Math.random() * 6 + "s";
    const s = 1 + Math.random() * 3;
    p.style.width = s + "px";
    p.style.height = s + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particlesEl.appendChild(p);
  }
}

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(
          () => entry.target.classList.add("visible"),
          parseInt(delay),
        );
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      const top = t.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// Card tilt
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y - r.height / 2) / 20;
    const ry = (r.width / 2 - x) / 20;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
