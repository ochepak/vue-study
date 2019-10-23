import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'
import {router} from "@/router";
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import Toasted from 'vue-toasted';
import "@/assets/styles.css"

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Toasted, {
    duration: 3000,
    position: 'bottom-center'
});

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.http.options.root = 'https://ochepak-tracky.herokuapp.com';

const store = new Vuex.Store({
    state: {
        showLoader: false
    },
    mutations: {
        showLoader (state) {
            state.showLoader = true;
        },
        hideLoader (state) {
            state.showLoader = false;
        }
    }
});

Vue.http.interceptors.push((request, next) => {
    store.commit('showLoader');
    if (request.url.includes('api/')) {
        request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    }
    next(response => {
        store.commit('hideLoader');
        if (response.status === 401) {
            Vue.toasted.show('Please, login first!', {
                type: 'error'
            });
            router.push({path: '/login'});
        }
    });
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
