import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import users from './modules/users'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        showLoader: false
    },
    mutations: {
        [types.SHOW_LOADER](state) {
            state.showLoader = true;
        },
        [types.HIDE_LOADER](state) {
            state.showLoader = false;
        }
    },
    modules: {
        users
    }
});
