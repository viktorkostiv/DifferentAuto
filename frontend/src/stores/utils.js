import {
    defineStore
} from "pinia";

export const useUtilsStore = defineStore('utils', {
    state: () => ({
        // domain: 'http://127.0.0.1:3000',
        domain: window.location.origin,

        phoneNumber: '+351967174525',
        email: 'differentauto19@gmail.com',
        address: 'N125, 8125-013 Baceladas, Portugal',
        addressLink: 'https://www.google.com/maps/place/Different+Auto/@37.1315053,-8.1037752,21z/data=!4m14!1m7!3m6!1s0xd1ab7176ff0ca53:0x8fdaa84ef0a57935!2sDifferent+Auto!8m2!3d37.108535!4d-8.0857564!16s%2Fg%2F11l1n320h4!3m5!1s0xd1ab7176ff0ca53:0x8fdaa84ef0a57935!8m2!3d37.108535!4d-8.0857564!16s%2Fg%2F11l1n320h4?authuser=0&entry=ttu',
        facebook: 'https://www.facebook.com/people/Different-Auto/100089858004583/',
        instagram: 'https://instagram.com/differentauto_algarve?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D',

    }),
    actions: {

    }
});