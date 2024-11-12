<template>
<div>
    <ul class="dasboard single-word no-bullets">
        <li class="lato-regular">{{formatDate(download.created_at)}}</li>
        <li class="lato-regular sm-screen-hide">{{download.institution}}</li>
        <li class="lato-regular sm-screen-hide">{{download.name}}</li>
        <li class="lato-regular sm-screen-large">{{download.projectTitle}}</li>
        <i id="eye" class="fa-regular fa-eye" @click=openDownloadModal()></i>
    </ul>
    <!-- Modal Component -->
    <ModalComponent 
        :download="download" 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
    <hr>
</div>
</template>

<script>
import ModalComponent from './DashDownloadModule.vue';

export default {
    data() {
        return {
            showModal: false, // Controls whether the modal is visible
        }
    },
    props: {
        download: Object

    }, 
    emits: ["updateDownload"],
    components: { ModalComponent },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(date.getFullYear()); // Get last two digits of the year
            return `${year}-${month}-${day}`;
            },
        openDownloadModal() {
            this.showModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
        },
        handleSubmitForm(updatedDownload) {
            // Handle form submission (e.g., save the updated word data)
            // this.word = updatedWord;
            console.log(updatedDownload);
            this.closeModal(); // Close the modal after submission
        },
    }

}

</script>


<style scoped>
@media (max-width: 500px) {
    .sm-screen-hide {
        display: none;
    }
}

div:hover {
    background-color: #eee;
}

hr {
    border: none;
    border-top: 1px solid #eee;
}

ul.dasboard.single-word {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 0.4%;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #404040;
    font-size: 0.9rem;
    
}

ul.dasboard.single-word li {
    padding: 0 6px;    
    min-width: 80px;
    width: 20%;
    overflow: hidden;
}

@media (max-width: 500px) {
    .sm-screen-large {
        min-width: 80px;
        width: 50%!important;
    }
}

ul.dasboard.single-word i {
    color: #134da2;
    margin: 0 auto;
    padding: 4px;
    border-radius: 50%;
}

ul.dasboard.single-word i:hover {
    color: #fff;
    background-color: #134da2;
}

ul.no-bullets {
    list-style-type: none; 
    padding: 0; 
    margin: 0; 
}

</style>