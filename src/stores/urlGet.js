import { defineStore } from 'pinia'
 
export const useUrlGet = defineStore('urlGet', {
    state: () => ({
        urlGet: "https://miun-samiskaorddb.onrender.com/api",
        // urlGet: "http://localhost:8000/api"
    })
})
