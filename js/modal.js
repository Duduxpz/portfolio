// Projects data
const projects = [
  {
    index: 0,
    title: 'DJ LOPIXX',
    subtitle: 'Site pra um DJ local',
    desc: 'Website moderno e responsivo para um DJ local. Desenvolvido com React e Next.js, apresentando portfolio de trabalhos, agenda de eventos e integração com redes sociais.',
    tags: ['React', 'CSS', 'HTML', 'Node.js'],
    screenshot: './assets/dj-lopixx.jpg',
    url: 'https://djlopixx.com',
    github: 'https://github.com/Duduxpz/Lopixx',
    screenshotPosition: 'center 35%'
  },
  {
    index: 1,
    title: 'PRIVATE MODE',
    subtitle: 'Site para uma festa eletrônica UDI/MG',
    desc: 'Landing page para evento eletrônico em Uberlândia. Interface imersiva com React, animações sofisticadas e sistema de ingressos integrado. Design moderno com tema escuro e efeitos glassmorphism. OBS: O site está hospedado gratuitamente no GitHub Pages, o que pode resultar em tempos de carregamento mais lentos, especialmente para a primeira visita. Recomendamos aguardar alguns segundos para que o conteúdo seja totalmente carregado. Esta com alguns bugs ',
    tags: ['React', 'CSS', 'HTML', 'Node.js'],
    screenshot: './assets/private-mode.jpg',
    url: 'https://duduxpz.github.io/Private/',
    github: 'https://github.com/Duduxpz/Private',
    screenshotPosition: 'center'
  },
  {
    index: 2,
    title: 'Checkout',
    subtitle: 'Finalização de compra site e-commerce',
    desc: 'Interface de checkout completa e segura para plataforma de e-commerce. Desenvolvimento com HTML, CSS e JavaScript puro, focado em UX/UI otimizado para conversão com validações avançadas.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    screenshot: './assets/image.jpg',
    url: 'https://github.com/Duduxpz/Checkout',
    github: 'https://duduxpz.github.io/Checkout/',
    screenshotPosition: 'center'
  }
];

// DOM Elements
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalScreenshot = document.getElementById('modalScreenshot');
const browserUrl = document.getElementById('browserUrl');
const demoBtn = document.getElementById('demoBtn');
const ghBtn = document.getElementById('ghBtn');

// Open Modal
function openModal(index) {
  const project = projects[index];
  
  // Set content
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  browserUrl.textContent = project.url.replace('https://', '').replace('http://', '');
  modalScreenshot.src = project.screenshot;
  modalScreenshot.style.objectPosition = project.screenshotPosition || 'center';
  demoBtn.href = project.url;
  ghBtn.href = project.github;
  
  // Set tags
  modalTags.innerHTML = '';
  project.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'modal-tag';
    tagEl.textContent = tag;
    modalTags.appendChild(tagEl);
  });
  
  // Show modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Event Listeners

// Close on overlay click (not on modal itself)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Prevent body scroll when modal is open
document.addEventListener('DOMContentLoaded', () => {
  // Modal is already set up above
});
