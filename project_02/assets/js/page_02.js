

const sec01Animation = () => {
    gsap.to('.sec-01 .page-tit .txt-inline', {alpha: 1, x: 0, duration: 2, ease: Quint.easeOut, stagger:.1});
}

const sec02Animation = () => {
    gsap.to('.sec-02 .sec-inner', {alpha: 1, y: 0, duration: .8, scale: 1, delay: 0.5});
    
    gsap.to('.sec-02 .bg', {
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-01',
            start: 'top top',
            end: `bottom top`,
            scrub: 0.5,
        },
        scale: 1,
        y: 0,
        ease: Linear.easeNone
    });
    
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-02',
            start:'top top',
            end: '+=400%',
            pin: true,
            scrub: true,
        }
    });

    tl.to('.sec-02 .bg-cover', {alpha: 1, scaleX: 1, ease: Linear.easeNone, duration: 1}, '+=.2')
    .to('.sec-02 .product-img', {display: 'flex'}, '-=.5')
    .to('.sec-02 .product-img img', {y: 0, scale: 1, ease: Linear.easeNone, duration: 1}, '-=.3')
    .to('.sec-02 .product-img img', {rotate: '90deg', ease: Linear.easeNone, duration: 0.5}, '+=.2')
    .to('.sec-02 .product-img img', {autoAlpha: 0, ease: Linear.easeNone, duration: 0.5}, '-=.2')
    .to('.sec-02 .cont-group', {display: 'flex'}, '-=.5')
    .to('.sec-02 .tit', {y: 0, alpha: 1, ease: Quad.easeInOut, duration: 0.5}, '-=.4')
    .to('.sec-02 .desc', {y: 0, alpha: 1, ease: Quad.easeInOut, duration: 0.5}, '-=.4')
    .to('.sec-02 .ad-logo', {alpha: 1, duration: 0.2})
}

const sec03Animation = () => {
    const secOverBgs = document.querySelector('.sec-03 .sec-over-bgs')
        , windowWidth = window.innerWidth
        , windowHeight = window.innerHeight
        , initialWidth = 720
        , initialHeight = 560;

    gsap.set(secOverBgs, {width: initialWidth, height: initialHeight});

    gsap.to('.sec-03 .sec-over-inner', {
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-03 .tit',
            start: 'bottom bottom-=20%',
            end: 'bottom 30%',
            scrub: 0.5,
        },
        height: '100vh',
        ease: Linear.easeNone,
    });
    
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-03',
            start:'top top',
            end: '+=230%',
            pin: true,
            scrub: true,
            onUpdate: self => {
                const {progress} = self
                    , setWidth = initialWidth + ((windowWidth - initialWidth) * progress)
                    , setHeight = initialHeight + ((windowHeight - initialHeight) * progress)
                
                gsap.to(secOverBgs, {width: setWidth, height: setHeight, ease: Linear.easeNone, duration:.4});
          
            }
        }
    });
    
    tl.to('.sec-03 .cont-group', {autoAlpha: 0, duration: 1}, 1.5)
    .to('.sec-03 .sec-over-bg-01', {autoAlpha: 0, duration: 1}, 1)
    .to('.sec-03 .sec-over-bg-02', {autoAlpha: 1, duration: 1}, 1)
    .to('.sec-03 .sec-over-bg-02', {autoAlpha: 0, duration: 1}, 2.6)
    .to('.sec-03 .sec-over-bg-03', {autoAlpha: 1, duration: 1}, 2.6)
}

const sec04Aniamtion = () => {
   const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-04 .cont-01',
            start: 'top bottom-=30%',
            end: 'top 10%',
            scrub: 0.5,
        }
    });

    tl.to('.sec-04 .cont-01 .cont-col:nth-of-type(1)', {y: 0, alpha: 1, duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-04 .cont-01 .cont-col:nth-of-type(2)', {y: 0, duration:1, ease: Linear.easeNone}, 0)
    .to('.sec-04 .cont-01 .cont-img img', {scale: 1, duration:1, ease: Linear.easeNone}, 0)

    const tl_02 = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-04 .cont-02',
            start: 'top bottom-=30%',
            end: 'top 10%',
            scrub: 0.5,
        }
    });

    tl_02.to('.sec-04 .cont-02 .cont-col:nth-of-type(2)', {y: 0, alpha: 1, duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-04 .cont-02 .cont-col:nth-of-type(1)', {y: 0, duration:1, ease: Linear.easeNone}, 0)
    .to('.sec-04 .cont-02 .cont-img img', {scale: 1, duration:1, ease: Linear.easeNone}, 0)
}

const sec05Animation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-05 .cont-group',
            start: 'top bottom-=30%',
            end: 'top 30%',
            scrub: 0.5,
        }
    });
    
    tl.to('.sec-05 .tit', {y: 0, alpha: 1, duration: 1, ease: Quint.easeOut}, 0)
    .to('.sec-05 .desc', {y: 0, alpha: 1, duration: 1, ease: Quint.easeOut}, '-=.3');

    const tl_02 = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-05 .cont-img',
            start: 'top bottom',
            end: 'top 40%',
            scrub: 0.5,
        }
    });

    tl_02.to('.sec-05 .cont-img', {y: 0, duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-05 .cont-img img', {scale: 1, duration:1, ease: Linear.easeNone}, 0)
}

const sec06Animation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-06',
            start: 'top bottom-=20%',
            end: 'top 20%',
            scrub: 0.5,
        }
    });

    tl.to('.sec-06 .tit', {autoAlpha: 1, y: 0, duration: 1, ease: Quint.easeOut}, 0)
    .to('.sec-06 .hsj-everytime-list', {autoAlpha: 1, y: 0, duration: 1, ease: Linear.easeNone}, '-=.3')
}

