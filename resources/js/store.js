import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos : null,
        cash_aside_menu: null,
    },
    getters : {
        TODOS : state => {
            return state.todos;
        },
        CASH_ASIDE_MENU : state => {
            return state.cash_aside_menu;
        }
    },
    mutations: {
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
})
