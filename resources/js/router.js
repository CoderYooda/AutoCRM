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
            meta: {layout: 'main'},
            component: () => import('./components/views/Cash.vue')
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
