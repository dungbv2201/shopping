require('./bootstrap');
import Vue     from "vue";
import Master  from "./components/layouts/Master"
import store   from "./store/index"
import Vuetify from "vuetify"
import router  from "./router"
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!store.getters.loggedIn) {
//             next({
//                 name: 'login'
//             })
//         } else {
//             next()
//         }
//     } else if (to.matched.some(record => record.meta.requiresVisitor)) {
//         if (store.getters.loggedIn) {
//             next({
//                 name: 'home'
//             })
//         } else {
//             next()
//         }
//
//     }
// });

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(Master)
});
