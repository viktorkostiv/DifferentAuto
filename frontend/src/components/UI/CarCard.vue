<script>
export default {

}
</script>

<template>
    <router-link to="/car/id" class="relative bg-white shadow-xl duration-300 ease-linear hover:scale-105">
        <img src="../../assets/images/head-placeholder.png" alt="car" class="w-full h-auto object-cover aspect-[5/3]">
        <div class="p-2 md:p-4 md:py-2">
            <div class="w-fit mb-2">
                <h4 class="font-Barlow font-semibold text-xl text-brand-black">Porsche 911</h4>
                <div class="w-1/2 h-0.5 bg-brand-orange"></div>
            </div>
            <div class="flex justify-between">
                <p class="font-Barlow font-bold text-base text-brand-orange">45 200 $</p>
                <p class="font-Barlow font-normal text-base text-brand-black">200mil km</p>
            </div>
        </div>
    </router-link>
</template>