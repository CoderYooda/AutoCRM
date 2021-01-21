import Axios from 'axios';

let state = {
    auth: null,
};

let getters = {
    AUTH: state => {
        return state.auth;
    },
};

let mutations = {
    SET_AUTH: (state, payload) => {
        state.auth = payload;
    },

    ADD_AUTH: (state, payload) => {
        state.auth.push(payload);
    },
};

let actions = {
    // GET_TODO: async (context, payload) => {
    //     let {data} = await Axios.get('http://yourwebsite.com/api/todo');
    //     context.commit('SET_TODO', data);
    // },

    TRY_AUTHENTICATE :  async (context, payload) => {
        let {data} = await Axios.post('http://yourwebsite.com/api/todo');
        context.commit('ADD_AUTH', payload);
    },

    // SAVE_TODO: async (context, payload) => {
    //     let {data} = await Axios.post('http://yourwebsite.com/api/todo');
    //     context.commit('ADD_TODO', payload);
    // },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
