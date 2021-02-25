import Vue from 'vue'
import Vuex from 'vuex'

//Modules import
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user : null,
        isLogged : false,
        token: localStorage.getItem('token') || '',


        todos : null,
        cash_aside_menu: null,
    },
    getters : {
        authStatus: state => state.status,
        USER : state => {
            return state.user
        },


        TODOS : state => {
            return state.todos;
        },
        CASH_ASIDE_MENU : state => {
            return state.cash_aside_menu;
        }
    },
    mutations: {

        auth_request(state){
            state.status = 'loading';
        },

        sms_confirm(state, needSmsConfirm){
            state.needSmsConfirm = needSmsConfirm;
        },

        auth_success(state, token, user){
            state.status = 'success';
            state.token = token;
            state.user = user;
        },

        auth_error(state){
            state.status = 'error';
        },

        logout(state){
            state.status = '';
            state.token = '';
        },

        SET_USER : (state, payload) => {
            state.user = payload
        },

        SET_CASH_ASIDE_MENU : (state,payload) => {
            state.cash_aside_menu = payload
        },

        SET_TODO : (state,payload) => {
            state.todos = payload
        },

        ADD_TODO : (state,payload) => {
            state.todos.push(payload)
        },
    },
    actions:{
        GET_USER : async (context,payload) => {
            let { data } = await axios.get('http://yourwebsite.com/api/todo')
            context.commit('SET_USER',data)
        },



        GET_CASH_ASIDE_MENU : async (context,payload) => {
            let { data } = await axios.get('/data/aside/cash');
            context.commit('SET_CASH_ASIDE_MENU',data)
        },
        GET_TODO : async (context,payload) => {
            let { data } = await axios.get('http://yourwebsite.com/api/todo')
            context.commit('SET_TODO',data)
        },
        SAVE_TODO : async (context,payload) => {
            let { data } = await axios.post('http://yourwebsite.com/api/todo')
            context.commit('ADD_TODO',payload)
        },
    },
    modules: {
        auth,
    },
})
