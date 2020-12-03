window._ = require('lodash');
import Echo from "laravel-echo"
window.io = require('socket.io-client');
if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001',
    });
}
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
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.replace(/\"/g, "");
} else {
    console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
}

document.addEventListener('keydown', (e) => {
    window.shift_pressed = e.shiftKey;
    window.ctrl_pressed = e.ctrlKey;
});
document.addEventListener('keyup', (e) => {
    window.shift_pressed = e.shiftKey;
    window.ctrl_pressed = e.ctrlKey;
});

/* Prototype */
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
Date.prototype.ddmmyyy = function() {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();
    return [
        (dd>9 ? '' : '0') + dd,
        (mm>9 ? '' : '0') + mm,
        this.getFullYear(),
    ].join('.');
};
