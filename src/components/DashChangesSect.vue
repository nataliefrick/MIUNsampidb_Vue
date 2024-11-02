<template>
<section id="changes">
    <h2>Section: Suggest Changes</h2>
    <p>this section shows all the entries for suggested changes to the database words. </p>
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
        <div class="column"><span>Ord</span></div>
        <div class="column"><span>Meddelande</span></div>
    </div>
    <Change v-for="change in changes" :change="change" :key="change.id" />
</section>
</template>

<script>
import Change from "./DashChange.vue";
import { useUrlGet } from '../stores/urlGet';
import EventBus from '../util/event-bus';
export default {
    setup() {
        const useUrl = useUrlGet()
        return { useUrl }
    },
    data() {
        return {
            changes: [],
            urlChanges: this.useUrl.urlGet + "/changes", 
            showModal: false, // Controls whether the modal is visible
            searchTerm: ""
            // existingWord: false,
        }
    },
    emits: ["updateChange"],
    components: { Change },
    computed: {
    sortedChanges() {
        return this.changes.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    },
    methods: {
        async getChanges() {
            const response = await fetch(this.urlChanges, { method: "GET" });
            this.changes = await response.json(); // save the data in sent through the response.
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
        refreshData() {
            // Fetch the updated list of words from the database
            this.getChanges();
        },
        async filterChanges() {
            this.title = "";
            if(this.searchTerm != "") {
                const response = await fetch(this.urlChanges + "/search/" + this.searchTerm, { method: "GET" });
                let data = await response.json(); // save the data in sent through the response.
                if(data.length===0) {
                    this.title = "sökterm gav inga resultat.";
                }
            
        
            this.changes = data;
            if (this.changes.length > 0) {
                this.title = this.changes.length + " sökresultat.";
            } else {
                this.title = "Sökterm gav inga resultat.";
                this.getChanges();
            }
            
            } else {
                this.getChanges();
                this.title = "Visar alla ord i databasen.";
                
            }
            
        },

    },
    mounted() {
        this.getChanges();
        EventBus.on('change-to-database', this.refreshData);
    },

    beforeUnmount() {
        EventBus.off('change-to-database', this.refreshData);
    }

}
</script>


<style scoped>
section#changes {
    background-color: #eee;
    width: 400px;
    margin: 1rem auto;
    padding: 1rem;
}

section#changes div {
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