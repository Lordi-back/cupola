// Основные DOM элементы
const menuToggle = document.getElementById('menuToggle');
const modalMenu = document.getElementById('modalMenu');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link[data-close="true"]');

// Открытие/закрытие модального меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    modalMenu.classList.toggle('active');
    document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
}

// Закрытие меню
function closeModalMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    modalMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Показать/скрыть кнопку "Наверх"
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Плавная прокрутка
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', closeModalMenu);

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        closeModalMenu();
        
        // Небольшая задержка для закрытия меню перед скроллом
        setTimeout(() => {
            smoothScroll(target);
        }, 300);
    });
});

// Кнопка "Наверх"
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Закрытие меню при клике вне его области
modalMenu.addEventListener('click', (e) => {
    if (e.target === modalMenu) {
        closeModalMenu();
    }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalMenu.classList.contains('active')) {
        closeModalMenu();
    }
});

// Отслеживание скролла
window.addEventListener('scroll', toggleBackToTop);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    toggleBackToTop();
    
    // Предзагрузка шрифтов (опционально)
    document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
    });
});

// Анимация при скролле (можно добавить AOS позже)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за продуктами
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});
