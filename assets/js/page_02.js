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
        adLogo: document.querySelector('.sec-02 .ad-logo'),
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
        adLogo_opacity_in: [0, 1, {start: 0.7, end: 0.8}]
    },
    {
        scrollHeight: 0,
        heightNumber: 4,
        target: document.querySelector('.sec-03'),
        cont_01: document.querySelector('.sec-03 .cont-group'),
        cont_02: document.querySelector('.sec-03 .sec-over .cont-group'),
        sec_over_bgs: document.querySelector('.sec-03 .sec-over-bgs'),
        sec_over_bgs_01: document.querySelector('.sec-03 .sec-over-bg-01'),
        sec_over_bgs_02: document.querySelector('.sec-03 .sec-over-bg-02'),
        sec_over_bgs_03: document.querySelector('.sec-03 .sec-over-bg-03'),
        sec_over_bgs_width_in: [720, window.innerWidth, {start: 0, end: 0.7}],
        sec_over_bgs_height_in: [560, window.innerHeight, {start: 0, end: 0.7}],
        sec_over_bgs_01_opacity_in: [1, 0, {start: 0.1, end: 0.2}],
        sec_over_bgs_02_opacity_in: [0, 1, {start: 0.17, end: 0.4}],
        sec_over_bgs_03_opacity_in: [0, 1, {start: 0.37, end: 0.6}],
        sec_over_bgs_01_opacity_out: [1, 0, {start: 0.2, end: 0.35}],
        cont_01_opacity_in: [1, 0, {start: 0, end: 0.01}],
        cont_02_opacity_in: [1, 0, {start: 0.1, end: 0.3}],
    },
    {
        scrollHeight: 0,
        heightNumber: 1.5,
        target: document.querySelector('.sec-04'),
        cont01_fisrt_col: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(1)'),
        cont01_seconed_col: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(2)'),
        cont01_img: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(2) .cont-img img'),
        cont02_fisrt_col: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(1)'),
        cont02_seconed_col: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(2)'),
        cont02_img: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(1) .cont-img img'),
        cont01_fisrt_col_opacity_in: [0, 1, {start: 0.3, end: 0.6}],
        cont01_fisrt_col_transform_in: [10, 0, {start: 0.3, end: 0.6}],
        cont01_seconed_col_transform_in: [50, 0, {start: 0.3, end: 0.6}],
        cont01_img_scale_in: [1.5, 1, {start: 0.3, end: 0.6}],
        cont02_fisrt_col_transform_in: [50, 0, {start: 0.5, end: 0.8}],
        cont02_seconed_col_transform_in: [10, 0, {start: 0.6, end: 0.8}],
        cont02_seconed_col_opacity_in: [0, 1, {start: 0.6, end: 0.8}],
        cont02_img_scale_in: [1.5, 1, {start: 0.5, end: 0.8}],
    },
    {
        scrollHeight: 0,
        heightNumber: 1.5,
        target: document.querySelector('.sec-05'),
        cont_tit: document.querySelector('.sec-05 .cont-group .tit'),
        cont_desc: document.querySelector('.sec-05 .cont-group .desc'),
        cont_img: document.querySelector('.sec-05 .cont-img'),
        cont_img_img: document.querySelector('.sec-05 .cont-img img'),
        cont_tit_opacity_in: [0, 1, {start: 0.3, end: 0.5}],
        cont_tit_transform_in: [10, 0, {start: 0.3, end: 0.5}],
        cont_desc_opacity_in: [0, 1, {start: 0.4, end: 0.6}],
        cont_desc_transform_in: [10, 0, {start: 0.4, end: 0.6}],
        cont_img_transform_in: [50, 0, {start: 0.5, end: 1}],
        cont_img_img_scale_in: [1.5, 1, {start: 0.5, end: 1}]
    }
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
            changePositionElem(currentSceneInfo.target, 'fixed');
            currentSceneInfo.background_cover.style.opacity = getPartAnimationValue(currentSceneInfo.background_cover_opacity_in, currentYOffset);
            currentSceneInfo.background_cover.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.background_cover_scale_in, currentYOffset)}, 1)`;
            currentSceneInfo.product_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.product_img_transform_in, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.product_img_scale_in, currentYOffset)})`;

            if(scrollRatio > 0.15) {
                currentSceneInfo.product.classList.add('active', 'fixed');
            } else {
                currentSceneInfo.product.classList.remove('active', 'fixed');
            }

            if(scrollRatio > 0.4) {
                currentSceneInfo.cont.classList.add('active', 'fixed');
                currentSceneInfo.product_img.style.transform = `translate3d(0, 0, 0) scale(1) rotate(${getPartAnimationValue(currentSceneInfo.product_img_rotate_in, currentYOffset)}deg)`;
                currentSceneInfo.product_img.style.opacity = getPartAnimationValue(currentSceneInfo.product_img_opacity_in, currentYOffset);
                currentSceneInfo.cont_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_tit_opacity_in, currentYOffset);
                currentSceneInfo.cont_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_tit_transform_in, currentYOffset)}%, 0)`
                currentSceneInfo.cont_desc.style.opacity = getPartAnimationValue(currentSceneInfo.cont_desc_opacity_in, currentYOffset);
                currentSceneInfo.cont_desc.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_desc_transform_in, currentYOffset)}%, 0)`
            } else {
                currentSceneInfo.cont.classList.remove('active', 'fixed');
            }

            if(scrollRatio > 0.6) {
                currentSceneInfo.adLogo.classList.add('active', 'fixed');
                currentSceneInfo.adLogo.style.opacity = getPartAnimationValue(currentSceneInfo.adLogo_opacity_in, currentYOffset);
            } else {
                currentSceneInfo.adLogo.classList.remove('active', 'fixed');
            }
            break;
        case 2:
            changePositionElem(currentSceneInfo.target, 'fixed');
            currentSceneInfo.sec_over_bgs.style.width = `${getPartAnimationValue(currentSceneInfo.sec_over_bgs_width_in, currentYOffset)}px`;
            currentSceneInfo.sec_over_bgs.style.height = `${getPartAnimationValue(currentSceneInfo.sec_over_bgs_height_in, currentYOffset)}px`;
            currentSceneInfo.sec_over_bgs_01.style.opacity = getPartAnimationValue(currentSceneInfo.sec_over_bgs_01_opacity_in, currentYOffset);
            currentSceneInfo.sec_over_bgs_02.style.opacity = getPartAnimationValue(currentSceneInfo.sec_over_bgs_02_opacity_in, currentYOffset);
            currentSceneInfo.sec_over_bgs_03.style.opacity = getPartAnimationValue(currentSceneInfo.sec_over_bgs_03_opacity_in, currentYOffset);
            currentSceneInfo.sec_over_bgs_01.style.opacity = getPartAnimationValue(currentSceneInfo.sec_over_bgs_01_opacity_out, currentYOffset);
            currentSceneInfo.cont_01.style.opacity = getPartAnimationValue(currentSceneInfo.cont_01_opacity_in, currentYOffset);
            currentSceneInfo.cont_02.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_opacity_in, currentYOffset);
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

