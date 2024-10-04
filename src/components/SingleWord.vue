<template>


    <!-- <div class="result-card" v-for="(word, index) in listWords" :key="index"> -->
<div class="result-card">
      <div class="show-more" v-if="moreInfoAvailable">
        <button class="more" @click="openModal">Föreslå ändringar</button>

            <!-- Modal Component -->
            <modal-component 
            :word="word" 
            :show="showModal" 
            @close-modal="closeModal"
            @submit-form="handleSubmitForm"
            />
          <button class="more" @click="toggleButtonAction($event)" v-if="showButton">
              visa mer
              <i class="fa-regular fa-square-plus"></i>
          </button>
          <button class="less" @click="toggleButtonAction($event)" v-else>
              visa mindre
              <i class="fa-regular fa-square-minus"></i>
          </button>
      </div>
      <ul class="sampi no-bullets"  v-show="word.word_sydsamiska">
          <li class="word"><img src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"><span>: {{word.word_sydsamiska}}</span></li>
          <li class="definition lato-regular">{{word.definition_sydsamiska}}</li>
      </ul>
      <ul class="swe no-bullets"  v-show="word.word_svenska">
          <li class="word"><img src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"><span>: {{word.word_svenska}}</span></li>
          <li class="definition lato-regular">{{word.definition_svenska}}</li>
      </ul>
      <ul class="nor no-bullets" v-show="word.word_norska">
          <li class="word"><img src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"><span>: {{word.word_norska}}</span></li>
          <li class="definition lato-regular">{{word.definition_norska}}</li>
      </ul>
      <ul class="more-info no-bullets" v-if="showMoreInfo">
            <li v-show="word.synonyms">Synonyms: {{word.synonyms}}</li>
            <li v-show="word.antonyms">Antonyms: {{word.antonyms}}</li>
            <li v-show="word.example_of_use">Example of use: {{word.example_of_use}}</li>

            <!-- <li v-show="word.sources">Källa: {{word.sources}}</li> -->
            <li v-show="word.arousal_level">Arousel: {{word.arousal_level}}</li>
            <li v-show="word.frequency_id">Frequency of use: {{word.frequency_id}}</li>

            <li v-show="word.link_to_update">{{word.link_to_update}}</li>
      </ul>
    </div>



</template>

<script>
import { useSearchTermStore } from '../stores/searchterms';
import ModalComponent from './SuggestChangesModule.vue';

export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const store = useSearchTermStore()
        return { store }
    },
    components: {
        ModalComponent,
    },
    data() {
        return {
            moreInfoAvailable: false,
            showMoreInfo: false,
            toggleButton: false,
            showButton: true,
            searchTerm: this.store.searchTerm,
            showModal: false, // Controls whether the modal is visible
        }
    },
    props: {
        word: Object

    },
    created : async function() {
        //   this.word.sources ||
        if(this.word.synonyms || this.word.antonyms || this.word.example_of_use || this.word.arousal_level || this.word.frequency_id ) {
                    this.moreInfoAvailable = true;
                }
    },
    methods : {
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
            // Create a copy of the words object to avoid mutating the prop directly
            // let highlightedWord = { ...this.word }; // Shallow copy
            let highlightedWord = this.word; // Shallow copy

            // Create a regex to search for the searchTerm, case-insensitive
            let regex = new RegExp(this.searchTerm, 'gi');

            // Loop through each key in the words object
            Object.keys(highlightedWord).forEach(key => {
                let value = highlightedWord[key];

                // Check if the value is a string
                if (typeof value === 'string') {
                    // Replace occurrences of searchTerm with a <span> around it
                    highlightedWord[key] = value.replace(regex, `<span>${this.searchTerm}</span>`);
                }
                // If the value is an object, check its nested properties (optional)
                // else if (typeof value === 'object' && value !== null) {
                //     Object.keys(value).forEach(nestedKey => {
                //         let nestedValue = value[nestedKey];
                //         if (typeof nestedValue === 'string') {
                //             value[nestedKey] = nestedValue.replace(regex, `<span>${this.searchTerm}</span>`);
                //         }
                //     });
                // }
            });
        },
        toggleButtonAction() {
            if (this.toggleButton) {
                this.showMoreInfo = false;
                this.showButton = true;
                this.toggleButton = false;
            } else {
                this.showMoreInfo = true;
                this.showButton = false;
                this.toggleButton = true;
            }
        }

    }
    // ,
    // mounted() {
    //     this.highlightSearchTerm();
    // }
}
</script>


<style scoped>
div.result-card {
    margin: 2%;
    background-color: #eeeeee;
    padding: 1rem;
 }

div.result-card:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

div.result-card ul {
    margin-bottom: 20px;
}

/* ul.more-info {
    display: none;
} */

div.show-more {
    display: flex;
    justify-content: flex-end;
}

/* button.less  {
    display: none;
} */


button.more,
button.less  {
    font-size: 14px;
    line-height: 20px;
    padding: calc(6px + 0.2rem) calc(6px + 0.4rem);
    border-radius: 10px;
}

button.more i,
button.less i {
    font-size: small;
    margin: 0 4px;
}

button.more:hover i,
button.less:hover i,
button.less:hover,
button.more:hover {
    background-color: #134da2;
    text-decoration: none;
    color: #fff;
}

ul.no-bullets {
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
}

li.word {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 0.4%;
}

li.word:hover span {
    text-decoration: none;
}

li.definition {
    padding-left: 40px;
    font-style: italic;
    margin-bottom: 0.4%;
}

li img {
    width: 25px;
    height: auto;
    margin-top: 3px;
    margin-right: 8px;
}
</style>