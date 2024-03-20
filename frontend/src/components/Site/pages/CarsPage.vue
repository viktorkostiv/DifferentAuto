<script>
import CarCard from '../../UI/CarCard.vue'
import Paginator from 'primevue/paginator';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';

export default {
    components: { CarCard, Paginator, Slider, InputText },
    data() {
        return {
            data: [
                {
                    id: 0
                },
                {
                    id: 1
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },
                {
                    id: 7
                },
                {
                    id: 8
                },
            ],

            filterMenuOpened: false,

            // Filters
            price: [20, 80]
        }
    },
}
</script>

<template>
    <section class="max-w-[1220px] w-full mx-auto px-4 mt-20 mb-20">
        <div class="w-fit mb-12">
            <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">Nossos carros</h2>
            <div class="w-1/3 h-1 bg-brand-orange"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 gap-4 md:gap-y-6 mb-6">
            <CarCard v-for="car, id in data" :key="id"></CarCard>
        </div>

        <Paginator :rows="1" :totalRecords="20"></Paginator>
    </section>
</template>