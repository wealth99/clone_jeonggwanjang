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
        messageA_translateY_in: [10, -50, {start: 0.1, end: 0.2}],
        messageB_opacity_in: [0, 1, {start: 0.2, end: 0.3}],
        messageB_translateY_in: [10, -50, {start: 0.2, end: 0.3}]
    }
];

const setSectionScrollHeight = () => {
    sceneInfo.forEach(item => {
        let height = window.innerHeight * item.heightNumber;

        item.scrollHeight = height
        item.target.style.height = height + 'px';
    });
}

const getCurrentScene = () => {
    let totalScrollHeight = 0;
    let currentScene = 0;
    
    for(let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;

        if(totalScrollHeight >= yOffset) {
            currentScene = i;
            break;
        }
    }

    return currentScene;
}

const getPrevScrollHeight = () => {
    let prevScrollHeight = 0;
    let currentScene = getCurrentScene();

    for(let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    return prevScrollHeight;
}

const getPageRatio = () => {
    return (yOffset / (document.body.clientHeight - window.innerHeight)) * 100
}

const getPartAnimationValue = (info, currentYOffset) => {
    let ratio;
    const currentScene = getCurrentScene()
        , scrollHeight = sceneInfo[currentScene].scrollHeight
        , scrollRatio = currentYOffset / scrollHeight
        , partScrollStart = info[2].start * scrollHeight
        , partScrollEnd = info[2].end * scrollHeight
        , partScrollHeight = partScrollEnd - partScrollStart;

    if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        ratio = (currentYOffset - partScrollStart) / partScrollHeight * (info[1] - info[0]) + info[0];
    } else if(currentYOffset > partScrollEnd) {
        ratio = info[1];
    } else if(currentYOffset < partScrollStart) {
        ratio = info[0];
    }
  
    return ratio;
}

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

