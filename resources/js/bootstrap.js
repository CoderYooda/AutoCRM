//new Modal// window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    //window.Tooltip = require('tooltip-js').default;
    //window.$ = window.jQuery = require('jquery');
    //require('bootstrap');
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

window.token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    // XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
    // XMLHttpRequest.prototype.open   = function () {
    //     this.origOpen.apply(this, arguments);
    //     this.setRequestHeader('X-CSRF-TOKEN', token.content);
    //     this.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //     this.setRequestHeader('Accept', 'application/json');
    // };
    //
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

// setInterval(function(){
//     document.getElementById('xhr').value = window.isXHRloading;
// }, 50);

// var dialog_html = document.getElementById('system_dialog');
// if(dialog_html){
//     window.system_dialog = new window.bootstrap.Modal();
// }
setInterval(function () {
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
}, 1000);

window.togglePreloader = function togglePreloader(element, status) {
    let classList = element.classList;

    status ? classList.add('active') : classList.remove('active');
};

window.axios.interceptors.response.use(function (response) {
    document.body.classList.remove('loading');
    window.isXHRloading = false;

    if(response.data.event){

        //let event = new Event(response.data.event, {bubbles: true});

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

    if (error.response.status === 401) {
        window.location.href = "/login";
    }
    if (error.response.status === 422 || error.response.status === 200) {

        console.log('123', error.response.data.message, error.response.data.type);

        if(error.response.data.message && error.response.data.type){
            window.notification.notify( error.response.data.type, error.response.data.message);
        }
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


window.ih =  window.innerHeight;
window.iw =  window.innerWidth;

// let notifications = document.getElementById('new_dialog');
// let options = {
//     backdrop: true,
//     keyboard: true,
// };
// window.notifications = new bootstrap.Modal(notifications, options);


window.fakeCounter = 0;

axios({
    method: 'GET',
    url: '/islogged'
}).then(function (resp) {

    //console.log(resp.data.auth);

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
    // console.warn('Мышка двигае');
    window.mousex =  e.clientX;
    window.mousey =  e.clientY;
});

document.addEventListener('click', function (e){
    var divs = document.getElementsByClassName('dropdown_container');
    [].forEach.call(divs, function(div){
        if (div !== (e.target)
            && !div.contains(e.target)
            && !div.parentElement.contains(e.target)
        ) {
            div.parentElement.classList.remove('show');
        }
    });
});
