<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>
            <div v-if="thankYouMsg" class="thank-you-msg">
                <span class="lato-bold">Tack för ditt bidrag till vår forskning!</span>
                <span class="lato-regular">Om du har lämnat dina kontaktuppgifter kommer vi att höra av oss snart.</span>
                <span class="close-thkyou" @click="closeModal">&times;</span>
              </div>

            <div v-else>
                <h2 class="lato-bold">Föreslå ändringar till ordet <span class="chosen-word lato-bold">"{{ formData.word_sydsamiska }}"</span></h2>
                <p>Har du hittat något i vår databas som inte stämmer? Vi vill gärna veta om det!</p>
                <p>
                  Använd fältet nedan för att skriva dina tankar kring ordet, översättningen, och vad det betyder för dig. Skriv gärna ett exempel på användningen av ordet.
                </p>
              
                <!-- data ----------------- -->
                <button class="seeData" @click="toggleButtonAction($event)"  v-if="showButton">
                    Se vårt data
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <button class="hideData" @click="toggleButtonAction($event)" v-else>
                    Dölj data
                    <i class="fa-solid fa-angle-up"></i>
                </button>
                <div class="data" v-if="showData">
                  <div class="data-info">
                      <div class="lang">
                        <div class="flex-row no-m word">
                          <img class="flag-icon module" src="../assets/img/flag_sampi.jpg" alt="sydsamiska flagga ikon"><h3 class="dont-show">Sydsamiska</h3>
                          <div class="flex-col">
                            <p class="label-word">Ord</p>
                            <p class="data">{{formData.word_sydsamiska}}</p>
                          </div>
                        </div>
                          <div class="flex-col">
                            <p class="label">Definition</p>
                            <p class="data">{{formData.definition_sydsamiska}}</p>
                          </div>
                      </div>
                      <div class="lang">
                        <div class="flex-row no-m word">
                          <img class="flag-icon module" src="../assets/img/flag_sve.jpg" alt="svenska flagga ikon"><h3 class="dont-show">Svenska</h3>
                          <div class="flex-col">
                            <p class="label-word">Ord</p>
                            <p class="data">{{formData.word_svenska}}</p>
                          </div>
                        </div>
                        <div class="flex-col">
                          <p class="label">Definition</p>
                          <p class="data">{{formData.definition_svenska }}</p>
                        </div>
                      </div>
                      <div class="lang">
                        <div class="flex-row no-m word">
                          <img class="flag-icon module" src="../assets/img/flag_nwg.jpg" alt="norska flagga ikon"><h3 class="dont-show">Norska</h3>
                          <div class="flex-col">
                            <p class="label-word">Ord</p>
                            <p class="data">{{ formData.word_norska }}</p>
                          </div>
                        </div>
                        <div class="flex-col">
                            <p class="label">Definition</p>
                            <p class="data"> {{formData.definition_norska}} </p>
                        </div>
                      </div>
                  </div>
                  <div class="flex-col">
                    <p class="label">Exempel på användning</p>
                    <p class="data"> {{formData.example_of_use}} </p>
                  </div>
                </div>   
                
                <!-- form ----------------- -->
                <form @submit.prevent="submitForm">
                  <!-- Text area for messages -->
                  <div class="msg flex-col">
                      <label for="message">Meddelande</label>
                      <textarea  class="lato-regular" placeholder="Vänligen skriv dina synpunkter här. Ge så mycket information som möjligt, gärna ett förslag på användning av ordet i en mening." v-model="formData.message" rows="4"></textarea>
                  </div>
                  <div class="contact-info">
                    <hr class="green">
                    <h3 class="lato-bold">Får vi kontakta dig?</h3>
                    <p>Som forskare vill vi gärna förstår skillnaden mellan vårt arbete och din kunskap. Fyll gärna i dina kontaktuppgifter om det går bra att vi kontaktar dig. </p>
                    <p><strong><em>Om du vill inte att vi kontakta dig, </em></strong>vänligen beskriva så mycket du kan i fältet övan om dina tankar kring de föreslagna uppdateringarna, så att vi kan kolla upp och leta efter källor.</p>
                    <div class="flex-row">
                      <div class="flex-col">
                          <label for="name">Namn</label>
                          <input class="contact-info" type="name" v-model="formData.name" /><!-- required -->
                      </div>
              
                      <div class="flex-col">
                        <label for="email">Epost</label>
                        <input class="contact-info" type="email" v-model="formData.email" />
                      </div>
              
                      <div class="flex-col">
                        <label for="telephone">Telefon</label>
                        <input class="contact-info" type="tel" v-model="formData.telephone" />
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
                    <button type="submit">Skicka</button>
                  </div> 
                </form>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { useUrlGet } from '../stores/urlGet';
  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        return { useUrl }
    },
    props: ['word', 'show'], // Accepting `word` as a prop and controlling `show` for modal visibility
    data() {
      return {
        urlChange: this.useUrl.urlGet + "/changes", 
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
        ...this.word,
        name: '',
        email: '',
        telephone: '',
        message: '',
        
        }
      };
    },
    watch: {
      // Watch for changes in the prop `word` and update formData accordingly
      word(newWord) {
        this.formData = { ...newWord };
      }
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
        this.$emit('close-modal');
      },
      toggleButtonAction() {
          if (this.toggleButton) {
              this.showData = false;
              this.showButton = true;
              this.toggleButton = false;
          } else {
              this.showData = true;
              this.showButton = false;
              this.toggleButton = true;
          }
      },
      async submitForm() {
        this.errorMessage = '';
        if (parseInt(this.captcha.userAnswer) === this.captcha.correctAnswer) {
          this.errorMessage = '';
          // alert('Form submitted successfully!');
          this.addChange();
        } else {
          this.errorMessage = 'Fel CAPTCHA-svar. Försök igen.';
          this.generateCaptcha();  // Generate new CAPTCHA on failure
        }
      },
      
      async addChange() {
        // check first for content
        if(!this.formData.message) {
          this.errorMessage = "1 Vänligen fyll i meddelandefältet.";
          console.log(this.errorMessage);
        }
        if(this.formData.message.length > 4 ) {
          console.log("eneer");
            this.errorMessage='';
            let changeBody = {
              word_id: this.formData.id,
              name: this.name,
              email: this.email,
              telephone: this.telephone,
              message: this.message,
            };
            console.log(changeBody);
            const response = await fetch(this.urlChange, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changeBody)
            });

            await response.json();
            // console.log(data);

            // empty form
            this.formData.word_id= "";
            this.formData.message= "";
            this.formData.name= "";
            this.formData.email= "";
            this.formData.telephone= "";
            this.message= "";
            this.thankYouMsg=true;

            this.$emit("addChange"); // reloads the parent page.
            // window.location.href = "/catalog";
        }
        else {
          this.errorMessage = "2 Vänligen fyll i meddelandefältet.";
          console.log(this.errorMessage);
        }

    }

    },
  };
