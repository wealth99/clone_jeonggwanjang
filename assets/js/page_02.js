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
        cont_01_fisrt_col: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(1)'),
        cont_01_seconed_col: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(2)'),
        cont_01_img: document.querySelector('.sec-04 .cont-01 .cont-col:nth-of-type(2) .cont-img img'),
        cont_02_fisrt_col: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(1)'),
        cont_02_seconed_col: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(2)'),
        cont_02_img: document.querySelector('.sec-04 .cont-02 .cont-col:nth-of-type(1) .cont-img img'),
        cont_01_fisrt_col_opacity_in: [0, 1, {start: 0.3, end: 0.6}],
        cont_01_fisrt_col_transform_in: [10, 0, {start: 0.3, end: 0.6}],
        cont_01_seconed_col_transform_in: [50, 0, {start: 0.3, end: 0.6}],
        cont_01_img_scale_in: [1.5, 1, {start: 0.3, end: 0.6}],
        cont_02_fisrt_col_transform_in: [50, 0, {start: 0.5, end: 0.8}],
        cont_02_seconed_col_transform_in: [10, 0, {start: 0.7, end: 0.9}],
        cont_02_seconed_col_opacity_in: [0, 1, {start: 0.7, end: 0.9}],
        cont_02_img_scale_in: [1.5, 1, {start: 0.5, end: 0.8}],
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
    },
    {
        scrollHeight: 0,
        heightNumber: 0.8,
        target: document.querySelector('.sec-06'),
        cont_tit: document.querySelector('.sec-06 .tit'),
        cont_everytime_list: document.querySelector('.sec-06 .hsj-everytime-list'),
        cont_tit_opacity_in: [0, 1, {start: 0.3, end: 0.5}],
        cont_tit_transform_in: [10, 0, {start: 0.3, end: 0.5}],
        cont_everytime_list_opacity_in: [0, 1, {start: 0.6, end: 0.8}],
        cont_everytime_list_transform_in: [10, 0, {start: 0.6, end: 0.8}]
    },
    {
        scrollHeight: 0,
        heightNumber: 5,
        target: document.querySelector('.sec-07'),
        cont_group: document.querySelector('.sec-07 .cont-group'),
        cont_01: document.querySelector('.sec-07 .cont-01'),
        cont_01_inner: document.querySelector('.sec-07 .cont-01 .cont-inner'),
        cont_01_tit: document.querySelector('.sec-07 .cont-01 .tit'),
        cont_01_desc: document.querySelector('.sec-07 .cont-01 .desc'),
        cont_01_over: document.querySelector('.sec-07 .cont-01 .cont-over'),
        cont_01_product_img: document.querySelector('.sec-07 .cont-01 .product-group .img'),
        cont_01_product_over_img: document.querySelector('.sec-07 .cont-01 .product-over .img'),
        cont_01_over_product_img: document.querySelector('.sec-07 .cont-01 .cont-over .product-group .img'),
        cont_01_over_product_over_img: document.querySelector('.sec-07 .cont-01 .cont-over .product-over .img'),
        cont_01_over_clipPath_in: [100, 0, {start: 0.0, end: 0.4}],
        cont_01_tit_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        cont_01_tit_transform_in: [20, 0, {start: 0.2, end: 0.3}],
        cont_01_desc_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
        cont_01_desc_transform_in: [20, 0, {start: 0.3, end: 0.4}],
        cont_01_over_product_img_height_out: [20, 0, {start: 0.42, end: 0.42}],
        cont_01_product_img_transform_out: [0, 100, {start: 0.42, end: 0.6}],
        cont_01_product_img_scale_out: [1, 0.8, {start: 0.42, end: 0.6}],
        cont_01_product_over_img_transform_out: [0, 100, {start: 0.4, end: 0.6}],
        cont_01_product_over_img_scale_out: [1, 0.8, {start: 0.42, end: 0.6}],
        cont_01_over_product_img_transform_out: [0, 100, {start: 0.4, end: 0.6}],
        cont_01_over_product_img_scale_out: [1, 0.8, {start: 0.42, end: 0.6}],
        cont_01_over_product_over_img_transform_out: [0, 100, {start: 0.4, end: 0.6}],
        cont_01_over_product_over_img_scale_out: [1, 0.8, {start: 0.42, end: 0.6}],
        cont_02: document.querySelector('.sec-07 .cont-02'),
        cont_02_inner: document.querySelector('.sec-07 .cont-02 .cont-inner'),
        cont_02_tit: document.querySelector('.sec-07 .cont-02 .tit'),
        cont_02_desc: document.querySelector('.sec-07 .cont-02 .desc'),
        cont_02_product_img: document.querySelector('.sec-07 .cont-02 .product-group .img'),
        cont_02_product_over_img: document.querySelector('.sec-07 .cont-02 .product-over .product-img .img'),
        cont_02_product_case_front_img: document.querySelector('.sec-07 .cont-02 .product-over .case-front-img .img'),
        cont_02_product_case_back_img: document.querySelector('.sec-07 .cont-02 .product-over .case-back-img .img'),
        cont_02_tit_opacity_in: [0, 1, {start: 0.6, end: 0.7}],
        cont_02_tit_transform_in: [20, 0, {start: 0.6, end: 0.7}],
        cont_02_desc_opacity_in: [0, 1, {start: 0.7, end: 0.8}],
        cont_02_desc_transform_in: [20, 0, {start: 0.7, end: 0.8}],
        cont_02_product_img_opacity_in: [0, 1, {start: 0.42, end: 0.42}],
        cont_02_product_img_transform_in: [100, 10, {start: 0.4, end: 0.6}],
        cont_02_product_img_scale_in: [1, 0.8, {start: 0.4, end: 0.6}],
        cont_02_product_over_img_opacity_in: [0, 1, {start: 0.42, end: 0.42}],
        cont_02_product_over_img_transform_in: [100, 10, {start: 0.4, end: 0.6}],
        cont_02_product_over_img_scale_in: [1, 0.8, {start: 0.4, end: 0.6}],
        cont_02_product_case_front_img_transform_in: [30, 0, {start: 0.5, end: 0.6}],
        cont_02_product_case_back_img_transform_in: [30, 0, {start: 0.5, end: 0.6}],
    },
    {
        scrollHeight: 0,
        heightNumber: 2,
        target: document.querySelector('.sec-08'),
        background: document.querySelector('.sec-08 .bg'),
        cont: document.querySelector('.sec-08 .cont-group'),
        tit_span_01: document.querySelector('.sec-08 .tit span:nth-of-type(1)'),
        tit_span_02: document.querySelector('.sec-08 .tit span:nth-of-type(2)'),
        tit_span_01_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        tit_span_01_transform_in: [50, 0, {start: 0.1, end: 0.2}],
        tit_span_02_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        tit_span_02_transform_in: [50, 0, {start: 0.2, end: 0.3}]
    },
    {
        scrollHeight: 0,
        heightNumber: 1.2,
        target: document.querySelector('.sec-09'),
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
    }
}

