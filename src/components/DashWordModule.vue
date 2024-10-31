<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <div v-if="thankYouMsg" class="thank-you-msg">
                <span class="lato-bold">Klart!</span>
                <span class="close-thkyou" @click="closeModal">&times;</span>
              </div>

            <div v-else>
                <h2 class="lato-bold">Lägga till ett ord</h2>
              
                <!-- form ----------------- -->
                <form @submit.prevent="submitForm">
                    <div class="flex-row">
                      <img src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon">
                       <div class="flex-col">
                          <label for="name">Ord på sydsamiska</label>
                          <input class="contact-info" type="text" v-model="formData.word_sydsamiska" required/><!-- required -->
                      </div>
                      <div class="flex-col">
                        <label for="email">Definition</label>
                        <input class="contact-info" type="text" v-model="formData.definition_sydsamiska" name="definition_sydsamiska"/>
                      </div>
                    </div>
              
                    <div class="flex-row">
                      <img src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon">
                       <div class="flex-col">
                          <label for="name">Ord på svenska</label>
                          <input class="contact-info" type="text" v-model="formData.word_svenska" name="word_svenska" />
                      </div>
                      <div class="flex-col">
                        <label for="email">Definition</label>
                        <input class="contact-info" type="text" v-model="formData.definition_svenska" name="definition_svenska"/>
                      </div>
                    </div>
              
                    <div class="flex-row">
                      <img src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon">
                       <div class="flex-col">
                          <label for="name">Ord på norska</label>
                          <input class="contact-info" type="text" v-model="formData.word_norska" name="word_norska" />
                      </div>
                      <div class="flex-col">
                        <label for="email">Definition</label>
                        <input class="contact-info" type="text" v-model="formData.definition_norska" name="definition_norska"/>
                      </div>
                    </div>
                    <div class="flex-col">
                      <label for="example_of_use">Example of Use:</label>
                      <textarea id="example_of_use" v-model="formData.example_of_use" rows="4"></textarea>
                    </div>
                    <div class="flex-col">
                    <label for="sources">Sources:</label>
                    <textarea v-model="formData.sources" name="sources" rows="4"></textarea>
                  </div>
                  <div class="flex-row">
                    <div class="flex-col">
                      <label for="arousal_level">Arousal Level:</label>
                      <select v-model="formData.arousal_level" name="arousal_level">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                      </select>
                    </div>
                    <div class="flex-col">
                      <label for="frequency_id">Frequency:</label>
                      <select v-model="formData.frequency_id" name="frequency_id">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                    <button type="submit">Lägga till</button>
                </form>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { useUrlGet } from '../stores/urlGet';
import EventBus from '../util/event-bus';
  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        return { useUrl }
    },
    props: ['word', 'show'], // Accepting `word` as a prop and controlling `show` for modal visibility
    data() {
      return {
        urlChange: this.useUrl.urlGet + "/words", 
        toggleButton: false,
        showButton: true,
        showData: false,
        thankYouMsg: false,
        errorMsg: false,
        captcha: {
          num1: 0,
          num2: 0,
          question: '',
          correctAnswer: 0,
          userAnswer: null
        },
        errorMessage: '',
        message: '',


        // Create a local copy of the `word` prop to work with in the form
        formData: {
          word_sydsamiska: '',
          definition_sydsamiska: '',
          word_svenska: '',
          definition_svenska: '',
          word_norska: '',
          definition_norska: '',
          synonyms: '',
          antonyms: '',
          example_of_use: '',
          sources: '',
          arousal_level: '',
          frequency_id: ''
        }
      };
    },
    methods: {
      closeModal() {
        // Emit event to close the modal in the parent component
        this.thankYouMsg=false;
        this.errorMsg=false;
        this.$emit('closeModal');
      },
      async submitForm() {
          this.addNewWord();
      },
      
      async addNewWord() {
        // check first for content
        if(this.formData.word_sydsamiska.length > 3 ) {
            this.errorMessage='';
            let dataBody = this.formData;
            console.log(dataBody);
            const response = await fetch(this.urlChange, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataBody)
            });

            await response.json();

            // empty form
            this.formData.word_sydsamiska= "";
            this.formData.definition_sydsamiska= "";
            this.formData.word_svenska= "";
            this.formData.definition_svenska= "";
            this.formData.word_norska= "";
            this.formData.definition_norska= "";
            this.formData.synonyms= "";
            this.formData.antonyms= "";
            this.formData.example_of_use= "";
            this.formData.sources= "";
            this.formData.arousal_level= "";
            this.formData.frequency_id= "";
            this.thankYouMsg=true;

            this.$emit("addNewWord"); // reloads the parent page.

            // Emit event to notify DashWordsSection
            EventBus.emit('word-added');
            this.closeModal(); // Close the modal
        }
        else {
          this.errorMessage = "Vi behöver mer info, vänligen kolla formuläret.";
        }

    }

    },
  };
</script>
  
<style scoped>

  div.flex-row img {
      width: auto;
      height: 30px;
      margin-top: 12px;
      margin-right: 0;
  } 
  /* Basic styling for the modal */
  .modal {
    display: flex;
    justify-content: center!important;
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

  .close-thkyou,
  .close {
    cursor: pointer;
    padding: 4px 10px 6px 10px; 
    border-radius: 15px;
    border: 1px solid #134da2;
  }

  .close-thkyou {
    position: relative;
    margin: 30px auto 0 auto;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  span.close-thkyou:hover,
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

  button.center-button {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  div.data {
    background-color: #eeeeee;
    padding: 20px;
  }

  div.data-info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
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

  p.label { margin-top: 20px; margin-bottom: 4px;}

  p.label,
  div.flex-col label {
    text-transform: uppercase;
    color: grey;
    font-size: xx-small;
  }

  div.msg {
    margin: 2em 0;
  }
  textarea,
  input {
    border: none;
    line-height: 1.2rem;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #134da220;
  }

  input.contact-info:focus,
  input[type='text']:focus,
  textarea:focus {
        outline: 1px solid #134da2; 
    }

  input.contact-info {
    width: 200px;
    margin-top: 0;
    line-height: 2.5em;
  }

  .contact-info {
    margin-top: 6%;
  }

  div.thank-you-msg {
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 3rem auto;
    text-align: center;
  }

  .errorMessage,
  div.thank-you-msg span {
    color: #134da2;
  }



</style>