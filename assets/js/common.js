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
            clearTimeout(itemr);
        }, 300);
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
    
        anchor.addEventListener('focus', event => hoverGnbMenuAnimation(event, item, childElements));
        item.addEventListener('mouseover', event => hoverGnbMenuAnimation(event, item, childElements));
    });

    // gnb sub ----------------------------------------------------------------
    subMenuItems.forEach(item => {
        const anchor = item.querySelector('a'); 

        anchor.addEventListener('focus', event => hoverSubMenuAnimation(event, item, 'focus'));
        item.addEventListener('mouseover', (event) => hoverSubMenuAnimation(event, item));

        item.addEventListener('mouseout', (event) => {
            const subMenuGroup = item.closest('.sub-menu-group')
                , subMenuItems = subMenuGroup.querySelectorAll('.sub-menu-item');

            subMenuItems.forEach(elem => elem.style.opacity = '');
            event.currentTarget.style.opacity = '';
        });
    });
}

const hoverGnbMenuAnimation = (event, target, childElements) => {
    const gnbBg = document.querySelector('.gnb-menu-bg')
        , gnbDimmed = document.querySelector('.gnb-menu-dimmed')
        , searchGorup = document.querySelector('.search-group');

    if(searchGorup.classList.contains('active')) {
        const form = searchGorup.querySelector('form');
        searchGorup.classList.remove('active');
        form.style.opacity = '0';
    }

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
        removeSubMenuAnmation(target);

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
        , animate = (delay) => `subMenuItemFadeIn 0.5s ${delay}s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

    let delay = 0;
    if(subLen === 1) {
        const subMenuItems = subMenus[0].querySelectorAll('.sub-menu-item');
        subMenuItems.forEach(item => {
            item.style.animation = animate(delay);
            delay += 0.2;
        });
    } else {
        subMenus.forEach(item => {
            item.style.animation = animate(delay);
            delay += 0.2;
        });
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
                item.style.animation = '';
                item.style.opacity = ''
            });
            return;
        }

        subMenus.forEach(item => {
            item.style.animation = '';
            item.style.opacity = ''
        });
    });
}

const hoverSubMenuAnimation = (event, item, type = null) => {
    const subMenuGroup = item.closest('.sub-menu-group')
        , subMenuItems = subMenuGroup.querySelectorAll('.sub-menu-item');

    if(type === 'focus') {
        subMenuItems.forEach(elem => elem.style.setProperty('opacity', '0.4', 'important'))
        event.currentTarget.parentElement.style.setProperty('opacity', '1', 'important');
    } else {
        subMenuItems.forEach(elem => elem.style.setProperty('opacity', '0.4', 'important'))
        event.currentTarget.style.setProperty('opacity', '1', 'important');
    }
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

const durationScrollTo = (startY, duration = 800) => {
    let start = null;
    const currntY = window.pageYOffset;
    const distance = startY - currntY;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if(!start) start = timestamp;

        const progress = timestamp - start; 
        window.scrollTo(0, easeInOutCubic(progress, currntY, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if(t < 1) return c / 2 * t * t * t + b;

    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
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

const readHtml = (url) => fetch(url).then(res => res.text());

window.addEventListener('DOMContentLoaded', () => {
    const headerLoad = readHtml('../pages/include/header.html');
    const footerLoad = readHtml('../pages/include/footer.html');

    headerLoad.then(html => {
        document.querySelector('header').insertAdjacentHTML('beforeend', html)
    })
    .then(() => {
        setHeaderAnimation();

        const searcGroup = document.querySelector('.search-group');
        searcGroup.addEventListener('click', handleSearchGroupClick);

        const langGroup = document.querySelector('.lang-group');
        langGroup.addEventListener('click', handleLangGroupClick)
    });

    footerLoad.then(html => {
        document.querySelector('footer').insertAdjacentHTML('beforeend', html)
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
});