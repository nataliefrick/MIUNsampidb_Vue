<template>
    <footer>
        <div id="divider"></div> 
        <div id="footer">
            <h2 class="lato-bold">Databas för sydsamiska känsloord och kulturella uttryck för lidande</h2>
            <h3 class="lato-regular-italic">South Sámi Emotion Words and Cultural Idioms of Distress Database (SSEID)</h3>
            <div class="spacer"></div>

            <h3 class="lato-bold researchers">Forskarna</h3>
            <div class="researcher">
                <span><strong>Marie-France Champoux-Larsson,</strong> Docent | Associate Professor</span>
                <a class="email" href="mailto:marie-france.champoux-larsson@miun.se" aria-label="Email Anna"><i class="fa-regular fa-envelope"></i><span>marie-france.champoux-larsson@miun.se</span></a>
            </div>
            <div class="researcher">
                <span><strong>Anna Leiler,</strong> Leg psykolog</span>
                <a class="email" href="mailto:anna.leiler@miun.se" aria-label="Email Anna"><i class="fa-regular fa-envelope"></i><span>anna.leiler@miun.se</span></a>
            </div>
        </div>
    </footer>
    
    </template>
    
    <style scoped>
    div#divider {
        height: 30px;
        width: 100%;
        background-size: 1.5%;
        background-image: url("../assets/img/divider.png");
        background-repeat: repeat-x;
    }

     
    div#footer {
        padding: 2%;
        margin: 0 auto;
    }

    @media (min-width: 901px) { 
        div#footer {
            max-width: 960px;
            margin: 0 auto;
        }
    }

    @media (max-width: 900px) { 
        div#footer {
            max-width: 90%;
            margin: 0 auto;
        }
    }

    div#footer h2 {
    font-size: 1.2rem;
} 

div#footer h3 {
    /* font-size: 1rem; */
    margin-top: -0.5rem;
} 

h3.researchers {
    /* text-transform: uppercase; */
    padding-top: 40px;
}

div.researcher {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: flex-start;
    margin-bottom: 1rem;
    /* align-items: center; */
}

div.researcher span {
    margin-left: -2px;
}

div.researcher span:hover {
    text-decoration: none;
}

a.email {
    text-decoration: none;   
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

a.email span {
    font-size: 1rem;
}

a.email span:hover {
    text-decoration: underline;
    color: #404040;
}

a.email i {
    color: #404040;
    margin-top: 3px;
}


@media (max-width: 576px) {
    div#footer h2 {
        margin-top: 2rem;
        font-size: 1.4rem;
    } 
}


    </style>
    
    <script>
    // import { RouterLink } from 'vue-router'
    export default {
        name: "PageFooter",
        data() {
            return {
                errorMessage : null,
                // token: localStorage.getItem('token'),
                // receivedMessage: localStorage.getItem('receivedMessage'),
                // user: localStorage.getItem('user')
            }
        }


    }
        
</script>