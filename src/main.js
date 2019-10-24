import Vue from 'vue';
import App from './App.vue'
import {router} from "@/router";
import VueMaterial from 'vue-material'
import Vuex from 'vuex';
import Toasted from 'vue-toasted';
import store from '@/store/store';
import "@/assets/styles.css"
import axios from 'axios';
import {HIDE_LOADER, SHOW_LOADER} from "@/store/types";

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(Toasted, {
    duration: 3000,
    position: 'bottom-center'
});

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://ochepak-tracky.herokuapp.com';
axios.interceptors.request.use(
    conf => {
        store.commit(SHOW_LOADER);
        if (conf.url.includes('/api/')) {
            conf.headers.authorization = 'Bearer ' + localStorage.getItem('accessToken');
        }
        return conf;
    },
    error => {
        store.commit(HIDE_LOADER);
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        store.commit(HIDE_LOADER);
        return response;
    },
    error => {
        store.commit(HIDE_LOADER);
        return Promise.reject(error);
    }
);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
