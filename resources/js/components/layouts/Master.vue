<template>
    <v-app class="grey lighten-4">
        <NavbarApp v-if="loggedIn"></NavbarApp>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Navbar from "./Navbar";

    export default {
        computed:{
          loggedIn(){
              return this.$store.getters.loggedIn
          }
        },
        components:{
            NavbarApp:Navbar
        }
    }
</script>

<style scoped>

</style>