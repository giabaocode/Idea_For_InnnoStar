// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  lastScroll = currentScroll;
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById("particles");
  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = 6 + Math.random() * 6 + "s";

    const size = 1 + Math.random() * 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    const colors = ["#4f8fff", "#8b5cf6", "#22d3ee", "#34d399"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

createParticles();

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -60px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, parseInt(delay));

      // Animate score bars inside this element
      const bars = entry.target.querySelectorAll(".score-fill");
      bars.forEach((bar, i) => {
        setTimeout(
          () => {
            bar.style.width = bar.dataset.width + "%";
          },
          300 + i * 100,
        );
      });
    }
  });
}, observerOptions);

document.querySelectorAll("[data-animate]").forEach((el) => {
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count);
    if (isNaN(target)) return;

    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 40);
  });
}

// Trigger counters when hero stats are visible
const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  statsObserver.observe(heroStats);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll(".project").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "translateY(0) perspective(1000px) rotateX(0) rotateY(0)";
  });
});
