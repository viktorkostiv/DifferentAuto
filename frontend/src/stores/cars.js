import {
    defineStore
} from "pinia";
import {
    useUtilsStore
} from './utils';

import axios from 'axios';

export const useCarsStore = defineStore('cars', {
    state: () => ({

    }),
    actions: {
        async getAll() {
            try {
                let domain = useUtilsStore().domain;
                const response = await axios.get(`${domain}/api/cars`);

                return response.data;
            } catch (error) {
                console.error(error.code);
            }
        },

        async getById(id) {
            try {
                let domain = useUtilsStore().domain;
                const response = await axios.get(`${domain}/api/cars/${id}`);

                return response.data;
            } catch (error) {
                console.error(error.code);
            }
        },
    },
});