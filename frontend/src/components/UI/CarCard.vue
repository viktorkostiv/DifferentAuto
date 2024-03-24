<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <router-link :to="`/car/${data.id}`" class="relative bg-white shadow-xl duration-300 ease-linear hover:scale-105">
        <img :src="data.images.find(el => el.order == 1 ).url" alt="car" class="w-full h-auto object-cover aspect-[5/3]">
        <div class="p-2 md:p-4 md:py-2">
            <div class="w-fit mb-2">
                <h4 class="font-Barlow font-semibold text-xl text-brand-black">{{ data.title }}</h4>
                <div class="w-1/2 h-0.5 bg-brand-orange"></div>
            </div>
            <div class="flex justify-between">
                <p class="font-Barlow font-bold text-base text-brand-orange">{{ data.price }}€</p>
                <p class="font-Barlow font-normal text-base text-brand-black">{{ data.details.find(el => el.title.toLowerCase() === 'quilómetros' ).value }}km</p>
            </div>
        </div>
    </router-link>
</template>