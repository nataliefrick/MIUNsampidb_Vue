<template>

<div class="result-card">
    <div class="show-more desktop" v-if="moreInfoAvailable">
        <button class="more" @click="openChangesModal">Föreslå ändringar</button>

            <!-- Modal Component -->
            <ModalComponent 
            :word="word" 
            :show="showModal" 
            @close-modal="closeModal"
            @submit-form="handleSubmitForm"
            />
          <button class="more" @click="toggleButtonAction($event)" v-if="showButton">visa mer<i class="fa-regular fa-square-plus"></i>
          </button>
          <button class="less" @click="toggleButtonAction($event)" v-else>visa mindre<i class="fa-regular fa-square-minus"></i>
          </button>
    </div>
    <div>
        <ul class="sampi no-bullets"  v-show="word.word_sydsamiska">
            <li class="word"><img src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"><span>: {{word.word_sydsamiska}}</span></li>
            <li class="definition lato-regular">{{word.definition_sydsamiska}}</li>
        </ul>
        <ul v-if="this.filter.filter[0]" class="swe no-bullets"  v-show="word.word_svenska">
            <li class="word"><img src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"><span>: {{word.word_svenska}}</span></li>
            <li class="definition lato-regular">{{word.definition_svenska}}</li>
        </ul>
        <ul v-if="this.filter.filter[1]" class="nor no-bullets" v-show="word.word_norska">
            <li class="word"><img src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"><span>: {{word.word_norska}}</span></li>
            <li class="definition lato-regular">{{word.definition_norska}}</li>
        </ul>
        <ul class="more-info no-bullets" v-if="showMoreInfo">
          <!-- <pre>{{ word }}</pre> -->
              <li v-show="word.synonyms"><strong>Synonymer:</strong> {{word.synonyms}}</li>
              <li v-show="word.antonyms"><strong>Antonymer:</strong> {{word.antonyms}}</li>
              <li v-show="word.example_of_use"><strong>Exampel på användning:</strong> {{word.example_of_use}}</li>
    
              <li v-show="word.sources"><strong>Källa:</strong> {{word.sources}}</li>
              <li v-show="word.arousal_level"><strong>Stimuleringsnivå/aktiveringsgrad:</strong> {{this.arousal}}</li>
              <li v-show="word.frequency"><strong>Användningsfrekvens:</strong> {{this.frequency}}</li>
              <li v-show="word.main_node"><strong>Nod:  </strong>
                  <span>
                      {{word.main_node}} ><span class="button-link" @click="openPolarityModal">{{word.polarity_node}}</span>><span class="button-link" @click="openSubNodeModal">{{word.sub_node}}</span>
    
                          <!-- Modal Component -->
                          <PolarityModalComponent 
                          :polarity="word.polarity_node" 
                          :show="showPolarityModal" 
                          @close-modal="closeModal"
                          
                          />
    
                          <SubNodeModalComponent 
                          :subnodeId="word.node_id" 
                          :subnode="word.sub_node" 
                          :mainnode="word.main_node"
                          :polaritynode="word.polarity_node"
                          :show="showSubNodeModal" 
                          @close-modal="closeModal"
                          
                          />
                  </span>
              </li>
              <li v-show="word.link_to_update">{{word.link_to_update}}</li>
        </ul>
    </div>
    <div class="show-more mobile" v-if="moreInfoAvailable">
        <button class="more" @click="openChangesModal">Föreslå ändringar</button>

            <!-- Modal Component -->
            <ModalComponent 
            :word="word" 
            :show="showModal" 
            @close-modal="closeModal"
            @submit-form="handleSubmitForm"
            />
          <button class="more" @click="toggleButtonAction($event)" v-if="showButton">visa mer<i class="fa-regular fa-square-plus"></i>
          </button>
          <button class="less" @click="toggleButtonAction($event)" v-else>visa mindre<i class="fa-regular fa-square-minus"></i>
          </button>
    </div>
</div>



</template>

<script>
    import { useFilterLanguagesStore } from '../stores/filterlanguages';
    import { useSearchTermStore } from '../stores/searchterms';
    import ModalComponent from './SuggestChangesModule.vue';
    import SubNodeModalComponent from './SubNodeModal.vue';
    import PolarityModalComponent from './PolarityModal.vue';

    export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const store = useSearchTermStore()
        const filter = useFilterLanguagesStore()
        return { store, filter }
    },
    components: {
        ModalComponent, PolarityModalComponent, SubNodeModalComponent
    },
    data() {
        return {
            moreInfoAvailable: false,
            showMoreInfo: false,
            toggleButton: false,
            showButton: true,
            searchTerm: this.store.searchTerm,
            showModal: false, // Controls whether the modal is visible
            showSubNodeModal: false, // Controls whether the modal is visible
            showPolarityModal: false, // Controls whether the modal is visible
            storeFilterLang: useFilterLanguagesStore(),
            selectedLanguages: this.filter.filter,
            arousal: "",
            frequency: "",
    
        }
    },
    props: {
        word: Object
    },
    created : async function() {
        //   this.word.sources ||
        if (this.word.synonyms || this.word.antonyms || this.word.example_of_use || this.word.arousal_level || this.word.frequency || this.word.main_node) {
                    this.moreInfoAvailable = true;
                }
        switch (this.word.arousal_level) {
            case 1: this.arousal = "låg"; break;
            case 2: this.arousal = "medel"; break;
            case 3: this.arousal = "hög"; break;
            default: this.arousal = "";
        }
        switch (this.word.frequency) {
            case 1: this.frequency = "låg"; break;
            case 2: this.frequency = "medel"; break;
            case 3: this.frequency = "hög"; break;
            default: this.frequency = "";
        }

                
    },
    methods : {
        openPolarityModal() {
            this.showPolarityModal = true; // Show the modal
        },
        openChangesModal() {
            this.showModal = true; // Show the modal
        },
        openSubNodeModal() {
            this.showSubNodeModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
            this.showPolarityModal = false; // Hide the modal
            this.showSubNodeModal = false; // Hide the modal
        },
        handleSubmitForm(updatedWord) {
            // Handle form submission (e.g., save the updated word data)
            // this.word = updatedWord;
            console.log(updatedWord);
            this.closeChangesModal(); // Close the modal after submission
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
span.button-link {
    color: #134da2;
    text-decoration: underline;
    padding: 4px 6px 6px 6px;
}

span.button-link:hover {
    color: #134da2;  /* dk blue */
    background-color: #fbd030;
    cursor: pointer;
}

div.result-card {
    margin: 2%;
    background-color: #eeeeee;
    padding: 1rem;
    display: flex;
    flex-direction: column;
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


.desktop { display: flex; }
.mobile { display: none; }

@media (max-width: 576px) { 
    .desktop { display: none; }
    .mobile { display: flex; }
}

div.show-more {
    justify-content: flex-end;
}


@media (max-width: 358px) { 
    div.show-more {
        padding-top: 3%;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        gap: 5px;
    }
}



ul.more-info li {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-style: italic;
    margin: 4px 0;
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