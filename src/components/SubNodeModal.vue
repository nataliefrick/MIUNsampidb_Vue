<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="scrolling-content">
          <div class="sampi-db-logo module">
              <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
          </div>
          
          <!-- <h2 class="lato-bold"><pre>{{ this.words }}</pre></h2> -->
          <div>
              <h2 class="lato-bold">{{this.title}} 
                <span class='chosen-word lato-bold'> {{ this.mainnode }} > 
                  <span>{{ this.polaritynode }} </span> > {{ this.subnode }}</span></h2>
                  <!-- class="node-link" @click="openPolarityModal" -->
                         
              <!-- Modal Component -->
              <!-- <PolarityModalComponent 
                :polarity="polaritynode" 
                :show="showPolarityModal" 
                @close-modal="closeModal"
              /> -->

              <div v-for="(word, index) in words" :key="index" class="data">
                <div class="data-info">
                  <div class="lang">
                    <div class="flex-row no-m word">
                      <img class="flag-icon module" src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"><h3 class="dont-show">Sydsamiska</h3>
                      <div class="flex-col">
                        <p class="label-word">Ord</p>
                        <p class="data">{{word.word_sydsamiska}}</p>
                      </div>
                    </div>
                    <div class="flex-col">
                      <p class="label">Definition</p>
                      <p class="data">{{word.definition_sydsamiska}}</p>
                    </div>
                  </div>
                  <div class="lang">
                    <div class="flex-row no-m word">
                      <img class="flag-icon module" src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"><h3 class="dont-show">Svenska</h3>
                      <div class="flex-col">
                        <p class="label-word">Ord</p>
                        <p class="data">{{word.word_svenska}}</p>
                      </div>
                    </div>
                    <div class="flex-col">
                      <p class="label">Definition</p>
                      <p class="data">{{word.definition_svenska }}</p>
                    </div>
                  </div>
                  <div class="lang">
                    <div class="flex-row no-m word">
                      <img class="flag-icon module" src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"><h3 class="dont-show">Norska</h3>
                      <div class="flex-col">
                        <p class="label-word">Ord</p>
                        <p class="data">{{ word.word_norska }}</p>
                      </div>
                    </div>
                    <div class="flex-col">
                        <p class="label">Definition</p>
                        <p class="data"> {{word.definition_norska}} </p>
                    </div>
                  </div>
                </div>
                <span class="button-link" @click="setSearchTerm(word.word_sydsamiska)">se ord</span>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { nextTick } from 'vue';  // Import nextTick for better timing of updates
  import { useUrlGet } from '../stores/urlGet';
  import { useSearchTermStore } from '../stores/searchterms';
  // import PolarityModalComponent from './PolarityModal.vue';
  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        return { useUrl }
    },
    // components: { PolarityModalComponent },
    props: ['subnodeId', 'subnode', 'mainnode', 'polaritynode', 'show'], // Accepting `subnodes` as a prop and controlling `show` for modal visibility
    data() {
      return {
        storeSearchTerms: useSearchTermStore(),
        urlSubNodes: this.useUrl.urlGet + "/words/subnodes", 
        title: "title",
        words: [],
        newTerm: "",
        showModal: false, // Controls whether the modal is visible
        showSubNodeModal: false, // Controls whether the modal is visible
        showPolarityModal: false, // Controls whether the modal is visible
        };
    },
    emit: ["setSearchTerm"],
    methods: {
      closeModal() {
        this.$emit('closeModal');
        this.showPolarityModal = false; 
        this.showSubNodeModal = false; 
      },
      openPolarityModal() {
        this.showPolarityModal = true; 
        this.showSubNodeModal = false; 
      },
      async getSubNodes() {
        if(this.subnodeId != null) {
          const response = await fetch(this.urlSubNodes + "/" + this.subnodeId, { method: "GET" });
          let data = await response.json(); // save the data in sent through the response.
          if(data.length <= 1) {
              this.title = "Det är bara det här ord som finns i noden: ";
          }
          if(data.length > 1) {
              this.title = "Andra ord som är också i noden: ";
          }
          this.words = data;
              
        }

      },
      async setSearchTerm(term) {
        // Access the Pinia store
        const storeSearchTerms = useSearchTermStore();
        this.newTerm = term;
        
        // Only update if there's a new term to submit
        if (this.newTerm) {
            storeSearchTerms.setTerm(this.newTerm);

            // Use nextTick to ensure the store updates are processed before navigating
            await nextTick();
            try {
                await this.$router.push('/results');  // Navigate to the results page
            } catch (err) {
                console.error("Navigation error:", err);  // Log any navigation errors
            }
          } 
          this.closeModal();
      }
    },
    mounted() {
            this.getSubNodes();
        }
  };
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
    /* height: 80vh; */
    overflow-y: auto;
    background-color: white;
    padding: 20px 40px 60px 40px;
    border-radius: 5px;
    position: relative;
  }

  @media (min-width: 1201px) { 
  .modal-content { 
    width: 80%;

  }}
  @media (max-width: 1200px) { 
  .modal-content { 
    width: 60%; 
  }}

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

    span.node-link,
    span.chosen-word {
      color: #134da2;
      font-style: italic;
      font-weight: bold;
    }

    span.node-link:hover {
    color: #134da2;  /* dk blue */
    background-color: #fbd030;
    cursor: pointer;
    text-decoration: underline;
}

    

  div.data {
      background-color: #eeeeee;
      padding: 20px;
      MARGIN-BOTTOM: 1REM;
    }

  div.data-info {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

  @media (max-width: 768px) {
    div.data-info {
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 510px) {
    div.data-info {
      gap: 5px;
    }
  }

  div.lang {
    display: flex;
    flex-direction: column;
    width: 33%;
    justify-content: flex-start;
    column-gap: 1em;
    margin-bottom: 1em;
    align-items: flex-start;
    /* margin-left: auto;
    margin-right: auto; */
  }

  @media (max-width: 768px) {
    div.lang {
      flex-direction: row;
      width: 100%;
      align-items: flex-start;
    }
  }

  @media (max-width: 510px) {
    div.lang {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #fff;
    }
  }

  div.lang h3 {
    margin-top: auto;
    margin-bottom: 0;
    /* min-width: 150px; */
    font-weight: 400;
    font-size: large;
  }

  div.flex-col {
    display: flex;
    flex-direction: column;
  }

  div.flex-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 1.5em 0;
  }

  @media (max-width: 1025px) { 
    div.contact-info div.flex-row {
      flex-direction: column;
      align-items: center;
    }
  }

  .word {
    align-content: space-around;
    align-items: center;
  }

  @media (max-width: 768px) {
    .word { min-width:125px; }
  }

  div.flex-row.no-m {
    margin: 0;
  }

  p.label { margin-top: 20px; margin-bottom: 4px;}
  p.label-word { margin-top: 0; margin-bottom: 4px;}

  @media (max-width: 768px) {
    p.label { margin-top: 0px; margin-bottom: 4px;}
  }


  p.label,
  p.label-word,
  /* div.flex-row, */
  div.flex-col label {
    text-transform: uppercase;
    color: grey;
    font-size: xx-small;
  }

  div.msg {
    margin: 2em 0;
  }

  p.data {
    margin-bottom: 0;
    margin-top: -6px;
    font-size: 0.9em;
    margin-right: 20px;
  }

  img.flag-icon.module {
    height: 25px;
    width: auto;
  }

  span.button-link {
    color: #134da2;
    text-decoration: none;
    padding: 4px 6px 6px 6px;
    text-align: center;
    margin: 20px auto 0 auto;
    display: flex;
    justify-content: center;
  }

    
  @media (max-width: 510px) {
    span.button-link {
      margin: 5px auto 0 auto;
    }
  }
  
  span.button-link:hover {
    color: #134da2;  /* dk blue */
    text-decoration: underline;
    cursor: pointer;
 }
</style>