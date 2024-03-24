<script>
import { useCarsStore } from '../../../stores/cars';
import CarCard from '../../UI/CarCard.vue'
import Paginator from 'primevue/paginator';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import BaseLoader from '../../UI/BaseLoader.vue';

export default {
    setup() {
        const carsStore = useCarsStore();

        return {
            carsStore,
        };
    },
    components: { CarCard, Paginator, Slider, InputText, BaseLoader },
    data() {
        return {
            data: [],
            itemsPerPage: 16,
            activePage: 0
        }
    },
    methods: {
        async getAll() {
            const list = await this.carsStore.getActive();

            for (let i = 0; i < list.length; i += this.itemsPerPage) {
                this.data.push(list.slice(i, i + this.itemsPerPage));
            }
        },

        getPage(event) {
            this.scrollToTop()
            this.activePage = event.page;
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    async mounted() {
        await this.getAll();
    }
}
</script>

<template>
    <section v-if="data.length > 0" class="max-w-[1220px] w-full mx-auto px-4 mt-20 mb-20">
        <div class="w-fit mb-12">
            <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">Nossos carros</h2>
            <div class="w-1/3 h-1 bg-brand-orange"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 gap-4 md:gap-y-6 mb-6">
            <CarCard v-for="car, id in data[activePage]" :data="car" :key="id"></CarCard>
        </div>

        <Paginator v-if="data.length > 1" @page="getPage" :rows="1" :totalRecords="data.length" template="PrevPageLink PageLinks NextPageLink">
        </Paginator>
    </section>
    <BaseLoader v-else></BaseLoader>
</template>