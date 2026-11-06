const swiper = new Swiper('.swiper', {
    mousewheel: true,
    direction: 'vertical',
    speed: 1700,
    parallax: true,
});

// Скрипт для красивого посимвольного появления букв в заголовках
document.querySelectorAll('.header-content h1').forEach(e => {
    e.innerHTML = e.textContent.replace(/ (-|#|@){1}/g, s => s+s).replace(/(\S*)/g, m => {
        return m.replace(/\S(-|#|@)?/g, '<span class="letter">$&</span>');
    });
    e.querySelectorAll('.letter').forEach(function(l, i) {
        l.setAttribute('style', `z-index: -${ i }; transition-duration: ${ i/5 + 1 }s`);
    });
});

// Отслеживание смены слайдов и переключение текстового контента
swiper.on('slideChange', function() {
    const currentActiveIndex = swiper.realIndex;
    const textSlides = document.querySelectorAll('.header-content__slide');
    
    textSlides.forEach(function(slide, index) {
        if (index === currentActiveIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
});
