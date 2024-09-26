import { defineStore } from 'pinia'
 
export const useUrlGet = defineStore('urlGet', {
    state: () => ({
        urlGet: "https://miun-sampi-database-96bc66384ce1.herokuapp.com/api/words",
        urlGet_no: "http://localhost:8000/api/words"
    })
})
