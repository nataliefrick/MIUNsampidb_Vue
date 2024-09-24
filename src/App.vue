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

export default {
    data() {
        return {
            errorMessage : null,
            recievedMessage: null
        }
    },
    components: { PageHeader, RouterView, PageFooter},
    methods: {}
    }
    // ,
    // mounted () {
    //     M.AutoInit()
    // }
</script>