const unlockFixedElemAnimation = () => {
    sceneInfo.forEach((item, index) => {
      
        const isScreen = isElemOverScreen(item.target)
        , scrollRatio = getElemScrollRatio(item.target);

        if(!isScreen && scrollRatio > 0) {
            const prevScentInfo = sceneInfo[index - 1];

            // TODO 코드 변경해야함 .. 
            if(index !== 8) {
                changePositionElem(prevScentInfo.target, 'unlock');
            }
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
        } else {
            if(sec03_over_inner.classList.contains('active')) {
                sec03_over_inner.style.height = '100vh';
            }
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
        // , currentYOffset = yOffset >= sec07.offsetTop // 윈도우 높이 불포함 (불포함은 상단이 스크린 상단에 있을때)

    const scroll = () => {
        if(currentYOffset / sec04.scrollHeight > 0) {
            currentSceneInfo.cont_01_fisrt_col.style.opacity = getPartAnimationValue(currentSceneInfo.cont_01_fisrt_col_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_01_fisrt_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_fisrt_col_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont_01_seconed_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_seconed_col_transform_in, currentYOffset, currentIndex)}%, 0)`;
            currentSceneInfo.cont_01_img.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_01_img_scale_in, currentYOffset, currentIndex)})`;
            currentSceneInfo.cont_02_fisrt_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_fisrt_col_transform_in, currentYOffset, currentIndex)}%, 0)`;
            currentSceneInfo.cont_02_seconed_col.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_seconed_col_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont_02_seconed_col.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_seconed_col_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_02_img.style.transform = `translate3d(0, 0, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_02_img_scale_in, currentYOffset, currentIndex)})`;
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

const sec06Animation = () => {
    const sec06 = document.querySelector('.sec-06')
        , currentIndex = 5
        , currentYOffset = yOffset - sec06.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex];

    const scroll = () => {
        if(currentYOffset / sec06.scrollHeight > 0) {
            currentSceneInfo.cont_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_tit_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_tit_transform_in, currentYOffset, currentIndex)}vh, 0)`;
            currentSceneInfo.cont_everytime_list.style.opacity = getPartAnimationValue(currentSceneInfo.cont_everytime_list_opacity_in, currentYOffset, currentIndex);
            currentSceneInfo.cont_everytime_list.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_everytime_list_transform_in, currentYOffset, currentIndex)}vh, 0)`;
        }
    }

    return {
        scroll: () => scroll()
    }
}

const sec07Animation = () => {
    const sec07 = document.querySelector('.sec-07')
        , currentIndex = 6
        , currentYOffset = yOffset - sec07.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex]
        
    const init = () => {
        currentSceneInfo.cont_01.style.height = `${window.innerHeight * 3}px`;
        currentSceneInfo.cont_01_over.style.clipPath = 'inset(100% 0 0 0)';
        currentSceneInfo.cont_01_tit.style.opacity = '0';
        currentSceneInfo.cont_01_tit.style.transform = `translate3d(0, 20%, 0)`;
        currentSceneInfo.cont_01_desc.style.opacity = '0';
        currentSceneInfo.cont_01_desc.style.transform = `translate3d(0, 20%, 0)`;
        currentSceneInfo.cont_01_product_img.style.transform = `translate3d(0, -40vh, 0)`;
        currentSceneInfo.cont_01_product_img.style.height = '100%';
        currentSceneInfo.cont_01_product_over_img.style.transform = `translate3d(0, -40vh, 0)`;
        currentSceneInfo.cont_01_product_over_img.style.height = '100%';

        currentSceneInfo.cont_02.style.height = `${window.innerHeight * 2}px`;
        currentSceneInfo.cont_02_tit.style.opacity = '0';
        currentSceneInfo.cont_02_tit.style.transform = `translate3d(0, 20%, 0)`;
        currentSceneInfo.cont_02_desc.style.opacity = '0';
        currentSceneInfo.cont_02_desc.style.transform = `translate3d(0, 20%, 0)`;

        currentSceneInfo.cont_02_product_img.style.transform = `translate3d(0, -100vh, 0)`;
        currentSceneInfo.cont_02_product_img.style.opacity = '0';
        currentSceneInfo.cont_02_product_over_img.style.transform = `translate3d(0, -100vh, 0)`;
        currentSceneInfo.cont_02_product_over_img.style.opacity = '0';
        currentSceneInfo.cont_02_product_case_front_img.style.transform = `translate3d(0, 30%, 0)`;
        currentSceneInfo.cont_02_product_case_back_img.style.transform = `translate3d(0, 30%, 0)`;
    }

    const scroll = () => {
        if(currentYOffset / sec07.scrollHeight > 0) { // 컨텐츠가 스크린에서 노출 됐을떄 부터
            const scrollRatio = currentYOffset / currentSceneInfo.scrollHeight;

            if(scrollRatio > 0.0 && scrollRatio < 0.2) {
                currentSceneInfo.cont_01_product_img.style.height = `${100 - (scrollRatio / 0.2) * 60}%` // -> 높이 값을 40에서 0으로
                currentSceneInfo.cont_01_product_img.style.transform = `translate3d(0, -${(100 - (scrollRatio / 0.2) * 100) / 2.5}vh, 0)`; // -> y값을 40vh 에서 0으로 
                currentSceneInfo.cont_01_product_over_img.style.transform = `translate3d(0, -${(100 - (scrollRatio / 0.2) * 100) / 2.5}vh, 0)`; // -> y값을 40vh 에서 0으로 
            } else {
                currentSceneInfo.cont_01_product_img.style.height = '40%';
                currentSceneInfo.cont_01_product_img.style.transform = 'translate3d(0, 0, 0)';
                currentSceneInfo.cont_01_product_over_img.style.transform = 'translate3d(0, 0, 0)';
            }

            if(scrollRatio > 0 && scrollRatio < 1) {
                changePositionElem(currentSceneInfo.target, 'fixed');
            }
        }

        if(yOffset >= sec07.offsetTop) { // 컨텐츠가 스크린 상단에 맞닿았을때 부터
            const prevScrollHeight = getPrevScrollHeight()
                , currentYOffset = yOffset - prevScrollHeight
                , scrollRatio = currentYOffset / currentSceneInfo.scrollHeight;

            currentSceneInfo.cont_01_inner.classList.add('fixed');
            currentSceneInfo.cont_01_over.style.clipPath = `inset(${getPartAnimationValue(currentSceneInfo.cont_01_over_clipPath_in, currentYOffset)}% 0 0 0)`;
            currentSceneInfo.cont_01_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_01_tit_opacity_in, currentYOffset);
            currentSceneInfo.cont_01_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_tit_transform_in, currentYOffset)}%, 0)`;
            currentSceneInfo.cont_01_desc.style.opacity = getPartAnimationValue(currentSceneInfo.cont_01_desc_opacity_in, currentYOffset);
            currentSceneInfo.cont_01_desc.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_desc_transform_in, currentYOffset)}%, 0)`;

            currentSceneInfo.cont_02_tit.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_tit_opacity_in, currentYOffset);
            currentSceneInfo.cont_02_tit.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_tit_transform_in, currentYOffset)}%, 0)`;
            currentSceneInfo.cont_02_desc.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_desc_opacity_in, currentYOffset);
            currentSceneInfo.cont_02_desc.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_desc_transform_in, currentYOffset)}%, 0)`;

            if(yOffset >= sec07.offsetTop + currentSceneInfo.cont_02.offsetTop - window.innerHeight) {
                currentSceneInfo.cont_01.style.overflow = 'hidden';
                currentSceneInfo.cont_01_inner.classList.remove('fixed');
                currentSceneInfo.cont_01_inner.classList.add('unlock');
                currentSceneInfo.cont_01_inner.style.top = 'auto';
                currentSceneInfo.cont_01_inner.style.bottom = '0';

                currentSceneInfo.cont_01_product_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_product_img_transform_out, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_01_product_img_scale_out, currentYOffset)})`;
                currentSceneInfo.cont_01_product_over_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_product_over_img_transform_out, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_01_product_over_img_scale_out, currentYOffset)})`;
                currentSceneInfo.cont_01_over_product_img.style.height = `${getPartAnimationValue(currentSceneInfo.cont_01_over_product_img_height_out, currentYOffset)}%`;
                currentSceneInfo.cont_01_over_product_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_over_product_img_transform_out, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_01_over_product_img_scale_out, currentYOffset)})`;
                currentSceneInfo.cont_01_over_product_over_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_01_over_product_over_img_transform_out, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_01_over_product_over_img_scale_out, currentYOffset)})`;

                currentSceneInfo.cont_02_product_img.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_product_img_opacity_in, currentYOffset);
                currentSceneInfo.cont_02_product_img.style.transform = `translate3d(0, -${getPartAnimationValue(currentSceneInfo.cont_02_product_img_transform_in, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_02_product_img_scale_in, currentYOffset)})`;
                currentSceneInfo.cont_02_product_over_img.style.opacity = getPartAnimationValue(currentSceneInfo.cont_02_product_over_img_opacity_in, currentYOffset);
                currentSceneInfo.cont_02_product_over_img.style.transform = `translate3d(0, -${getPartAnimationValue(currentSceneInfo.cont_02_product_over_img_transform_in, currentYOffset)}vh, 0) scale(${getPartAnimationValue(currentSceneInfo.cont_02_product_over_img_scale_in, currentYOffset)})`;
                currentSceneInfo.cont_02_product_case_front_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_product_case_front_img_transform_in, currentYOffset)}%, 0)`;
                currentSceneInfo.cont_02_product_case_back_img.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.cont_02_product_case_back_img_transform_in, currentYOffset)}%, 0)`;
            } else {
                currentSceneInfo.cont_01.style.overflow = '';
                currentSceneInfo.cont_01_inner.classList.add('fixed');
                currentSceneInfo.cont_01_inner.classList.remove('unlock');
                currentSceneInfo.cont_01_inner.style.top = '';
                currentSceneInfo.cont_01_inner.style.bottom = '';
            }

            if(yOffset >= sec07.offsetTop + currentSceneInfo.cont_02.offsetTop) {
                currentSceneInfo.cont_02_inner.classList.add('fixed');
            } else {
                currentSceneInfo.cont_02_inner.classList.remove('fixed');
            }

        } else {
            currentSceneInfo.cont_01_inner.classList.remove('fixed');
        }
    }

    return {
        init: () => init(),
        scroll: () => scroll()
    }
}

const sec08Animation = () => {
    const sec08 = document.querySelector('.sec-08')
        , currentIndex = 7
        , currentYOffset = yOffset - sec08.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex];
    
    const init = () => {
        currentSceneInfo.cont.style.display = 'none';
        currentSceneInfo.tit_span_01.style.opacity = '0';
        currentSceneInfo.tit_span_01.style.transform = 'translate3d(0, 50%, 0)';
        currentSceneInfo.tit_span_02.style.opacity = '0';
        currentSceneInfo.tit_span_02.style.transform = 'translate3d(0, 50%, 0)';
    }

    const scroll = () => {
        const prevScrollHeight = getPrevScrollHeight()
        if(currentYOffset / sec08.scrollHeight > 0) {
            const scrollRatio = currentYOffset / currentSceneInfo.scrollHeight;
       
            if(scrollRatio > 0 && scrollRatio < 1) {
                changePositionElem(currentSceneInfo.target, 'fixed');
            }
        }

        if(yOffset >= sec08.offsetTop) {
            const currentYOffset = yOffset - prevScrollHeight
                , scrollRatio = currentYOffset / currentSceneInfo.scrollHeight;

            currentSceneInfo.background.classList.add('fixed');
            currentSceneInfo.cont.classList.add('fixed');
            currentSceneInfo.cont.style.display = 'flex';
            currentSceneInfo.cont.style.transform = '';
            currentSceneInfo.tit_span_01.style.opacity = getPartAnimationValue(currentSceneInfo.tit_span_01_opacity_in, currentYOffset);
            currentSceneInfo.tit_span_01.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.tit_span_01_transform_in, currentYOffset)}%, 0)`;
            currentSceneInfo.tit_span_02.style.opacity = getPartAnimationValue(currentSceneInfo.tit_span_02_opacity_in, currentYOffset);
            currentSceneInfo.tit_span_02.style.transform = `translate3d(0, ${getPartAnimationValue(currentSceneInfo.tit_span_02_transform_in, currentYOffset)}%, 0)`;
        } else {
            currentSceneInfo.background.classList.remove('fixed');
            currentSceneInfo.cont.classList.remove('fixed');
            currentSceneInfo.cont.style.display = 'none';
        }

        if(yOffset >= sec08.offsetTop + sec08.scrollHeight - window.innerHeight) {
            currentSceneInfo.background.style.position = 'absolute';
            currentSceneInfo.background.style.top = 'auto';
            currentSceneInfo.background.style.bottom = '0';
            
            variableAssignIfNotExists("sec08ContOffsetTop", $('.sec-08 .cont-group').offset().top)();

            currentSceneInfo.cont.style.position = 'absolute';
            currentSceneInfo.cont.style.top = `${sec08ContOffsetTop - getPrevScrollHeight()}px`;
            currentSceneInfo.cont.style.transform = 'translateX(-50%)';
        }
    }

    return {
        init: () => init(),
        scroll: () => scroll()
    }
}

