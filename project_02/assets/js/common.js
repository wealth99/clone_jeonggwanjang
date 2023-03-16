let locoScroll;
const setLocoScroll = () => {
    const smoothScrollWrapper = document.querySelector('.smooth-scroll');

    locoScroll = new LocomotiveScroll({
        el: smoothScrollWrapper,
        smooth: true,
        getDirection: true,
    });

    ScrollTrigger.scrollerProxy(smoothScrollWrapper, {
        scrollTop(value) {
            return arguments.length 
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        pinType: smoothScrollWrapper.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

const setHeaderAnimation = () => {
    let activeElement;
    const header = document.querySelector('header')
        , gnb = document.querySelector('.gnb')
        , gnbBg = document.querySelector('.gnb-menu-bg')
        , gnbMenuItems = document.querySelectorAll('.gnb-menu-item')
        , subMenuItems = document.querySelectorAll('.sub-menu-item');
        
    // header ----------------------------------------------------------------
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
            gnbMenuItems.forEach(item => removeSubMenuAnmation(item))
            clearTimeout(itemr);
        }, 300);
    });

    const showHeaderAnimation = gsap.from(header, { 
        yPercent: -100,
        paused: true,
        duration: .5
    }).progress(1);

    ScrollTrigger.create({
        scroller: '.smooth-scroll',
        start: 'top top',
        end: document.querySelector('.smooth-scroll').scrollHeight + window.innerHeight,
        onUpdate: (self) => {
            self.direction === -1 ? showHeaderAnimation.play() : showHeaderAnimation.reverse();
            self.progress > 0.2 ? header.classList.add('whiter') :  header.classList.remove('whiter')
        }
    });

    // gnb ----------------------------------------------------------------
    gnb.addEventListener('mouseout', () => {
        activeElement = gnb.querySelectorAll('.active');
        activeElement.forEach(item => item.classList.remove('active'));
        gnbMenuItems.forEach(item => item.style.opacity = '');
    });
    
    gnbMenuItems.forEach(item => {
        const parentElement = item.parentElement
            , childElements = Array.from(parentElement.children)
            , anchor = item.querySelector('a'); 

        anchor.addEventListener('focus', event => {
            hoverGnbMenuAnimation(event, item, childElements);
        });
        item.addEventListener('mouseover', event => {
            hoverGnbMenuAnimation(event, item, childElements);
        });
    });

    // gnb sub ----------------------------------------------------------------
    subMenuItems.forEach(item => {
        const anchor = item.querySelector('a'); 

        anchor.addEventListener('focus', event => hoverSubMenuAnimation(event, item, 'focus'));
        item.addEventListener('mouseover', (event) => hoverSubMenuAnimation(event, item));
        item.addEventListener('mouseout', (event) => {
            const subMenuGroup = item.closest('.sub-menu-group')
                , subMenuItems = subMenuGroup.querySelectorAll('.sub-menu-item');

            subMenuItems.forEach(elem => elem.style.opacity = '1');
            event.currentTarget.style.opacity = '1';
        });
    });
}

const hoverGnbMenuAnimation = (event, target, childElements) => {
    const gnbBg = document.querySelector('.gnb-menu-bg')
        , gnbDimmed = document.querySelector('.gnb-menu-dimmed')
        , searchGorup = document.querySelector('.search-group');

    if(searchGorup.classList.contains('active')) {
        searchGorup.classList.remove('active');
        searchGorup.querySelector('form').style.opacity = '0';
    }

    childElements.forEach(item => {
        if(item === target) {
            target.classList.add('active');
            target.style.opacity = '1';
        } else {
            item.classList.remove('active');
            item.style.opacity = '0.4';
            removeSubMenuAnmation(item);
        }
    });

    if(target.querySelector('.sub-menu-group')) {
        gnbDimmed.classList.add('active');
        gnbBg.style.height = target.querySelector('.sub-menu-group').getBoundingClientRect().height  + 'px';
    } else {
        gnbBg.style.height = 0;
        gnbDimmed.classList.remove('active');
    }

    if(event.target.classList.contains('gnb-btn')) {
        let timer = setTimeout(() => {
            parseInt(gnbBg.style.height, 10) > 0 && showSubMenuAnimation(target);
            clearTimeout(timer);
        }, 300);
    }
}

