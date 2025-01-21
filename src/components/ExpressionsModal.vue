<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <div>
                <h2 class="lato-bold">Sydsamiska uttryck</h2>
                <p>Här finns en lista på alla Sydsamiska uttryck som vi har samlat på i våran förskning.</p>
                <!-- List of Expressions -->
                <ul class="no-bullets">
                  <li v-for="(word, index) in words" :key="index">
                    <!-- {{ word }} -->
                      <div class="flex-row">
                        <div class="word">
                          <span class="button-link" @click="openWordModal(word, index)">{{ word.word_sydsamiska }} </span>
                        </div>

                          <!-- Modal Component -->
                          <SingleWordModalComponent 
                            v-if="showWordModal"
                            :word="selectedWord" 
                            :index="selectedIndex"
                            @close-modal="closeModal"
                          />
                          
                        <div class="expression">
                          <span>"{{ word.expression }}" </span>
                          <span class="translation">"{{ word.translation }}" </span>
                        </div>

                      </div>
                    <hr>
                  </li>
                </ul>

            </div>
        </div>
      </div>
    </div>
</template>
  
<script>

import SingleWordModalComponent from './SingleWordModal.vue';
  export default {
    components: { SingleWordModalComponent },
    props: ['words', 'show'], // Accepting `words` as a prop and controlling `show` for modal visibility
    data() {
      return {
        showWordModal: false,
        selectedWord: null,
        selectedIndex: null,
      };
    },
    methods: {
      openWordModal(word, index) {
        this.selectedWord = word;
        this.selectedIndex = index;
        this.showWordModal = true;
      },
      closeModal() {
        this.showWordModal = false;
        this.selectedWord = null;
        this.selectedIndex = null;
        // Emit event to close the modal in the parent component
        this.$emit('closeModal');
      }
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
    height: 80vh;
    overflow-y: auto;
    background-color: white;
    padding: 20px 40px;
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
  
  ul.no-bullets {
      list-style-type: none; /* Remove bullets */
      padding: 20px 40px; 
      margin: 0; 
  }
  
  div.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 1.5em 0;
  }

  div.word {
    display: inline-flex;
    min-width: 50px;
    width: 20%;
    padding-left: 10px;

  }

  div.expression {
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    font-style: italic;
    width: 80%;
  }

  span.translation {
    font-style: italic;
    font-size: 0.9em;;
  }

  hr {
    border: none;
    border-top: 1px solid #134da250;
  }

  span.button-link {
    color: #134da2;
    text-decoration: underline;
    padding: 4px 6px 6px 6px;
    border-radius: 5px;
}

span.button-link:hover {
    color: #134da2;  /* dk blue */
    background-color: #fbd030;
    cursor: pointer;
}

</style>
