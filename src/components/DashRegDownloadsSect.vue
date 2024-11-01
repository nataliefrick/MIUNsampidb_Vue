<template>
<section id="downloads">
    <h2>Section: Registered Downloads</h2>
    <p>this section shows all the registered projects that data has been downloaded for. </p>
    <div id="filter">
        <form @submit.prevent="filterWords()">
            <div class="row-searchform">
                <label>Filtrerar </label>
                <input type="text" placeholder="Ange sökterm" v-model="searchTerm">
                <button @click="filterWords" class="white-text no-style"><i class="fa-solid fa-magnifying-glass"></i></button>
                <span>filter function does not work</span>
            </div>
        </form>
    </div>
    <div class="header">
        <div class="column"><span>Datum</span></div>
        <div class="column"><span>Institution</span></div>
        <div class="column"><span>Namn</span></div>
        <div class="column"><span>Projekttitel</span></div>
    </div>
    <RegDownload v-for="download in sortedDownloads" :download="download" :key="download.id" />
</section>
</template>

<script>
import RegDownload from "./DashRegDownload.vue";
import { useUrlGet } from '../stores/urlGet';
import EventBus from '../util/event-bus';
export default {
    setup() {
        const useUrl = useUrlGet()
        return { useUrl }
    },
    data() {
        return {
            downloads: [],
            urlRegister: this.useUrl.urlGet + "/downloads", 
            showModal: false, // Controls whether the modal is visible
            existingWord: false,
            searchTerm: ""
        }
    },
    emits: ["updateRegDownload"],
    components: { RegDownload },
    computed: {
    sortedDownloads() {
        return this.downloads.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    },
    methods: {
        async getDownloads() {
            const response = await fetch(this.urlRegister, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.downloads = data;
        },
        openModal() {
            this.showModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
        },
        handleSubmitForm() {
            // Handle form submission (e.g., save the updated word data)
            this.closeModal(); // Close the modal after submission
        },
        refreshWords() {
            // Fetch the updated list of words from the database
            this.getDownloads();
        },
        async filterDownloads() {
            this.title = "";
            if(this.searchTerm != "") {
                const response = await fetch(this.urlRegister + "/search/" + this.searchTerm, { method: "GET" });
                let data = await response.json(); // save the data in sent through the response.
                if(data.length===0) {
                    this.title = "sökterm gav inga resultat.";
                }
            
        
            this.downloads = data;
            if (this.downloads.length > 0) {
                this.title = this.downloads.length + " sökresultat.";
            } else {
                this.title = "Sökterm gav inga resultat.";
                this.getDownloads();
            }
            
            } else {
                this.getDownloads();
                this.title = "Visar alla ord i databasen.";
                
            }
            
        },

    },
    mounted() {
        this.getDownloads();
        EventBus.on('change-to-database', this.refreshWords);
    },

    beforeUnmount() {
        EventBus.off('change-to-database', this.refreshWords);
    }

}
</script>


<style scoped>
section#downloads {
    background-color: #eee;
    width: 400px;
    margin: 1rem auto;
    padding: 1rem;
}

section#downloads div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

div.header {
    justify-content: flex-start!important;
}

div.header div.column {
    width: 80px;
    padding: 4px 6px;
}

div.header div.column span {
    font-weight: bold;
    font-size: 0.9em;
}

div.header img {
    width: 25px;
    height: auto;
    margin-top: 3px;
    margin-right: 8px;
} 
</style>