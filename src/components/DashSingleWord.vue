<template>
<div>
    <ul class="dasboard single-word no-bullets">
        <li>{{word.word_sydsamiska}}</li>
        <li>{{word.word_svenska}}</li>
        <li>{{word.word_norska}}</li>
        <i id="eye" class="fa-regular fa-eye" @click=openSeeWordModal()></i>
        <!-- <li>{{word.definition_sydsamiska}}</li>
        <li>{{word.definition_svenska}}</li>
        <li>{{word.definition_norska}}</li>
        <li>{{word.synonyms}}</li>
        <li>{{word.antonyms}}</li>
        <li>{{word.example_of_use}}</li>
        <li>{{word.sources}}</li>
        <li>{{word.arousal_level}}</li>
        <li>{{word.frequency_id}}</li>
        <li>{{word.link_to_update}}</li> -->
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