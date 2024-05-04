<script>

export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeIndex: 0,
            autoplayInterval: null
        }
    },
    mounted() {
        this.startAutoplay();
    },
    methods: {
        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.activeIndex = (this.activeIndex + 1) % this.data.length;
            }, 6000);
        },
        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }
    },
    beforeUnmount() {
        this.stopAutoplay();
    }
}
</script>

<template>
    <section class="relative aspect-[320/420] md:aspect-[768/500] lg:aspect-[1440/650] max-h-screen w-full">
        <div v-for="el, id in data" class="absolute w-full h-full top-0 left-0">
            <transition name="popup" mode="out-in">
                <img v-if="id === activeIndex" :src="el.images.find(el => el.order == 0).url" alt="car"
                    class="w-full h-full object-cover">
            </transition>
        </div>

        <div class="w-full h-full absolute top-0 left-0 z-[1]">
            <div class="absolute w-2/3 md:w-1/2 h-full top-0 left-0 bg-gradient-to-r from-brand-black to-transparent">
            </div>
            <div class="max-w-[1220px] w-full mx-auto px-4 h-full flex flex-col justify-center relative z-[2]">
                <p
                    class="font-Barlow font-semibold text-xl md:text-2xl lg:text-3xl text-white drop-shadow-xl bg-brand-orange w-fit px-3 py-0.5 rounded-tr-lg rounded-bl-lg mb-2">
                    {{ data[activeIndex].price }}€</p>
                <h1 class="font-Barlow font-extrabold text-3xl md:text-4xl text-white w-fit drop-shadow-xl">
                    {{ data[activeIndex].title }}</h1>
                <router-link :to="`/car/${data[activeIndex].id}`" class="base-button mb-8 mt-12">Ver
                    Detalhes</router-link>

                <div v-if="data.length > 1" class="flex gap-2">
                    <button v-for="el, id in data" :key="id" @click="activeIndex = id"
                        class="w-2 h-2 duration-300 ease-linear bg-white shadow-xl rounded-full"
                        :class="{ 'w-4 !bg-brand-orange': activeIndex == id }"></button>
                </div>
            </div>
        </div>
    </section>
</template>