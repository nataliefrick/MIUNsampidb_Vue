<template>
    <section id="search-results">
        <div class="header-section" >
            <h2 class="lato-bold results-title">{{title}}</h2>
            <button v-if="downloadAvailable" class="more" @click="openModal">Ladda ner resultat</button>
                <!-- Modal Component -->
                <modal-component 
                :show="showModal" 
                :words="words" 
                :searchTerm="this.store.searchTerm" 
                @close-modal="closeModal"
                @submit-form="handleSubmitForm"
                />
        </div>

        <!-- <h2 v-if="words.length > 0" class="lato-bold results-title">{{words.length}} sökresultat innehåller sökterm "{{ this.store.searchTerm }}"</h2>
        <h2 v-else class="lato-bold results-title">Tyvärr, inga resultat hittades i databasen.</h2> -->
            
        <Word @updateWord="updateWord(word.id)" v-for="word in words" :word="word" :key="word.id" />
    
        <!-- ErrorMessage Printout -->
        <!-- <div v-if="errorMessage"><p class="errormsg green-text">{{errorMessage}} </p></div> -->
    </section>
</template>


<script>
import Word from "../components/SingleWord.vue";
import { useSearchTermStore } from '../stores/searchterms';
import { useUrlGet } from '../stores/urlGet';
import ModalComponent from './RegisterDownload.vue';

export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        const store = useSearchTermStore()
        return { useUrl, store }
    },
    data() {
        return {
            words: [],
            // errorMessage: null,
            urlGet: this.useUrl.urlGet + "/words", 
            urlChange: this.useUrl.urlGet + "/changes", 
            searchTerm: "this.store.searchTerm",
            title: "",
            downloadAvailable: false,
            showModal: false, // Controls whether the modal is visible
        }
    },
    created() {
        // Get the Pinia store instance when the component is created
        this.store = useSearchTermStore();
        this.updateResults(this.store.searchTerm);  // Initialize results based on the current search term
    },
    watch: {
        'store.searchTerm': {
            immediate: true,  // Run immediately when component is created
            handler(newSearchTerm) {
                this.updateResults(newSearchTerm);  // Call the method to update results when the search term changes
            }
        }
    },
    emits: ["addChanges"],
    components: { ModalComponent, Word },
    methods: {
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
        highlightSearchTerm() {
            // Create a regex to search for the searchTerm, case-insensitive
            let regex = new RegExp(this.searchTerm, 'gi');
            // Loop through each key in the words object
            Object.keys(this.words).forEach(key => {
                let value = this.words[key];

                // Check if the value is a string
                if (typeof value === 'string') {
                    // Replace occurrences of searchTerm with a <span> around it
                    this.words[key] = value.replace(regex, `<span>${this.searchTerm}</span>`);
                }
                // If the value is an object, check its nested properties (optional)
                else if (typeof value === 'object' && value !== null) {
                    Object.keys(value).forEach(nestedKey => {
                        let nestedValue = value[nestedKey];
                        if (typeof nestedValue === 'string') {
                            value[nestedKey] = nestedValue.replace(regex, `<span>${this.searchTerm}</span>`);
                        }
                    });
                }
            });
        },
        async updateResults() {
            this.title = "";
            if(this.store.searchTerm != "") {
                const response = await fetch(this.urlGet + "/search/" + this.store.searchTerm, { method: "GET" });
                let data = await response.json(); // save the data in sent through the response.
                if(data.length===0) {
                    this.title = "Tyvärr, inga resultat hittades i databasen. Här är alla ord i databasen, så kan du kolla igenom dem.";
                }
            
        
            this.words = data;
            if (this.words.length > 0) {
                // this.highlightSearchTerm();
                this.title = this.words.length + " sökresultat innehåller sökterm '" + this.store.searchTerm + "'. ";
                this.downloadAvailable=true;
            } else {
                this.title = "Tyvärr, inga resultat hittades i databasen. Här är alla ord i databasen, så kan du kolla igenom dem.";
                this.getWords();
            }
            
            } else {
                this.getWords();
                this.title = "Din sökterm var tom. Här är alla ord i databasen, så kan du kolla igenom dem.";
                
            }
            
            // empty form
            // this.searchTerm = "";
            // this.$emit("updateResults"); // reloads the parent page.
        },

        async getWords() {
            const response = await fetch(this.urlGet, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.words = data;
        }
    },
    mounted() {
        this.updateResults();
    }
}
</script>

<style scoped>
/* ------------- search results ---------------- */

section#search-results {
    width: 40%;
    margin: 6% auto;
}

@media (max-width: 1140px) {
    section#search-results {
    width: 80%;
    margin: 6% auto;
}
 }


h2.results-title {
    margin-left: 20px;
}

#search-results div.header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


</style>
