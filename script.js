// Основные DOM элементы
const menuToggle = document.getElementById('menuToggle');
const modalMenu = document.getElementById('modalMenu');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link[data-close="true"]');
const body = document.body;

// Открытие/закрытие модального меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    modalMenu.classList.toggle('active');
    
    // Добавляем/убираем класс для body
    if (!isExpanded) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
    }
}

// Закрытие меню
function closeModalMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    modalMenu.classList.remove('active');
    body.classList.remove('menu-open');
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
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        // Закрываем меню
        closeModalMenu();
        
        // Ждем завершения анимации закрытия меню
        setTimeout(() => {
            smoothScroll(target);
        }, 400); // Время должно совпадать с transition в CSS
    });
});

// Кнопка "Наверх"
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Закрытие меню при клике на оверлей (левая часть)
modalMenu.addEventListener('click', (e) => {
    // Закрываем только если кликнули на оверлей (не на само меню)
    if (e.target.classList.contains('modal-menu')) {
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
    toggleBackToTop();
    
    // Добавляем индикатор текущей страницы в меню
    const currentPage = window.location.hash || '#hero';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.style.color = 'var(--color-gold)';
        }
    });
    
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Проверяем, виден ли элемент
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализируем начальные стили для анимации
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запускаем анимацию при скролле
    window.addEventListener('scroll', animateOnScroll);
    
    // Запускаем сразу для видимых элементов
    setTimeout(animateOnScroll, 100);
});
