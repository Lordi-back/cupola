// Основные DOM элементы
const menuToggle = document.getElementById('menuToggle');
const modalMenu = document.getElementById('modalMenu');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link[data-close="true"]');

// Открытие/закрытие модального меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояние меню
    if (!isExpanded) {
        // Открываем меню
        menuToggle.setAttribute('aria-expanded', 'true');
        modalMenu.classList.add('active');
        // Блокируем скролл основного контента
        document.documentElement.style.overflow = 'hidden';
    } else {
        // Закрываем меню
        menuToggle.setAttribute('aria-expanded', 'false');
        modalMenu.classList.remove('active');
        // Восстанавливаем скролл
        document.documentElement.style.overflow = '';
    }
}

// Закрытие меню
function closeModalMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    modalMenu.classList.remove('active');
    document.documentElement.style.overflow = '';
}

// Показать/скрыть кнопку "Наверх"
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Плавная прокрутка с учетом шапки
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', closeModalMenu);

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        
        // Закрываем меню
        closeModalMenu();
        
        // Ждем завершения анимации закрытия меню
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

// Закрытие меню при клике вне меню (на левую часть экрана)
modalMenu.addEventListener('click', function(e) {
    // Закрываем только если кликнули на само модальное окно, а не на его содержимое
    if (e.target === this) {
        closeModalMenu();
    }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalMenu.classList.contains('active')) {
        closeModalMenu();
    }
});

// Закрытие меню при изменении размера окна (адаптив)
let resizeTimer;
window.addEventListener('resize', () => {
    if (modalMenu.classList.contains('active')) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            closeModalMenu();
        }, 250);
    }
});

// Отслеживание скролла для кнопки "Наверх"
window.addEventListener('scroll', toggleBackToTop);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем кнопку "Наверх"
    toggleBackToTop();
    
    // Устанавливаем начальное состояние меню
    menuToggle.setAttribute('aria-expanded', 'false');
    modalMenu.classList.remove('active');
    
    // Анимация появления карточек при загрузке
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
});

// Дополнительно: плавный скролл для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Пропускаем ссылки, которые уже обрабатываются
        if (this.getAttribute('data-close') === 'true') return;
        
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target === '#') return;
        
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Улучшение: добавляем анимацию появления при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Запускаем анимацию при скролле
window.addEventListener('scroll', animateOnScroll);

// Запускаем сразу для видимых элементов
setTimeout(animateOnScroll, 100);
