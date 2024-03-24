<script>
import CarCard from '../../UI/CarCard.vue'

export default {
    props: {
        data: {
            type: Array,
            required: true,
        }
    },
    components: { CarCard },
    data() {
        return {
            
        }
    },
}
</script>

<template>
    <section class="max-w-[1220px] w-full mx-auto px-4 my-16 md:my-20">
        <div class="flex justify-between items-center mb-10">
            <div class="w-fit">
                <h2 class="font-Barlow font-bold text-brand-black text-3xl md:text-4xl uppercase">Nossos carros</h2>
                <div class="w-1/3 h-1 bg-brand-orange"></div>
            </div>

            <router-link to="/cars" class="base-button !hidden md:!flex">Ver Mais</router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-4 gap-4 md:gap-y-6">
            <CarCard v-for="car, id in data" :data="car" :key="id"></CarCard>
        </div>
        <router-link to="/cars" class="base-button mx-auto mt-6 md:!hidden">Ver Mais</router-link>
    </section>
</template>