const showSubMenuAnimation = (target) => {
    const subMenuGroup = target.querySelector('.sub-menu-group')
        , subMenus = subMenuGroup.querySelectorAll('.sub-menu')
        , subLen = subMenus.length
        , animate = (item, delay) => {
            let itemr = setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translate3d(0, 0%, 0)';
                clearTimeout(itemr);
            }, delay);
        }

    let delay = 0;
    if(subLen === 1) {
        const subMenuItems = subMenus[0].querySelectorAll('.sub-menu-item');
        subMenuItems.forEach(item => {
            delay += 100;
            animate(item, delay);
        });
    } else {
        subMenus.forEach(item => {
            delay += 100;
            animate(item, delay);
        });
    }
}

const hoverSubMenuAnimation = (event, item, type = null) => {
    const subMenuGroup = item.closest('.sub-menu-group')
        , subMenuItems = subMenuGroup.querySelectorAll('.sub-menu-item');

    if(type === 'focus') {
        subMenuItems.forEach(elem => elem.style.opacity = '0.4');
        event.currentTarget.parentElement.style.opacity = '1';
    } else {
        subMenuItems.forEach(elem => elem.style.setProperty('opacity', '0.4', 'important'));
        event.currentTarget.style.opacity = '1';
    }
}

const removeSubMenuAnmation = (target) => {
    const subMenuGroup = target.querySelectorAll('.sub-menu-group');

    subMenuGroup.forEach(item => {
        const subMenus = item.querySelectorAll('.sub-menu')
            , subLen = subMenus.length;

        if(subLen === 1) {
            const subMenuItems = subMenus[0].querySelectorAll('.sub-menu-item');
            subMenuItems.forEach(item =>  {
                item.style.transform = '';
                item.style.opacity = ''
            });
            return;
        }

        subMenus.forEach(item => {
            item.style.transform = '';
            item.style.opacity = ''
        });
    });
}

const handleSearchGroupClick = (event) => {
    const searchGorup = event.currentTarget
        , target = event.target
        , searchBtn = event.target.closest('.search-btn')
        , form = searchGorup.querySelector('form');

    if(searchBtn) {
        if(!searchGorup.classList.contains('active')) {
            searchGorup.classList.add('active');
            let timer = setTimeout(() => {
                form.style.opacity = '1';
                clearTimeout(timer);
            }, 500);
        } else {
            searchGorup.classList.remove('active');
            form.style.opacity = '0';
        }
    }

    if(target.classList.contains('search-dimmed')) {
        searchGorup.classList.toggle('active');
        form.style.opacity = '0';
    }
}

const handleLangGroupClick = (event) => {
    const langGroup = event.currentTarget
        , lang = langGroup.querySelector('.lang')
        , target = event.target;

    if(event.target.closest('.lang') || event.target.classList.contains('lang')) {
        lang.classList.toggle('active');
    }

    if(target.getAttribute('data-lang')) {
        const dataLang = target.getAttribute('data-lang');

        lang.querySelector('span').innerHTML = dataLang;
        lang.classList.toggle('active');
    }
}


let oldListbox, newListbox;
const handelClickListbox = (listbox, e) => {
    const $listbox = $(listbox)
        , $button = $listbox.find('button[aria-haspopup="listbox"]')
        , target = e.target
        , targetName = target.nodeName;

    newListbox = $listbox[0];
    if(oldListbox !== newListbox) {
        $('.listbox-group.active').find('button[aria-haspopup="listbox"]').removeAttr('aria-expanded');
        $('.listbox-group.active').removeClass('active');
    }

    if(targetName == 'BUTTON') {
        if(!$listbox.hasClass('active')) {
            $listbox.addClass('active');
            $listbox.find('ul[role="listbox"]').attr('tabindex', '-1').focus();
            $button.attr('aria-expanded', 'true');
        } else {
            $listbox.removeClass('active');
            $button.removeAttr('aria-expanded');
        }
    }

    if(targetName == 'LI') {
        changeListboxStatus($(target))

        $button.removeAttr('aria-expanded');
        $listbox.removeClass('active');
    }

    oldListbox = $listbox[0];
};
  
