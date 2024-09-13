<template>
  <PageHeader/>
  <RouterView />
</template>

<style scoped>
</style>

<script>
import { RouterView } from 'vue-router'
import PageHeader from "./components/PageHeader.vue"

export default {
    data() {
        return {
            errorMessage : null,
            recievedMessage: null
        }
    },
    components: { PageHeader, RouterView },
    methods: {}
    }
    // ,
    // mounted () {
    //     M.AutoInit()
    // }
</script>