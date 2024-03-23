<script>

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            data: null
        }
    }
}
</script>

<template>
    <section class="relative">
        <img src="../../../assets/images/head-placeholder.png" alt="car" class="w-full aspect-[320/420] md:aspect-[768/500] lg:aspect-[1440/650] max-h-screen object-cover">
        <div class="w-full h-full absolute top-0 left-0 z-[1]">
            <div class="absolute w-2/3 md:w-1/2 h-full top-0 left-0 bg-gradient-to-r from-brand-black to-transparent"></div>
            <div class="max-w-[1220px] w-full mx-auto px-4 h-full flex flex-col justify-center relative z-[2]">
                <p class="font-Barlow font-semibold text-xl md:text-2xl lg:text-3xl text-white drop-shadow-xl bg-brand-orange w-fit px-3 py-0.5 rounded-tr-lg rounded-bl-lg mb-2">25 000 $</p>
                <h1 class="font-Barlow font-extrabold text-3xl md:text-4xl text-white w-fit drop-shadow-xl">Porsche 911</h1>
                <router-link to="/" class="base-button mb-8 mt-12">Ver Detalhes</router-link>
                <div class="flex gap-2">
                    <div class="w-2 h-2 duration-300 ease-linear bg-white shadow-xl rounded-full"></div>
                    <div class="w-4 h-2 duration-300 ease-linear bg-brand-orange shadow-xl rounded-full"></div>
                    <div class="w-2 h-2 duration-300 ease-linear bg-white shadow-xl rounded-full"></div>
                </div>
            </div>
        </div>
    </section>
</template>