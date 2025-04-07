<template>
    <div v-if="show" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
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
                <h2 class="lato-bold">Lägga till en ny nod</h2>

                <!-- form ----------------- -->
                <form @submit.prevent="submitForm">
                  <div class="flex-row">
                      <div class="flex-col halv">
                        <label for="main_node">Huvud-nod:</label>
                        <input class="definition" name="main_node" type="text" placeholder="Känslor" v-model="formData.main_node" disabled/>
                      </div>
                  </div>
                    <div class="flex-row">
                      <div class="flex-col halv">
                        <label for="polarity_node">Polarity nod:</label>
                        <select v-model="this.formData.polarity_node" name="polarity_node">
                            <option v-for="(node, index) in uniquePolarityNodes" :key="index" :value="node">
                              {{ node }}
                            </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex-row">
                      <div class="flex-col halv">
                        <label for="sub_node">Sub-nod:</label>
                        <input class="definition" name="sub_node" type="text" v-model="formData.sub_node" />
                      </div>
                  </div>

                  
                  <!-- submit section -->
                  <div>
                    <div class="submit-section" v-if="!areYouSure">
                      <span class="delete-button" @click="justChecking()">Stäng</span>
                      <button type="submit">Spara</button>
                      <span class="close" @click="closeModal">&times;</span>

                    </div>
                    <div class="are-you-sure" v-if="areYouSure">
                      <span class="red-text">Är du säker?</span>
                      <button @click="closeModal">Ja</button>
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
        urlNodes: this.useUrl.urlGet + "/nodes",
        nodes: [],
        toggleButton: false,
        showButton: true,
        showData: false,
        errorMsg: false,
        errorMessage: '',
        thankYouMsg: false,
        message: '',
        areYouSure: false,
        formData: {
          main_node: "känslor",
          polarity_node: '',
          sub_node: '',
        }
      };
    },
    props: {
      word: {
        type: Object,
        default: null // or any default value you want
      },
      show: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      uniquePolarityNodes() {
        return [...new Set(this.nodes.map(node => node.polarity_node))];
      },
    },
    created() {
      // Copy the word prop into formData when the component is created
      this.formData = { ...this.node };
    },
    watch: {
      // Watch for changes in node and update formData accordingly
      node: {
        handler(newVal) {
          this.formData = { ...newVal };
        },
        immediate: true // Update immediately if the word prop is already set
      }
    },
    methods: {
      closeModal() {
        // Emit event to close the modal in the parent component
        this.thankYouMsg=false;
        this.errorMsg=false;
        this.areYouSure=false;
        this.showNodeModal = false;
        this.$emit('close-modal');
      },
      async submitForm() {
        this.addNewNode();
      },
      undo() {
        this.areYouSure = false;
      },
      justChecking() {
        this.areYouSure = true;
      },
      async getNodes() {
        const response = await fetch(this.urlNodes, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.nodes = data;
      },
      async addNewNode() {
        // check first for content
        if(this.formData.sub_node.length > 2 ) {
            this.errorMessage='';
            let dataBody = {
              ...this.formData,
              main_node: 'känslor'
            };

            const response = await fetch(this.urlNodes, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataBody)
            });

            await response.json();
            console.log("response");

            // empty form
            this.thankYouMsg=true;

            // Emit event to notify DashWordsSection
            EventBus.emit('change-to-database');

            this.thankYouMsg=true;
            this.message="Noden finns nu i databasen";
            this.areYouSure=false;
            this.$emit("addNewNode"); // reloads the parent page.
        }
        else {
          this.errorMessage = "Vi behöver mer info, vänligen kolla formuläret.";
        }
      }
  },
  mounted() {
        this.getNodes();
    }
};
</script>


<style scoped>
div.spacer {
  margin: 20px;
}

.spacing-top {
  margin-top: 1.5em;
}

.spacing-top-sm {
  margin-top: 0.5em;
}

.halv {
  width: 450%;
}

hr {
  margin-top: 30px;
  border: none;
  border-bottom: 1px solid #eee;
}

span.red-text {
    color: red;
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
  }
  div.submit-section {
    justify-content: flex-end;
    gap: 1rem;
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
    max-width: 380px;
    max-height: 460px;
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
    div.flex-row {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    /* div.contact-info div.flex-row {
      flex-direction: column;
      align-items: center;
    } */
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

  select {
    height: 2rem!important;
  }

  select,
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
    width: 84%;
    margin-top: 0;
    line-height: 2.5em;
  }

  @media (max-width: 1025px) {
    input.contact-info {
      /* width: 85%; */
      flex-grow: 1;
    }
  }

  .flex-grow {
    display: flex;
    flex-grow: 1;
  }

  @media (max-width: 1025px) {
    .flex-grow {
      width: 100%;
    }
  }


  input.definition {
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

  span.delete-button {
    text-decoration: underline;
    cursor: pointer;
  }

  span.delete-button:hover {
    text-decoration: none;
    color: red;
    cursor: pointer;
  }



</style>