<script setup>
import WordsSection from '../components/DashWordsSection.vue';
import RegDownloadsSection from '../components/DashRegDownloadsSect.vue';
</script>

<template>
    <main class="content">
        <p style="text-align: center; margin: 3rem 0; font-weight: bold; color: green; font-size: 2rem;" >Welcome to the Dashboard</p>
        <RegDownloadsSection />
        <WordsSection />
    </main>
</template>