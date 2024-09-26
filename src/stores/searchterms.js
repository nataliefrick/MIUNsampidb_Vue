import { defineStore } from 'pinia'

 
export const useSearchTermStore = defineStore('newsearchterm', {
    state: () => ({
        searchTerm : '',
        
    }),
    actions: {
        setTerm(newsearchterm) {
            this.searchTerm = newsearchterm;  // Directly modify the string value
        }
        
    }
})


