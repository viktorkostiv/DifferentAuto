<script>
import { useCarsStore } from '../../../stores/cars';

import HeadBanner from '../HomePage/HeadBanner.vue';
import CompanyMerits from '../HomePage/CompanyMerits.vue';
import CarsSection from '../HomePage/CarsSection.vue';
import ContactUs from '../HomePage/ContactUs.vue';
import BaseLoader from '../../UI/BaseLoader.vue';

export default {
    setup() {
        const carsStore = useCarsStore();

        return {
            carsStore,
        };
    },
    components: {
        HeadBanner,
        CompanyMerits,
        CarsSection,
        ContactUs,
        BaseLoader
    },
    data() {
        return {
            data: null,
            banner: null
        }
    },
    methods: {
        async getBanner(){
            const list = await this.carsStore.getBanner();

            if(list.length == 0){
                const cars = await this.carsStore.getActive();
                this.banner = cars.sort((a, b) => b.price - a.price)
            } else this.banner = list 
        },
        async getAll() {
            this.data = await this.carsStore.getActive();
        },
    },
    async mounted() {
        await this.getBanner();
        await this.getAll();
    }
}
</script>

<template>
    <div v-if="data && banner">
        <HeadBanner :data="banner.slice(0, 5)"/>
        <CompanyMerits />
        <CarsSection :data="data.slice(0, 8)"/>
        <ContactUs />
    </div>
    <BaseLoader v-else></BaseLoader>
</template>