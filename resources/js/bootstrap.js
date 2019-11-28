// window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    //window.Tooltip = require('tooltip-js').default;
    //window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

window.notification = require('notification-js/src/notification.js');
notification.configProfile( 'global', {
    behaviour: {
        autoHide: 1,
        limit: 5
    },
    animations: {
        duration: [ 0.5, 0.5 ]
    },
} );


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

window.axios.interceptors.response.use(function (response) {
    document.body.classList.remove('loading');
    window.isXHRloading = false;
    if(response.data.event){
        let event = new Event(response.data.event, {bubbles: true});
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
    document.body.classList.remove('loading');
    window.isXHRloading = false;
    return Promise.reject(error);
}, function(e){

});


window.ih =  window.innerHeight;
window.iw =  window.innerWidth;

window.addEventListener('resize', function(){
    console.warn('Окно изменило размер');
    window.ih =  window.innerHeight;
    window.iw =  window.innerWidth;
})

