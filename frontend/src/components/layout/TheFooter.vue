<script>
export default {

}
</script>

<template>
    <footer class="w-full border-t-4 border-brand-orange bg-brand-gray py-4">
        <div class="max-w-[1220px] w-full mx-auto px-4">
            <div class="flex justify-between items-center">
                <div class="">
                    <router-link to="/">
                        <img src="../../assets/images/logo.png" alt="logo" class="w-[80px] md:w-[120px] object-contain">
                    </router-link>
                </div>

                <div class="flex gap-6">
                    <a href="#" class="">
                        <i class="pi pi-facebook text-2xl md:text-3xl duration-300 ease-linear hover:text-brand-orange"></i>
                    </a>
                    <a href="" class="">
                        <i class="pi pi-whatsapp text-2xl md:text-3xl duration-300 ease-linear hover:text-brand-orange"></i>
                    </a>
                </div>
            </div>

            <p class="mt-4 font-Barlow font-light text-sm text-white/80 text-center md:text-left">&copy; 2021 by DifferentAuto</p>
        </div>
    </footer>
</template>