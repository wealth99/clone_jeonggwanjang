

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

    tl.to('.sec-02 .bg-cover', {alpha: 1, scaleX: 1, ease: Quad.easeInOut, duration: 1}, '+=.2')
    .to('.sec-02 .product-img', {display: 'flex'}, '-=.5')
    .to('.sec-02 .product-img img', {y: 0, scale: 1, ease: Quad.easeInOut, duration: 1}, '-=.3')
    .to('.sec-02 .product-img img', {rotate: '90deg', ease: Quad.easeInOut, duration: 0.5}, '+=.2')
    .to('.sec-02 .product-img img', {autoAlpha: 0, ease: Quad.easeInOut, duration: 0.5}, '-=.2')
    .to('.sec-02 .cont-group', {display: 'flex'}, '-=.5')
    .to('.sec-02 .tit', {y: 0, alpha: 1, ease: Quad.easeInOut, duration: 0.5}, '-=.4')
    .to('.sec-02 .desc', {y: 0, alpha: 1, ease: Quad.easeInOut, duration: 0.5}, '-=.4')
    .to('.sec-02 .ad-logo', {alpha: 1, duration: 0.2})
}

const loadInit = () => {
    sec01Animation();
    sec02Animation();

    
}


window.addEventListener('DOMContentLoaded', () => {
    setLocoScroll();  // 먼저 호출해야함.
    loadInit();

    locoScroll.on("scroll", (args) => {
        ScrollTrigger.update();
        document.documentElement.setAttribute('data-direction', args.direction);

        // progressBarAnimation(args);
    });
});