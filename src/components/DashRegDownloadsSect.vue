<template>
<section id="downloads">
    <h3 class="lato-bold">Registrerade nedladdningar</h3>
    <p> Den här sektionen visar de senaste 3 registrerade nedladdningarna av data från databasen.</p>
    <div class="filter">
        <form @submit.prevent="filterDownloads()">
            <div class="flex-row">
                <div class="searchform">
                    <input type="text" placeholder="Ange sökterm" v-model="searchTerm">
                    <button @click="filterWords" class="white-text no-style"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button @click=getDownloads() class="see-all">Se alla</button>
            </div>
        </form>
        <span v-if="this.title">{{ this.title }}</span>
    </div>
    <div class="header">
        <div class="column"><span>Datum</span></div>
        <div class="column sm-screen-hide"><span>Institution</span></div>
        <div class="column sm-screen-hide"><span>Namn</span></div>
        <div class="column"><span>Projekttitel</span></div>
    </div>
    <hr>
    <RegDownload v-for="download in sortedDownloads" :download="download" :key="download.id" />
</section>
</template>

<style scoped>
@media (max-width: 500px) {
    .sm-screen-hide {
        display: none;
    }
}

hr {
    border: none;
    border-top: 1px solid #134da250;
}
section#downloads {
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

@media (min-width: 1451px) { section#downloads { max-width: 600px; margin: 2%; }}
@media (max-width: 1450px) { section#downloads { width: 80%; margin: 2% auto; }}

div.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

@media (max-width: 500px) {
    div.flex-row {
        gap: 1rem;
    }
}

section#downloads div.filter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

div.filter span {
    font-size: 0.8em;
    color: #087f47;
    text-align: center;
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
    margin: 0;
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

div.header div.column {
    min-width: 80px;
    width: 20%;
    padding: 4px 6px;
}

div.header div.column span {
    font-weight: bold;
    font-size: 0.9em;
}

</style>

<script>
import RegDownload from "./DashRegDownload.vue";
import { useUrlGet } from '../stores/urlGet';
import { authFetch } from '../util/authFetch';
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
            searchTerm: "",
            title: ""
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
            this.title = "";
            this.searchTerm = "";
            const response = await authFetch(this.urlRegister, { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.downloads = data;
            this.title = "Visar alla registrerade nedladdningar i databasen.";
        },

        async getlast3() {
            const response = await authFetch(this.urlRegister + "/latest", { method: "GET" });
            const data = await response.json(); // save the data in sent through the response.
            this.downloads = data;
            this.title = "";
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
            this.getlast3();
        },
        async filterDownloads() {
            if(this.searchTerm != "") {
                const response = await authFetch(this.urlRegister + "/filter/" + this.searchTerm, { method: "GET" });
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
            
            } 
            
        },

    },
    mounted() {
        this.getlast3();
        EventBus.on('change-to-database', this.refreshData);
    },

    beforeUnmount() {
        EventBus.off('change-to-database', this.refreshData);
    }

}
</script>