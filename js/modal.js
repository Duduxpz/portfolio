// Project content stays in the semantic cards for SEO and is read as configuration here.
const projectCards = [...document.querySelectorAll('#projects .proj-card')];
const parseList = (value) => {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const projects = projectCards.map((card) => {
  const image = card.querySelector('.proj-image');
  const liveLink = card.querySelector('.btn-project-link');
  return {
    title: card.querySelector('h3')?.textContent.trim() || 'Projeto',
    subtitle: card.dataset.subtitle || '',
    description: card.querySelector('.proj-body > p')?.textContent.trim() || '',
    technologies: [...card.querySelectorAll('.proj-tag')].map((tag) => tag.textContent.trim()),
    gallery: parseList(card.dataset.gallery).length
      ? parseList(card.dataset.gallery)
      : image ? [image.getAttribute('src')] : [],
    url: liveLink?.href || '',
    repoUrl: card.dataset.repoUrl || '',
    features: parseList(card.dataset.features),
    imageAlt: image?.alt || '',
    imagePosition: card.dataset.imagePosition || 'center',
    note: card.dataset.note || ''
  };
});

const overlay = document.getElementById('modalOverlay');
const dialog = overlay.querySelector('.modal');
const title = document.getElementById('modalTitle');
const subtitle = document.getElementById('modalSubtitle');
const description = document.getElementById('modalDesc');
const tags = document.getElementById('modalTags');
const features = document.getElementById('modalFeatures');
const screenshot = document.getElementById('modalScreenshot');
const browserUrl = document.getElementById('browserUrl');
const demoButton = document.getElementById('demoBtn');
const repoButton = document.getElementById('repoBtn');
const note = document.getElementById('projectNote');
const galleryControls = document.getElementById('galleryControls');
const galleryCount = document.getElementById('galleryCount');
const imageFallback = document.getElementById('imageFallback');
let selectedProject = null;
let selectedImage = 0;
let returnFocusTo = null;

function renderGalleryImage() {
  const image = selectedProject?.gallery?.[selectedImage];
  screenshot.classList.add('is-changing');
  imageFallback.hidden = true;

  if (!image) {
    screenshot.removeAttribute('src');
    screenshot.hidden = true;
    imageFallback.hidden = false;
    return;
  }

  screenshot.hidden = false;
  screenshot.alt = selectedProject.imageAlt || `Preview de ${selectedProject.title} — imagem ${selectedImage + 1}`;
  screenshot.style.objectPosition = selectedProject.imagePosition || 'center';
  screenshot.src = image;
  galleryCount.textContent = `${selectedImage + 1} / ${selectedProject.gallery.length}`;
}

function openModal(index, trigger) {
  const project = projects[index];
  if (!project) return;

  selectedProject = project;
  selectedImage = 0;
  returnFocusTo = trigger || document.activeElement;
  title.textContent = project.title;
  subtitle.textContent = project.subtitle || '';
  description.textContent = project.description || '';
  browserUrl.textContent = project.url ? new URL(project.url).host : 'Preview local';
  demoButton.href = project.url || '#';
  demoButton.hidden = !project.url;
  repoButton.href = project.repoUrl || '#';
  repoButton.hidden = !project.repoUrl;
  note.textContent = project.note || '';
  note.hidden = !project.note;

  tags.replaceChildren(...(project.technologies || []).map((technology) => {
    const tag = document.createElement('span');
    tag.className = 'modal-tag';
    tag.textContent = technology;
    return tag;
  }));
  features.replaceChildren(...(project.features || []).map((feature) => {
    const item = document.createElement('li');
    item.textContent = feature;
    return item;
  }));

  galleryControls.hidden = (project.gallery?.length || 0) < 2;
  renderGalleryImage();
  overlay.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => {
    overlay.classList.add('active');
    dialog.focus();
  });
}

function closeModal() {
  if (overlay.hidden) return;
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
  screenshot.removeAttribute('src');
  selectedProject = null;
  overlay.hidden = true;
  returnFocusTo?.focus();
}

document.querySelectorAll('[data-project-preview]').forEach((button) => {
  button.addEventListener('click', () => {
    const index = projectCards.indexOf(button.closest('.proj-card'));
    openModal(index, button);
  });
});

document.getElementById('closeModal').addEventListener('click', closeModal);
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (overlay.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key === 'Tab') {
    const focusable = [...dialog.querySelectorAll('a[href]:not([hidden]), button:not([hidden])')]
      .filter((element) => !element.disabled && element.offsetParent !== null);
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.getElementById('galleryPrevious').addEventListener('click', () => {
  if (!selectedProject?.gallery?.length) return;
  selectedImage = (selectedImage - 1 + selectedProject.gallery.length) % selectedProject.gallery.length;
  renderGalleryImage();
});
document.getElementById('galleryNext').addEventListener('click', () => {
  if (!selectedProject?.gallery?.length) return;
  selectedImage = (selectedImage + 1) % selectedProject.gallery.length;
  renderGalleryImage();
});

screenshot.addEventListener('load', () => screenshot.classList.remove('is-changing'));
screenshot.addEventListener('error', () => {
  screenshot.hidden = true;
  imageFallback.hidden = false;
  screenshot.classList.remove('is-changing');
});
