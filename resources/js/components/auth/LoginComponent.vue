<template>
    <v-container>
        <v-layout class="justify-center">
            <v-flex md5 mt-5>
                <v-card class="login">
                    <v-card-text>
                        <h1 class="text-xs-center font-weight-regular my-5">
                            Login
                        </h1>
                        <v-form @submit.prevent="login">
                           <v-layout class="justify-center" wrap>
                               <v-flex md10 mb-3>
                                   <v-text-field label="Email"
                                                 prepend-inner-icon="email"
                                                 v-model="email"
                                   ></v-text-field>
                               </v-flex>
                               <v-flex md10 mb-3>
                                   <v-text-field label="Password" type="password"
                                                 prepend-inner-icon="lock"
                                                 v-model="password"
                                   >
                                   </v-text-field>
                               </v-flex>
                               <v-flex md10>
                                   <v-checkbox
                                           v-model="remember"
                                           label="Remember me"
                                   ></v-checkbox>
                               </v-flex>
                               <v-flex md10 my-5>
                                   <v-layout class="justify-end">
                                       <v-btn color="success" block my-5 type="submit">
                                           <span>Login</span>
                                       </v-btn>
                                   </v-layout>
                               </v-flex>
                           </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                remember:false
            }
        },
        methods: {
            login() {
                this.$store.dispatch('retrieveToken', {
                    email: this.email,
                    password: this.password
                })
                    .then(response => {
                         this.$router.push({name: "home"});
                    })
            }
        }
    }
</script>

<style scoped>
    .login{
        padding-bottom: 20px !important;
        border-radius:10px;
    }
</style>