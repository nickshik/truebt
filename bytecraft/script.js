document.addEventListener('DOMContentLoaded', () => {
    const alternativePage = document.getElementById('alternative-page');
    const container = document.querySelector('.layers_container');
    const video = document.querySelector('.video-bg');
    
    if (video) {
        video.muted = true;
        video.playsInline = true;
        video.play().catch(e => console.log("Ждем взаимодействия для старта видео"));
    }

    const layerElements = [
        document.querySelector('.layers-1'),
        document.querySelector('.layers-2'),
        document.querySelector('.layers-3'),
        document.querySelector('.layers-4'),
        document.querySelector('.layers-5'),
        document.querySelector('.layers-content'), 
        document.querySelector('.layers-6'),
        document.querySelector('.layers-7'),
        document.querySelector('.layers-8')
    ].filter(Boolean); // Исключаем null элементы, чтобы не делать лишних проверок

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let velX = 0, velY = 0;

    const stiffness = 0.04;  
    const damping = 0.75;    
    const layerMultipliers = [-22, -14, -5, 6, 14, 18, 28, 42, 58];
    
    let isParallaxActive = true;

    function routePage() {
        const hash = window.location.hash;
        if (hash === '#start') {
            isParallaxActive = false; 
            document.body.classList.add('alt-mode');
            if (alternativePage) alternativePage.style.display = 'block';
        } else {
            document.body.classList.remove('alt-mode');
            if (alternativePage) alternativePage.style.display = 'none';
            setTimeout(() => { isParallaxActive = true; }, 200);
        }
    }

    routePage();
    window.addEventListener('hashchange', routePage);

    window.addEventListener('mousemove', (e) => {
        if (!isParallaxActive) return;
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function physicsLoop() {
        if (!isParallaxActive) {
            requestAnimationFrame(physicsLoop);
            return;
        }

        const forceX = (targetX - currentX) * stiffness;
        const forceY = (targetY - currentY) * stiffness;

        velX = (velX + forceX) * damping;
        velY = (velY + forceY) * damping;

        currentX += velX;
        currentY += velY;

        if (container) {
            const tiltX = -currentY * 4.5;
            const tiltY = currentX * 4.5;
            container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }

        for (let i = 0; i < layerElements.length; i++) {
            const moveX = currentX * layerMultipliers[i];
            const moveY = currentY * layerMultipliers[i];
            layerElements[i].style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
        }

        requestAnimationFrame(physicsLoop);
    }

    physicsLoop();

    const swiperEl = document.querySelector('.swiper');
    if (swiperEl) {
        new Swiper('.swiper', {
            speed: 1600,
            mousewheel: {},
            pagination: {
                el: '.swiper-pagination',
                clickable: true 
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
            }
        });
    }
});
