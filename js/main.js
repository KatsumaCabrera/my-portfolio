const translations = {
  en: {
    tagline: 'Computer Engineering Student',
    nav_about: 'About',
    nav_lang: 'Languages',
    lang_title: 'Languages',
    lang_es: 'Spanish',
    lang_en: 'English',
    lang_native: 'Native',
    lang_c2: 'Advanced · C2',
    copied: 'Copied!',
    copyAria: 'Copy email',
    nav_skills: 'Skills',
    nav_edu: 'Education',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    available: 'Available for work',
    download_cv: 'Download CV',
    edu_date: '2022 — Present · 4th year',
    edu_text: 'Building a solid foundation in programming, algorithms, databases and computer systems.',
    scroll: 'See more',
    about_title: 'About me',
    about_text: "I'm a fourth-year Computer Engineering student at Universidad de la República (UdelaR), Uruguay. I enjoy solving real problems with software, testing what I build and improving it based on what I learn.",
    about_goal: "I'm looking for my first internship or junior role, where I can contribute and learn from an experienced team.",
    projects_title: 'Projects',
    status_progress: 'In progress',
    p0_name: 'Personal project',
    p0_desc: 'Web app to practice job interviews: the browser transcribes the answer and measures pitch and volume while you speak, and the server analyzes more than 15 aspects of speech (pace, filler words, pauses, intonation, repetitions) and compares each practice with the previous one.',
    p1_name: 'Software Engineering Project (PIS)',
    p1_desc: 'University team project (2026). Web platform for psychological questionnaires for the School of Psychology: researchers design them and organize them by research project, participants complete them with or without an account, and the platform calculates their results.',
    skills_title: 'Skills',
    skills_lang: 'Languages',
    skills_db: 'Databases',
    edu_title: 'Education',
    edu_degree: 'Computer Engineering',
    edu_year: 'Currently in 4th year',
    contact_title: 'Contact',
    contact_text: "I'm open to internships and junior positions. Feel free to reach out!",
    langLabel: 'ES',
    langAriaLabel: 'Cambiar idioma a español',
    themeAriaLabel: 'Switch theme'
  },
  es: {
    tagline: 'Estudiante de Ingeniería en Computación',
    nav_about: 'Sobre mí',
    nav_lang: 'Idiomas',
    lang_title: 'Idiomas',
    lang_es: 'Español',
    lang_en: 'Inglés',
    lang_native: 'Nativo',
    lang_c2: 'Avanzado · C2',
    copied: '¡Copiado!',
    copyAria: 'Copiar email',
    nav_skills: 'Habilidades',
    nav_edu: 'Formación',
    nav_projects: 'Proyectos',
    nav_contact: 'Contacto',
    available: 'Disponible para trabajar',
    download_cv: 'Descargar CV',
    edu_date: '2022 — Actualidad · 4.º año',
    edu_text: 'Formándome con una base sólida en programación, algoritmos, bases de datos y sistemas de computación.',
    scroll: 'Ver más',
    about_title: 'Sobre mí',
    about_text: 'Soy estudiante de cuarto año de Ingeniería en Computación en la Universidad de la República (UdelaR), Uruguay. Disfruto resolver problemas reales con software, probar lo que construyo y mejorarlo a partir de lo que aprendo.',
    about_goal: 'Busco mi primera pasantía o puesto junior donde pueda aportar y aprender de un equipo con experiencia.',
    projects_title: 'Proyectos',
    status_progress: 'En progreso',
    p0_name: 'Proyecto personal',
    p0_desc: 'Aplicación web para practicar entrevistas: el navegador transcribe la respuesta y mide tono y volumen mientras se habla, y el servidor analiza más de 15 aspectos del habla (ritmo, muletillas, pausas, entonación, repeticiones) y compara cada práctica con la anterior.',
    p1_name: 'Proyecto de Ingeniería de Software (PIS)',
    p1_desc: 'Proyecto en equipo de la facultad (2026). Plataforma web de cuestionarios psicológicos para la Facultad de Psicología: los investigadores los diseñan y organizan por proyecto de investigación, los participantes los completan con o sin cuenta, y la plataforma calcula sus resultados.',
    skills_title: 'Habilidades',
    skills_lang: 'Lenguajes',
    skills_db: 'Bases de datos',
    edu_title: 'Formación',
    edu_degree: 'Ingeniería en Computación',
    edu_year: 'Cursando 4.º año',
    contact_title: 'Contacto',
    contact_text: 'Estoy abierto a pasantías y puestos junior. ¡Escribime!',
    langLabel: 'EN',
    langAriaLabel: 'Switch language to English',
    themeAriaLabel: 'Cambiar tema'
  }
};

const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('lang-toggle');
let currentLanguage = document.documentElement.lang === 'es' ? 'es' : 'en';

function save(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

function applyLanguage(language) {
  const content = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (content[key] !== undefined) el.textContent = content[key];
  });
  languageToggle.querySelector('[data-i18n="lang_label"]').textContent = content.langLabel;
  languageToggle.setAttribute('aria-label', content.langAriaLabel);
  themeToggle.setAttribute('aria-label', content.themeAriaLabel);
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) copyBtn.setAttribute('aria-label', content.copyAria);
  // El CV se descarga en el idioma de la página
  const cvLink = document.getElementById('cv-link');
  if (cvLink) cvLink.setAttribute('href', language === 'es' ? 'assets/CV-Katsuma-Cabrera.pdf' : 'assets/CV-Katsuma-Cabrera-EN.pdf');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  save('kc-theme', next);
});

languageToggle.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
  applyLanguage(currentLanguage);
  save('kc-lang', currentLanguage);
});

// Aparición suave de secciones al hacer scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Barra de navegación con fondo al bajar
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('nav--scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Copiar email
const copyBtn = document.getElementById('copy-email');
const copyMsg = document.getElementById('copy-msg');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (err) {}
      t.remove();
    }
    copyMsg.classList.add('is-visible');
    clearTimeout(copyBtn._t);
    copyBtn._t = setTimeout(() => copyMsg.classList.remove('is-visible'), 1600);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

applyLanguage(currentLanguage);
