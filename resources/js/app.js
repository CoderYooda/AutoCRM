require('./bootstrap');                                             // Стартовая инициализация
require('./vue');

window.simplebar = require('simplebar/dist/simplebar.min');

import Vue from 'vue';
import VueMask from 'v-mask'
import VCalendar from 'v-calendar';
import App from './components/App'
import router from './router';
import store from './store';
import Notifications from 'vue-notification';
import VueConfirmDialog from 'vue-confirm-dialog';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import ValidateAction from './Components/directives/ValidateAction';
import Selector from './Components/service/Selector';

window.app_version = 0.9;
window.api_url = '/api';
window.debug = true;

Vue.prototype.$eventBus = new Vue();

Vue.prototype.saveToLocalStorage = (key, value, json = true)=>{
    if(json)
        value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

Vue.prototype.getFromLocalStorage = (key)=>{
    let val = localStorage[key];
    return val ? JSON.parse(val) : null;
};

Vue.prototype.removeFromLocalStorage = (key)=>{
    return localStorage.removeItem(key);
};

Vue.use(VueMask);
Vue.use(Notifications);
Vue.use(VCalendar);
Vue.use(VueConfirmDialog);
Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.directive('validate', ValidateAction);
Vue.component('v-popover', VPopover);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
Vue.component('Selector', Selector);


// Auth MIddleware
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLogged) {
            next({ name: 'auth' })
        } else {
            next() // автоизован, пропустить
        }
    } else {
        next() // не требует авторизации
    }
});

let app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


window.axios.interceptors.request.use(function (request){
    console.log(request);
    let token = localStorage['api_token'];
    if (token) {
        request.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
    }
    return request;
});



window.axios.interceptors.response.use(function (response) {
    // if(response.data.event){
    //     let event = new CustomEvent(response.data.event, {
    //         'detail' : {
    //             data: response.data
    //         },
    //     });
    //
    //     let listns = document.getElementsByClassName(response.data.event + 'Listner');
    //     [].forEach.call(listns, function(elem){
    //         elem.dispatchEvent(event);
    //     });
    //     document.dispatchEvent(event);
    //     console.log("Событие " + response.data.event + " объявлено");
    // }
    return response;
}, function (error) {
    // if (error.response && error.response.status === 401 || error.response && error.response.status === 419) {
    //     app.$eventBus.$emit('NoAuthEvent', true);
    // }
    // if (error.response && error.response.status === 429 ) {
    //     app.$eventBus.$emit('TooManyAttempts', true);
    // }
    // if (error.response.status === 422 || error.response.status === 200) {
    //     if(error.response.data.message && error.response.data.type){
    //         window.notification.notify( error.response.data.type, error.response.data.message);
    //     }
    // }
    //
    // if (error.response.status === 403) {
    //     if(error.response.data.type == "gateClosed"){
    //         window.notification.notify( 'error', error.response.data.message);
    //     }
    // }
    return Promise.reject(error);
}, function(e){

});
