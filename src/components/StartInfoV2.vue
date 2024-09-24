<template>
    <div id="database-app-info">
        <section class="first-paragraph">
            <h2 class="lato-bold dont-show">Databas för sydsamiska känsloord och kulturella uttryck för lidande</h2>
            <p><span class="drop-cap">H</span>ej och välkommen till  <em>Databas för sydsamiska känsloord och kulturella uttryck för lidande.</em> Detta projekt... ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
        </section>

        <section class="info">
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Bakgrund</h3>
                </div>
                <p>Sxed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
            </div>
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Hur du får använda</h3>
                </div>
                <p>Sxed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
            </div>
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Kontakta oss!</h3>
                </div>
                <p>Sxed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
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
