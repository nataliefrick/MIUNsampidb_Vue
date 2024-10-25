<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="scrolling-content">
            <div class="sampi-db-logo module">
                <img src="../assets/img/Gaskeuniversiteete_logotyp_CMYK.png" alt="Mittuniversitet logotypen - sydsamiska version">
            </div>

            <div v-if="user" class="utloggade">
              <p class="lato-regular utloggade">Vill du logga ut?</p>
              <form @submit.prevent="logoutUser()">
                <button class="submit" type="submit" name="action">Logga ut</button>
              </form>
            </div>
            <div v-else>
              <h2 class="lato-bold">Logga in</h2>
              <form @submit.prevent="loginUser()">
                <div class="form">
                  <div class="flex-row">
                      <label for="email">Epost</label>
                      <input id="email" v-model="email" type="email">
                  </div>
          
                  <div class="flex-row">
                      <label for="password">Lösenord</label>
                      <div class="password">
                        <input id="password" v-model="password" type="current-password"><i id="eye" class="fa-regular fa-eye" @click=togglePassword()></i>
                        
                      </div>
                  </div>
                </div>
          
                <button class="submit" type="submit" name="action">Logga in</button>
          
              </form>
              <!-- ErrorMessage Printout -->
              <div v-if="savedMessage"><p>{{savedMessage}} </p></div>
              <div v-if="errorMessage"><p class="errorMessage">{{errorMessage}} </p></div>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { useUrlGet } from '../stores/urlGet';
import { useUserStore } from '../stores/user';
import { nextTick } from 'vue';  // Import nextTick for better timing of updates


  export default {
    setup() {
        // const storeSearchTerms = useSearchTermStore()
        const useUrl = useUrlGet();
        const useUser = useUserStore();
        return { useUrl, useUser }
    },
    props: ['show'],
    data() {
      return {
        urlGet: this.useUrl.urlGet + "/login", 
        errorMsg: false,
        message: '',
        email:"", /*used in form*/
        password:"", /*used in form*/
        savedMessage: null,
        errorMessage: null,
        userStore: useUserStore(),
        user: localStorage.getItem('user'), 
      };
    },
    emits: ["loginUser", "closeModal", "logoutUser"],
    
    mounted() {
    },
    methods: {
      async logoutUser() {
          // Access the Pinia store
          const userStore = useUserStore();
          userStore.logout();
          console.log(localStorage.getItem('user'));
          this.closeModal();
  
          // Use nextTick to ensure the store updates are processed before navigating
          await nextTick();
            try {
                await this.$router.push('/');  // Navigate to the start page
                window.location.reload();  // Refresh the page 
              } catch (err) {
                console.error("Navigation error:", err);  // Log any navigation errors
              }
      },
      async loginUser() {
          // check first for content
          if(this.email.length > 2 ) {
              let userBody = {
                  email: this.email, 
                  password: this.password
              };
              try {
                const response = await fetch(this.urlGet, { 
                  method: "POST",
                  headers: { 
                      "Accept" :  "application/json",
                      "Content-type" : "application/json" 
                  },
                  body: JSON.stringify(userBody)
                })
                const data = await response.json(); // save the data in sent through the response.
                this.savedMessage = data.message;

                if(response.status === 200) {
                  // Access the Pinia store
                  const userStore = useUserStore();
                  
                  // data = { message, token, user: { id, name, email }}  
                  userStore.setUser(data);

                  // Use nextTick to ensure the store updates are processed before navigating
                    await nextTick();
                    try {
                        await this.$router.push('/dashboard');  // Navigate to the results page
                        window.location.reload();  // Refresh the page
                        this.closeModal();
                        
                     } catch (err) {
                        console.error("Navigation error:", err);  // Log any navigation errors
                     }
                  

                    // this.$emit("setSearchTerm"); // reloads the parent page.
                    // Use Vue Router's push method to navigate without reloading


                    // window.location.href = "/dashboard";
                  }

                  if (response.status != 200) {
                      this.savedMessage = data.message;
                      // this.savedMessage = "Unauthorized. Please try again or register a new user.";
                      this.$emit("loginUser"); // reloads the parent page.
                      
                      // throw (response.status);
                  }

                  // window.localStorage.setItem('savedMessage', data.message);

                  // empty form
                  this.email = "";
                  this.password = "";
              } 
              catch (error) {
                  this.errorMessage = error;
                  console.log("caught Error: " + this.errorMessage);
                  this.$emit("loginUser"); // reloads the parent page.
              }               
          }
      },
      closeModal() {
        // Emit event to close the modal in the parent component
        this.errorMsg=false;
        this.$emit('closeModal');
      },
      togglePassword() {
            var passwordEl = document.getElementById("password");
            if (passwordEl.type === "current-password") {
                passwordEl.type = "text";
            } else {
                passwordEl.type = "current-password";
            }
            var eyeEl = document.getElementById("eye");
            eyeEl.classList.toggle("fa-eye");
            eyeEl.classList.toggle("fa-eye-slash");
        }
      

    },
  };
</script>
  
<style scoped>
  /* Basic styling for the modal */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    max-width: 680px;
    max-height: 880px;
    overflow-y: auto;
    background-color: white;
    padding: 20px 40px;
    border-radius: 5px;
    position: relative;
  }

  .scrolling-content {
    position: scrolling;
  }

  @media (max-width: 575px) {
    div.sampi-db-logo.module {
        margin: 0 auto;
    }

    div.sampi-db-logo.module img {
        width: 137px;
        height: auto;
    }
  }

  .close-thkyou,
  .close {
    cursor: pointer;
    padding: 4px 10px 6px 10px; 
    border-radius: 15px;
    border: 1px solid #134da2;
  }

  .close-thkyou {
    position: relative;
    margin: 30px auto 0 auto;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 20px;
  }

  span.close-thkyou:hover,
  span.close:hover {
    background-color: #134da2;
    color: #fff;
  } 

  div.modal h2 {
      margin-top: 1rem;
      margin-bottom: 0;
  }
 
  button.submit {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
  }

  div.flex-col {
    display: flex;
    flex-direction: column;
  }

  div.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 1.5em 0;
  }

  div.flex-row.no-m {
    margin: 0;
  }

  div.form {
    border: 1px solid #eee;
    padding: 0.2rem 1rem;
    margin: 1rem 0;
  }

  input {
    border: none;
    width: 100%;
    line-height: 1.5rem;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #134da220;
    outline: 1.5px solid #134da220;
  }

  input:focus,
  input[type='text']:focus {
        outline: 1px solid #134da2; 
    }

  div.password {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0;
    align-items: center;
  }

  div.password i {
        padding: 6px;
        background-color: #134da2;
        border: 1px solid transparent;
        color: #fff;
        font-size: 14px;
        margin-right: 0;
  }

  div.password i:hover {
      color: #134da2;
      background-color: #c1daf3;
  }

  div.thank-you-msg {
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 3rem auto;
    text-align: center;
  }

  .errorMessage,
  div.thank-you-msg span {
    color: #134da2;
  }

  .space-below {
    margin-bottom: 1rem;
  }

  .utloggade {
    margin: 20px!important;
  }
</style>