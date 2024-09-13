<template>
<header>
    <div id="topbar"></div> <!-- Top black bar -->
    <div id="header">
        <div class="container">
            <div class="menu">
                <div class="sampi-db-menu">
                    <!-- <button id="main-menu-button" class="m-link m-menu no-style" aria-expanded="false"><i class="fa-solid fa-bars" aria-hidden="true">menu</i><span>Meny</span></button> -->
                    <button id="main-menu-button" class="no-style" aria-label="Meny"><i class="fa-solid fa-bars"></i><span class="nav-label lato-bold">Meny</span></button>
                </div>
                <div class="sampi-db-logo">
                    <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
                </div>
                <nav class="sampi-db-nav">
                    <a href="/search" style="display: none" class="d-none d-md-flex m-link m-search" aria-label="Sök"><i class="fa-solid fa-magnifying-glass"></i><span class="nav-label lato-bold">Sök</span></a>
                    <div class="miun-user"><a href="#" class="m-link m-login no-style"><i class="fa-regular fa-user" aria-label="Logga in"></i><span class="nav-label lato-bold">Logga in</span></a></div>
                </nav>
            </div>
        </div>
        
    </div>
</header>

</template>

<style scoped>
</style>


<script>
    // import { RouterLink } from 'vue-router'
    export default {
        name: "PageHeader",
        data() {
            return {
                errorMessage : null,
                // token: localStorage.getItem('token'),
                // receivedMessage: localStorage.getItem('receivedMessage'),
                // user: localStorage.getItem('user')
            }
        }


    }
        
</script>