const sec07Animation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-06',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
        }
    });

    tl.to('.sec-07 .cont-01 .product-group .img', {y: 0, height: '40%', duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-07 .cont-01 .product-over .img', {y: 0, duration: 1, ease: Linear.easeNone}, 0);

    const tl_02 = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-07 .cont-01',
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: true,
        }
    })

    tl_02.to('.sec-07 .cont-01 .cont-over', {clipPath: 'inset(0px 0px 0px)', duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-07 .cont-01 .tit', {autoAlpha: 1, y: 0, duration: .5, ease: Quint.easeOut}, '-=.3')
    .to('.sec-07 .cont-01 .desc', {autoAlpha: 1, y: 0, duration: .5, ease: Quint.easeOut}, '-=.3');

    const tl_03 = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-07 .cont-02',
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: true,
            markers: true
        }
    });
    
    const tl_04 = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-07 .cont-02 .cont-inner',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            onUpdate: self => {
                const {progress} = self;

                const contOverImg = document.querySelector('.sec-07 .cont-01 .cont-over .product-group .img')
                progress > 0.08 ?  contOverImg.classList.add('hide') : contOverImg.classList.remove('hide');
            }
        }
    });

    tl_04.to('.sec-07 .cont', {overflow: 'hidden'}, 0)
    .to('.sec-07 .cont-01 .cont-over .product-group .img', {y: '100vh', scale: 0.8, duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-07 .cont-01 .cont-over .product-over .img', {y: '100vh', scale: 0.8, duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-07 .cont-02 .product-img .img', {y: '-8vh', scale: 0.8, duration: 1, ease: Linear.easeNone}, 0)

    .to('.sec-07 .cont-02 .product-over .case-back-img .img', {y: '0', duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-07 .cont-02 .product-over .case-front-img .img', {y: '0', duration: 1, ease: Linear.easeNone}, 0)

    // .to('.sec-07 .cont-01 .cont-over .product-over .img', {scale: 0.8, duration: 1, ease: Linear.easeNone}, '-=.8')
    // .to('.sec-07 .cont-02 .product-img .img', {scale: 0.8, duration: 1, ease: Linear.easeNone}, '-=.8')

    .to('.sec-07 .cont-02 .tit', {autoAlpha: 1, y: 0, duration: .5, ease: Quint.easeOut}, '+=.2')
    .to('.sec-07 .cont-02 .desc', {autoAlpha: 1, y: 0, duration: .5, ease: Quint.easeOut}, '-=.3');
}

const sec08Animation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-08',
            start: 'top top',
            end: '+=100%',
            scrub: true,
            pin: true,
            markets: true,
        }
    });

    tl.to('.sec-08 .bg-cover', {alpha: 0.2,  duration: 1, ease: Linear.easeNone}, 0)
    .to('.sec-08 .tit span:nth-of-type(1)', {y: 0, alpha: 1, duration: 1, ease: Quint.easeOut}, 0)
    .to('.sec-08 .tit span:nth-of-type(2)', {y: 0, alpha: 1, duration: 1, ease: Quint.easeOut}, '-=.3');
}

const sec09Animation = () => {
    const swiper = new Swiper('.brand-more-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 30,
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
    sec04Aniamtion();
    sec05Animation();
    sec06Animation();
    sec07Animation();
    sec08Animation();
    sec09Animation();

    handleBtnTopClick();
    showHeaderAnimation();
}

window.addEventListener('DOMContentLoaded', () => {
    setLocoScroll();  // 먼저 호출해야함.
    loadInit();

    locoScroll.on("scroll", (args) => {
        ScrollTrigger.update();
        document.documentElement.setAttribute('data-direction', args.direction);

        btnTopAnimation(args);
        progressBarAnimation(args);
    });
});