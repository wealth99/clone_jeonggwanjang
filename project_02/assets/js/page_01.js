const sec01Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-01',
        start: "top top", 
        end: "+=100%", 
        pin: true,
    });
      
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-01',
        start: "top top-=1px", 
        end: "+=100%", 
        pin: true,
        pinSpacing: false
    });
 
    gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-01',
            start: 'top top',
            end: '+=100%',
            scrub: true,
        }
    });

    gsap.to('.sec-01 .subject', {duration: 0.5, y: 0, opacity: 1}, '+=.1');
    gsap.to('.sec-01 .page-tit span:nth-of-type(1)', {duration: 0.5, y: 0, opacity: 1}, '-=.2');
    gsap.to('.sec-01 .page-tit span:nth-of-type(2)', {duration: 0.5, y: 0, opacity: 1}, '-=.3');
}

const sec02Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-02',
        start: "top top", 
        end: "+=100%", 
        pin: true,
        
    });
      
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-02',
        start: "top top-=1px", 
        end: "+=100%", 
        pin: true,
        pinSpacing: false,
        
    });
 
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-02',
            start: 'top top',
            end: '+=100%',
            scrub: true,
        }
    });

    tl.to('.sec-02 .cont-group', {duration: .5, display: 'flex'}, 0)
    .to('.sec-02 .cont-group', {duration: .5, opacity: '1', y: '-50%'}, '-=.5')
    .to('.indicator', {duration: .5, x: 0, onUpdate: () => indicatorAnimation(0)}, '-=.3');
}

const sec03Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-03',
        start: "top top", 
        end: "+=400%", 
        pin: true,
    });
      
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-03',
        start: "top top-=1px", 
        end: "+=400%", 
        pin: true,
        pinSpacing: false,
        
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-03',
            start: 'top top',
            end: "+=400%", 
            scrub: true,
        }
    });

    tl.to('.sec-03 .cont-group', {duration: .5, display: 'flex'}, 0)
    .to('.indicator', {duration: .5, x: 0, onUpdate: () => indicatorAnimation(1)}, '+=.2')
    .to('.sec-03 .brand-commitments-0 .cont-group', {duration: .5, opacity: '1', y: '-50%'}, '-=.5')
    .to('.sec-03 .brand-commitments-1', {duration: .5, opacity: '1'}, '+=.5')
    .to('.sec-03 .brand-commitments-1 .cont-group' , {duration: .5, opacity: '1', y: '-50%'}, '-=.1')
    .to('.sec-03 .brand-commitments-2', {duration: .5, opacity: '1'})
    .to('.sec-03 .brand-commitments-2 .cont-group' , {duration: .5, opacity: '1', y: '-50%'}, '-=.1')
    .to('.sec-03 .brand-commitments-2', {duration: .5, opacity: '1'})
    .to('.sec-03 .brand-commitments-2 .cont-group' , {duration: .5, opacity: '1', y: '-50%'}, '-=.1')
    .to('.sec-03 .brand-commitments-3', {duration: .5, opacity: '1'})
    .to('.sec-03 .brand-commitments-3 .cont-group' , {duration: .5, opacity: '1', y: '-50%'}, '-=.1')
    .to('.indicator', {duration: .5, x: 0, onUpdate: () => indicatorAnimation(1)}, '+=.2')
}

const sec04Animation = () => {
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-04',
        start: "top top", 
        end: "+=100%", 
        pin: true,
        
    });
      
    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        trigger: '.sec-04',
        start: "top top-=1px", 
        end: "+=100%", 
        pin: true,
        pinSpacing: false,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-04',
            start: 'top top',
            end: "+=100%", 
            scrub: true,
        }
    });

    tl.to('.sec-04 .cont-group', {duration: .5, display: 'flex'}, 0)
    .to('.indicator', {duration: .5, x: 0, onUpdate: () => indicatorAnimation(2)}, 0)
    .to('.sec-04 .cont-group', {duration: .5, opacity: '1', y: '-50%'}, '-=.5')
    .to('.indicator', {duration: .5, x: '-140%', onUpdate: () => indicatorAnimation(2)}, '+=.3')
}

const sec05Animation = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            scroller: '.smooth-scroll',
            trigger: '.sec-05',
            start: 'top top',
            end: "+=100%",
            scrub: true,
            pin: true,
        }
    });
    
    tl.to('.sec-05 .cont-group', {duration: .5, display: 'flex', opacity: '1', y: '-50%'}, 0)
    .to('.sec-05 .cont-group span:nth-of-type(1)', {duration: .5, opacity: '1', y: '0'}, '+=.3')
    .to('.sec-05 .cont-group span:nth-of-type(2)', {duration: .5, opacity: '1', y: '0'}, '+=.2')
}

const handleIndicatorClick = () => {
    const indicator = document.querySelector('.indicator');

    indicator.addEventListener('click', e => {
        const progress = e.target.getAttribute('data-progress')
            , limitY = locoScroll.scroll.instance.limit.y

        if(progress) {
            locoScroll.scrollTo(progress * limitY, {
                duration: '1000',
                easing: [0.25, 0.0, 0.35, 1.0],
            });
        }
    })
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
            self.progress > 0.2 ? header.classList.add('whiter') : header.classList.remove('whiter');
        }
    });
}

const loadInit = () => {
    sec01Animation();
    sec02Animation();
    sec03Animation();
    sec04Animation();
    sec05Animation();
    handleIndicatorClick();
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