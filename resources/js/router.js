import Vue             from "vue";
import Router          from "vue-router";
import LoginComponent  from "./components/auth/LoginComponent";
import Home            from "./components/Home";
import LogoutComponent from "./components/auth/LogoutComponent";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component:LoginComponent,
            meta:{
                requiresVisitor:true
            }
        },
        {
            path:'/home',
            name:'home',
            component:Home,
            meta:{
                requiresAuth:true
            }
        },
        {
            path:'/logout',
            name:'logout',
            component:LogoutComponent,
            meta:{
                requiresAuth:true
            }
        }
    ]
});