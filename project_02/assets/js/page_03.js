const sec01Animation = () => {
    const customEase = CustomEase.create("custom", "M0,0 C0.29,0 0.333,-0.001 0.404,0.084 0.473,0.167 0.466,0.362 0.498,0.502 0.518,0.592 0.537,0.806 0.6,0.9 0.675,1.011 0.704,1 1,1 ");
    const tl = gsap.timeline();

    tl.to('.sec-01 .primary-txt .txt-inline', {y: 0, duration: 1, ease: Quint.easeOut, stagger:.2})
    .to('.sec-01 .txt:not(.primary-txt)', {display: 'flex', duration: 0.3})
    .to('.sec-01 .primary-txt', {display: 'none', duration: 0.3}, '-=.6')
    .to('.sec-01 .cont-top', {height: 0, duration: 1, ease: customEase})
    .to('.sec-01 .cont-bottom', {height: 0, duration: 1, ease: customEase}, '-=1')
    .to('.sec-01 .curtain', {display: 'none'})
    .to('.sec-01 video', {scale: 1, duration: 1.3, ease: Quint.easeOut}, '-=.5')
    .to('.sec-01 .bg-back', {width: 0, duration: 1.3, ease: Quint.easeOut, onComplete: () => {
        const video = document.querySelector('.sec-01 video');
        video.play();
    }}, '-=1.2')
    .to('.sec-01 .shadow-box', {alpha: 1, duration: .3}, '-=1.8')
    .to('.sec-01 .shadow-box', {autoAlpha: 0, duration: .3}, '-=1.3')
    .fromTo('header', {zIndex: 0}, {zIndex: 3000, duration: 0.1})
    .to('.sec-01 .txt-area .txt-line', {autoAlpha: 1, y: 0, duration: 1, ease: Quint.easeOut, onComplete: () => {
        locoScroll.start();
    }}, '-=.5')
    .to('.sec-01 .txt-area a', {autoAlpha: 1, y: 0, duration: 1, ease: Quint.easeOut}, '-=.5')
    .to('.sec-01 .scroll-down-effect', {autoAlpha: 1, duration: 1, ease: Quint.easeOut}, '-=.5')
}

const sec02Animation = () => {
    const sec02 = document.querySelector('.sec-02') 
        , imageBackgroundColor = ['#c58940', '#769ced', '#e60965', '#495c83', '#0d3cad', '#0ea85b', '#169948', '#fdee00', '#ffdc73', '#ffdae4']
        , imagesLeft = document.querySelectorAll('.sec-02 .image-left .img')
        , imagesCenter = document.querySelectorAll('.sec-02 .image-center .img')
        , imagesRight = document.querySelectorAll('.sec-02 .image-right .img');
    
    new Swiper('.logo-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        speed: 800,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
            slideChange: function() {
                let prevIndex = this.previousIndex - 10;
                if(prevIndex === 10) prevIndex = 9;
                    
                const realIndex = this.realIndex
                    , direction = this.swipeDirection
                    , animate = (item, index) => {
                        prevIndex === index ? item.classList.add('prev') : item.classList.remove('prev');

                        if(realIndex === index) {
                            item.classList.add('active');
                            if(direction !== 'next') {
                                gsap.fromTo(item, {width: 0, right: 'auto', left: 0}, {width: '100%', duration: .4, ease: Linear.easeNone});
                            } else {
                                gsap.fromTo(item, {width: 0, left: 'auto', right: 0}, {width: '100%', duration: .4, ease: Linear.easeNone});
                            }
                        } else {
                            item.classList.remove('active');
                        }
                    }

                sec02.style.backgroundColor = imageBackgroundColor[realIndex];
                imagesLeft.forEach((item, index) => animate(item, index));
                imagesCenter.forEach((item, index) => animate(item, index));
                imagesRight.forEach((item, index) => animate(item, index));
            }
        }
    });
}

const sec03Animation = () => {
    const wellnessListItems = gsap.utils.toArray('.wellness-list-item');

    wellnessListItems.forEach((item, index) => {
        ScrollTrigger.create({
            scroller: '.smooth-scroll',
            trigger: item,
            start: `top-=${item.getBoundingClientRect().height / 2} bottom`,
            end :'top top',
            once: true,
            onEnter: () => {
                gsap.fromTo(item, {alpha: 0, y: '100%'}, {alpha: 1, y: 0, duration: 2, ease: Quint.easeOut});
            }
        })
    });
}

const sec04Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-04 .swiper-group',
        start: 'top bottom',
        end: 'top top',
        once: true,
        onEnter: () => {
            gsap.to('.sec-04 .product-swiper', {x: 0, alpha: 1, duration: 2, ease: Quint.easeOut})
        }
    });

    new Swiper('.product-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 40,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
    });
}

const sec05Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-05 .swiper-group',
        start: 'top bottom',
        end: 'top top',
        once: true,
        onEnter: () => {
            gsap.to('.sec-05 .sns-swiper', {x: 0, alpha: 1, duration: 2, ease: Quint.easeOut})
        }
    });

    new Swiper('.sns-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 60,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
    });
}

const showHeaderAnimation = () => {
    const header = document.querySelector('header')
        , animation = gsap.from(header, { 
            yPercent: -100,
            paused: true,
            duration: .5
        }).progress(1);

    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        start: 'top top',
        end: document.querySelector('.smooth-scroll').scrollHeight + window.innerHeight,
        onUpdate: (self) => {
            self.direction === -1 ? animation.play() : animation.reverse();
        }
    });
}

const loadInit = () => {
    sec01Animation();
    sec02Animation();
    sec03Animation();
    sec04Animation();
    sec05Animation();

    handleBtnTopClick();
    showHeaderAnimation();
}

window.addEventListener('DOMContentLoaded', () => {
    setLocoScroll();  // 먼저 호출해야함.
    loadInit();
    locoScroll.stop();

    locoScroll.on("scroll", (args) => {
        ScrollTrigger.update();
        document.documentElement.setAttribute('data-direction', args.direction);

        btnTopAnimation(args);
        progressBarAnimation(args);
    });
});