const unlockFixedElemAnimation = () => {
    sceneInfo.forEach((item, index) => {
        const isScreen = isElemOverScreen(item.target)
            , scrollRatio = getElemScrollRatio(item.target);

        if(!isScreen && scrollRatio > 0) {
            const prevScentInfo = sceneInfo[index - 1];
            changePositionElem(prevScentInfo.target, 'unlock');
        }
    });
}

const changePositionElem = (target, type) => {
    const fixeds = target.querySelectorAll('.fixed');
    fixeds.forEach(item => {
        if(type === 'unlock') {
            const top = item.offsetTop;
            if(!item.classList.contains('unlock')) {
                item.classList.add('unlock');
                item.style.position = 'absolute';
                item.style.top = 'auto';
                item.style.bottom = top === 0 ? '0' : `${Math.abs(item.clientTop - item.clientHeight / 2)}px`;
            }
        }

        if(type === 'fixed') {
            item.classList.remove('unlock');
            item.style.position = '';
            item.style.top = '';
            item.style.bottom = '';
        } 
    });
}

const sec02Animation = () => {
    const sec02 = document.querySelector('.sec-02')
        , sec02_top = sec02.offsetTop
        , sec02_rect = sec02.getBoundingClientRect()
        , sec02_inner = sec02.querySelector('.sec-inner')
        , sec02_bg = sec02.querySelector('.bg')
        , sec02_bg_cover = sec02.querySelector('.bg-cover');

    const init = () => {
        sec02_inner.style.opacity = '0';
        sec02_inner.style.transform = 'translate3d(0, 20%, 0) scale(0.5)';

        let timer = setTimeout(() => {
            sec02_inner.style.opacity = '1';
            sec02_inner.style.transform = 'translate3d(0, 0, 0) scale(1)';
            clearTimeout(timer);
        }, 200);

        sec02_inner.addEventListener('transitionend', () => {
            sec02_inner.style.transform = '';
        });

        sec02_bg.style.transform = `translate3d(0, -${sec02_top / 40}vh, 0) scale(${1 - sec02_top / sec02_rect.top / 10})`;
    }

    const scroll = () => {
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

    return {
        init: () => init(),
        scroll: () => scroll()
    }
}

const sec03Animation = () => {
    const sec03 = document.querySelector('.sec-03')
        , sec03_top = sec03.offsetTop
        , sec03_rect = sec03.getBoundingClientRect()
        , sec03_over_inner = sec03.querySelector('.sec-over-inner');
        
    const scroll = () => {
        if(yOffset >= sec03_top) {
            sec03_over_inner.classList.add('fixed');
        } else {
            sec03_over_inner.classList.remove('fixed');
        }

        if(window.innerHeight > sec03_rect.top && sec03_rect.top > 0) {
            sec03_over_inner.classList.add('active');
            sec03_over_inner.style.top = `${sec03_rect.top}px`;
            sec03_over_inner.style.height = `${100 - sec03_rect.top / (window.innerHeight) * 100}vh`;
        }
    }

    return {
        scroll: () => scroll()
    }
}

const sec04Animation = () => {
    const sec04 = document.querySelector('.sec-04')
        , currentIndex = 3
        , currentYOffset = yOffset - sec04.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex]
        // , currentYOffset = (yOffset - sec04.offsetTop + window.innerHeight) / sec04.scrollHeight // 윈도우 높이 포함(포함은 상단이 나타났을 때)
        // , currentYOffset = (yOffset - sec04.offsetTop) / sec04.scrollHeight // 윈도우 높이 불포함 (불포함은 상단이 스크린 상단에 있을때)

    const scroll = () => {
        if(currentYOffset / sec04.scrollHeight > 0) {
            currentSceneInfo.cont01_fisrt_col.style.opacity = getPartAnimationValue(currentSceneInfo.cont01_fisrt_col_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont01_fisrt_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont01_fisrt_col_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont01_seconed_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont01_seconed_col_transform_in, currentYOffset, currentIndex)}%, 0)`;
            currentSceneInfo.cont01_img.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.cont01_img_scale_in, currentYOffset, currentIndex)})`;
            currentSceneInfo.cont02_fisrt_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont02_fisrt_col_transform_in, currentYOffset, currentIndex)}%, 0)`;
            currentSceneInfo.cont02_seconed_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont02_seconed_col_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont02_seconed_col.style.opacity = getPartAnimationValue(currentSceneInfo.cont02_seconed_col_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont02_img.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.cont02_img_scale_in, currentYOffset, currentIndex)})`;
        }
    }

    return {
        scroll: () => scroll()
    }
}

const sec05Animation = () => {
    const sec05 = document.querySelector('.sec-05')
        , currentIndex = 4
        , currentYOffset = yOffset - sec05.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex];

    const scroll = () => {
        if(currentYOffset / sec05.scrollHeight > 0) {

            currentSceneInfo.cont_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_tit_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_tit_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont_desc.style.opacity = getPartAnimationValue(currentSceneInfo.cont_desc_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_desc.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_desc_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_img_transform_in, currentYOffset, currentIndex)}%, 0)`;
            currentSceneInfo.cont_img_img.style.transform = `scale(${getPartAnimationValue(currentSceneInfo.cont_img_img_scale_in, currentYOffset, currentIndex)})`;
        }
    }

    return {
        scroll: () => scroll()
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
    playSceneAnimation();
    unlockFixedElemAnimation();
    sec02Animation().scroll();
    sec03Animation().scroll();
    sec04Animation().scroll();
    sec05Animation().scroll();
    progressBarAnimation().scroll();
}

const loadInit = () => {
    window.scrollTo(0, 1);
    disableScroll()
    setSectionScrollHeight();
    sec02Animation().init();
    progressBarAnimation().init();

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