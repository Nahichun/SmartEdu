// Плавный blur-эффект для шапки при скролле
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollY = window.scrollY;
    const maxScroll = 200; // Увеличим для более плавного эффекта
    
    // Более мягкая интенсивность
    const intensity = Math.min(scrollY / maxScroll, 1);
    
    // Эффект стекла: меньше непрозрачности, больше blur
    header.style.background = `rgba(255, 255, 255, ${intensity * 0.4})`;
    header.style.backdropFilter = `blur(${6 + intensity * 3}px)`;
    header.style.webkitBackdropFilter = `blur(${8 + intensity * 4}px)`;
    
    // Легкая граница при скролле
    if (scrollY > 10) {
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)'; // Более легкая тень
    } else {
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0)';
    }
});