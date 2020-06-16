window.Vue = require('vue');

Vue.component('statistic-index', require('./Components/Statistic/StatisticIndex.vue'));

const app = new Vue({
    el: '#unprinted'
});