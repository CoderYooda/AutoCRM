if ( window.pageYOffset > 250 )
{
    header.style.top = '0';
    header.style.position = 'fixed';
    header.style.backgroundColor = '#f7f7f7';
    header.classList.add('sticky');
}

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset;
    var header = document.getElementById('header');
    if ( scrollTop > 80 && scrollTop < 251 )
    {
        header.style.top = '-75px';
        header.style.position = 'absolute';
        header.style.backgroundColor = 'transparent';
        header.classList.remove('sticky');
    }
    else if ( scrollTop > 250 )
    {
        header.style.top = '0';
        header.style.position = 'fixed';
        header.style.backgroundColor = '#f7f7f7';
        header.classList.add('sticky');
    }
    else
    {
        header.style.top = '0';
        header.style.position = 'absolute';
        header.classList.remove('sticky');
    }
});

var links = document.querySelectorAll('a[href*="#"]');

for (let link of links) {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        let blockID = link.getAttribute('href').substr(1);

        let offset = document.getElementById(blockID).offsetTop;
        console.log(offset);
        window.scrollTo({
            top: offset - 100,
            behavior: "smooth"
        });

        document.getElementById('menu_wrap').classList.remove('show');
    })
}

/////////////////////////////////////////////////////////////////////
var menu_button = document.getElementById('menu_button'),
    close_menu_button = document.getElementById('close_menu_button'),
    menu_wrap = document.getElementById('menu_wrap');

menu_button.addEventListener('click', function () {
    menu_wrap.classList.add('show');
});
close_menu_button.addEventListener('click', function () {
    menu_wrap.classList.remove('show');
});

//////////////////////////////////////////////////////////////////////

document.getElementById('btn_nav_reg').addEventListener('click', function () {
    ym(56232943,'reachGoal','btn_nav_reg');
});

document.getElementById('btn_header_free').addEventListener('click', function () {
    ym(56232943,'reachGoal','btn_header_free');
});

document.getElementById('what-is-bbcrm').addEventListener('click', function () {
    ym(56232943,'reachGoal','what-is-bbcrm')
});

document.getElementById('btn_video_free').addEventListener('click', function () {
    ym(56232943,'reachGoal','btn_video_free');
});

document.getElementById('btn_after_steps').addEventListener('click', function () {
    ym(56232943,'reachGoal','btn_after_steps')
});

document.getElementById('btn_after_tarif').addEventListener('click', function () {
    ym(56232943,'reachGoal','btn_after_tarif')
});






