import Vue from 'vue';
import Login from "@/views/Login";
import App from "@/App";
import Registration from "@/views/Registration";
import Users from "@/views/Users";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: '', component: App},
    {path: '/registration', component: Registration},
    {path: '/login', component: Login},
    {path: '/users', component: Users},
    {path: '*', redirect: '/login'}
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});
