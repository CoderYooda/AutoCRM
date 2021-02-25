import Axios from 'axios';

let state = {
    user : null,
    isLogged : false,
    token: localStorage.getItem('token') || '',
    login_errors : [],
    register_errors : [],
    need_sms_confirmation : false,
};

let getters = {
    isLoggedIn: state => !!state.token,
    // authStatus: state => state.status,
    user : state => {
        return state.user
    },
    register_errors : state => {
        return state.register_errors
    },
    login_errors : state => {
        return state.login_errors
    },
    need_sms_confirmation(state){
        return state.need_sms_confirmation;
    },
    auth_service_message(state){
        return state.auth_service_message;
    },
    register_surname_error(state){
        return !!state.register_errors.surname ? state.register_errors.surname[0] : null;
    }
};

let mutations = {

    clear_auth_request(state){
        state.auth_errors = null;
    },
    login_success(state, token, user){
        state.token = token;
        state.user = user;
    },
    login_errors(state, errors){
        state.login_errors = errors;
    },
    register_errors(state, errors){
        state.register_errors = errors;
    },
    logout(state){
        state.token = '';
    },
    need_sms_confirmation(state, trigger){
        state.need_sms_confirmation = trigger;
    },
    auth_service_message(state, message){
        state.auth_service_message = message;
    }
};

let actions = {

    login({commit}, loginData){
        return new Promise((resolve, reject) => {
            commit('app_state');
            axios({url: '/api/login', data: loginData, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token;
                    const user = resp.data.user;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('login_success', token, user);
                    resolve(resp);
                })
                .catch(err => {
                    commit('login_errors', !!err.response.data.messages ? err.response.data.messages : null);
                    localStorage.removeItem('token');
                    reject(err);
                })
        })
    },
    register({commit}, registerData){
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios({url: '/register', data: registerData, method: 'POST' })
                .then(resp => {

                    const token = resp.data.token;
                    const user = resp.data.user;
                    localStorage.setItem('token', token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    commit('auth_success', token, user);

                    resolve(resp);
                })
                .catch(err => {
                    console.log(err);
                    commit('register_errors',  !!err.response.data.messages ? err.response.data.messages : []);
                    commit('need_sms_confirmation',  !!err.response.data.needSmsConfirm);
                    commit('auth_service_message',  !!err.response.data.service_message ? err.response.data.service_message : null);
                    localStorage.removeItem('token');
                    reject(err)
                })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {

            axios({url: '/api/logout', method: 'POST' })
                .then(resp => {
                    commit('logout');
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    resolve();
                })
                .catch(err => {
                    commit('logout');
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    reject(err)
                })
        })
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
