import { defineStore } from 'pinia'

export const useUserStore = defineStore('newuser', {
    state: () => ({
        user : {
            userId: null,
            username: null, 
            email: null, 
            token: null
        },
        
    }),
    // newuser = { message, token, user: { id, name, email }} 
    actions: {
        setUser(newuser) {
            this.user.userId = newuser.user.id;  
            this.user.username = newuser.user.name;  
            this.user.email = newuser.user.email;  
            this.user.token = newuser.token; 

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(this.user.username));
            localStorage.setItem('token', JSON.stringify(this.user.token));
            localStorage.setItem('userId', JSON.stringify(this.user.Id));
            localStorage.setItem('userEmail', JSON.stringify(this.user.email));
            console.log("user is now logged in");
        },

        logout() {
          console.log("logging out user");
          this.user = {
            userId: null,
            username: null,
            email: null,
            token: null
          };

          // Clear user data from local storage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userEmail');
        }
      }
    });