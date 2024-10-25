<template>
<header>
    <div id="topbar">
        <div class="topbar">
            <span v-if=user>Inloggade som {{ user }}</span>
        </div>
    </div> <!-- Top black bar -->
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
                    <button v-if="user" @click="openModal" class="m-link m-login no-style"><i class="fa-regular fa-user" aria-label="Logga ut"></i><span class="nav-label lato-bold">Logga ut</span></button>
                    <button v-else @click="openModal" class="m-link m-login no-style"><i class="fa-regular fa-user" aria-label="Logga in"></i><span class="nav-label lato-bold">Logga in</span></button>

                    <!-- Modal Component -->
                    <modal-component 
                    :show="showModal" 
                    @close-modal="closeModal"
                    @submit-form="handleSubmitForm"
                    /> 
                </nav>
            </div>
        </div>
        
    </div>
</header>

</template>

<style scoped>
/* Topbar ---------- */

#topbar {
    background-color:#404040;
    width: 100%;
    height: 33px;
    display: flex;
    align-items: center;
}

div.topbar {
    display: flex;
    justify-content: flex-end;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    max-width: 1140px;
}

div.topbar span {
    color: #fff;
    margin-right: 0;
    font-size: 0.7rem;
}

@media (min-width: 576px) { 
    div.topbar span{
        margin-right: 50px;
}}

@media (max-width: 575px) { 
    div.topbar span {
        margin-right: auto;
        margin-left: auto;
}}
</style>


<script>
    // import { RouterLink } from 'vue-router'
    import ModalComponent from './LoginModule.vue';

    export default {
        name: "PageHeader",
        data() {
            return {
                errorMessage : null,
                showModal: false, // Controls whether the modal is visible
                user: localStorage.getItem('user'), 
            }
        },
        components: {
            ModalComponent,
        },
        methods : {
        openModal() {
            this.showModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
        },
        handleSubmitForm(updatedWord) {
            // Handle form submission (e.g., save the updated word data)
            // this.word = updatedWord;
            console.log(updatedWord);
            this.closeModal(); // Close the modal after submission
        },
    }


    }
        
</script>