<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Föreslå ändringar</h2>
        <p>Har du hittat något i vår databas som inte stämmer? Vi vill gärna veta om det! Uppdatera gärna informationen nedan.</p>
        <!-- Form with input fields bound to formData -->
        <form @submit.prevent="submitForm">
            
            <div class="data-info">
                <h3>Svenska</h3>
                <div>
                  <label for="word_svenska">Ord:</label>
                  <input type="text" v-model="formData.word_svenska" />
                </div>
                <div>
                  <label for="definition_svenska">Definition:</label>
                  <input type="text" v-model="formData.definition_svenska" />
                </div>
      
                <h3>Norska</h3>
                <div>
                  <label for="word_svenska">Ord:</label>
                  <input type="text" v-model="formData.word_norska" />
                </div>
                <div>
                  <label for="definition_svenska">Definition:</label>
                  <input type="text" v-model="formData.definition_norska" />
                </div>
      
                <h3>Sydsamiska</h3>
                <div>
                  <label for="word_svenska">Ord:</label>
                  <input type="text" v-model="formData.word_sydsamiska" />
                </div>
                <div>
                  <label for="definition_svenska">Definition:</label>
                  <input type="text" v-model="formData.definition_sydsamiska" />
                </div>
            </div>

            <div class="contact-info">
                <p>Som forskare vill vi gärna prata med dig och förstå skillnaden mellan vårt arbete och din kunskap. Får vi kontakta dig? Fyll gärna i dina kontaktuppgifter om det går bra, annars kan du fylla i fältet för mer information om dina tankar kring de föreslagna uppdateringarna, så att vi kan kolla upp och leta efter källor.</p>
                <div>
                    <label for="name">Namn:</label>
                    <input type="text" v-model="formData.name" /><!-- required -->
                </div>
        
                <div>
                <label for="email">Epost:</label>
                <input type="email" v-model="formData.email" />
                </div>
        
                <div>
                <label for="telephone">Telefon:</label>
                <input type="tel" v-model="formData.telephone" />
                </div>
        
                <!-- Text area for messages -->
                <div>
                <label for="message">Mer information bakom ändringsförslaget:</label>
                <textarea v-model="formData.message" rows="4"></textarea>
                </div>
            </div>

 
          <!-- Add more fields as necessary based on your object structure -->
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['word', 'show'], // Accepting `word` as a prop and controlling `show` for modal visibility
    data() {
      return {
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
    methods: {
      closeModal() {
        // Emit event to close the modal in the parent component
        this.$emit('close-modal');
      },
      submitForm() {
        // Emit the updated form data to the parent when the form is submitted
        this.$emit('submit-form', { ...this.formData });
      },
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
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }
  </style>