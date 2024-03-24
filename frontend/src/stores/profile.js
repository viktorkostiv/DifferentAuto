import {
    defineStore
} from "pinia";
import {
    useUtilsStore
} from './utils';
import axios from 'axios';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        newData: null,
    }),
    actions: {
        async getUser() {
            try {
                let domain = useUtilsStore().domain;
                const userUid = await JSON.parse(localStorage.getItem("user"));
                if (!userUid) {
                    return
                }
                const headers = {
                    'uid': userUid
                }
                const response = await axios.get(`${domain}/auth/get-user`, {
                    headers
                });
                return response.data.user;
            } catch (error) {
                console.error(error.code);
            }
        },
    },
});