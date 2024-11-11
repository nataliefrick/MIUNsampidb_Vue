<template>
<section id="changes">
    <h3 class="lato-bold">Externa Förslag på Ändringar i Data</h3>
    <p>Den här sektionen visar de senaste 3 externa föreslagna ändringarna av orden i databasen.</p>
    <div id="filter">
        <form @submit.prevent="filterWords()">
            <div class="flex-row">
                <div class="searchform">
                    <input type="text" placeholder="Ange sökterm" v-model="searchTerm">
                    <button @click="filterWords" class="white-text no-style"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button class="see-all">Se alla</button>
            </div>
        </form>
    </div>
    <div class="header">
        <div class="col-1"><span>Datum</span></div>
        <div class="col-2"><span>Ord</span></div>
        <div class="col-3"><span>Meddelande</span></div>
    </div>
    <hr>
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
hr {
    border: none;
    border-top: 1px solid #134da250;
}

section#changes {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1451px) { section#changes { max-width: 600px; margin: 2%; }}
@media (max-width: 1450px) { section#changes { width: 80%; margin: 2% auto; }}

div.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.searchform {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.searchform input[type='text'] {
        height: 32px;
        border: 1px solid #134da250;
        font-size: 16px;
        padding-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
        width: 80%;
    }

.searchform input[type='text']:focus {
    outline: 1px solid #134da250;     /* oranges! yey */
}

.searchform i {
    padding: 12px;
    height: 100%;
    background-color: #134da2;
    border: 1px solid transparent;
    color: #fff;
    font-size: 18px;
    margin: none;
    margin-right: 0;
}

.searchform i:hover {
    color: #134da2;
    background-color: #c1daf3;
}

button.see-all {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    padding: calc(10px + 0.25rem) calc(10px + 0.5rem);
    border-radius: 10px;
}

div.header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start!important;
    margin-top: 2rem;
}

div.header div.col-1,
div.header div.col-2 {
    min-width: 60px;
    width: 15%;
    padding: 4px 6px;
}

div.header div.col-3 {
    min-width: 80px;
    width: 50%;
    padding: 4px 6px;
}

div.header div.column span {
    font-weight: bold;
    font-size: 0.9em;
}
</style>