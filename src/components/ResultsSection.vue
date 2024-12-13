<template>
    <section id="options">
        <!-- filter section -->
        <div class="flex-container">
            <div class="button-flex-row">
                <button 
                @click="toggleSwe($event)" 
                :class="['item', {'selected': isActiveSwe, 'not-selected': !isActiveSwe}]">
                    <span :class="isActiveSwe ? 'hidden-label' : 'showing-label'">
                        {{ isActiveSwe ? 'Dölj' : 'Visa' }}
                    </span><br>
                    <span :class="isActiveSwe ? 'hidden-style' : 'showing-style'">
                        Svenska
                    </span>
                </button>

                <button 
                @click="toggleNwg($event)" 
                :class="['item', {'selected': isActiveNwg, 'not-selected': !isActiveNwg}]">
                    <span :class="isActiveNwg ? 'hidden-label' : 'showing-label'">
                        {{ isActiveNwg ? 'Dölj' : 'Visa'  }}
                    </span><br>
                    <span :class="isActiveNwg ? 'hidden-style' : 'showing-style'">
                        Norska
                    </span>
                </button>
            </div>
            <div class="button-flex-row">
                <button class="item" v-if="downloadAvailable" @click="openRegisterModal('searchTerm')"><span class="button-label">Ladda ner</span><br>Sökresultat</button>
                <button class="item" @click="openRegisterModal('allData')"><span class="button-label">Ladda ner</span><br>Hela databasen</button>
            </div>
        </div>
    </section>
    <section id="search-results">

        <div class="header-section" >
            <h2 class="lato-bold results-title">Sökresultat</h2>
            <p class="lato-regular results-title">{{title}}</p>
        </div>
        <!-- Modal Component -->
        <modal-component 
        :show="showModal" 
        :words="words" 
        :searchTerm="modalType === 'allData' ? 'allData' : this.store.searchTerm"
        :modalType="modalType"
        @close-modal="closeRegisterModal"
        @submit-form="handleSubmitForm"
        />
            
        <Word @updateWord="updateWord(word.id)" v-for="word in words" :word="word" :key="word.id" />
    
        <!-- ErrorMessage Printout -->
        <!-- <div v-if="errorMessage"><p class="errormsg green-text">{{errorMessage}} </p></div> -->
    </section>
</template>