</script>
  
<style scoped>
  /* Basic styling for the modal */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    max-width: 680px;
    max-height: 880px;
    overflow-y: auto;
    background-color: white;
    padding: 20px 40px;
    border-radius: 5px;
    position: relative;
  }

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

  div.modal h2 {
      margin-top: 50px;
  }

  span.chosen-word {
    color: #134da2;
  }

  button.hideData, 
  button.seeData {
    background-color: #eeeeee;
    border: none;
    border-radius: 0;
    font-size: 0.9em;
    font-weight: 400;
    line-height: 1em;
    padding: calc(0.5rem) calc(1rem);
  } 

  button.hideData i, 
  button.seeData i {
    padding: 0 0.2em 0 0.8em;
    font-size: 0.8em;
  }

  button.hideData:hover, 
  button.seeData:hover {
    color: #404040;
    background-color: #134da220;
  }

  button.hideData:hover i, 
  button.seeData:hover i {
    color: #404040;
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

  .word {
    align-content: space-around;
    align-items: center;
  }

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

  div.msg {
    margin: 2em 0;
  }

  p.data {
    margin-bottom: 0;
    margin-top: -6px;
    font-size: 0.9em;

  }

  textarea,
  input {
    border: none;
    line-height: 1.5rem;
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

  img.flag-icon.module {
    height: 25px;
    width: auto;
  }

  hr.green {
    border-top: 1px solid #134da2;
    width: 150px;
    margin-left: 0;

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

  .space-below {
    margin-bottom: 1rem;
  }

  div.captcha {
    margin: 1rem 0;
    justify-content: space-between;
    align-items: center;
  }

  div.captcha input {
    width: 40px;
  }


</style>