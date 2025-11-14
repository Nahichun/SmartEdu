document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    
    squares.forEach(square => {
        // Клик на всю карточку
        square.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        
        // Клик на текст "К курсам"
        const courseTexts = square.querySelectorAll('.courses');
        courseTexts.forEach(text => {
            text.addEventListener('click', function(e) {
                e.stopPropagation();
                square.classList.toggle('active');
            });
        });
        
        // Клик на изображение
        const courseImage = square.querySelector('.courses_image');
        if (courseImage) {
            courseImage.addEventListener('click', function(e) {
                e.stopPropagation();
                square.classList.toggle('active');
            });
        }
        
        // Клик на название курса
        const courseName = square.querySelector('.name_courses');
        if (courseName) {
            courseName.addEventListener('click', function(e) {
                e.stopPropagation();
                square.classList.toggle('active');
            });
        }
    });
});