<template>
<div>
    <ul class="dasboard single-word no-bullets">
        <li>{{word.word_sydsamiska}}</li>
        <li>{{word.word_svenska}}</li>
        <li>{{word.word_norska}}</li>
        <i id="eye" class="fa-regular fa-eye" @click=openSeeWordModal()></i>
    </ul>
    <!-- Modal Component -->
        <ModalComponent 
        :word="word" 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
</div>
</template>

<script>
import ModalComponent from './DashWordModule.vue';

export default {
    data() {
        return {
            showModal: false, // Controls whether the modal is visible
        }
    },
    props: {
        word: Object

    }, 
    emits: ["updateWord"],
    components: { ModalComponent },
    methods: {
        openSeeWordModal() {
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


<style scoped>
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
    width: 100%;
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
    overflow: hidden;
    min-width: 80px;
    width: 25%;

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