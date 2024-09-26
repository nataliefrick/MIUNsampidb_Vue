<template>
    <section id="search-results">
        <h2 v-if="words.length > 0" class="lato-bold results-title">{{words.length}} sökresultat innehåller sökordet "{{ this.store.searchTerm }}"</h2>
        <h2 v-else class="lato-bold results-title">Tyvärr, inga resultat hittades i databasen.</h2>
            
        <Word @updateWord="updateWord(word.id)" v-for="word in words" :word="word" :key="word.id" />
    
        <!-- ErrorMessage Printout -->
        <div v-if="errorMessage"><p class="errormsg green-text">{{errorMessage}} </p></div>
    </section>
</template>


<script>
import Word from "../components/SingleWord.vue";
import { useSearchTermStore } from '../stores/searchterms';
import { useUrlGet } from '../stores/urlGet';

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
            errorMessage: null,
            urlGet: this.useUrl.urlGet, 
            searchTerm: this.store.searchTerm
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
    components: { Word },
    // props: {
    //     word: {
    //         type: Object,  // Expecting an Object
    //         required: true
    //     }
    // },
    methods: {
        async updateResults() {
            this.errorMessage = "";
            if(this.store.searchTerm != "") {
                const response = await fetch(this.urlGet + "/search/" + this.store.searchTerm, { method: "GET" });
                    const data = await response.json(); // save the data in sent through the response.
                    if(data.length===0) {
                    this.errorMessage = "Tyvärr, inga resultat hittades i databasen.";
                } 
                this.words = data;
            
            } else {
                this.getWords();
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


</style>
