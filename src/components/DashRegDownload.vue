<template>
<div>
    <ul class="dasboard single-word no-bullets">
        <li>{{formatDate(download.created_at)}}</li>
        <li>{{download.institution}}</li>
        <li>{{download.name}}</li>
        <li>{{download.projectTitle}}</li>
        <i id="eye" class="fa-regular fa-eye" @click=openDownloadModal()></i>
    </ul>
    <!-- Modal Component -->
    <ModalComponent 
        :download="download" 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
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
ul.dasboard.single-word {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 0.4%;
}

ul.dasboard.single-word li {
    
    padding: 0 6px;    
    width: 80px;
    overflow: hidden;
}

ul.no-bullets {
    list-style-type: none; 
    padding: 0; 
    margin: 0; 
}

</style>