let yOffset;
let lastScrollY = 0;
let ticking = false;
let isScrollable = false;

const sceneInfo = [
    {
        // sec 01
        scrollHeight: 0,
        heightNumber: 0.8,
        target: document.querySelector('.sec-01')
    },
    {
        // sec 02
        scrollHeight: 0,
        heightNumber: 4,
        target: document.querySelector('.sec-02'),
        background: document.querySelector('.sec-02 .bg'),
        background_cover: document.querySelector('.sec-02 .bg-cover'),
        product: document.querySelector('.sec-02 .product-img'),
        product_img: document.querySelector('.sec-02 .product-img img'),
        cont: document.querySelector('.sec-02 .cont-group'),
        cont_tit: document.querySelector('.sec-02 .cont-group .tit'),
        cont_desc: document.querySelector('.sec-02 .cont-group .desc'),
        background_cover_scale_in: [0, 1, {start: 0.1, end: 0.25}],
        background_cover_opacity_in: [0.5, 1, {start: 0.1, end: 0.25}],
        product_img_transform_in: [120, 0, {start: 0.2, end: 0.4}],
        product_img_scale_in: [2, 1, {start: 0.2, end: 0.4}],
        product_img_rotate_in: [0, 90, {start: 0.4, end: 0.5}],
        product_img_opacity_in: [1, 0, {start: 0.51, end: 0.6}],
        cont_tit_opacity_in: [0, 1, {start: 0.55, end: 0.65}],
        cont_tit_transform_in: [30, 0, {start: 0.55, end: 0.65}],
        cont_desc_opacity_in: [0, 1, {start: 0.6, end: 0.7}],
        cont_desc_transform_in: [30, 0, {start: 0.6, end: 0.7}],
    },
];

const playSceneAnimation = () => {
    const currentScene = getCurrentScene()
        , prevScrollHeight = getPrevScrollHeight()
        , currentYOffset = yOffset - prevScrollHeight
        , currentSceneInfo = sceneInfo[currentScene]
        , {scrollHeight} = currentSceneInfo
        , scrollRatio = currentYOffset / scrollHeight;

    switch(currentScene) {
        case 0:
            break;
        case 1:
            currentSceneInfo.background_cover.style.opacity = getPartAnimationValue(currentSceneInfo.background_cover_opacity_in, currentYOffset);
            currentSceneInfo.background_cover.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.background_cover_scale_in, currentYOffset)}, 1)`;
            currentSceneInfo.product_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.product_img_transform_in, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.product_img_scale_in, currentYOffset)})`;
            
            scrollRatio > 0.15 ? currentSceneInfo.product.classList.add('active') : currentSceneInfo.product.classList.remove('active')
   
            if(scrollRatio > 0.4) {
                currentSceneInfo.cont.classList.add('active');
                currentSceneInfo.product_img.style.transform = `translate3d(0, 0, 0) scale(1) rotate(${getPartAnimationValue(currentSceneInfo.product_img_rotate_in, currentYOffset)}deg)`;
                currentSceneInfo.product_img.style.opacity = getPartAnimationValue(currentSceneInfo.product_img_opacity_in, currentYOffset);
                currentSceneInfo.cont_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_tit_opacity_in, currentYOffset);
                currentSceneInfo.cont_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_tit_transform_in, currentYOffset)}%, 0)`
                currentSceneInfo.cont_desc.style.opacity = getPartAnimationValue(currentSceneInfo.cont_desc_opacity_in, currentYOffset);
                currentSceneInfo.cont_desc.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_desc_transform_in, currentYOffset)}%, 0)`
            } else {
                currentSceneInfo.cont.classList.remove('active');
            }
            
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
         break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
    }
}

const isElemOverScreen = (elem, triggerDiff) => {
    const top = elem.getBoundingClientRect().top
        , { innerHeight } = window;

    return top > innerHeight + (triggerDiff || 0);
}

const setPlaySec02Animation = () => {
    const sec02 = document.querySelector('.sec-02')
        , sec02_top = sec02.offsetTop
        , sec02_rect = sec02.getBoundingClientRect()
        , sec02_inner = sec02.querySelector('.sec-inner')
        , sec02_bg = sec02.querySelector('.bg');

    sec02_inner.style.opacity = '0';
    sec02_inner.style.transform = 'translate3d(0, 20%, 0) scale(0.5)';

    let timer = setTimeout(() => {
        sec02_inner.style.opacity = '1';
        sec02_inner.style.transform = 'translate3d(0, 0, 0) scale(1)';
        clearTimeout(timer);
    }, 200);

    sec02_inner.addEventListener('transitionend', () => {
        sec02_inner.style.transform = '';
    })

    sec02_bg.style.transform = `translate3d(0, -${sec02_top / 40}vh, 0) scale(${1 - sec02_top / sec02_rect.top / 10})`;
}

const playSec02Animation = () => {
    const sec02 = document.querySelector('.sec-02')
        , sec02_top = sec02.offsetTop
        , sec02_rect = sec02.getBoundingClientRect()
        , sec02_bg = sec02.querySelector('.bg')
        , sec02_bg_cover = sec02.querySelector('.bg-cover');

    if(sec02_rect.top > 0) {
        sec02_bg.style.transform = `translate3d(0, -${sec02_rect.top / 40}vh, 0) scale(${1 - sec02_rect.top / sec02_top / 10})`;
    } else {
        sec02_bg.style.transform = `translate3d(0, 0, 0) scale(1)`;
    }

    if(yOffset >= sec02_top) {
        sec02_bg.classList.add('fixed');
        sec02_bg_cover.classList.add('fixed');
    } else {
        sec02_bg.classList.remove('fixed');
        sec02_bg_cover.classList.remove('fixed');
    }
}

const scrollLoop = () => {
    const header = document.querySelector('header')
        , direction = getScrollDirection()
        , sec02_inner = document.querySelector('.sec-02 .sec-inner')

    // 첫화면 나오기 전까지 스크롤 0, 1 유지
    if(!isScrollable) {
        sec02_inner.addEventListener('transitionend', () => {
           let timer = setTimeout(() => {
                isScrollable = true;
                enableScroll();
                clearTimeout(timer);
           }, 600);
        })
    } else {
        direction === 'down' ? header.classList.add('hide') : header.classList.remove('hide');
    }

    checkSceneAnimation();
    progressBarAnimtion();
    playSceneAnimation();
    playSec02Animation();
}

const loadInit = () => {
    window.scrollTo(0, 1);
    disableScroll()

    setProgressBar();
    setSectionScrollHeight();
    setPlaySec02Animation();

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

    window.addEventListener('scroll', optimizeAnimation(() => {
        yOffset = window.scrollY;

        scrollLoop();
    }), { passive: true });
});