let keypressNum = 0;
const handleKeypressListboxList = (listboxList, e) => {
    let target;
    const $listboxList = $(listboxList)
        , $listbox = $listboxList.closest('.listbox-group')
        , $button = $listbox.find('button[aria-haspopup="listbox"]')
        , listLen = $listboxList.children().length;

    if(e.keyCode === 40 || e.key === 'ArrowDown') {
        if($listbox.find('.focused').length > 0) {
            keypressNum = $listbox.find('.focused').index() + 1;
            target = $listboxList.children().eq(keypressNum);
        } else {
            keypressNum++;
            target = $listboxList.children().eq(keypressNum - 1);
        }

        if(keypressNum === listLen) target = $listboxList.children().eq(0);

        changeListboxStatus(target);
    }

    if(e.keyCode === 38 || e.key === 'ArrowUp') {
        if(keypressNum < 0) keypressNum = listLen - 1;

        if($listbox.find('.focused').length > 0) {
            keypressNum = $listbox.find('.focused').index() - 1;
            target = $listboxList.children().eq(keypressNum);
        } else {
            keypressNum--;
            target = $listboxList.children().eq(keypressNum);
        }

        changeListboxStatus(target);
    }

    if(e.keyCode === 13 || e.key === 'Enter') {
        $button.removeAttr('aria-expanded');
        $button.focus();
        $listbox.removeClass('active');
    }

    if(e.keyCode === 27 || e.key === 'Escape') {
        $button.removeAttr('aria-expanded');
        $button.focus();
        $listbox.removeClass('active');
    }
}

const changeListboxStatus = (target) => {
    const $target = $(target)
        , $listboxList = $target.closest('ul[role="listbox"]')
        , $listbox = $listboxList.closest('.listbox-group')
        , $button = $listbox.find('button[aria-haspopup="listbox"]');

    if(!$target.hasClass('focused')) {
        $listboxList.attr('aria-activedescendant', $(target).attr('id'));
    }

    $target.siblings().removeClass('focused').removeAttr('aria-selected');
    $target.addClass('focused').attr('aria-selected', 'true');
    $target.attr('tabindex', 0).focus();
    $target.removeAttr('tabindex');
    $listboxList.attr('tabindex', '-1').focus();

    $button.text($target.text());
}

const progressBarAnimation = (info) => {
    let dashoffset;
    const bar = document.querySelector('.circle-progress .bar')
        , radius = 54
        , circumference = 2 * Math.PI * radius
        , footerHeight = document.querySelector('footer').clientHeight
        , {limit, scroll} = info
        , progress = scroll.y / (limit.y - footerHeight);

    bar.style.strokeDasharray = circumference;

    dashoffset = circumference * (1 - progress);
    dashoffset > 0 ? bar.style.strokeDashoffset = dashoffset : bar.style.strokeDashoffset = 0;
}

const btnTopAnimation = (info) => {
    const btnTop = document.querySelector('.btn-top')
        , {limit, scroll} = info
        , progress = scroll.y / limit.y;

    progress > 0.2 ? btnTop.classList.add('active') :  btnTop.classList.remove('active');

    if(scroll.y >= 11244) {
        btnTop.style.bottom = `${615 - (limit.y - scroll.y)}px`
    } else {
        btnTop.style.bottom = '';
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

const readHtml = (url) => fetch(url).then(res => res.text());

window.addEventListener('DOMContentLoaded', () => {
    const headerLoad = readHtml('../pages/include/header.html');
    const footerLoad = readHtml('../pages/include/footer.html');

    headerLoad.then(html => {
        document.querySelector('header').insertAdjacentHTML('beforeend', html);
    }).then(() => {
        setHeaderAnimation();

        const searcGroup = document.querySelector('.search-group');
        searcGroup.addEventListener('click', handleSearchGroupClick);

        const langGroup = document.querySelector('.lang-group');
        langGroup.addEventListener('click', handleLangGroupClick);
    });

    footerLoad.then(html => {
        document.querySelector('footer').insertAdjacentHTML('beforeend', html);
    }).then(() => {
        $('.listbox-group').each(function(index, item) {
            $(item).on('click', function(e) {
                handelClickListbox($(this), e);
            });
        });
          
        $(document).on('keydown', 'ul[role="listbox"]', function(e) {
            e.preventDefault();
            handleKeypressListboxList($(this), e);
        });
    });

    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
});