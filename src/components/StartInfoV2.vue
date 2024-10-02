<template>
    <div id="database-app-info">
        <section class="first-paragraph">
            <h2 class="lato-bold dont-show">Databas för sydsamiska känsloord och kulturella uttryck för lidande</h2>
            <p><span class="drop-cap">H</span>ej och välkommen till  <em>Databas för sydsamiska känsloord och kulturella uttryck för lidande.</em> Detta projekt... ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
        </section>

        <section class="info">
            <img src="../assets/img/sampi_clrs_mobile.png" alt="">
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Bakgrund</h3>
                </div>
                <p>Sxed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
            </div>
        </section>

        <section class="info">
            <div class="info-text">
                <div class="title-w-icon">
                    <img src="../assets/img/divider-5.png" alt="">
                    <h3 class="lato-bold">Hur du får använda</h3>
                </div>
                <p>Sxed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
            </div>
            <img src="../assets/img/sampi_clrs_mobile.png" alt="">
        </section>
        
        <section class="info">
            <img src="../assets/img/sampi_clrs_mobile.png" alt="">
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
    gap: 3rem;
    flex-wrap: nowrap;
    margin: 5rem 0;
}

section.info img {
    width: 300px;
    height: auto;
}

div.info-text {
    width: auto;
}

div.title-w-icon {
    display: flex;
    align-items: center;
    gap: 10px;
}

div.title-w-icon img {
    width: auto;
    height: 20px;
}



h2.small {
    font-size: x-large;
}

</style>
