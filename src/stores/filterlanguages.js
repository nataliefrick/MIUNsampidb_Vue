import { defineStore } from 'pinia'

 
export const useFilterLanguagesStore = defineStore('newfilter', {
    state: () => ({
        filter : [true, true],
        
    }),
    actions: {
        setTerm(newfilter) {
            this.filter = newfilter;  // Directly modify the string value
        }
        
    }
})


