<template>
  <div class="modal">
    <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <!-- <pre>{{  word }}</pre> -->

            <h2>Sydsamiska ordet "{{word.word_sydsamiska}}"</h2>
            <div>
                <ul class="sampi no-bullets"  v-show="word.word_sydsamiska">
                    <li class="word"><img src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"><span>: {{word.word_sydsamiska}}</span></li>
                    <li class="definition">{{word.definition_sydsamiska}}</li>
                </ul>
                <ul class="swe no-bullets"  v-show="word.word_svenska">
                    <li class="word"><img src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"><span>: {{word.word_svenska}}</span></li>
                    <li class="definition">{{word.definition_svenska}}</li>
                </ul>
                <ul class="nor no-bullets" v-show="word.word_norska">
                    <li class="word"><img src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"><span>: {{word.word_norska}}</span></li>
                    <li class="definition">{{word.definition_norska}}</li>
                </ul>
                <ul class="more-info no-bullets">
                <!-- <pre>{{ word }}</pre> -->
                    <hr>
                        <li v-show="word.synonyms"><strong>Synonymer:</strong> {{word.synonyms}}</li>
                        <li v-show="word.antonyms"><strong>Antonymer:</strong> {{word.antonyms}}</li>
                        <li v-show="word.example_of_use"><strong>Exampel på användning:</strong> "{{word.example_of_use}}"</li>
                    <hr>    
                        <li class="flex-row expression" v-show="word.expression">
                            <div class="flex-col">
                                <div><strong>Exempel uttryck: </strong>"{{word.expression}}"</div>
                                <div><strong>Översättning: </strong>"{{word.translation}}"</div>
                            </div>
                            <!-- <span class="button-link" @click="openExpressionsModal">...se alla</span>

                            Modal Component
                            <ExpressionsModalComponent 
                                :words="words" 
                                :show="backtoExpressionsModal" 
                                @close-modal="closeModal"
                                /> -->
                        </li>
                    
                    <hr>    
                        <li v-show="word.arousal_level"><strong>Stimuleringsnivå/aktiveringsgrad:</strong> {{this.arousal}}</li>
                        <li v-show="word.frequency"><strong>Användningsfrekvens:</strong> {{this.frequency}}</li>

                        <li v-show="word.main_node"><strong>Nod: </strong>
                            <span>
                                {{word.main_node}} >
                                <span class="button-link" @click="openPolarityModal">{{word.polarity_node}}</span>><span class="button-link" @click="openSubNodeModal">{{word.sub_node}}</span>
                
                                    <!-- Modal Component -->
                                    <!-- @click="openPolarityModal" @click="openSubNodeModal" -->
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

                    <hr>
                        <li v-show="word.sources"><strong>Källan:</strong> {{word.sources}}</li>    

                </ul>
            </div>
            <div class="show-more desktop">
                <button class="more" >Föreslå ändringar</button>

                    <!-- Modal Component -->
                    <!-- @click="openChangesModal" -->
                    <!-- <ModalComponent 
                    :word="word" 
                    :show="showModal" 
                    @close-modal="closeModal"
                    @submit-form="handleSubmitForm"
                    /> -->
            </div>
            <div class="show-more mobile" v-if="moreInfoAvailable">
                <button class="more" >Föreslå ändringar</button>

                    <!-- Modal Component for making changes -->
                    <!-- @click="openChangesModal" -->
                    <!-- <ModalComponent 
                    :word="word" 
                    :show="showModal" 
                    @close-modal="closeModal"
                    @submit-form="handleSubmitForm"
                    /> -->
            </div> 
        </div>
    </div>
</div>

</template>

<script>
    // import ModalComponent from './SuggestChangesModule.vue';
    import SubNodeModalComponent from './SubNodeModal.vue';
    import PolarityModalComponent from './PolarityModal.vue';
    // import ExpressionsModalComponent from './ExpressionsModal.vue';
export default {
    components: { PolarityModalComponent, SubNodeModalComponent },
    props: ['word', 'index'], 
    data() {
        return {
            showButton: true,
            showModal: false, // Controls whether the modal is visible
            // backtoExpressionsModal: false,
            arousal: "",
            frequency: "",
            showPolarityModal:false,
            showSubNodeModal:false
    
        }
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
        closeModal() {
            this.showModal = false; // Hide the modal
            this.showChangesModal = false; // Hide the modal
            this.showSubNodeModal = false;
            this.showPolarityModal = false;
            // Emit event to close the modal in the parent component
            this.$emit('closeModal');
        }, 
        openPolarityModal() {
            this.showPolarityModal = true;
        },
        openSubNodeModal() {
            this.showSubNodeModal = true;
        }
    }

 }
</script>


<style scoped>
  /* Basic styling for the modal */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    max-width: 680px;
    max-height: 880px;
    height: 80vh;
    overflow-y: auto;
    background-color: white;
    padding: 20px 40px;
    border-radius: 5px;
    position: relative;
  }

  @media (min-width: 1201px) { .modal-content { width: 80%; }}
  @media (max-width: 1200px) { .modal-content { width: 60%; }}

  .scrolling-content {
    position: scrolling;
  }

  .close {
    cursor: pointer;
    padding: 4px 10px 6px 10px; 
    border-radius: 15px;
    border: 1px solid #134da2;
    position: absolute;
    top: 10px;
    right: 20px;
  }

  span.close:hover {
    background-color: #134da2;
    color: #fff;
  } 



  @media (max-width: 575px) {
    div.sampi-db-logo.module {
        margin: 0 auto;
    }

    div.sampi-db-logo.module img {
        width: 137px;
        height: auto;
    }
  }

  div.modal h2 {
      margin-top: 50px;
  }

  hr {
    border: none;
    border-top: 1px solid #134da250;
    margin: 20px 0;
  }
  
li {
    padding-left: 20px; 
    padding-right: 20px; 
}

li.expression {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

li.expression div.flex-col { line-height: 1.8em; }

li.expression span.button-link {
    padding: 0 6px;
    margin: 0 12px;
}

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
    display: flex;
    flex-direction: column;
    background-color: #e3e3e330;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
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
    font-size: 0.9em;
    margin: 4px 0;
    line-height: 1.5em;
    color: #404040;
}

/* button.less  {
    display: none;
} */


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
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 0.9em;
    padding-left: 40px;
    font-style: italic;
    margin-bottom: 0.4%;
    color: #404040;
}

li img {
    width: 25px;
    height: auto;
    margin-top: 3px;
    margin-right: 8px;
}
</style>