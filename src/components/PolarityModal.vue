<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>

            <div>
              <h2 class="lato-bold">{{this.title}} <span class='chosen-word lato-bold'> {{ this.polarity }}</span></h2>
              <div class="data">
                <button v-for="(node, index) in nodes" :key="index" @click="openSubNodeModal(node)" >{{node.sub_node}}</button>
              </div>
              <!-- Modal Component -->
              <SubNodeModalComponent
                v-if="selectedNode"
                :subnodeId="selectedNode.id"
                :subnode="selectedNode.sub_node"
                :mainnode="selectedNode.main_node"
                :polaritynode="selectedNode.polarity_node"
                :show="showSubNodeModal"
                @close-modal="closeModal"
                  />
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { useUrlGet } from '../stores/urlGet';
import SubNodeModalComponent from './SubNodeModal.vue';

  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet()
        return { useUrl }
    },
    components: {
        SubNodeModalComponent
    },
    props: ['polarity', 'show'], // Accepting `polarity` as a prop and controlling `show` for modal visibility
    data() {
      return {
        urlNodes: this.useUrl.urlGet + "/nodes/polarity",  
        nodes: [],
        title: "",
        showSubNodeModal: false, // Controls whether the modal is visible
        selectedNode: null, // Holds the node data for the modal
        };
    },

    methods: {
      openSubNodeModal(node) {
            this.selectedNode = node; // Set the selected node
            this.showSubNodeModal = true; // Show the modal
        },

      closeModal() {
        this.$emit('closeModal');
      },
      async getNodes() {

      // if(this.subnodeId != null) {
        const response = await fetch(this.urlNodes + "/" + this.polarity, { method: "GET" });
        let data = await response.json(); // save the data in sent through the response.
        if(data.length <= 1) {
            this.title = "Tyvärr finns det inga noder under: ";
        }
        if(data.length > 1) {
            this.title = "Dessa är noden som finns under: ";
        }
        this.nodes = data;
            
      }

    },
    mounted() {
          this.getNodes();
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

  span.chosen-word {
    color: #134da2;
    font-style: italic;
  }

  div.data {
    display: flex;
    flex-direction: row;
    row-gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

</style>