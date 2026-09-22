const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");

menuBtn.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

$$(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(element => revealObserver.observe(element));

const skillData = {
  html: {
    title: "HTML",
    description: "Estructuración y creación de contenido web.",
    progress: 82,
    extra: "Base para construir páginas web accesibles y bien estructuradas."
  },
  css: {
    title: "CSS",
    description: "Diseño, estilos y maquetación web.",
    progress: 78,
    extra: "Permite crear interfaces visuales, responsive y adaptadas a distintos dispositivos."
  },
  javascript: {
    title: "JavaScript",
    description: "Programación de interacciones y comportamiento dinámico.",
    progress: 70,
    extra: "Tecnología utilizada en este propio CV para añadir funcionalidades interactivas."
  },
  wordpress: {
    title: "WordPress",
    description: "Gestión y edición de contenidos web.",
    progress: 68,
    extra: "Formación orientada a la gestión y publicación de contenidos mediante WordPress."
  }
};

function selectSkill(key) {
  const data = skillData[key];
  if (!data) return;

  $("#skillTitle").textContent = data.title;
  $("#skillDescription").textContent = data.description;
  $("#skillExtra").textContent = data.extra;
  $("#skillProgress").style.width = `${data.progress}%`;

  $$(".skill-card").forEach(card => {
    card.classList.toggle("active", card.dataset.skill === key);
  });
}

$$(".skill-card").forEach(card => {
  card.addEventListener("click", () => selectSkill(card.dataset.skill));
});

$$(".skill-tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const key = tag.dataset.skill;
    if (skillData[key]) {
      selectSkill(key);
      $("#skills").scrollIntoView({ behavior: "smooth" });
    } else {
      showToast(`Conocimiento: ${tag.textContent}`);
    }
  });
});

const projectData = {
  responsive: {
    title: "Página web responsive",
    text: "Aplicación de conocimientos de HTML y CSS para estructurar y maquetar una página adaptable a diferentes tamaños de pantalla."
  },
  javascript: {
    title: "Interactividad con JavaScript",
    text: "Creación de funcionalidades como navegación dinámica, botones, modales, selección de contenidos y manipulación del DOM."
  },
  accessibility: {
    title: "Web accesible",
    text: "Aplicación de conceptos de usabilidad, accesibilidad web y estándares W3C durante el proceso de desarrollo y publicación."
  }
};

const modal = $("#projectModal");

$$(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    $("#modalTitle").textContent = project.title;
    $("#modalText").textContent = project.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$("#closeModal").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

$$(".copy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      showToast("Email copiado al portapapeles ✓");
    } catch {
      showToast("No se pudo copiar automáticamente.");
    }
  });
});

let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

$("#printBtn").addEventListener("click", () => {
  window.print();
});

const topBtn = $("#topBtn");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 600);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const availabilityText = $("#availabilityText");
const hour = new Date().getHours();

if (hour >= 9 && hour < 19) {
  availabilityText.textContent = "Disponible para aprender y crecer profesionalmente";
} else {
  availabilityText.textContent = "Perfil disponible para nuevas oportunidades";
}

const themeBtn = $("#themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const darkMode = document.body.classList.contains("dark-mode");

  themeBtn.textContent = darkMode ? "☀️" : "🌙";

  themeBtn.setAttribute(
    "aria-label",
    darkMode ? "Activar modo claro" : "Activar modo oscuro"
  );

  localStorage.setItem("darkMode", darkMode);
});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  themeBtn.textContent = "☀️";
  themeBtn.setAttribute("aria-label", "Activar modo claro");
}