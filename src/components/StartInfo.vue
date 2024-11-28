<template>
    <div id="database-app-info">
        <section class="first-paragraph">
            <h2 class="lato-bold dont-show">Databas för sydsamiska känsloord och kulturella uttryck för lidande</h2>
            <p><span class="drop-cap">H</span>ej och välkommen till  <em>Databas för sydsamiska känsloord och kulturella uttryck för lidande.</em> Den här databasen är till för dig som vill utforska sydsamiska ord och uttryck kopplade till känslor och psykisk hälsa. Vårt mål är att göra dessa ord tillgängliga för alla som vill lära sig mer om det sydsamiska språket och dess rika kulturella uttryck. <br><br>
            Använd sökfunktionen för att hitta känsloord eller uttryck på sydsamiska, svenska eller norska samt deras översättningar. Om du saknar ett ord i databasen är du varmt välkommen att bidra – klicka här för att föreslå nya ord! </p>
        </section>

        <section class="info">
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Bakgrund</h3>
                </div>
                <p>Den här databasen har sin grund i psykologisk forskning som utforskar kopplingarna mellan flerspråkighet, emotion och psykisk hälsa. Projektet för databasen, ”Feeling in your own words”, finansierades av Forskningsfonden Saepmie vid Gaskeuniversiteete (Mittuniversitetet) och bedrevs under ledning av Marie-France Champoux-Larsson och Anna Leiler som en del av <a href="http://miun.se/albi" target="_blank" rel="noopener noreferrer">ALBi-labbets</a> arbete. </p>
            </div>
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Hur du får använda</h3>
                </div>
                <p>Databasen är tillgänglig för användning under följande licens: <br><br>
                South Sámi Emotion Words and Cultural Idioms of Distress Database (SSEID) © 2025 av Marie-France Champoux-Larsson & Anna Leiler är licensierad under CC BY-NC-ND 4.0. <br><br>
                Det innebär att du är välkommen att använda innehållet för icke-kommersiella ändamål, så länge du anger källan och inte gör några bearbetningar av materialet. </p>
            </div>
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Till dig som är forskare</h3>
                </div>
                <p>Om du som forskare vill få tillgång till hela databasen, är du välkommen att skicka en förfrågan här. Vid användning av databasen i publikationer eller presentationer, vänligen referera till följande: [referens].</p>
            </div>
        </section>
    </div>
    
</template>

<style scoped>

div#database-app-info {
    /* width: 60%; */
    padding: 2%;
    margin: 0 auto;

    /* display: flex;
    justify-content:  center; */
}

@media (min-width: 901px) { 
    div#database-app-info {
        max-width: 960px;
        margin: 0 auto;
    }
}

@media (max-width: 900px) { 
    div#database-app-info {
        max-width: 90%;
        margin: 10% auto;
    }
}

section.first-paragraph {
    width: 60%;
    margin: 0 auto;
    font-size: large;
}

span.drop-cap {
    color: #134da2;
    font-size:x-large;
    margin-left: -2px;

}

section.info {
    display: flex;
    
    gap: 1rem;
    flex-wrap: nowrap;
    
}

@media (min-width: 501px) { 
    section.info {
            max-width: 100%;
            margin: 5rem 0;
            flex-direction: row;
        }
    }

    @media (max-width: 500px) { 
        section.info {
            max-width: 90%;
            margin: 10% auto;
            flex-direction: column;
        }
    }

div.info-text {
    width: auto;
    max-width: 300px;
    background-color: #eeeeee80;
    padding: 1rem;
}

div.title-w-icon {
    display: flex;
    align-items: center;
    gap: 10px;
}

div.title-w-icon img {
    width: 14px;
    height: auto;
}



</style>
