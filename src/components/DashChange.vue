<template>
<div>


<!-- <p>just checking: {{ displayText }}</p> -->
    <ul class="dasboard single-word no-bullets">
        <li>{{formatDate(change.created_at)}}</li>
        <li>{{change.word_sydsamiska}}</li>
        <li>{{truncatedMessageByWords}}</li>
        <i id="eye" class="fa-regular fa-eye" @click=openChangeModal()></i>
    </ul>
    <!-- Modal Component -->
    <ModalComponent 
        :change="change" 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
</div>
</template>

<script>
import ModalComponent from './DashChangeModule.vue';

export default {
    data() {
        return {
            showModal: false, // Controls whether the modal is visible
        }
    },
    props: {
        change: Object
    }, 
    emits: ["updateChange"],
    components: { ModalComponent },
    computed: {
      displayText() {
        // Check if word has been passed in, otherwise display a fallback message
        return `data: ${JSON.stringify(this.change)}`;
        // return this.word ? `Word: ${JSON.stringify(this.word)}` : "No word provided";
      },
    truncatedMessageByWords() {
        const maxWords = 10;
        const words = this.change.message.split(' ');
        return words.length > maxWords 
        ? words.slice(0, maxWords).join(' ') + '...' 
        : this.change.message;
    }

    },
    methods: {
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(date.getFullYear()); // Get last two digits of the year
            return `${year}-${month}-${day}`;
            },
        openChangeModal() {
            this.showModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
        },
        handleSubmitForm(updatedChange) {
            // Handle form submission (e.g., save the updated word data)
            // this.word = updatedWord;
            console.log(updatedChange);
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