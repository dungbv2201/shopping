import Vue   from "vue";
import Vuex  from "vuex"
import axios from "axios"

Vue.use(Vuex, axios);
axios.defaults.baseURL = "http://vandung.local.com/api";

const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        loggingIn: false,
        loginError: null
    },
    mutations: {
        LOGGING_START(state) {
            state.loggingIn = true
        },
        LOGIN_STOP(state, errorMessage) {
            state.loggingIn = false;
            state.loginError = errorMessage;
        },
        RETRIEVE_TOKEN(state, accessToken) {
            state.accessToken = accessToken;
        },
        DESTROY_TOKEN(state) {
            state.token = null
        }
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        accessToken(state) {
            return "Bearer" + " " + state.token;
        }
    },
    actions: {
        retrieveToken(context, credentials) {
            context.commit('LOGGING_START');
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: '/login',
                    data: {
                        email: credentials.email,
                        password: credentials.password
                    }

                }).then(response => {
                    const accessToken = response.data.auth.access_token;
                    localStorage.setItem('accessToken', accessToken);
                    context.commit('LOGIN_STOP', null);
                    context.commit('RETRIEVE_TOKEN', accessToken);
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    // context.commit('LOGIN_STOP',error);
                    context.commit('RETRIEVE_TOKEN', null);
                    reject(error)
                })
            })
        },
        destroyToken(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'post',
                        url: '/logout',
                        headers: {
                            Authorization: context.getters.accessToken
                        }
                    })
                        .then(response => {
                            localStorage.removeItem('accessToken');
                            context.commit('DESTROY_TOKEN');
                            resolve(response);
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token');
                            context.commit('DESTROY_TOKEN');
                            console.log(error);
                            reject(error)
                        })
                })
            }
        },
    }
});
export default store