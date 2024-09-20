<template>
    <section id="hero-search">
      <h2 class="dont-show">South Sámi Emotion Words and Cultural Idioms of Distress Database (SSEID)</h2>
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
              <h2 class="lato-bold">Databas för sydsamiska känsloord och kulturella uttryck för lidande</h2>
              <h3 class="lato-regular-italic">South Sámi Emotion Words and Cultural Idioms of Distress Database (SSEID)</h3>
              <div class="search">
                  <div class="row-buttons">
                      <button class="miun">Svenska</button>
                      <button class="miun">Norska</button>
                      <!-- <i class="fa-solid fa-arrow-right-arrow-left button"></i> -->
                      <button class="miun">Sydsamiska</button>
                  </div>
                  <form>
                      <div class="row-searchform">
                          <input type="text" placeholder="Söka..."><i class="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div class="row-searchform-filter">
                          <input type="radio" id="exact" name="filter_options" value="exact">
                          <label for="exact">Påbörjar med</label>
                          <input type="radio" id="contains" name="filter_options" value="contains">
                          <label for="contains">Innehåller</label>
                      </div>
                  </form>
                  <div class="row-popularsearch"></div>
              </div>
          </section>
      </div>
    </section>

    <!-- <section>
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
    </section> -->

  
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

<style scoped>
/* Database search panel ---------- */
/* Database search panel: background ---------- */
div.hero-background {
    display: flex;
    /* position: relative;
    z-index: 0; */
}

div.bkg-container img { /* photo */
    width: 100%;
    object-position: left bottom;
    z-index: 0;
}


@media (min-width: 1641px) { 
    div.bkg-container img { /* photo */
        height: 600px;
        object-fit: contain;
    }
}

@media (min-width: 1141px) and (max-width: 1640px) { 
    div.bkg-container img { /* photo */
        height: 400px;
        object-fit: contain;
    }
}

@media (max-width: 1140px) { 
    div.hero-background { flex-direction: column;  }
    div.bkg-container img { /* photo */
        height: 350px;
        object-fit: cover;
    }
}

@media (max-width: 576px) {
    div.bkg-container img { /* photo */
        height: 250px;
    }

}

/* White gradient over background photo to get rid of line */
.pickgradient{
    position: relative;
    display: inline-block;
}

.pickgradient:after {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    display: inline-block;
}
  
div.colors-container {
    width: 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
}


@media (min-width: 1600px) { div.colors-container picture { transform: scale(1.2);}}
@media (min-width: 1700px) { div.colors-container picture { transform: scale(1.3);}}
@media (min-width: 1800px) { div.colors-container picture { transform: scale(1.5);}}
@media (min-width: 2000px) { div.colors-container picture { transform: scale(1.7);}}
@media (min-width: 2200px) { div.colors-container picture { transform: scale(2.8);}}

@media (min-width: 1641px) { 
    div.colors-container { 
        height: 600px; 
        margin-top: 0px; 
        opacity: 100%;
    }
    .pickgradient:after {
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 90%, #fff 100%);
    }
}

@media (min-width: 1141px) and (max-width: 1640px) { 
    div.colors-container { 
        height: 400px; 
        margin-top: 0px; 
        opacity: 100%;
    }
    .pickgradient:after {
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 90%, #fff 100%);
    }
}

@media (max-width: 1140px) { 
    div.colors-container { margin-top: 350px; opacity: 100%; overflow-x: hidden;}

    div.colors-container picture { /* flag */
        position: relative;
        height: 400px; width: 100%;
        margin-left: 10%;
        transform: scale(1.3);
    }

    .pickgradient:after { background: transparent; }
}

@media (max-width: 900px) { 
    div.colors-container picture { /* flag */
        height: 400px; width: 100%;
        transform: scale(1);
        position: relative;
    }
}

@media (max-width: 576px) {
    div.colors-container { margin-top: 250px;}
    div.colors-container picture { /* flag */
        height: 400px; width: auto;
        margin: 0;
        overflow: visible;
    }
    div.colors-container picture img { /* flag */
        height: 100%;
        /* margin-left: -10px; */
        transform: scale(1);
    }
}

@media (max-width: 448px) {
    div.colors-container picture { /* flag */
        height: 320px; 
    }

    div.colors-container picture img { /* flag */
        height: 100%; 
        margin-left: 10%;
        transform: scale(1.1);
    }
}

@media (max-width: 350px) {
    div.colors-container picture { /* flag */
        height: 400px; 
    }

    div.colors-container picture img { /* flag */
        height: 100%; 
        margin-left: 26%;
        transform: scale(1);
    }
}


/* Database search panel: white search box ---------- */
div.hero-search-row {
    position:relative;
    width: 100%;
    max-width: 1140px;
    z-index: 99;
    display: flex;
}

@media (min-width: 1141px) { 
    div.hero-search-row {
        justify-content: flex-end;
        align-items: flex-end;
        height: 600px;
        margin-top: -600px; 
        margin-left: auto;
        margin-right: auto;
    }
    section.hero-search-container {
        margin-right: 5%;
        margin-bottom: 3%;
    }
}

@media (max-width: 1140px) { 
    div.hero-search-row {
        height: 400px;
        justify-content: center;
        align-items: center;
        margin-top: 0; 
    }

    section.hero-search-container {
        margin: 0;
        text-align: center;
    }

    section.hero-search-container h2 {
        margin-top: -40px;
    }

}

@media (max-width: 576px) {
    div.hero-search-row {
        width: 90%;
        height: auto;
        margin: 0 auto;
    }

    section.hero-search-container {
        margin: 0;
        text-align: center;
    }

    section.hero-search-container h2 {
        margin-top: 0;
    }

}

section.hero-search-container div.search {
    background-color: #fff;
    width: auto;
    height: auto;
    padding: 2rem;
} 

@media (max-width: 448px) {
    section.hero-search-container div.search {
        padding: 1.5rem;
    } 

}

section.hero-search-container h2,
section.hero-search-container h3 {
    color: #fff;
} 

section.hero-search-container h2 {
    font-size: 1.2rem;
} 

section.hero-search-container h3 {
    font-size: 1rem;
    margin-top: -0.5rem;
} 

@media (max-width: 576px) {
    section.hero-search-container h2 {
        margin-top: 2rem;
        font-size: 1.4rem;
    } 
}


.row-searchform {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0;
    align-items: center;
}

.row-searchform input[type='text'] {
    height: 32px;
    border: 1px solid #134da250;
    font-size: 16px;
    padding-left: 1rem;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 80%;
}

.row-searchform input[type='text']:focus {
    outline: 1px solid #134da250;     /* oranges! yey */
  }

.row-searchform i {
    padding: 12px;
    height: 100%;
    background-color: #134da2;
    border: 1px solid transparent;
    color: #fff;
    font-size: 18px;
    margin: none;
    margin-right: 0;
}

.row-searchform i:hover {
    color: #134da2;
    background-color: #c1daf3;
}

.row-searchform-filter {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1%;
    align-items: center;
}

.row-searchform-filter label {
    margin-right: 1rem;
    font-family: Lato;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    color: #404040;
}
/* 
.row-searchform-filter input[type='radio']:after,
.row-searchform-filter input[type='radio']:checked:after,
.row-searchform-filter input[type='radio']:focus {
    background-color: #134da2;
}

.row-searchform-filter input[type='radio']:after,
.row-searchform-filter input[type='radio']:checked:after,
.row-searchform-filter input[type='radio']:hover {
    background-color: #b0130c;
} */
</style>
