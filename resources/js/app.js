//window.bootstrap = require("bootstrap.native");                     // Обращение к методам Bootstrap без jQuery
//require('./variables');                                             // Стартовая инициализация
require('./bootstrap');                                             // Стартовая инициализация
//require('../modules/draggable-dialog/dialog');                      // Диалоговые окна
//require('./navigation');                                            // Навигация XHR
//require('./select');                                            // Селекты
require('./vue');

// import "sceditor/src/sceditor";
//
// window.Tabulator = require('tabulator-tables');
// window.Swal = require('sweetalert2');
// window.flatpickr = require('flatpickr');
//
// window.choices = require('choices.js');
// window.chartjs = require('chart.js');
//
window.simplebar = require('simplebar/dist/simplebar.min');
//window.selection = require('@simonwep/selection-js');
// import tippy from 'tippy.js';
//
// window.debug = false;
//
// import Sortable from 'sortablejs';
// import IMask from 'imask';
//
// import { Russian } from "flatpickr/dist/l10n/ru";
// window.flatpickr.localize(Russian);
// import Pagination from './Classes/Pagination.js';
// import AxForm from './Classes/Form.js';
// import Helper from './Classes/Helper.js';
// import Socket from './Classes/Socket.js';
// import System from './Classes/System.js';
// import Alerts from './Classes/Alerts.js';
// import SystemMessages from './Classes/SystemMessages.js';
// import Supplier from './Classes/Supplier.js';
// import Entity from './Classes/Entity.js';
// import Scanner from './Classes/Scanner.js';
// import Auth from './Classes/Auth.js';
// import SettingMaster from './Classes/SettingMaster.js';
//
// window.clipboardJS = require('clipboard');
// window.helper = new Helper();
// window.socket = new Socket();
// window.system = new System();
// window.alerts = new Alerts();
// window.systemMessages = new SystemMessages();
// window.pagination = new Pagination();
// window.axform = new AxForm();
// window.supplier = new Supplier();
// window.entity = new Entity();
// window.scanner = new Scanner();
// window.auth = new Auth();
// window.tippy = tippy;
// window.setting_master = new SettingMaster();
//
// //window.modal = new Modal();
//
// Array.prototype.remove = function() {
//     var what, a = arguments, L = a.length, ax;
//     while (L && this.length) {
//         what = a[--L];
//         while ((ax = this.indexOf(what)) !== -1) {
//             this.splice(ax, 1);
//         }
//     }
//     return this;
// };
//
//
// window.dd = console.log.bind(document);
// window.applySelects();

import Vue from 'vue';
import VueMask from 'v-mask'
import VCalendar from 'v-calendar';
import App from './components/App'
import router from './router';
import store from './store';
import Notifications from 'vue-notification';
import VueConfirmDialog from 'vue-confirm-dialog'

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
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

let app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


// window.axios.interceptors.request.use(function (request){
//     console.log(request);
//     let token = localStorage['api_token'];
//     if (token) {
//         request.headers.common['Authorization'] = 'Bearer ' + token;
//     } else {
//         console.warn('API токен не выдан, возможно Вы не авторизованы в системе');
//     }
//     return request;
// });

window.axios.interceptors.request.use((config) => {
    let token = localStorage['api_token'];
    if(token){
        config.headers.common['Authorization'] = 'Bearer ' + token.replace(/\"/g, "");
    }
    return config;
}, (error) => {
    if (debug) { console.error("✉️ ", error); }
    return Promise.reject(error);
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
    if (error.response && error.response.status === 401 || error.response && error.response.status === 419) {
        app.$eventBus.$emit('NoAuthEvent', true);
    }
    if (error.response && error.response.status === 429 ) {
        app.$eventBus.$emit('TooManyAttempts', true);
    }
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