const sec09Animation = () => {
    const sec09 = document.querySelector('.sec-09')
        , currentIndex = 8
        , currentYOffset = yOffset - sec09.offsetTop + window.innerHeight
        , currentSceneInfo = sceneInfo[currentIndex];

    const init = () => {
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

    return {
        init: () => init()
    }
}

const scrollLoop = () => {
    const header = document.querySelector('header')
        , direction = getScrollDirection()
        , sec02_inner = document.querySelector('.sec-02 .sec-inner')
        , btnTop = document.querySelector('.btn-top')
        , footer = document.querySelector('footer')

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

    if(window.innerHeight > footer.getBoundingClientRect().y) {
        btnTop.style.position = 'absolute';
    } else {
        btnTop.style.position = '';
    }

    checkSceneAnimation();
    playSceneAnimation();
    unlockFixedElemAnimation();
    sec02Animation().scroll();
    sec03Animation().scroll();
    sec04Animation().scroll();
    sec05Animation().scroll();
    sec06Animation().scroll();
    sec07Animation().scroll();
    sec08Animation().scroll();
    progressBarAnimation().scroll();
}

const loadInit = () => {
    window.scrollTo(0, 1);
    disableScroll()
    setSectionScrollHeight();
    sec02Animation().init();
    sec07Animation().init();
    sec08Animation().init();
    sec09Animation().init();
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