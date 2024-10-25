<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <div v-if="thankYouMsg" class="thank-you-msg">
                <span class="lato-regular">En Excel-fil med data baserad på din sökterm kommer snart att laddas ner till datorns nedladdningsmapp.</span>
                <span class="lato-regular italics margin-top-sm">Vid publicering av dessa data, vänligen citera följande: 'Mittuniversitetet......</span>
                <span class="close-thkyou" @click="closeModal">&times;</span>
              </div>

            <div v-else>
              <h2 class="lato-bold">Registrerar ditt projekt</h2>
              <p>Vi vill gärna veta mer om ditt projekt och hur vår data kommer att användas! Vänligen fyll i dina kontaktuppgifter och en beskrivning av projektet där datan kommer att användas.
              </p>
                
              <!-- form ----------------- -->
              <form @submit.prevent="submitForm">
                <div class="contact-info">
                  <div class="flex-row">
                    <h3 class="lato-bold">Kontaktuppgifter</h3>
                    <div class="flex-col">
                        <label for="name">Namn</label>
                        <input class="contact-info" type="text" v-model="formData.name" required/><!-- required -->
                    </div>
                    <div class="flex-col">
                      <label for="title">Title</label>
                      <input class="contact-info" type="text" v-model="formData.title" />
                    </div>
                    <div class="flex-col">
                      <label for="institution">Arbetsplats/institution</label>
                      <input class="contact-info" type="text" v-model="formData.institution" />
                    </div>
            
                    <div class="flex-col">
                      <label for="email">Epost</label>
                      <input class="contact-info" type="email" v-model="formData.email" required />
                    </div>
            
                    <div class="flex-col">
                      <label for="telephone">Telefon</label>
                      <input class="contact-info" type="tel" v-model="formData.telephone" required />
                    </div>
                  </div>

                  <!-- Text area for messages -->
                <div class="msg flex-row">
                  <h3 class="lato-bold">Projektet</h3>
                  <div class="flex-col">
                      <label for="projectTitle">Projektrubrik</label>
                      <input class="contact-info project-title" type="text" v-model="formData.projectTitle" required />
                  </div>
                  <div class="flex-col">
                    <label for="description">Beskrivning</label>
                    <textarea  class="lato-regular" placeholder="Vänligen skriv en kort beskrivning av projektet och den beräknade tidsramen för publicering." v-model="formData.description" rows="4" required></textarea>
                  </div>
                </div>
              </div>
                <!-- CAPTCHA Section -->
                <div class="captcha flex-row">
                  <div>
                    <label for="captcha">Vänligen svara:  {{ captcha.question }}
                    </label>
                    <input placeholder="?" type="number" v-model="captcha.userAnswer" required />
                  </div>
                  <div v-if="errorMessage" class="lato-bold errorMessage">
                    {{ errorMessage }}
                  </div>    
                  <button type="submit">Ladda ner data</button>
                </div> 
              </form>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { useUrlGet } from '../stores/urlGet';
