import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',//process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {layout: 'main'},
            component: () => import('./components/views/Home.vue')
        },
        {
            path: '/store',
            name: 'store',
            redirect: 'store/base',
            meta: {layout: 'main'},
            component: () => import('./components/views/Store.vue'),
            children:[
                {path: '/store/base',               name: 'base', meta: {layout: 'main'},               component: () => import('./components/views/Store/Base'), props: true},
                {path: '/store/provider_store',     name: 'provider_store', meta: {layout: 'main'},     component: () => import('./components/views/Store/ProviderStore'), props: true},
                {path: '/store/provider_order',     name: 'provider_order', meta: {layout: 'main'},     component: () => import('./components/views/Store/ProviderOrder'), props: true},
                {path: '/store/entrance',           name: 'entrance', meta: {layout: 'main'},           component: () => import('./components/views/Store/Entrance'), props: true},
                {path: '/store/entrance_refund',    name: 'entrance_refund', meta: {layout: 'main'},    component: () => import('./components/views/Store/EntranceRefund'), props: true},
                {path: '/store/shipment',           name: 'shipment', meta: {layout: 'main'},           component: () => import('./components/views/Store/Shipment'), props: true},
                {path: '/store/shipment_refund',    name: 'shipment_refund', meta: {layout: 'main'},    component: () => import('./components/views/Store/ShipmentRefund'), props: true},
                {path: '/store/client_order',       name: 'client_orders', meta: {layout: 'main'},      component: () => import('./components/views/Store/ClientOrder'), props: true},
                {path: '/store/adjustment',         name: 'adjustment', meta: {layout: 'main'},         component: () => import('./components/views/Store/Adjustment'), props: true},
                {path: '/store/document',           name: 'document', meta: {layout: 'main'},           component: () => import('./components/views/Store/Document'), props: true},
                {path: '/store/shop_order',         name: 'shop_order', meta: {layout: 'main'},         component: () => import('./components/views/Store/ShopOrder'), props: true}
            ]
        },
        {
            path: '/cash',
            name: 'cash',
            redirect: 'cash/warrant',
            meta: {layout: 'main'},
            component: () => import('./components/views/Cash.vue'),
            children:[
                {path: '/cash/warrant',             name: 'warrant', meta: {layout: 'main'},            component: () => import('./components/views/Cash/Warrant'), props: true},
                {path: '/cash/cash_move',           name: 'cash_move', meta: {layout: 'main'},          component: () => import('./components/views/Cash/CashMove'), props: true},
                {path: '/cash/salary_payments',     name: 'salary_payments', meta: {layout: 'main'},    component: () => import('./components/views/Cash/SalaryPayment'), props: true},
            ]
        },
        {
            path: '/user',
            name: 'user',
            redirect: 'user/profile',
            meta: {layout: 'main'},
            component: () => import('./components/views/User.vue'),
            children:[
                {path: '/user/profile',             name: 'profile', meta: {layout: 'main'},            component: () => import('./components/views/User/Profile'), props: true},
                {path: '/user/service',             name: 'service', meta: {layout: 'main'},            component: () => import('./components/views/User/Services'), props: true},
                {path: '/user/settings',            name: 'settings', meta: {layout: 'main'},            component: () => import('./components/views/User/Settings'), props: true},
                {path: '/user/garage',              name: 'garage', meta: {layout: 'main'},            component: () => import('./components/views/User/Garage'), props: true},
            ]
        },
        {
            path: '/contact',
            name: 'contact',
            meta: {layout: 'main'},
            component: () => import('./components/views/Contact.vue')
        },
        {
            path: '/schedule',
            name: 'schedule',
            meta: {layout: 'main'},
            component: () => import('./components/views/Schedule.vue')
        },
        {
            path: '/history',
            name: 'history',
            meta: {layout: 'main'},
            component: () => import('./components/views/History.vue')
        },
        {
            path: '/statistic',
            name: 'statistic',
            meta: {layout: 'main'},
            component: () => import('./components/views/Statistic.vue')
        },

        {
            path: '/shop',
            name: 'shop',
            meta: {layout: 'main'},
            component: () => import('./components/views/Shop.vue')
        },
        {
            path: '/404',
            name: '404',
            meta: {layout: 'error', header:false, footer:false},
            component: () => import('./components/service/NotFound'),
        }, {
            path: '*',
            redirect: '/404'
        }
    ]
})