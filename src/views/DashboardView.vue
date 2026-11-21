<script setup>
import WordsSection from '../components/DashWordsSection.vue';
import ChangesSection from '../components/DashChangesSect.vue';
import RegDownloadsSection from '../components/DashRegDownloadsSect.vue';
import UsersSection from '../components/DashUsersSection.vue';
</script>

<template>
    <main class="content">
        <h2 class="lato-bold title">SSEID Dashboard</h2>
        <div class="sections">
            <!-- Left column: downloads on top, suggested changes below -->
            <div class="dash-column">
                <RegDownloadsSection />
                <ChangesSection />
            </div>
            <!-- Right column: words, admin users below -->
            <div class="dash-column">
                <WordsSection />
                <UsersSection />
            </div>
        </div>
    </main>
</template>

<style>
h2.title {
    text-align: center; 
    margin: 3rem 0;  
    color: #134da2; 
    font-size: 2rem;
}

div.sections {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-between;
    margin: 0 auto 3rem auto;
    align-items: flex-start;
}

div.dash-column {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 0;
}

/* Narrow screens: one column, sections stacked (downloads, changes, words) */
@media (max-width: 1450px) {
    div.sections { flex-direction: column; }
    div.dash-column { width: 100%; flex: none; }
}

@media (min-width: 1841px) { div.sections { width: 75%; }}
@media (max-width: 1840px) { div.sections { width: 80%; }}
@media (max-width: 1720px) { div.sections { width: 85%; }}
@media (max-width: 1620px) { div.sections { width: 90%; }}
@media (max-width: 1530px) { div.sections { width: 95%; }}
@media (max-width: 1450px) { div.sections { width: 100%; }}

.content {
  background-image: url("../assets/img/hoofprints.png");
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: 60%;
  background-blend-mode: lighten;
  width: 100%;
  /* height: 100vh; Set the height of the container */
}



</style>