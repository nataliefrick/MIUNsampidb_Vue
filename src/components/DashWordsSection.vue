<template>
<section id="words">
    <div>
        <h2>Section: Words in database</h2>
        <i class="fa-solid fa-plus" @click=openModal()></i>
    </div>
    <!-- Modal Component -->
        <ModalComponent 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
    <div class="header">
        <div class="column"><img src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"></div>
        <div class="column"><img src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"></div>
        <div class="column"><img src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"></div>
    </div>
    <Word v-for="word in words" :word="word" :key="word.id" />
</section>
</template>

<script>
import Word from "../components/DashSingleWord.vue";
import { useUrlGet } from '../stores/urlGet';
import ModalComponent from './DashWordModule.vue';
// import EventBus from '../util/event-bus';
export default {
    setup() {
        const useUrl = useUrlGet()
        return { useUrl }
    },
    data() {
        return {
            words: [],
            urlGet: this.useUrl.urlGet + "/words", 
            urlChange: this.useUrl.urlGet + "/changes", 
            showModal: false, // Controls whether the modal is visible
        }
    },
    emits: ["addNewWord"],
    components: { ModalComponent, Word },
    methods: {
        async getWords() {
            const response = await fetch(this.urlGet, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.words = data;
        },
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
        refreshWords() {
            // Fetch the updated list of words from the database
            this.getWords();
        }
    },
    mounted() {
        this.getWords();
        // EventBus.on('word-added', this.refreshWords);
    },

    beforeUnmount() {
        // EventBus.off('word-added', this.refreshWords);
    }

}
</script>


<style scoped>
section#words {
    background-color: #eee;
    width: 400px;
    margin: 1rem auto;
    padding: 1rem;
}

section#words div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

div.header {
    justify-content: flex-start!important;
}

div.header div.column {
    width: 80px;
    padding: 4px 6px;
}

div.header img {
    width: 25px;
    height: auto;
    margin-top: 3px;
    margin-right: 8px;
} 
</style>