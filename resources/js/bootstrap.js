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
window.axios.defaults.headers.common['Accept'] = 'application/json';


window.token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found');
}


window.ih =  window.innerHeight;
window.iw =  window.innerWidth;

window.addEventListener('resize', function(){
    console.warn('Окно изменило размер');
    window.ih =  window.innerHeight;
    window.iw =  window.innerWidth;
})

