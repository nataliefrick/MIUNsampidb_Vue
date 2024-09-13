<!-- <script setup>
</script> -->

<template>
<main class="content">
    <div class="breadcrumbs">
      <div class="container">
          <p>Start > Sydsamiska Ordbok</p>
      </div>
    </div>
    <section id="hero-search">
      <h2 class="dont-show">Database Search Panel</h2>
      <div class="hero-background">

          <div class="bkg-container pickgradient">
              <img src="../assets/img/kirunalapland.se-Markanbaiki-Beatrice-Holmberg.webp" alt="Copyright Kirunalapland.se, Beatrice Holmberg">
          </div>
          <div class="colors-container">
              <picture>
                  <source media="(max-width: 1140px)" srcset="../assets/img/sampi_clrs_mobile.png" >
                  <source media="(max-width: 576px)" srcset="../assets/img/sampi_clrs_600.png" >
                  <img src="../assets/img/sampi_clrs.png" alt="The colours of the Sami flag">
              </picture>
          </div>
      </div>
      <div class="hero-search-row">
          <section class="hero-search-container">
              <h2 class="lato-bold">Forskarnas sydsamiska ordbok</h2>
              <div class="search">
                  <div class="row-buttons">
                      <button class="miun">Svenska</button>
                      <i class="fa-solid fa-arrow-right-arrow-left button"></i>
                      <button class="miun">Sydsamiska</button>
                  </div>
                  <form>
                      <div class="row-searchform">
                          <input type="text" placeholder="Söka..."><i class="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div class="row-searchform-filter">
                          <input type="radio" id="exact" name="filter_options" value="exact">
                          <label for="exact">Exakt</label>
                          <input type="radio" id="contains" name="filter_options" value="contains">
                          <label for="contains">Innehåller</label>
                      </div>
                  </form>
                  <div class="row-popularsearch"></div>
              </div>
          </section>
      </div>
    </section>

    <section>
      <div v-for="(word, index) in listWords" :key="index">
        <ul>
          <li><span style="color:orange">word_sydsamiska: </span>{{word.word_sydsamiska}}</li> 
          <li><span style="color:orange">definition_sydsamiska :</span>{{word.definition_sydsamiska}}</li> 
          <li><span style="color:orange">word_svenska: </span>{{word.word_svenska}}</li> 
          <li><span style="color:orange">definition_svenska: </span>{{word.definition_svenska}}</li> 
          <li><span style="color:orange">synonyms: </span>{{word.synonyms}}</li> 
          <li><span style="color:orange">antonyms: </span>{{word.antonyms}}</li> 
          <li><span style="color:orange">example_of_use, sydsamiska: </span>{{word.example_of_use}}</li> 
          <li><span style="color:orange">link_to_update (will open in a different app): </span>{{word.link_to_update}}</li> 
        </ul>
      </div>
    </section>
</main>
  
</template>
<script>
export default {
  data() {
      return {
          listWords: [],
          errorMessage : null,
          urlGet: "https://miun-sampi-database-96bc66384ce1.herokuapp.com/api/words"
      }
  },

methods: {
  async getWords() {
    console.log("getWords");
    const response = await fetch("https://miun-sampi-database-96bc66384ce1.herokuapp.com/api/words", {
        method: "GET",
        // headers: {
        //     "Accept" :  "application/json",
        //     "Content-type" : "application/json",
        //     "Authorization" : "Bearer " + localStorage.getItem('token')
        // }
    });

    const data = await response.json(); // save the data in sent through the response.

    this.listWords = data;
    console.log(this.listWords);
  }
},
mounted() {
  this.getWords();
}
}
</script>