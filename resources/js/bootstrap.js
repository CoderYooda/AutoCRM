
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
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.baseURL = '/api/';
let token = localStorage['api_token'];
if (token) {
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
} else {
    console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
}