const fixedUnlockAnimation = () => {
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

const getScrollDirection = () => {
    const direction = yOffset > lastScrollY ? "down" : "up";
    lastScrollY = scrollY;

    return direction;
}

const setHeaderAnimation = () => {
    let activeElement;
    const header = document.querySelector('header')
        , gnb = document.querySelector('.gnb')
        , gnbBg = document.querySelector('.gnb-menu-bg')
        , gnbMenuItems = document.querySelectorAll('.gnb-menu-item')
 
    header.addEventListener('mouseover', () => {
        activeElement = gnb.querySelector('.active');

        header.classList.add('active');
        if(!activeElement) gnbBg.style.height = 0;
    });

    header.addEventListener('mouseleave', () => {
        activeElement = gnb.querySelector('.active');
        
        gnbBg.style.height = 0;
        let itemr = setTimeout(() => {
            !activeElement && header.classList.remove('active');
            clearTimeout(itemr);
        }, 300);
    });
    
    gnb.addEventListener('mouseout', () => {
        activeElement = gnb.querySelectorAll('.active');
        activeElement.forEach(item => item.classList.remove('active'));
        gnbMenuItems.forEach(item => item.style.opacity = '');
    });
    
    gnbMenuItems.forEach(item => {
        const parentElement = item.parentElement
            , childElements = Array.from(parentElement.children)
            , anchor = item.querySelector('a'); 
    
        anchor.addEventListener('focus', (event) => gnbMenuAnimation(event, item, childElements));
        item.addEventListener('mouseover', (event) => gnbMenuAnimation(event, item, childElements));
    });
}

const gnbMenuAnimation = (event, target, childElements) => {
    const gnbBg = document.querySelector('.gnb-menu-bg')
        , gnbDimmed = document.querySelector('.gnb-menu-dimmed');

    childElements.forEach(item => {
        item.classList.remove('active');
        item.style.opacity = '0.4';
    });
    target.classList.add('active');
    target.style.opacity = '1';

    if(!target.querySelector('.sub-menu-group')) {
        gnbBg.style.height = 0;
        gnbDimmed.classList.remove('active');
        return
    }

    gnbDimmed.classList.add('active');
    gnbBg.style.height = target.querySelector('.sub-menu-group').getBoundingClientRect().height  + 'px';
    
    if(event.target.classList.contains('gnb-btn')) {
        if(subAnimationList.length > 0) {
            subAnimationList.forEach((item, index) =>  subAnimationList[index].cancel());
            subAnimationList = [];
        }

        setTimeout(() => {
            parseInt(gnbBg.style.height, 10) > 0 && subMenuAnimation(target);
        }, 300);
    }
}

let subAnimationList = [];
const subMenuAnimation = (target) => {
    const subMenuGroup = target.querySelector('.sub-menu-group')
        , subMenus = subMenuGroup.querySelectorAll('.sub-menu')
        , subLen = subMenus.length
        , subAnimation = [{transform: 'translate3d(0, 20%, 0)', opacity: 0}, {transform: 'translate3d(0, 0, 0)', opacity: 1}]
        , subTiming = {duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'}
        , subItemAnimate = (target, index) => {
            const aniObj = target.animate(
                subAnimation,
                {...subTiming, delay: 100 * index}
            )
            return aniObj;
        }

    if(subLen === 1) {
        const subMenuItems = subMenus[0].querySelectorAll('.sub-menu-item');
        subMenuItems.forEach((item, index) => subAnimationList.push(subItemAnimate(item, index)));
    } else {
        subMenus.forEach((item, index) => subAnimationList.push(subItemAnimate(item, index)));
    }  
}

const checkSceneAnimation = () => {
    sceneInfo.forEach(item => {
        yOffset >= item.target.offsetTop ? item.target.classList.add('seen-sec') : item.target.classList.remove('seen-sec');
    });
}

const setProgressBar = () => {
    const bar = document.querySelector('.circle-progress .bar')
        , radius = 54
        , circumference = 2 * Math.PI * radius;

    bar.style.strokeDasharray = circumference;
}

const progressBarAnimtion = () => {
    const btnTop = document.querySelector('.btn-top')
        , bar = document.querySelector('.circle-progress .bar')
        , pageRatio = getPageRatio() / 100
        , radius = 54
        , circumference = 2 * Math.PI * radius
        , dashoffset = circumference * (1 - pageRatio);

    yOffset >= window.innerHeight * 2 ? btnTop.classList.add('active') : btnTop.classList.remove('active')
    bar.style.strokeDashoffset = dashoffset;
}

const scrollLoop = () => {
    playSceneAnimation();
    progressBarAnimtion();
    checkSceneAnimation();
    changeSceneBackground();
    fixedUnlockAnimation();

    const header = document.querySelector('header')
        , direction = getScrollDirection()
        , currentScene = getCurrentScene()
        , currentSceneInfo = sceneInfo[currentScene];

    // 첫화면 나오기 전까지 스크롤 0, 1 유지
    if(!isScrollable) {
        currentSceneInfo.target.querySelector('.txt-line:nth-of-type(2)').addEventListener('transitionend', () => {
            isScrollable = true;
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
}

let scrollStart;
function durationScrollTo(y, duration = 800) {
    const currentY = window.scrollY;
    const stepY = (y - currentY) / duration;

    const scrollInterval = function(timestamp) {
        if (!scrollStart) scrollStart = timestamp;
        var progress = timestamp - scrollStart;
        
        if (duration >= progress) {
            window.scrollTo({ top: currentY + (stepY * progress)});
            requestAnimationFrame(scrollInterval);
        } else {
            y !== currentY && window.scrollTo({top: y}); // 오차 발생시 이동
            scrollStart = null;
        }
    };
    
    requestAnimationFrame(scrollInterval);
};

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
    window.scrollTo(0, 1);
    setProgressBar();
    setHeaderAnimation();
    setSectionScrollHeight();
    
    const btnTop = document.querySelector('.btn-top button');
    btnTop.addEventListener('click', () => {
        durationScrollTo(0);
    });

    window.addEventListener('scroll', optimizeAnimation(() => {
        yOffset = window.scrollY;
        scrollLoop();
    }), { passive: true });
    
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
});

