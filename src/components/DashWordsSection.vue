<template>
<section id="words">
    <div>
        <h2>Section: Words in database</h2>
        <i class="fa-solid fa-plus" @click=openModal()></i>  <!-- add new word -->
    </div>
    <!-- Modal Component -->
        <ModalComponent 
        :show="showModal" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />

    <div id="filter">
        <form @submit.prevent="filterWords()">
            <div class="row-searchform">
                <label>Filtrerar </label>
                <input type="text" placeholder="Ange sökterm" v-model="searchTerm">
                <button @click="filterWords" class="white-text no-style"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </form>
    </div>
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
import EventBus from '../util/event-bus';
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
            existingWord: false,
            searchTerm: ""
        }
    },
    emits: ["addNewWord", "updateWord"],
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
        handleSubmitForm() {
            // Handle form submission (e.g., save the updated word data)
            this.closeModal(); // Close the modal after submission
        },
        refreshWords() {
            // Fetch the updated list of words from the database
            this.getWords();
        },
        async filterWords() {
            this.title = "";
            if(this.searchTerm != "") {
                const response = await fetch(this.urlGet + "/search/" + this.searchTerm, { method: "GET" });
                let data = await response.json(); // save the data in sent through the response.
                if(data.length===0) {
                    this.title = "sökterm gav inga resultat.";
                }
            
        
            this.words = data;
            if (this.words.length > 0) {
                this.title = this.words.length + " sökresultat.";
            } else {
                this.title = "Sökterm gav inga resultat.";
                this.getWords();
            }
            
            } else {
                this.getWords();
                this.title = "Visar alla ord i databasen.";
                
            }
            
        },

    },
    mounted() {
        this.getWords();
        EventBus.on('change-to-database', this.refreshWords);
    },

    beforeUnmount() {
        EventBus.off('change-to-database', this.refreshWords);
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