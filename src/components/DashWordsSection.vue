<template>
<section id="words">
    <div class="title">
        <h3 class="lato-bold">Översikt över ord i databasen</h3>
        <button class="see-all button-icon" @click="openModal()">Nytt ord<i class="fa-solid fa-leaf"></i></button> <!-- add new word -->
    </div>
    <!-- Modal Component -->
        <ModalComponent 
        :show="showModal"
        :existingWord="false" 
        @close-modal="closeModal"
        @submit-form="handleSubmitForm"
        />
        <p>Här kan du administrera alla ord i databasen. Sektionen visar de senaste 3 orden som lagts till.</p>

    <div class="filter">
        <form @submit.prevent="filterWords()">
            <div class="flex-row">
                <div class="searchform">
                    <input type="text" placeholder="Ange sökterm" v-model="searchTerm">
                    <button @click="filterWords" class="white-text no-style"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button @click=getWords() class="see-all">Se alla</button>
            </div>
        </form>
        <span v-if="this.title">{{ this.title }}</span>
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
import ModalComponent from './DashWordModuleAdd.vue';
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
            searchTerm: "",
            title: ""
        }
    },
    emits: ["addNewWord", "updateWord"],
    components: { ModalComponent, Word },
    methods: {
        async getWords() {
            this.title = "";
            this.searchTerm = "";
            const response = await fetch(this.urlGet, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.words = data;
            this.title = "Visar alla ord i databasen.";
        },

        async getlast3Words() {
            const response = await fetch(this.urlGet + "/latest", { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.words = data;
            this.title = "";
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
        refreshData() {
            // Fetch the updated list of words from the database
            this.getlast3Words();
        },

        async filterWords() {
            if(this.searchTerm != "") {
                const response = await fetch(this.urlGet + "/filter/" + this.searchTerm, { method: "GET" });
                let data = await response.json(); 
                if(data.length===0) {
                    this.title = "Sökterm gav inga resultat.";
                }
        
            this.words = data;
            if (this.words.length > 0) {
                this.title = this.words.length + " sökresultat";
            } else {
                this.title = "Sökterm gav inga resultat.";
                // this.getWords();
            }
                
            }
            
        },

    },
    mounted() {
        this.getlast3Words();
        EventBus.on('change-to-database', this.refreshData);
    },

    beforeUnmount() {
        EventBus.off('change-to-database', this.refreshData);
    }

}
</script>

<style scoped>
section#words {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1451px) { section#words { max-width: 600px; margin: 2%; }}
@media (max-width: 1450px) { section#words { width: 80%; margin: 2% auto; }}

section#words div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

div.title { gap: 1rem; }

div.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

@media (max-width: 500px) {
    div.flex-row {
        gap: 1rem;
    }
}

form {
    width: 100%;
}

section#words div.filter {
    flex-direction: column;
    gap: 1rem;
}

div.filter span {
    font-size: 0.8em;
    color: #087f47;
    text-align: center;
}

section#words div.searchform {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.searchform input[type='text'] {
        height: 32px;
        border: 1px solid #134da250;
        font-size: 16px;
        padding-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
        width: 80%;
    }

.searchform input[type='text']:focus {
    outline: 1px solid #134da250;     /* oranges! yey */
}

.searchform i {
    padding: 12px;
    height: 100%;
    background-color: #134da2;
    border: 1px solid transparent;
    color: #fff;
    font-size: 18px;
    margin: 0;
    margin-right: 0;
    
}

.searchform i:hover {
    color: #134da2;
    background-color: #c1daf3;
}

button {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    padding: calc(10px + 0.25rem) calc(10px + 0.5rem);
    border-radius: 10px;
    transition: all 0.3s ease;
}

button i {
    margin-left: 10px;
    transition: all 0.3s ease;
    
}

button:hover i,
button:hover {
    color: #fff;
}

div.header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start!important;
    margin-top: 2rem;
}

div.header div.column {
    min-width: 80px;
    width: 25%;
    padding: 4px 6px;
}

div.header img {
    width: 25px;
    height: auto;
    margin-top: 3px;
    margin-right: 8px;
} 
</style>