import * as XLSX from 'xlsx'; //to allow for downloading. plugin: SheetJS

  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        
        return { useUrl }
    },
    props: ['show', 'searchTerm', 'words'], // Accepting `word` as a prop and controlling `show` for modal visibility
    data() {
      return {
        urlRegister: this.useUrl.urlGet + "/downloads", 
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

        formData: {
          name: '',
          title:'',
          institution: '',
          email: '',
          telephone: '',
          projectTitle: '',
          description: '',
        }
      };
    },
    created() {
      this.generateCaptcha();
    },
    methods: {
      generateCaptcha() {
        this.captcha.num1 = Math.floor(Math.random() * 10) + 1;
        this.captcha.num2 = Math.floor(Math.random() * 10) + 1;
        this.captcha.correctAnswer = this.captcha.num1 + this.captcha.num2;
        this.captcha.question = `${this.captcha.num1} + ${this.captcha.num2} = `;
      },

      closeModal() {
        // Emit event to close the modal in the parent component
        this.thankYouMsg=false;
        this.errorMsg=false;
        this.captcha.userAnswer=null;
        this.$emit('closeModal');
      },

      async submitForm() {
        this.errorMessage = '';
        if (parseInt(this.captcha.userAnswer) === this.captcha.correctAnswer) {
          this.errorMessage = '';
          this.thankYouMsg = true,
          this.downloadJsonAsExcel(this.words, this.searchTerm);
          // alert('Form submitted successfully!');
          this.addChange();
        } else {
          this.errorMessage = 'Fel CAPTCHA-svar. Försök igen.';
          this.generateCaptcha();  // Generate new CAPTCHA on failure
        }
      },

      downloadJsonAsExcel(data, searchTerm, fileName = 'miun_emotionalwords_data', title = 'Databas för sydsamiska känsloord och kulturella uttryck för lidande') {
         // Specify columns to exclude
          const excludeColumns = ['id', 'created_at', 'updated_at'];

        // Define custom headers
          const customHeaders = {
              word_sydsamiska: 'Samiska',
              definition_sydsamiska: 'Definitionen på Samiska',
              word_svenska: 'Svenska',
              definition_svenska: 'Definitionen på Svenska',
              word_norska: 'Norska',
              definition_norska: 'Definitionen på Norska',
              synonyms: 'Synonymer',
              antonyms: 'Antonymer',
              example_of_use: 'Exempel på användning',
              sources: 'Källor',
              arousal_level: 'Upphetsnings- eller aktiveringsnivå',
              frequency_id: 'Användningsfrekvens',
              // Add more mappings as needed
          };


          // Rename data keys to match custom headers
          const formattedData = data.map(item => {
              const formattedItem = {};
              Object.keys(item).forEach(key => {
                  if (!excludeColumns.includes(key)) {
                    formattedItem[customHeaders[key] || key] = item[key];
                  }
              });
              return formattedItem;
          });

          // Convert data to worksheet with headers starting at A3
          const worksheet = XLSX.utils.json_to_sheet(formattedData, { origin: 'A5' });

          // Add title at A1 and two empty rows at A2 and A3
          XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: 'A1' });
          XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: 'A2' });
          XLSX.utils.sheet_add_aoa(worksheet, [['Sökord: ' + searchTerm]], { origin: 'A3' });
          XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: 'A4' });
          
          // Create workbook and append worksheet
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
          
          // Download the file
          XLSX.writeFile(workbook, `${fileName}.xlsx`);
      },
      
      async addChange() {
        // check first for content
        if(this.formData.description.length > 4 ) {
            this.errorMessage='';
            let registerBody = {
              name: this.formData.name,
              title: this.formData.title,
              institution: this.formData.institution,
              email: this.formData.email,
              telephone: this.formData.telephone,
              projectTitle: this.formData.projectTitle,
              description: this.formData.description,
              searchTerm: this.searchTerm,
              words: this.words
            };
            const response = await fetch(this.urlRegister, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerBody)
            });

            await response.json();
            // console.log(registerBody);

            // empty form
            this.formData.name = "";
            this.formData.title = "";
            this.formData.institution = "";
            this.formData.email = "";
            this.formData.telephone = "";
            this.formData.projectTitle = "";
            this.formData.description = "";
            this.formData.thankYouMsg=true;

            this.$emit("addChange"); // reloads the parent page.
        }
        else {
          this.errorMessage = "Vi behöver mer info, vänligen utveckla ditt meddelande.";
        }

    }

    },
  };
</script>
  
<style scoped>
  .margin-top-sm {margin-top: 1rem;}
  .italics { font-style: italic; }
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
    max-width: 600px;
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
    width: 80%; 
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

  span.chosen-word {
    color: #134da2;
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
    flex-wrap: wrap;
    flex-direction: column;
    align-content: stretch;
    width: 100%;
  }

  div.flex-row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 1.5em 0;
  }


  div.msg {
    margin: 1.5rem 0;
  }

  .contact-info {
    margin-top: 0;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
  }

  textarea {
    min-height: 200px;
    width: 350px;
  }

  @media (max-width: 1025px) { 

    div.contact-info {
      flex-direction: row;
    }

    div.contact-info div.flex-row {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }



    

    div.msg {
      width: 100%;
    }

  }

  @media (max-width: 575px) {
    div.contact-info { flex-direction: column; }}

  div.flex-row.no-m {
    margin: 0;
  }

  p.label { margin-top: 20px; margin-bottom: 4px;}
  p.label-word { margin-top: 0; margin-bottom: 4px;}

  p.label,
  p.label-word,
  /* div.flex-row, */
  div.flex-col label {
    text-transform: uppercase;
    color: grey;
    font-size: xx-small;
  }


  p.data {
    margin-bottom: 0;
    margin-top: -6px;
    font-size: 0.9em;

  }

  
  input.contact-info {
    margin-top: 0;
    line-height: 2.5em;
  }

  @media (min-width: 1026px) { input.contact-info { width: 200px; }}
  @media (max-width: 575px) { input.contact-info { width: 90%; }}

  input.contact-info.project-title { width: 350px; }
  @media (min-width: 576px) and (max-width: 1025px) { 
    input.contact-info.project-title { width: 360px; }}
  @media (max-width: 575px) { 
    input.contact-info.project-title { width: 90%; }}

  @media (min-width: 1026px) { textarea { width: 350px; }}  
  @media (min-width: 576px) and (max-width: 1025px) { 
    textarea { min-height: 200px; width: 360px; }}
  @media (max-width: 575px) { textarea{ width: 90%; }}
  
  textarea,
  input {
    border: none;
    /* width: 100%; */
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

  img.flag-icon.module {
    height: 25px;
    width: auto;
  }

  hr.green {
    border-top: 1px solid #134da2;
    width: 150px;
    margin-left: 0;
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

  .space-below {
    margin-bottom: 1rem;
  }

  div.captcha {
    margin: 1rem 0;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 575px) {
    div.captcha.flex-row {
      flex-direction: column;
      margin-top: 20px;
      gap: 25px;
    }


  }

  div.captcha input {
    width: 40px;
  }


</style>