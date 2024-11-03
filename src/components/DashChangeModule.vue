<template>
<!-- , created_at, email, id, message, name, checked_by, status, telephone, word_id -->
<!-- <p>just checking: {{ displayText }}</p> -->

<div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <div v-if="thankYouMsg" class="thank-you-msg">
                <span class="lato-bold">{{ message }}</span>
                <span class="close-thkyou" @click="closeModal">&times;</span>
            </div>

            <div v-else>
              <h2 class="lato-bold">Föreslagen ändring av ord i databasen</h2>
              <div class="data-on-file">
                <div class="flex-row space-inbetween">
                  <h3>Förslaget till ordet: <em>{{change.word_sydsamiska}}</em></h3>
                  <!-- <h3>Förslaget till ordet: <em>{{ formData.word_id}}</em></h3> -->
                  <div class="flex-col">
                    <span class="label">Datum</span>
                    <span class="data">{{formatDate(change.created_at)}}</span>
                  </div>
                </div>
                    <span class="data">{{change.message}}</span>
                    <hr>
                    <h3>Kontaktperson</h3>
                    <div class="flex-row space-inbetween">
                      <div class="flex-col">
                          <span class="label">Namn</span>
                          <span v-if=change.name class="data">{{change.name}}</span><span v-else class="data">inte angiven</span>
                      </div>
                      <div class="flex-col">
                        <span class="label">E-post</span>
                        <span v-if="change.email" class="data">
                          {{change.email}}
                        </span><span v-else class="data">inte angiven</span>
                      </div>
                      <div class="flex-col">
                          <span class="label">Telefon</span>
                          <span v-if="change.telephone" class="data">
                            {{change.telephone}}
                          </span><span v-else class="data">inte angiven</span>
                      </div>
                    </div>
                  </div>
              <form @submit.prevent="submitForm">
                <div class="notes">
                <h3>Anteckningar</h3>
                  <div class="flex-row">
                    <div class="flex-col">
                      <label for="status">Status</label>
                      <textarea class="text-notes" rows="4" v-model="formData.status" name="status" placeholder="inprogress, completed, etc."></textarea>
                    </div>

                    <div class="flex-col right-col">
                      <div class="flex-col" v-if="formData.updated_at">
                        <span class="label">Senaste uppdatering</span>
                        <span class="data">{{formatDate(formData.updated_at)}}</span>
                      </div>
                      <div class="flex-col">
                        <label for="checked_by">Ansvarig</label>
                        <input v-model="formData.checked_by" name="checked_by">
                      </div>
                    </div>
                  </div>
                  <div class="submit-section" v-if="!areYouSure">
                      <button type="submit">Spara</button>
                      <span class="close" @click="closeModal">&times;</span>
                      <button @click="justChecking()">Radera</button>
                    </div>
                    <div class="are-you-sure" v-if="areYouSure">
                      <span class="red-text">Är du säker du vill radera?</span>
                      <button @click="deleteChange()">Ja</button>
                      <button @click="undo()">Nej</button>
                    </div>
                  </div>
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
    data() {
      return {
        urlChange: this.useUrl.urlGet + "/changes", 
        showButton: true,
        showData: false,
        errorMsg: false,
        errorMessage: '',
        thankYouMsg: false,
        message: '',
        existingChange: false,
        areYouSure: false,
        formData: {
          id: '',
            // email: '',
            // message: '',
            // name: '',
            checked_by: '',
            status: '',
            // telephone: '',
            // word_id: '',
        },
      };
    },
    props: {
      change: {
        type: Object,
        default: null // or any default value you want
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      displayText() {
        // Check if word has been passed in, otherwise display a fallback message
        return `Change: ${JSON.stringify(this.change)}`;
      }
    },
    created() {
      // Copy the change prop into formData when the component is created
      this.formData = { ...this.change };
      this.formatCreatedAtDate();
    },
    watch: {
      // Watch for changes in word and update formData accordingly
      change: {
        handler(newVal) {
          this.formData = { ...newVal };
          this.existingChange = true;
        },
        immediate: true // Update immediately if the word prop is already set
      }
    },
    methods: {
      formatDate(timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(date.getFullYear()); // Get last two digits of the year
            return `${year}-${month}-${day}`;
      },
      formatCreatedAtDate() {
        if (this.formData.created_at) {
          // Create a new Date object and format it to YYYY-MM-DD
          const date = new Date(this.formData.created_at);
          this.formData.created_at = date.toISOString().split('T')[0];
        }
      },
      closeModal() {
        // Emit event to close the modal in the parent component
        this.thankYouMsg=false;
        this.errorMsg=false;
        this.existingChange=false;
        this.areYouSure=false;
        this.$emit('closeModal');
        // Emit event to notify DashWordsSection
        EventBus.emit('change-to-database');
      },
      async submitForm() {
          this.updateChange();
      },
      undo() {
        this.areYouSure = false;
      },
      justChecking() {
        this.areYouSure = true;
      },
      async deleteChange() {
        const response = await fetch(this.urlChange + "/" + this.formData.id,  {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json"
              }
        });

          await response.json();
          this.message="Posten är nu raderat från databasen.";
          
          // Emit event to notify DashWordsSection
          EventBus.emit('change-to-database');
          this.areYouSure=false;
          this.thankYouMsg=true;
          this.existingChange=false;
          this.areYouSure=false;
          this.$emit("deleteChange"); // reloads the parent page.
      },
      async updateChange() {
          let dataBody = this.formData;
          console.log(JSON.stringify(dataBody));
          const response = await fetch(this.urlChange + "/" + this.formData.id,  {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(dataBody)
          });

          await response.json();
          
          // Emit event to notify DashWordsSection
          EventBus.emit('change-to-database');
          this.thankYouMsg=true;
          this.message="Posten har uppdaterats i databasen";
          this.existingChange=false;
          this.areYouSure=false;
          this.$emit("updateChange"); // reloads the parent page.
          
      },
      async addNewWord() {
        // check first for content
        if(this.formData.word_sydsamiska.length > 3 ) {
            this.errorMessage='';
            let dataBody = this.formData;
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

            
            // Emit event to notify DashWordsSection
            EventBus.emit('change-to-database');
            
            this.thankYouMsg=true;
            this.message="Posten finns nu i databasen";
            this.existingChange=false;
            this.areYouSure=false;
            // "Posten " + { dataBody.word_sydsamiska } +" finns nu i databasen";
            this.$emit("addNewWord"); // reloads the parent page.
        }
        else {
          this.errorMessage = "Vi behöver mer info, vänligen kolla formuläret.";
        }
      }
  }
};
</script>
  
<style scoped>
  hr {
    width: 20%;
    margin: 25px 0;
  }

  textarea.text-notes {
    width: 400px;
  }

  .right-col {
    gap: 20px;
  }
  div.notes {
    border: 1px solid #eee;
    padding: 1rem 2rem 0 2rem;
  }

  div.notes,
  div.data-on-file {
    margin: 1rem 0;
  }
  
  div.data-on-file {
    padding: 1rem 2rem 2rem 2rem;
    background-color: #eee;
  }

  span.label {
    text-transform: uppercase;
    font-size: 0.6em;
    color: grey;
  }

  span.red-text {
    color: red;
    font-weight: bold;
    margin-right: 10px;
  }
  div.are-you-sure {
    justify-content: flex-end;
  }
  div.are-you-sure,
  div.submit-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0;
  }
  div.submit-section {
    justify-content: space-between;
  }

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

  div.sampi-db-logo.module {
        margin: 0 auto 2rem auto;
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

  div.modal h3 {
      margin-top: 10px;
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
    align-items: center;
  }

  .space-inbetween {
    justify-content: space-between;
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