
try {
    window.Popper = require('popper.js').default;
} catch (e) {}

window.notification = require('notification-js/src/notification.js');
notification.configProfile( 'global', {
    behaviour: {
        autoHide: 2,
        limit: 5
    },
    animations: {
        duration: [ 0.5, 0.5 ]
    },
} );

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = '*';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.warn('CSRF токен не выдан, возможно Вы не авторизованы в системе');
}

axios.interceptors.request.use(function (config) {
    document.body.classList.add('loading');
    return config;
}, function (error) {
    document.body.classList.remove('loading');
    window.isXHRloading = false;
    return Promise.reject(error);
});

setInterval(function () {
    if(document.querySelector('#current_time')){
        let date = new Date();
        let hours = null;
        let minutes = null;
        let seconds = null;
        if(date.getHours().toString().length < 2){hours = '0' + date.getHours();} else {hours = date.getHours();}
        if(date.getMinutes().toString().length < 2){minutes = '0' + date.getMinutes();} else {minutes = date.getMinutes();}
        if(date.getSeconds().toString().length < 2){seconds = '0' + date.getSeconds();} else {seconds = date.getSeconds();}
        let time = document.getElementById('current_time');
        if(time !== null){
            document.querySelector('#current_time .h').innerHTML = hours;
            document.querySelector('#current_time .m').innerHTML = minutes;
            document.querySelector('#current_time .s').innerHTML = seconds;
        }
    }
}, 1000);

window.togglePreloader = function togglePreloader(element, status) {
    let classList = element.classList;
    if(!classList.contains('preloader-block')) classList.add('preloader-block');
    status ? classList.add('active') : classList.remove('active');
};

window.axios.interceptors.response.use(function (response) {
    document.body.classList.remove('loading');
    window.isXHRloading = false;
    // window.unsetPreloader();
    if(response.data.event){
        let event = new CustomEvent(response.data.event, {
            'detail' : {
                data: response.data
            },
        });

        let listns = document.getElementsByClassName(response.data.event + 'Listner');
        [].forEach.call(listns, function(elem){
            elem.dispatchEvent(event);
        });
        document.dispatchEvent(event);
        console.log("Событие " + response.data.event + " объявлено");
    }
    return response;
}, function (error) {
    // window.unsetPreloader();
    if (error.response.status === 401) {
        window.location.href = "/login";
    }
    if (error.response.status === 422 || error.response.status === 200) {

        // console.log('123', error.response.data.message, error.response.data.type);

        if(error.response.data.message && error.response.data.type){
            window.notification.notify( error.response.data.type, error.response.data.message);
        }
    }
    if (error.response.status === 419) {
        window.location.href = "/login";
    }
    if (error.response.status === 403) {
        if(error.response.data.type == "gateClosed"){
            window.notification.notify( 'error', error.response.data.message);
        }
    }
    document.body.classList.remove('loading');
    window.isXHRloading = false;
    return Promise.reject(error);
}, function(e){

});

Array.prototype.unique = function() {
    let a = this.concat();
    for(let i = 0; i < a.length; ++i) {
        for(let j = i + 1; j < a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

document.addEventListener('keydown', (e) => {
    window.shift_pressed = e.shiftKey;
    window.ctrl_pressed = e.ctrlKey;
});
document.addEventListener('keyup', (e) => {
    window.shift_pressed = e.shiftKey;
    window.ctrl_pressed = e.ctrlKey;
});

window.ih =  window.innerHeight;
window.iw =  window.innerWidth;

window.fakeCounter = 0;

axios({
    method: 'GET',
    url: '/islogged'
}).then(function (resp) {
    if(!resp.data.auth){
        window.isLogged = false;
        return false;
    } else {
        window.isLogged = true;
        window.fakeCounter ++;
        let event = new Event('AuthorizedEvent', {bubbles: true});
        document.dispatchEvent(event);
        return true;
    }
});

window.addEventListener('resize', function(){
    console.warn('Окно изменило размер');
    window.ih =  window.innerHeight;
    window.iw =  window.innerWidth;
});

window.addEventListener('mousemove', function(e){
    window.mousex =  e.clientX;
    window.mousey =  e.clientY;
});

document.addEventListener('click', function (e){
    var divs = document.getElementsByClassName('dropdown_container');
    [].forEach.call(divs, function(div){

        let click_element = e.target;

        if (div !== (click_element)
            && !div.contains(click_element)
            && !div.parentElement.contains(click_element)
        ) {
            div.parentElement.classList.remove('show');
        }

        if(click_element.classList.contains('element')) {
            div.parentElement.classList.remove('show');
        }
    });
});

document.addEventListener('keyup', function (e){

    if(e.keyCode == 27){
        var divs = document.getElementsByClassName('dropdown_container');
        [].forEach.call(divs, function(div){
            div.parentElement.classList.remove('show');
        });
    }
});