<script>
import { nextTick } from 'vue';  // Import nextTick for better timing of updates
import { useFilterLanguagesStore } from '../stores/filterlanguages';
import { useSearchTermStore } from '../stores/searchterms';
import Word from "../components/SingleWord.vue";
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
            modalType: "",
            title: "",
            downloadAvailable: false,
            showModal: false, // Controls whether the modal is visible
            selectedLanguages: [ true, true ], // [ swe, nor ],
            isActiveSwe: true, // Default state
            isActiveNwg: true, // Default state
            storeFilterLang: useFilterLanguagesStore(),
            storeSearchTerms: useSearchTermStore(),
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
    emits: ["addChanges", "setFilterLang"],
    components: { ModalComponent, Word },
    methods: {
        toggleSwe() {
            this.isActiveSwe = !this.isActiveSwe; // Toggle the class state
            this.selectedLanguages[0] = this.isActiveSwe;
            this.setFilterLang();
        },
        toggleNwg() {
            this.isActiveNwg = !this.isActiveNwg; // Toggle the class state
            this.selectedLanguages[1] = this.isActiveNwg;
            this.setFilterLang();
        },
        async setFilterLang() {
            // Access the Pinia store
            const storeFilterLang = useFilterLanguagesStore();
            // Only update if there's a new term to submit
            storeFilterLang.setTerm(this.selectedLanguages);
            // Use nextTick to ensure the store updates are processed before navigating
            await nextTick();
            try {
                await this.$router.push('/results');  // Navigate to the results page
            } catch (err) {
                console.error("Navigation error:", err);  // Log any navigation errors
            }
        },
        openRegisterModal(type) {
            this.modalType = type;
            if (this.modalType === 'allData') {
                this.storeSearchTerms.setTerm("allData");
                this.getWords();
            }
            this.showModal = true;
        },
        closeRegisterModal() {
            this.showModal = false;
            this.modalType = null; // reset modal type when closing
        },
        handleSubmitForm(updatedWord) {
            // Handle form submission (e.g., save the updated word data)
            // this.word = updatedWord;
            console.log(updatedWord);
            this.closeRegisterModal(); // Close the modal after submission
        },
        async updateResults() {
            this.title = "";
            this.downloadAvailable=false;
            if(this.store.searchTerm != "") {
                const response = await fetch(this.urlGet + "/search/" + this.store.searchTerm, { method: "GET" });
                let data = await response.json(); // save the data in sent through the response.
                if(data.length===0) {
                    this.title = "Tyvärr, inga resultat hittades i databasen. Här är alla ord i databasen, så kan du kolla igenom dem.";
                }
        
                this.words = data;
                if (this.words.length > 0) {
                    // this.highlightSearchTerm();
                    this.title = "Sökresultat: " + this.words.length + " ord innehåller sökterm '" + this.store.searchTerm + "'. ";
                    this.downloadAvailable=true;
                } else {
                    this.title = "Tyvärr, inga resultat hittades i databasen. Här är alla ord i databasen, så kan du kolla igenom dem.";
                    this.getWords();
                }
            
            } else {
                this.getWords();
                this.title = "Nu visas samtliga ord i databasen.";
                
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
    margin: 2% auto 6% auto;
}

@media (max-width: 1140px) {
    section#search-results {
        width: 80%;
        margin: 2% auto 6% auto;
    }
 }

#search-results div.header-section {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}

p.results-title {
    margin: 0;
    font-style: italic;

}

section#options {
    background-color: #eee;
    padding: 1% 10%;
}

@media (max-width: 734px) { section#options { padding: 4% 10%; } }
@media (max-width: 405px) { section#options { padding: 8% 10%; } }

div.flex-container {
    display: flex;
    gap: 5px;
}

@media (min-width: 735px) {
    div.flex-container {
        flex-direction: row;
        justify-content: space-between;
        
    }
 }


@media (max-width: 734px) {
    div.flex-container {
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
    }
 }


.button-flex-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.button-flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
        
    }


.button-flex-row .item { flex-grow: 1; }

@media (max-width: 734px) {
    .button-flex-row .item { 
        flex-grow: 1;
        width: 35%
    }
 }

.checkbox-btn input[type="checkbox"] {
    display: none; /* Hide the actual checkbox */
}

span.colon {
    margin-right: 1%;
}

/* Disabled state */
.disabled,
.checkbox-btn:has(input[type="checkbox"]:disabled) 
{
    background-color: #c1daf3;
    border: 1px solid #c1daf3;
    color: #fff;
} 

/* Hover state - only apply to non-disabled checkboxes */
.checkbox-btn:not(.disabled):hover {
    background-color: #134da2;
    color: #fff;
    transition: background-color 0.3s;
}


/* Default unselected button styling */
.selected:hover,
.not-selected {
    background-color: #fff;
    transition: background-color 0.3s;
}


/* Selected state */
.not-selected:hover,
.selected
{
    background-color: #134da2;
    transition: background-color 0.3s;

} 

button:hover span.button-label,
.not-selected:hover .showing-style, 
.not-selected:hover .showing-label, 
.selected .hidden-style, 
.selected .hidden-label { color: #fff; }

.selected:hover .hidden-style, 
.selected:hover .hidden-label, 
.not-selected .showing-style, 
.not-selected .showing-label { color: #404040; }

.hidden-label { 
    text-transform: uppercase;
    line-height: 0.6rem;
    font-size: 0.7em;
}

.hidden-style {
  font-weight: bold;
   line-height: 0.6rem;
}

.showing-style {
  font-weight: bold;
   line-height: 0.6rem;
}

span.button-label,
.showing-label {
  text-transform: uppercase;
  line-height: 0.6rem;
  font-size: 0.7em;
}

</style>
