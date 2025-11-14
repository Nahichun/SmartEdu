// SCRIPT/parallax.js - Упрощенная версия с эффектом мыши
document.addEventListener('DOMContentLoaded', function() {
    const parallaxElements = [
        { element: document.getElementById('img1'), speed: 0.3 },
        { element: document.getElementById('img2'), speed: 0.4 },
        { element: document.getElementById('img3'), speed: 0.35 }
    ];

    // Элементы для эффекта слежения за мышкой
    const mouseFollowElements = [
        { element: document.getElementById('img4'), intensity: 0.02 },
        { element: document.getElementById('img5'), intensity: 0.03 },
        { element: document.getElementById('img6'), intensity: 0.025 },
        { element: document.getElementById('img7'), intensity: 0.035 }
    ];

    const revealElements = [
        document.getElementById('mainText'),
        document.getElementById('coursesText'),
        ...document.querySelectorAll('.square'),
        document.getElementById('moreText'),
        document.querySelector('.btnMore'),
        document.getElementById('helperText'),
        ...document.querySelectorAll('.helpPair')
    ];

    // Переменные для позиции мыши
    let mouseX = 0;
    let mouseY = 0;
    let windowCenterX = window.innerWidth / 2;
    let windowCenterY = window.innerHeight / 2;

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxElements.forEach(item => {
            if (item.element) {
                const yPos = -(scrollY * item.speed);
                item.element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // Функция для эффекта слежения за мышкой
    function updateMouseFollow() {
        mouseFollowElements.forEach(item => {
            if (item.element) {
                const moveX = (mouseX - windowCenterX) * item.intensity;
                const moveY = (mouseY - windowCenterY) * item.intensity;
                
                item.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }

    // Обработчик движения мыши
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateMouseFollow();
    }

    // Обработчик изменения размера окна
    function handleResize() {
        windowCenterX = window.innerWidth / 2;
        windowCenterY = window.innerHeight / 2;
        updateMouseFollow();
    }

    function checkReveal() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            if (element) {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.classList.add('visible');
                }
            }
        });
    }

    // Инициализация
    revealElements.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease';
        }
    });

    parallaxElements.forEach(item => {
        if (item.element) {
            item.element.style.transition = 'transform 0.1s ease-out';
        }
    });

    // Инициализация элементов слежения за мышкой
    mouseFollowElements.forEach(item => {
        if (item.element) {
            item.element.style.transition = 'transform 0.5s ease-out';
            item.element.style.willChange = 'transform';
        }
    });

    // Начальные позиции
    checkReveal();
    updateParallax();
    
    // Установка начального центра окна
    windowCenterX = window.innerWidth / 2;
    windowCenterY = window.innerHeight / 2;
    updateMouseFollow();

    // Слушатели событий
    window.addEventListener('scroll', function() {
        updateParallax();
        checkReveal();
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Мобильная адаптация
    function handleMobileAdaptation() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Отключаем параллакс и слежение на мобильных
            parallaxElements.forEach(item => {
                if (item.element) item.element.style.transform = 'none';
            });
            
            mouseFollowElements.forEach(item => {
                if (item.element) item.element.style.transform = 'none';
            });
            
            // Показываем все элементы
            revealElements.forEach(element => {
                if (element) element.style.opacity = '1';
            });
            
            // Удаляем обработчики мыши на мобильных
            window.removeEventListener('mousemove', handleMouseMove);
        } else {
            // Включаем обработчики на десктопе
            window.addEventListener('mousemove', handleMouseMove);
            
            // Восстанавливаем параллакс
            updateParallax();
            updateMouseFollow();
        }
    }

    // Проверка при загрузке и изменении размера
    handleMobileAdaptation();
    window.addEventListener('resize', handleMobileAdaptation);

    // Плавное появление эффекта после загрузки
    setTimeout(() => {
        mouseFollowElements.forEach(item => {
            if (item.element) {
                item.element.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            }
        });
    }, 1000);
});