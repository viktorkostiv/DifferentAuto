import {
    defineStore
} from "pinia";

export const useUtilsStore = defineStore('utils', {
    state: () => ({
        domain: 'http://127.0.0.1:3000',
        // domain: window.location.origin,
    }),
    actions: {

    }
});