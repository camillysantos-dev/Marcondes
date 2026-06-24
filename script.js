// Carousel functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');
const progressBar = document.getElementById('progressBar');

let currentSlide = 0;
let slideInterval;
let progressInterval;
const intervalTime = 5000;

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
    resetAutoPlay();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }
function resetAutoPlay() { clearInterval(slideInterval); clearInterval(progressInterval); startAutoPlay(); }

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, intervalTime);
    startProgressBar();
}

function startProgressBar() {
    progressBar.style.width = '0%';
    let startTime = Date.now();
    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percentage = (elapsed / intervalTime) * 100;
        if (percentage >= 100) {
            progressBar.style.width = '100%';
            clearInterval(progressInterval);
        } else {
            progressBar.style.width = `${percentage}%`;
        }
    }, 50);
}

function initCarousel() { createDots(); startAutoPlay(); }
if (prevBtn && nextBtn) { prevBtn.addEventListener('click', prevSlide); nextBtn.addEventListener('click', nextSlide); }
initCarousel();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => { navMenu.classList.toggle('open'); });
}
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('open'); // Fecha menu mobile
        
        // Faz rolagem suave
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Smooth scroll and active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Modal Sobre
const aboutModalBtn = document.getElementById('aboutModalBtn');
const aboutModal = document.getElementById('aboutModal');
const closeModalBtn = document.getElementById('closeModalBtn');

function closeModal() {
    aboutModal.classList.remove('open');
    document.body.style.overflow = '';
}

if (aboutModalBtn) {
    aboutModalBtn.addEventListener('click', () => {
        aboutModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}
if (closeModalBtn) { closeModalBtn.addEventListener('click', closeModal); }
if (aboutModal) {
    aboutModal.addEventListener('click', (e) => { if (e.target === aboutModal) closeModal(); });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal?.classList.contains('open')) closeModal();
});

// WhatsApp - Programa de Robótica
const programWhatsAppBtn = document.getElementById('programWhatsAppBtn');
if (programWhatsAppBtn) {
    programWhatsAppBtn.addEventListener('click', () => {
        const phoneNumber = '5511947493304';
        const message = encodeURIComponent(
            'Olá! Gostaria de mais informações sobre o programa de ROBÓTICA EDUCACIONAL do Colégio Marcondes.\n\n' +
            'Tenho interesse em saber:\n📍 Valores e condições\n📍 Dias e horários disponíveis\n📍 Níveis oferecidos\n📍 Como fazer a inscrição\n\nAguardo retorno. Obrigado!'
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
}

// WhatsApp - Bolsas 2026
const scholarshipWhatsAppBtn = document.getElementById('scholarshipWhatsAppBtn');
if (scholarshipWhatsAppBtn) {
    scholarshipWhatsAppBtn.addEventListener('click', () => {
        const phoneNumber = '5511947493304';
        const message = encodeURIComponent(
            'Olá! Gostaria de mais informações sobre as BOLSAS DE ESTUDO 2026 do Colégio Marcondes.\n\n' +
            'Tenho interesse em saber:\n📍 Tipos de bolsas disponíveis (mérito/social/irmãos)\n📍 Critérios e requisitos\n📍 Percentual de desconto (até 50% ou integral)\n📍 Processo seletivo e prazos\n\nAguardo retorno. Obrigado!'
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
}

// WhatsApp - Matrícula
const btnMatricula = document.getElementById('btnMatricula');
if (btnMatricula) {
    btnMatricula.addEventListener('click', () => {
        const phoneNumber = '5511947493304';
        const message = encodeURIComponent(
            'Olá! Gostaria de mais informações sobre MATRÍCULA no Colégio Marcondes.\n\n' +
            'Tenho interesse em saber:\n📍 Vagas disponíveis\n📍 Documentação necessária\n📍 Valores e formas de pagamento\n📍 Visita à escola\n\nAguardo retorno. Obrigado!'
        );
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
}

// WhatsApp - Agende uma visita
document.querySelectorAll('.btn-outline, .btn-outline-light').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('Agende uma visita') || btn.textContent.includes('Fale conosco')) {
            e.preventDefault();
            const phoneNumber = '5511947493304';
            const message = encodeURIComponent(
                'Olá! Gostaria de agendar uma VISITA para conhecer as instalações do Colégio Marcondes.\n\n' +
                'Gostaria de saber os dias e horários disponíveis para conhecer a estrutura e tirar dúvidas sobre a matrícula.\n\nAguardo retorno. Obrigado!'
            );
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        }
    });
});

// Accessibility Panel
const accessibilityBtn = document.getElementById('accessibilityBtn');
let accessibilityPanel = null;

function createAccessibilityPanel() {
    const panel = document.createElement('div');
    panel.className = 'accessibility-panel';
    panel.innerHTML = `
        <h4><i class="fas fa-universal-access"></i> Acessibilidade</h4>
        <div class="accessibility-options">
            <button id="increaseFont"><i class="fas fa-search-plus"></i> Aumentar Fonte</button>
            <button id="decreaseFont"><i class="fas fa-search-minus"></i> Diminuir Fonte</button>
            <button id="highContrast"><i class="fas fa-adjust"></i> Alto Contraste</button>
            <button id="readingMode"><i class="fas fa-book-open"></i> Modo Leitura</button>
            <button id="resetAccessibility"><i class="fas fa-undo-alt"></i> Resetar</button>
        </div>
    `;
    document.body.appendChild(panel);
    
    let currentFontSize = 16;
    const increaseBtn = panel.querySelector('#increaseFont');
    const decreaseBtn = panel.querySelector('#decreaseFont');
    
    increaseBtn.addEventListener('click', () => {
        currentFontSize = Math.min(currentFontSize + 2, 24);
        document.body.style.fontSize = `${currentFontSize}px`;
    });
    decreaseBtn.addEventListener('click', () => {
        currentFontSize = Math.max(currentFontSize - 2, 12);
        document.body.style.fontSize = `${currentFontSize}px`;
    });
    
    const contrastBtn = panel.querySelector('#highContrast');
    contrastBtn.addEventListener('click', () => { document.body.classList.toggle('high-contrast'); });
    
    const readingBtn = panel.querySelector('#readingMode');
    readingBtn.addEventListener('click', () => { document.body.classList.toggle('reading-mode'); });
    
    const resetBtn = panel.querySelector('#resetAccessibility');
    resetBtn.addEventListener('click', () => {
        document.body.style.fontSize = '';
        document.body.classList.remove('high-contrast', 'reading-mode');
        currentFontSize = 16;
    });
    return panel;
}

if (accessibilityBtn) {
    accessibilityBtn.addEventListener('click', () => {
        if (!accessibilityPanel) { accessibilityPanel = createAccessibilityPanel(); }
        accessibilityPanel.classList.toggle('open');
    });
}

// Animation on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .testimonial-card, .about-stats .stat, .robotics-features .feature-item, .program-card, .scholarship-features .feature, .material-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Prevent carousel auto-play on interaction
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        clearInterval(progressInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => { startAutoPlay(); });
}

// Material list PDF links - confirm
document.querySelectorAll('.material-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Abrindo PDF em nova aba:', btn.getAttribute('href'));
    });
});

console.log('Site carregado com sucesso!');