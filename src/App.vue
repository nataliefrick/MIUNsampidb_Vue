<template>
  <PageHeader/>
  <RouterView />
  <PageFooter/>
</template>

<style scoped>
</style>

<script>
import { RouterView } from 'vue-router'
import PageHeader from "./components/PageHeader.vue"
import PageFooter from "./components/PageFooter.vue"
// import { useUserStore } from '@/stores/user';

export default {
    data() {
        return {
            errorMessage : null,
            recievedMessage: null,
            user: null, 
            username: null,
        }
    },
    watch: {
        // Watch the computed property isLoggedIn
      checkLoginStatus(newVal) {
        if (newVal) {
          console.log('User is logged in, refreshing the page...');
          window.location.reload();
        } 
      }
    },
    components: { PageHeader, RouterView, PageFooter},
    methods: {
        checkLoginStatus() {
          if (this.isLoggedIn) {
            this.username = localStorage.getItem('user'); 
            console.log(this.username + ' is logged in');
          } else {
            console.log('No user is logged in');
          }
        },
    },
    computed: {
      isLoggedIn() {
        // Check if userId or token is present
        return localStorage.getItem('user') !== null && localStorage.getItem('userId') !== null;
      }
    },
    mounted () {
        // const userStore = useUserStore();
        // userStore.loadUserFromStorage();  // Load user data from local storage
        this.checkLoginStatus();  // Check login status when the component mounts
    }
}
</script>