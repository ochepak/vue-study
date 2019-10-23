import Login from "@/components/Login";
import App from "@/App";
import Registration from "@/components/Registration";
import Users from "@/components/Users";
import VueRouter from "vue-router";

const routes = [
    {path: '', component: App},
    {path: '/registration', component: Registration},
    {path: '/login', component: Login},
    {path: '/users', component: Users},
    {path: '*', redirect: '/login'}
];

export const router = new VueRouter({
    routes
});
