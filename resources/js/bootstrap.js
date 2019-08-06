// window._ = require('lodash');

try {
    // window.Popper = require('popper.js').default;
    // window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}


window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
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

