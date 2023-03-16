let yOffset;
let lastScrollY = 0;
let ticking = false;
let isScrollable = false;

const sceneInfo = [
    {
        // sec 01
        scrollHeight: 0,
        heightNumber: 1.5,
        target: document.querySelector('.sec-01'),
        background: document.querySelector('.sec-01 .bg'),
        cont: document.querySelector('.sec-01 .cont-group'),
    },
    {
        // sec 02
        scrollHeight: 0,
        heightNumber: 2,
        target: document.querySelector('.sec-02'),
        background: document.querySelector('.sec-02 .bg'),
        cont: document.querySelector('.sec-02 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        cont_translateY_in: [10, -50, {start: 0.1, end: 0.2}]
    },
    {
        // sec 03
        scrollHeight: 0,
        heightNumber: 1.5,
        target: document.querySelector('.sec-03'),
        background: document.querySelector('.sec-03 .bg'),
        cont: document.querySelector('.sec-03 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        cont_translateY_in: [10, -50, {start: 0.1, end: 0.2}]
    },
    {
        // sec 04 
        scrollHeight: 0,
        heightNumber: 2.3,
        target: document.querySelector('.sec-04'),
        background: document.querySelector('.sec-04 .bg'),
        target_opacity_in: [0, 1, {start: 0.1, end: 0.4}],
        cont: document.querySelector('.sec-04 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
        cont_translateY_in: [10, -50, {start: 0.3, end: 0.4}]
    },
    {
        // sec 05 
        scrollHeight: 0,
        heightNumber: 2.3,
        target: document.querySelector('.sec-05'),
        background: document.querySelector('.sec-05 .bg'),
        target_opacity_in: [0, 1, {start: 0.1, end: 0.4}],
        cont: document.querySelector('.sec-05 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
        cont_translateY_in: [10, -50, {start: 0.3, end: 0.4}]
    },
    {
        // sec 06 
        scrollHeight: 0,
        heightNumber: 2.7,
        target: document.querySelector('.sec-06'),
        background: document.querySelector('.sec-06 .bg'),
        target_opacity_in: [0, 1, {start: 0.1, end: 0.4}],
        cont: document.querySelector('.sec-06 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
        cont_translateY_in: [10, -50, {start: 0.3, end: 0.4}]
    },
    {
        // sec 07
        scrollHeight: 0,
        heightNumber: 2.5,
        target: document.querySelector('.sec-07'),
        background: document.querySelector('.sec-07 .bg'),
        cont: document.querySelector('.sec-07 .cont-group'),
        cont_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        cont_translateY_in: [10, -50, {start: 0.1, end: 0.2}]
    },
    {
        // sec 08
        scrollHeight: 0,
        heightNumber: 2,
        target: document.querySelector('.sec-08'),
        background: document.querySelector('.sec-08 .bg'),
        cont: document.querySelector('.sec-08 .cont-group'),
        cont_opacity_in: [1, 1, {start: 0.0, end: 0.0}],
        messageA: document.querySelector('.sec-08 .txt-line:nth-of-type(1)'),
        messageB: document.querySelector('.sec-08 .txt-line:nth-of-type(2)'),
        messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        messageA_translateY_in: [50, 0, {start: 0.1, end: 0.2}],
        messageB_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        messageB_translateY_in: [50, 0, {start: 0.2, end: 0.3}]
    }
];

const playSceneAnimation = () => {
    const currentScene = getCurrentScene()
        , prevScrollHeight = getPrevScrollHeight()
        , currentYOffset = yOffset - prevScrollHeight
        , currentSceneInfo = sceneInfo[currentScene]
        , {scrollHeight} = currentSceneInfo
        , scrollRatio = currentYOffset / scrollHeight
        , indicator = document.querySelector('.indicator');
        
    switch(currentScene) {
        case 0:
            indicator.classList.remove('active');
            break;
        case 1:
            if(scrollRatio > 0.2) {
                indicator.classList.add('active');
                indicatorAnimation(0);
            }
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 2:
            indicatorAnimation(1);
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 3:
            indicatorAnimation(1);
            currentSceneInfo.target.style.opacity = getPartAnimationValue(currentSceneInfo.target_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 4:
            indicatorAnimation(1);
            currentSceneInfo.target.style.opacity = getPartAnimationValue(currentSceneInfo.target_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 5:
            indicatorAnimation(1);
            currentSceneInfo.target.style.opacity = getPartAnimationValue(currentSceneInfo.target_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 6:
            if(scrollRatio > 0.2) indicatorAnimation(2);
            if(scrollRatio >= 0.7 && scrollRatio < 1) indicator.classList.remove('active')
            else indicator.classList.add('active')
       
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.cont.style.transform = `translate3d(-50%, ${getPartAnimationValue(currentSceneInfo.cont_translateY_in, currentYOffset)}%, 0)`;
            break;
        case 7:
            currentSceneInfo.cont.style.opacity = getPartAnimationValue(currentSceneInfo.cont_opacity_in, currentYOffset);
            currentSceneInfo.messageA.style.opacity = getPartAnimationValue(currentSceneInfo.messageA_opacity_in, currentYOffset);
            currentSceneInfo.messageA.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.messageA_translateY_in, currentYOffset)}%, 0)`;
            currentSceneInfo.messageB.style.opacity = getPartAnimationValue(currentSceneInfo.messageB_opacity_in, currentYOffset);
            currentSceneInfo.messageB.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.messageB_translateY_in, currentYOffset)}%, 0)`;
            break;
    }
}

const indicatorAnimation = (idx) => {
    const indicator = document.querySelector('.indicator')
        , indicator_buttons = indicator.querySelectorAll('button');

    indicator_buttons.forEach((item, index) => {
        item.classList.remove('active');
        if(index === idx) item.classList.add('active');
    });
}

const unlockFixedElemAnimation = () => {
    const footer = document.querySelector('footer')
        , footerRect = footer.getBoundingClientRect()
        , btnTop = document.querySelector('.btn-top')
        , sec08 = document.querySelector('.sec-08')
        , sec08_bg = sec08.querySelector('.bg')
        , sec08_contGroup = sec08.querySelector('.cont-group');

    if(window.innerHeight >= footerRect.y) {
        btnTop.style.position = 'absolute';

        sec08_bg.style.position = 'absolute';
        sec08_bg.style.top = 'auto';
        sec08_bg.style.bottom = 0;

        sec08_contGroup.style.position = 'absolute';
        sec08_contGroup.style.top = 'auto';
        sec08_contGroup.style.bottom = `calc(469px - ${sec08_contGroup.clientHeight / 2}px)`;
        sec08_contGroup.style.transform = 'translateX(-50%)';
    } else {
        btnTop.style.position = '';

        sec08_bg.style.position = '';
        sec08_bg.style.top = '';
        sec08_bg.style.bottom = '';

        sec08_contGroup.style.position = '';
        sec08_contGroup.style.top = '';
        sec08_contGroup.style.bottom = '';
        sec08_contGroup.style.transform = '';
    }
}

const changeSceneBackground = () => {
    sceneInfo.forEach(item => {
        const target = item.target
            , bg = item.background
            , isReverseClass = item.target.classList.contains('reverse');
        
        if(isReverseClass) {
            window.innerHeight >= target.getBoundingClientRect().y ? bg.classList.add('fixed') : bg.classList.remove('fixed');
        } else {
            yOffset >= target.offsetTop ? !isReverseClass && bg?.classList.add('fixed') : !isReverseClass && bg?.classList.remove('fixed');
        }
    });
}

const scrollLoop = () => {
    const header = document.querySelector('header')
        , direction = getScrollDirection()
        , currentScene = getCurrentScene()
        , currentSceneInfo = sceneInfo[currentScene];

    // 첫화면 나오기 전까지 스크롤 0, 1 유지
    if(!isScrollable) {
        currentSceneInfo.target.querySelector('.txt-line:nth-of-type(2)').addEventListener('transitionend', () => {
            let timer = setTimeout(() => {
                isScrollable = true;
                enableScroll();
                clearTimeout(timer);
           }, 100);
        });

        window.scrollTo(0, 1);
    } else {
        direction === 'down' ? header.classList.add('hide') : header.classList.remove('hide');
    }

    if(yOffset >= window.innerHeight) {
        header.classList.add('whiter');
    } else {
        header.classList.remove('whiter');
    }

    playSceneAnimation();
    checkSceneAnimation();
    changeSceneBackground();
    unlockFixedElemAnimation();
    progressBarAnimation().scroll();
}

const loadInit = () => {
    window.scrollTo(0, 1);
    disableScroll();
    progressBarAnimation().init();
    setSectionScrollHeight();

    const btnTop = document.querySelector('.btn-top button');
    btnTop.addEventListener('click', () =>  durationScrollTo(0));
}

const optimizeAnimation = (callback) => {
    return function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                callback();
                ticking = false;
          });
          ticking = true;
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadInit();

    const btnTop = document.querySelector('.btn-top button');
    btnTop.addEventListener('click', () =>  durationScrollTo(0));

    window.addEventListener('scroll', optimizeAnimation(() => {
        yOffset = window.scrollY;
        scrollLoop();
    }), { passive: true });
});